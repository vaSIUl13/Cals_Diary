# FITAPP — Calorie Diary

FITAPP is a web application for estimating daily calorie and macronutrient needs, tracking meals, and browsing food products. Add food to your daily meals, monitor calories and protein, fats, and carbohydrates, and compare them with your personal goals.

## Features

- Calculates an estimated daily calorie and macronutrient target based on age, gender, height, weight, and activity level.
- Provides a calorie diary with separate sections for breakfast, lunch, dinner, and snacks.
- Supports date navigation, meal tracking, and a daily calorie and macronutrient summary.
- Searches food products through [Open Food Facts](https://world.openfoodfacts.org/).
- Includes a product catalog grouped by protein, fats, carbohydrates, and fiber.
- Stores goals, calculator inputs, and diary entries in the browser using `localStorage`.

## Technology Stack

| Area | Technologies |
| --- | --- |
| Markup | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) |
| Styling | ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) |
| Application logic | ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) |
| Food data | [Open Food Facts API](https://world.openfoodfacts.org/) |
| Storage | Browser `localStorage` |

## Run locally

The application does not require Node.js, dependency installation, or a build step. Clone the repository:

```bash
git clone https://github.com/vaSIUl13/Cals_Diary.git
cd Cals_Diary
```

Start a local HTTP server from the project root, for example using Python:

```bash
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in your browser. You can also open `index.html` using a local development extension such as Live Server.

An internet connection is required to search products through Open Food Facts. Diary entries and settings are stored locally in the browser and are not synchronized across devices.

## Pages

- `index.html` — FITAPP home page.
- `calaculator.html` — calorie and macronutrient calculator.
- `diary.html` — daily nutrition diary.
- `products.html` — categorized product catalog.

> The calculations are informational and do not replace advice from a qualified healthcare professional or dietitian.
