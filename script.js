const searchInput = document.getElementById('searchInput');
const recipeList = document.getElementById('recipeList');
const randomBtn = document.getElementById('randomBtn');
const randomContainer = document.getElementById('randomRecipeContainer');

const recipes = [
  { name: "Spaghetti Carbonara", details: "recipe.html#spaghetti" },
  { name: "Paneer Butter Masala", details: "recipe.html#paneer" },
  { name: "Grilled Cheese Sandwich", details: "recipe.html#sandwich" },
  { name: "Veg Biryani", details: "recipe.html#biryani" },
  { name: "Mango Smoothie", details: "recipe.html#mango" },
  { name: "Omelette", details: "recipe.html#omelette" }
];

function displayRecipeList(filteredRecipes) {
  recipeList.innerHTML = '';
  filteredRecipes.forEach(recipe => {
    const li = document.createElement('li');
    li.textContent = recipe.name;
    li.addEventListener('click', () => {
      window.location.href = recipe.details;
    });
    recipeList.appendChild(li);
  });
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(query)
  );
  displayRecipeList(filtered);
});

randomBtn.addEventListener('click', () => {
  const random = recipes[Math.floor(Math.random() * recipes.length)];
  randomContainer.innerHTML = `<strong>${random.name}</strong><br><button onclick="window.location.href='${random.details}'">View Details</button>`;
  randomContainer.classList.remove('hidden');
});

// Load all recipes initially
window.addEventListener('load', () => {
  displayRecipeList(recipes);
});
