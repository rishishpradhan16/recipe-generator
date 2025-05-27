const searchInput = document.getElementById('searchInput');
const recipeList = document.getElementById('recipeList');
const randomBtn = document.getElementById('randomBtn');
const loader = document.getElementById('loader');
const randomContainer = document.getElementById('randomRecipeContainer');
const randomName = document.getElementById('randomRecipeName');
const viewRandomBtn = document.getElementById('viewRandomDetailsBtn');
const toggleFilter = document.getElementById('toggleFilter');
const ingredientFilter = document.getElementById('ingredientFilter');
const applyFilterBtn = document.getElementById('applyFilterBtn');

const recipes = [
  {
    name: "Omelette",
    details: "Ingredients: Egg, Milk\n\nInstructions: Beat eggs with milk, cook in pan.",
    ingredients: ["Egg", "Milk"]
  },
  {
    name: "Mango Smoothie",
    details: "Ingredients: Mango, Milk\n\nInstructions: Blend ingredients till smooth.",
    ingredients: ["Mango", "Milk"]
  },
  {
    name: "Grilled Cheese Sandwich",
    details: "Ingredients: Bread, Cheese, Butter\n\nInstructions: Assemble sandwich and grill.",
    ingredients: ["Bread", "Cheese", "Butter"]
  }
];

// Search filter
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(query)
  );
  displayRecipeList(filtered);
});

function displayRecipeList(filtered) {
  recipeList.innerHTML = '';
  filtered.forEach(recipe => {
    const li = document.createElement('li');
    li.textContent = recipe.name;
    li.addEventListener('click', () => {
      sessionStorage.setItem('selectedRecipe', JSON.stringify(recipe));
      window.location.href = 'recipe.html';
    });
    recipeList.appendChild(li);
  });
}

// On load
window.addEventListener('load', () => {
  displayRecipeList(recipes);
});

// Chef's Choice button
randomBtn.addEventListener('click', () => {
  loader.classList.remove('hidden');
  randomContainer.classList.add('hidden');

  setTimeout(() => {
    loader.classList.add('hidden');
    const random = recipes[Math.floor(Math.random() * recipes.length)];
    randomName.textContent = random.name;
    viewRandomBtn.onclick = () => {
      sessionStorage.setItem('selectedRecipe', JSON.stringify(random));
      window.location.href = 'recipe.html';
    };
    randomContainer.classList.remove('hidden');
  }, 2000);
});

// Toggle ingredient filter visibility
toggleFilter.addEventListener('click', () => {
  ingredientFilter.classList.toggle('hidden');
});

// Apply ingredient filter
applyFilterBtn.addEventListener('click', () => {
  const selectedIngredients = Array.from(
    ingredientFilter.querySelectorAll('input[type="checkbox"]:checked')
  ).map(cb => cb.value);

  const matched = recipes.filter(recipe =>
    selectedIngredients.every(ing => recipe.ingredients.includes(ing))
  );

  displayRecipeList(matched);
});
