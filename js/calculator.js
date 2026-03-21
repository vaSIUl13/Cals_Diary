document.addEventListener("DOMContentLoaded", () => {
  // Основні дані
  const ageInput = document.querySelector(".age__input");
  const heightInput = document.querySelector(".height__input");
  const weightInput = document.querySelector(".weight__input");

  // Активність
  const stepsSlider = document.getElementById("steps-slider");
  const stepsValueDisplay = document.getElementById("steps-value");

  // Кнопки
  const genderBtns = Array.from(
    document.querySelectorAll(".gender__option button"),
  );
  const workoutBtns = Array.from(
    document.querySelectorAll(".training__options button"),
  );

  // Вивід результату
  const caloriesDisplay = document.querySelector(".circular-chart__value");

  // Елементи БЖВ
  const proteinValue = document.querySelector(
    ".macros__item--protein .macros__value",
  );
  const fatValue = document.querySelector(".macros__item--fat .macros__value");
  const carbsValue = document.querySelector(
    ".macros__item--carbs .macros__value",
  );

  // Елементи смужок
  const proteinBarFill = document.querySelector(
    ".macros__item--protein .macros__fill",
  );
  const fatBarFill = document.querySelector(".macros__item--fat .macros__fill");
  const carbsBarFill = document.querySelector(
    ".macros__item--carbs .macros__fill",
  );

  // Стан за замовчуванням
  let gender = "male";
  let workoutsPerWeek = 3;

  const savedInputs = JSON.parse(localStorage.getItem("fitapp_inputs"));

  if (savedInputs) {
    ageInput.value = savedInputs.age;
    heightInput.value = savedInputs.height;
    weightInput.value = savedInputs.weight;

    stepsSlider.value = savedInputs.steps;
    stepsValueDisplay.textContent = savedInputs.steps;

    gender = savedInputs.gender;
    workoutsPerWeek = savedInputs.workoutsPerWeek;

    genderBtns.forEach((b) => b.classList.remove("active"));
    if (gender === "male") genderBtns[0].classList.add("active");
    else genderBtns[1].classList.add("active");

    workoutBtns.forEach((b) => b.classList.remove("active"));
    workoutBtns[workoutsPerWeek - 1].classList.add("active");
  } else {
    // Якщо  перший вхід
    ageInput.value = 19;
    heightInput.value = 175;
    weightInput.value = 85;
    stepsSlider.value = 8000;
    stepsValueDisplay.textContent = "8000";

    workoutBtns.forEach((b) => b.classList.remove("active"));
    workoutBtns[2].classList.add("active");
  }

  [ageInput, heightInput, weightInput].forEach((input) => {
    input.addEventListener("input", calculateNorm);
  });

  stepsSlider.addEventListener("input", (e) => {
    stepsValueDisplay.textContent = e.target.value;
    calculateNorm();
  });

  genderBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      genderBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      gender = index === 0 ? "male" : "female";
      calculateNorm();
    });
  });

  workoutBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      workoutBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      workoutsPerWeek = index + 1;
      calculateNorm();
    });
  });

  // розрахунок і збереження
  function calculateNorm() {
    const age = parseFloat(ageInput.value) || 0;
    const height = parseFloat(heightInput.value) || 0;
    const weight = parseFloat(weightInput.value) || 0;
    const steps = parseFloat(stepsSlider.value) || 0;

    if (age <= 0 || height <= 0 || weight <= 0) {
      caloriesDisplay.textContent = "0";
      resetMacros();
      return;
    }

    const baseCalories = 10 * weight + 6.25 * height - 5 * age - 161;
    const stepsCalories = (steps * weight) / 2000;

    const trainingNumber = 5 * weight * 2;
    const trainingCalories = (trainingNumber * workoutsPerWeek) / 7;

    let totalCalories = baseCalories + stepsCalories + trainingCalories;

    if (gender === "female") {
      totalCalories -= 200;
    }

    totalCalories = Math.round(totalCalories);
    caloriesDisplay.textContent = totalCalories;

    const proteinGrams = Math.round(weight * 2);
    const fatGrams = Math.round(weight * 1);

    const proteinCals = proteinGrams * 4;
    const fatCals = fatGrams * 9;

    let carbsCals = totalCalories - (proteinCals + fatCals);
    if (carbsCals < 0) carbsCals = 0;
    const carbsGrams = Math.round(carbsCals / 4);

    const proteinPercent = Math.round((proteinCals / totalCalories) * 100) || 0;
    const fatPercent = Math.round((fatCals / totalCalories) * 100) || 0;
    const carbsPercent = 100 - (proteinPercent + fatPercent);

    proteinValue.textContent = `${proteinPercent}% (${proteinGrams}г)`;
    fatValue.textContent = `${fatPercent}% (${fatGrams}г)`;
    carbsValue.textContent = `${carbsPercent}% (${carbsGrams}г)`;

    proteinBarFill.style.width = proteinPercent + "%";
    fatBarFill.style.width = fatPercent + "%";
    carbsBarFill.style.width = carbsPercent + "%";

    const circularChart = document.querySelector(".circular-chart");
    circularChart.style.background = `conic-gradient(
            #3b82f6 0% ${proteinPercent}%, 
            #ef4444 ${proteinPercent}% ${proteinPercent + fatPercent}%, 
            #f59e0b ${proteinPercent + fatPercent}% 100%
        )`;

    // Зберігання для щоденника
    const userGoals = {
      calories: totalCalories,
      protein: proteinGrams,
      carbs: carbsGrams,
      fat: fatGrams,
    };
    localStorage.setItem("fitapp_goals", JSON.stringify(userGoals));

    // Зберігання введених даних
    const userInputs = {
      age: ageInput.value,
      height: heightInput.value,
      weight: weightInput.value,
      steps: stepsSlider.value,
      gender: gender,
      workoutsPerWeek: workoutsPerWeek,
    };
    localStorage.setItem("fitapp_inputs", JSON.stringify(userInputs));
  }

  function resetMacros() {
    proteinValue.textContent = `30% (0г)`;
    fatValue.textContent = `25% (0г)`;
    carbsValue.textContent = `45% (0г)`;
    proteinBarFill.style.width = "30%";
    fatBarFill.style.width = "25%";
    carbsBarFill.style.width = "45%";
    document.querySelector(".circular-chart").style.background = "#e5e7eb";
  }

  calculateNorm();
});
