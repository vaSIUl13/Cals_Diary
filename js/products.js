document.addEventListener("DOMContentLoaded", () => {
  const productsDB = {
    protein: {
      title: "Продукти: Білок",
      items: [
        {
          name: "Куряче філе",
          calories: 110,
          p: 23,
          f: 1.2,
          c: 0,
          price: "200 грн / кг",
          img: "./images/protein_img/chicken_fillet.jpg",
        },
        {
          name: "Сир кисломолочний 5%",
          calories: 121,
          p: 17,
          f: 5,
          c: 1.8,
          price: "70 грн / 350г",
          img: "./images/protein_img/cottage_cheese.jpg",
        },
        {
          name: "Яйця",
          calories: 155,
          p: 13,
          f: 11,
          c: 1,
          price: "70 грн / 10 шт",
          img: "./images/protein_img/eggs.webp",
        },
        {
          name: "Яловичина (пісна)",
          calories: 187,
          p: 29,
          f: 7,
          c: 0,
          price: "280 грн / кг",
          img: "./images/protein_img/beef.jpg",
        },
        {
          name: "Свинина вирізка",
          calories: 143,
          p: 26,
          f: 3.5,
          c: 0,
          price: "220 грн / кг",
          img: "./images/protein_img/pork.jpg",
        },
        {
          name: "Індиче філе",
          calories: 114,
          p: 24,
          f: 1.5,
          c: 0,
          price: "210 грн / кг",
          img: "./images/protein_img/turkey.jpg",
        },
        {
          name: "Тунець у власному соку",
          calories: 96,
          p: 21,
          f: 1,
          c: 0,
          price: "70 грн / банка",
          img: "./images/protein_img/tuna.webp",
        },
        {
          name: "Минтай філе",
          calories: 72,
          p: 16,
          f: 1,
          c: 0,
          price: "140 грн / кг",
          img: "./images/protein_img/pollock.webp",
        },
        {
          name: "Печінка куряча",
          calories: 137,
          p: 19,
          f: 6,
          c: 1,
          price: "130 грн / кг",
          img: "./images/protein_img/chicken_liver.jpg",
        },
        {
          name: "Сироватковий протеїн",
          calories: 380,
          p: 80,
          f: 5,
          c: 5,
          price: "900 грн / кг",
          img: "./images/protein_img/protein.jpg",
        },
      ],
    },
    carbs: {
      title: "Продукти: Вуглеводи",
      items: [
        {
          name: "Гречка",
          calories: 330,
          p: 12,
          f: 3,
          c: 68,
          price: "40 грн / кг",
          img: "./images/carb_img/buckwheat.webp",
        },
        {
          name: "Вівсянка",
          calories: 370,
          p: 13,
          f: 6,
          c: 66,
          price: "35 грн / 500г",
          img: "./images/carb_img/oatmeal.jpg",
        },
        {
          name: "Рис",
          calories: 347,
          p: 7,
          f: 0.6,
          c: 78,
          price: "80 грн / кг",
          img: "./images/carb_img/rice.jpg",
        },
        {
          name: "Макарони (тв. сорти)",
          calories: 350,
          p: 12,
          f: 1.5,
          c: 71,
          price: "50 грн / 500г",
          img: "./images/carb_img/pasta.avif",
        },
        {
          name: "Картопля",
          calories: 77,
          p: 2,
          f: 0.4,
          c: 17,
          price: "20 грн / кг",
          img: "./images/carb_img/potato.jpg",
        },
        {
          name: "Хліб цільнозерновий",
          calories: 250,
          p: 9,
          f: 4,
          c: 43,
          price: "30 грн / буханець",
          img: "./images/carb_img/bread.jpg",
        },
        {
          name: "Булгур",
          calories: 342,
          p: 12,
          f: 1.3,
          c: 76,
          price: "55 грн / кг",
          img: "./images/carb_img/bulgur.jpg",
        },
        {
          name: "Перловка",
          calories: 320,
          p: 9,
          f: 1.1,
          c: 73,
          price: "25 грн / кг",
          img: "./images/carb_img/pearlbarley.webp",
        },
        {
          name: "Кукурудзяна крупа",
          calories: 328,
          p: 8,
          f: 1,
          c: 71,
          price: "30 грн / кг",
          img: "./images/carb_img/corn.jpg",
        },
        {
          name: "Хлібці (гречані)",
          calories: 300,
          p: 9,
          f: 2,
          c: 60,
          price: "25 грн / пачка",
          img: "./images/carb_img/breads.jpg",
        },
      ],
    },
    fats: {
      title: "Продукти: Жири",
      items: [
        {
          name: "Арахісова паста",
          calories: 588,
          p: 25,
          f: 50,
          c: 20,
          price: "120 грн / 300г",
          img: "./images/fat_img/peanet.jpg",
        },
        {
          name: "Оливкова олія",
          calories: 884,
          p: 0,
          f: 100,
          c: 0,
          price: "300 грн / 500мл",
          img: "./images/fat_img/oil.webp",
        },
        {
          name: "Авокадо",
          calories: 160,
          p: 2,
          f: 15,
          c: 9,
          price: "60 грн / шт",
          img: "./images/fat_img/avocado.avif",
        },
        {
          name: "Волоські горіхи",
          calories: 654,
          p: 15,
          f: 65,
          c: 14,
          price: "250 грн / кг",
          img: "./images/fat_img/nuts.jpg",
        },
        {
          name: "Мигдаль",
          calories: 579,
          p: 21,
          f: 50,
          c: 21,
          price: "400 грн / кг",
          img: "./images/fat_img/almond.jpeg",
        },
        {
          name: "Вершкове масло 82%",
          calories: 748,
          p: 0.5,
          f: 82,
          c: 0.8,
          price: "80 грн / 200г",
          img: "./images/fat_img/butter.webp",
        },
        {
          name: "Сало",
          calories: 797,
          p: 2.4,
          f: 89,
          c: 0,
          price: "180 грн / кг",
          img: "./images/fat_img/salo.webp",
        },
        {
          name: "Сир твердий (45%)",
          calories: 350,
          p: 26,
          f: 26,
          c: 0,
          price: "350 грн / кг",
          img: "./images/fat_img/cheese.webp",
        },
        {
          name: "Насіння соняшника",
          calories: 584,
          p: 20,
          f: 51,
          c: 20,
          price: "80 грн / кг",
          img: "./images/fat_img/sunflower.png",
        },
        {
          name: "Шоколад чорний (80%)",
          calories: 546,
          p: 8,
          f: 43,
          c: 30,
          price: "60 грн / плитка",
          img: "./images/fat_img/choco.jpg",
        },
      ],
    },
    fiber: {
      title: "Продукти: Клітковина (Овочі/Фрукти)",
      items: [
        {
          name: "Броколі",
          calories: 34,
          p: 2.8,
          f: 0.4,
          c: 7,
          price: "90 грн / кг",
          img: "./images/fibre_img/broccoli.jpg",
        },
        {
          name: "Яблука",
          calories: 52,
          p: 0.3,
          f: 0.2,
          c: 14,
          price: "30 грн / кг",
          img: "./images/fibre_img/apple.webp",
        },
        {
          name: "Шпинат",
          calories: 23,
          p: 2.9,
          f: 0.4,
          c: 3.6,
          price: "40 грн / пучок",
          img: "./images/fibre_img/shpinat.webp",
        },
        {
          name: "Морква",
          calories: 41,
          p: 0.9,
          f: 0.2,
          c: 10,
          price: "25 грн / кг",
          img: "./images/fibre_img/carrot.webp",
        },
        {
          name: "Огірки",
          calories: 15,
          p: 0.8,
          f: 0.1,
          c: 3,
          price: "60 грн / кг",
          img: "./images/fibre_img/cucumber.jpg",
        },
        {
          name: "Помідори",
          calories: 18,
          p: 0.9,
          f: 0.2,
          c: 3.9,
          price: "70 грн / кг",
          img: "./images/fibre_img/tomato.webp",
        },
        {
          name: "Капуста білокачанна",
          calories: 25,
          p: 1.3,
          f: 0.1,
          c: 5.8,
          price: "20 грн / кг",
          img: "./images/fibre_img/cabbage.webp",
        },
        {
          name: "Кабачки",
          calories: 24,
          p: 0.6,
          f: 0.3,
          c: 4.6,
          price: "45 грн / кг",
          img: "./images/fibre_img/zucchini.webp",
        },
        {
          name: "Банани",
          calories: 89,
          p: 1.1,
          f: 0.3,
          c: 23,
          price: "65 грн / кг",
          img: "./images/fibre_img/banana.avif",
        },
        {
          name: "Апельсини",
          calories: 43,
          p: 0.9,
          f: 0.2,
          c: 8.2,
          price: "55 грн / кг",
          img: "./images/fibre_img/orange.jpg",
        },
      ],
    },
  };

  const categoriesSection = document.getElementById("categories-section");
  const showcaseSection = document.getElementById("showcase-section");

  const categoryCards = document.querySelectorAll(".categories__card");
  const backBtn = document.getElementById("back-btn");
  const showcaseTitle = document.getElementById("showcase-title");
  const productsSlider = document.getElementById("products-slider");

  showcaseSection.classList.add("hidden");

  categoryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const categoryKey = card.getAttribute("data-category");
      const categoryData = productsDB[categoryKey];

      showcaseTitle.textContent = categoryData.title;

      renderProducts(categoryData.items);

      categoriesSection.classList.add("hidden");
      showcaseSection.classList.remove("hidden");
    });
  });

  backBtn.addEventListener("click", () => {
    showcaseSection.classList.add("hidden");
    categoriesSection.classList.remove("hidden");
  });

  function renderProducts(items) {
    productsSlider.innerHTML = "";

    items.forEach((product) => {
      const cardHTML = `
        <article class="product-card">
          <div class="product-card__image-wrapper">
            <img src="${product.img}" alt="${product.name}" class="product-card__image">
            
            <span class="product-card__price">${product.price}</span>
          </div>
          
          <div class="product-card__content">
            <h3 class="product-card__title">${product.name}</h3>
            <div class="product-card__calories">${product.calories} ккал / 100г</div>
            
            <div class="product-card__macros macros-list">
              <div class="macros-list__item macros-list__item--protein">Б: ${product.p}г</div>
              <div class="macros-list__item macros-list__item--fat">Ж: ${product.f}г</div>
              <div class="macros-list__item macros-list__item--carbs">В: ${product.c}г</div>
            </div>
          </div>
        </article>
      `;
      productsSlider.insertAdjacentHTML("beforeend", cardHTML);
    });
  }

  const catSlider = document.getElementById("categories-slider");
  const catPrevBtn = document.getElementById("cat-prev");
  const catNextBtn = document.getElementById("cat-next");

  const prodPrevBtn = document.getElementById("prod-prev");
  const prodNextBtn = document.getElementById("prod-next");

  const scrollAmount = 320;

  catPrevBtn.addEventListener("click", () => {
    catSlider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  catNextBtn.addEventListener("click", () => {
    catSlider.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  prodPrevBtn.addEventListener("click", () => {
    productsSlider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  prodNextBtn.addEventListener("click", () => {
    productsSlider.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
});
