document.addEventListener("DOMContentLoaded", () => {
  // Цільові, спожиті і залишкові калорії
  const goalCalsEl = document.getElementById("goal-cals");
  const eatenCalsEl = document.getElementById("eaten-cals");
  const remainingCalsEl = document.getElementById("remaining-cals");

  // Елементи БЖВ
  const proteinGoalEl = document.querySelector(
    ".macros__item--protein .macros__value",
  );
  const fatGoalEl = document.querySelector(".macros__item--fat .macros__value");
  const carbsGoalEl = document.querySelector(
    ".macros__item--carbs .macros__value",
  );
  const proteinFill = document.querySelector(
    ".macros__item--protein .macros__fill",
  );
  const fatFill = document.querySelector(".macros__item--fat .macros__fill");
  const carbsFill = document.querySelector(
    ".macros__item--carbs .macros__fill",
  );

  // Навігація по датах
  const dateDisplayEl = document.getElementById("current-date-display");
  const datePickerEl = document.getElementById("date-picker");
  const prevDayBtn = document.getElementById("prev-day-btn");
  const nextDayBtn = document.getElementById("next-day-btn");

  // Цілі з калькулятора
  let userGoals = JSON.parse(localStorage.getItem("fitapp_goals")) || {
    calories: 2400,
    protein: 170,
    fat: 85,
    carbs: 238,
  };
  localStorage.setItem("fitapp_goals", JSON.stringify(userGoals));

  // Для календаря
  let viewedDate = new Date();
  let currentDiary = {};
  let diaryStorageKey = "";

  // Функція форматування дати в рядок YYYY-MM-DD
  function getStorageKey(dateObj) {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `diary_${year}-${month}-${day}`;
  }

  function getDisplayDate(dateObj) {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const options = { month: "long", day: "numeric" };
    const formatted = dateObj.toLocaleDateString("uk-UA", options);

    if (dateObj.toDateString() === today.toDateString())
      return `Сьогодні, ${formatted}`;
    if (dateObj.toDateString() === yesterday.toDateString())
      return `Вчора, ${formatted}`;
    if (dateObj.toDateString() === tomorrow.toDateString())
      return `Завтра, ${formatted}`;

    return formatted;
  }

  function loadDay(dateObj) {
    diaryStorageKey = getStorageKey(dateObj);

    dateDisplayEl.textContent = getDisplayDate(dateObj);

    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const dd = String(dateObj.getDate()).padStart(2, "0");
    datePickerEl.value = `${yyyy}-${mm}-${dd}`;

    const savedData = localStorage.getItem(diaryStorageKey);
    if (savedData) {
      currentDiary = JSON.parse(savedData);
    } else {
      currentDiary = { breakfast: [], lunch: [], dinner: [], snacks: [] };
    }

    renderDiaryUI();
  }

  // Функція збереження в пам'ять
  function saveDiary() {
    localStorage.setItem(diaryStorageKey, JSON.stringify(currentDiary));
  }

  // Календар
  prevDayBtn.addEventListener("click", () => {
    viewedDate.setDate(viewedDate.getDate() - 1);
    loadDay(viewedDate);
  });

  nextDayBtn.addEventListener("click", () => {
    viewedDate.setDate(viewedDate.getDate() + 1);
    loadDay(viewedDate);
  });

  datePickerEl.addEventListener("change", (e) => {
    if (e.target.value) {
      viewedDate = new Date(e.target.value);
      loadDay(viewedDate);
    }
  });

  // Модалка + API
  const modal = document.getElementById("food-modal");
  const closeBtn = document.getElementById("modal-close");
  const searchInput = document.getElementById("food-search-input");
  const searchBtn = document.getElementById("food-search-btn");
  const resultsList = document.getElementById("modal-results");

  const portionSection = document.getElementById("modal-portion-section");
  const portionInput = document.getElementById("food-portion-input");
  const selectedFoodNameEl = document.getElementById("selected-food-name");
  const addBtn = document.getElementById("add-to-diary-btn");

  let currentMealType = "";
  let selectedProductRaw = null;

  document.querySelectorAll(".meal-card").forEach((card) => {
    const mealType = card.id.replace("meal-", "");
    const addProductBtn = card.querySelector(".meal-card__add-btn");

    addProductBtn.addEventListener("click", () => {
      currentMealType = mealType;
      searchInput.value = "";
      resultsList.innerHTML = "";
      portionSection.classList.add("hidden");
      portionInput.value = "";
      modal.classList.remove("hidden");
    });
  });

  closeBtn.addEventListener("click", () => modal.classList.add("hidden"));

  searchBtn.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (!query) return;

    resultsList.innerHTML = "<li>Пошук...</li>";
    portionSection.classList.add("hidden");

    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=8`,
      );
      const data = await response.json();
      resultsList.innerHTML = "";

      if (data.products && data.products.length > 0) {
        data.products.forEach((product) => {
          const nutriments = product.nutriments || {};
          const pData = {
            id: product.id || Date.now(),
            name: product.product_name || "Невідомий продукт",
            cals100: Math.round(nutriments["energy-kcal_100g"]) || 0,
            prot100: Math.round(nutriments["proteins_100g"]) || 0,
            fat100: Math.round(nutriments["fat_100g"]) || 0,
            carbs100: Math.round(nutriments["carbohydrates_100g"]) || 0,
          };

          if (pData.cals100 === 0) return;

          const li = document.createElement("li");
          li.innerHTML = `<span>${pData.name}</span> <span class="modal__results-cals">${pData.cals100} ккал / 100г</span>`;

          li.addEventListener("click", () => {
            selectedProductRaw = pData;
            selectedFoodNameEl.textContent = `Вибрано: ${pData.name}`;
            portionSection.classList.remove("hidden");
            portionInput.focus();
          });

          resultsList.appendChild(li);
        });

        if (resultsList.innerHTML === "")
          resultsList.innerHTML = "<li>Не знайдено продуктів з КБЖВ :(</li>";
      } else {
        resultsList.innerHTML = "<li>Нічого не знайдено :(</li>";
      }
    } catch (error) {
      resultsList.innerHTML = "<li>Помилка з'єднання. Спробуйте ще раз.</li>";
    }
  });

  addBtn.addEventListener("click", () => {
    const grams = parseInt(portionInput.value);
    if (!grams || grams <= 0 || !selectedProductRaw) {
      alert("Будь ласка, введіть коректну вагу порції.");
      return;
    }

    const multiplier = grams / 100;
    const finalProduct = {
      id: Date.now(),
      name: selectedProductRaw.name,
      grams: grams,
      calories: Math.round(selectedProductRaw.cals100 * multiplier),
      protein: Math.round(selectedProductRaw.prot100 * multiplier),
      fat: Math.round(selectedProductRaw.fat100 * multiplier),
      carbs: Math.round(selectedProductRaw.carbs100 * multiplier),
    };

    currentDiary[currentMealType].push(finalProduct);
    saveDiary();

    modal.classList.add("hidden");
    renderDiaryUI();
  });

  function renderDiaryUI() {
    let totalDailyCals = 0;
    let totalDailyProt = 0;
    let totalDailyFat = 0;
    let totalDailyCarbs = 0;

    const mealKeys = ["breakfast", "lunch", "dinner", "snacks"];

    mealKeys.forEach((mealKey) => {
      const mealListEl = document.querySelector(
        `#meal-${mealKey} .meal-card__list`,
      );
      const mealTotalCalsEl = document.querySelector(
        `#meal-${mealKey} .meal-card__total`,
      );

      mealListEl.innerHTML = "";
      let mealCals = 0;

      const items = currentDiary[mealKey];

      if (items.length === 0) {
        mealListEl.innerHTML =
          '<li class="meal-card__empty-text">Ще нічого не додано</li>';
      } else {
        items.forEach((item) => {
          mealCals += item.calories;
          totalDailyCals += item.calories;
          totalDailyProt += item.protein;
          totalDailyFat += item.fat;
          totalDailyCarbs += item.carbs;

          const li = document.createElement("li");
          li.className = "food-item";
          li.innerHTML = `
                        <div class="food-item__info">
                            <h4 class="food-item__name">${item.name}</h4>
                            <span class="food-item__portion">${item.grams} г</span>
                        </div>
                        <div class="food-item__stats">
                            <span class="food-item__cals">${item.calories} ккал</span>
                            <span class="food-item__macros">Б:${item.protein} Ж:${item.fat} В:${item.carbs}</span>
                        </div>
                        <button class="food-item__delete" data-id="${item.id}" data-meal="${mealKey}">✕</button>
                    `;
          mealListEl.appendChild(li);
        });
      }
      mealTotalCalsEl.textContent = `${mealCals} ккал`;
    });

    goalCalsEl.textContent = userGoals.calories;
    eatenCalsEl.textContent = totalDailyCals;

    let remaining = userGoals.calories - totalDailyCals;
    remainingCalsEl.textContent = remaining;
    remainingCalsEl.style.color = remaining < 0 ? "#ef4444" : "#10b981";

    proteinGoalEl.textContent = `${totalDailyProt}г / ${userGoals.protein}г`;
    fatGoalEl.textContent = `${totalDailyFat}г / ${userGoals.fat}г`;
    carbsGoalEl.textContent = `${totalDailyCarbs}г / ${userGoals.carbs}г`;

    proteinFill.style.width = `${Math.min((totalDailyProt / userGoals.protein) * 100, 100)}%`;
    fatFill.style.width = `${Math.min((totalDailyFat / userGoals.fat) * 100, 100)}%`;
    carbsFill.style.width = `${Math.min((totalDailyCarbs / userGoals.carbs) * 100, 100)}%`;

    document.querySelectorAll(".food-item__delete").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const itemId = parseInt(e.target.getAttribute("data-id"));
        const mKey = e.target.getAttribute("data-meal");

        currentDiary[mKey] = currentDiary[mKey].filter(
          (item) => item.id !== itemId,
        );
        saveDiary();
        renderDiaryUI();
      });
    });
  }

  goalCalsEl.parentElement.style.cursor = "pointer";
  goalCalsEl.parentElement.addEventListener("click", () => {
    const newGoal = prompt("Введіть нову ціль калорій:", userGoals.calories);
    if (newGoal && !isNaN(newGoal) && newGoal > 500) {
      userGoals.calories = parseInt(newGoal);
      localStorage.setItem("fitapp_goals", JSON.stringify(userGoals));
      renderDiaryUI();
    }
  });

  loadDay(viewedDate);
});
