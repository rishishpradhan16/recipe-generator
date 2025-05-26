const recipes = [
  "Spaghetti Carbonara",
  "Vegan Salad",
  "Chicken Curry",
  "Pancakes",
  "Grilled Cheese Sandwich"
];

const generateBtn = document.getElementById("generateBtn");
const recipeDisplay = document.getElementById("recipeDisplay");

generateBtn.addEventListener("click", () => {
  const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
  recipeDisplay.textContent = randomRecipe;
});
