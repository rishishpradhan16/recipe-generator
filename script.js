const searchInput = document.getElementById('searchInput');
const recipeList = document.getElementById('recipeList');
const recipeDisplay = document.getElementById('recipeDisplay');
const randomBtn = document.getElementById('randomBtn');

const predefinedRecipes = [
  { name: "Spaghetti Carbonara", details: "Pasta, eggs, cheese, bacon." },
  { name: "Paneer Butter Masala", details: "Paneer, butter, cream, tomato gravy." },
  { name: "Grilled Cheese Sandwich", details: "Bread, cheese, butter." },
  { name: "Veg Biryani", details: "Basmati rice, vegetables, spices." },
  { name: "Mango Smoothie", details: "Mango, yogurt, honey." },
  { name: "Omelette", details: "Eggs, onion, green chili, salt." }
];

function displayRecipeList(filteredRecipes) {
  recipeList.innerHTML = '';
  filteredRecipes.forEach(recipe => {
    const li = document.createElement('li');
    li.textContent = recipe.name;
    li.addEventListener('click', () => {
      recipeDisplay.innerHTML = `<strong>${recipe.name}</strong><br>${recipe.details}`;
      recipeDisplay.classList.remove('hidden');
    });
    recipeList.appendChild(li);
  });
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = predefinedRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(query)
  );
  displayRecipeList(filtered);
  recipeDisplay.classList.add('hidden'); // Hide recipe display on search
});

randomBtn.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * predefinedRecipes.length);
  const randomRecipe = predefinedRecipes[randomIndex];
  recipeDisplay.innerHTML = `<strong>${randomRecipe.name}</strong><br>${randomRecipe.details}`;
  recipeDisplay.classList.remove('hidden');
  searchInput.value = '';
  displayRecipeList(predefinedRecipes);
});

window.addEventListener('load', () => {
  displayRecipeList(predefinedRecipes);
});
