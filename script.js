const searchInput = document.getElementById('searchInput');
const recipeList = document.getElementById('recipeList');
const randomBtn = document.getElementById('randomBtn');
const loader = document.getElementById('loader');
const randomContainer = document.getElementById('randomRecipeContainer');
const randomName = document.getElementById('randomRecipeName');
const viewRandomBtn = document.getElementById('viewRandomDetailsBtn');

const recipes = [
  {
    name: "Spaghetti Carbonara",
    ingredients: ["Pasta", "Egg", "Cheese", "Bacon"],
    details: "Boil pasta, mix with scrambled eggs and cheese, add cooked bacon."
  },
  {
    name: "Paneer Butter Masala",
    ingredients: ["Paneer", "Butter", "Cream", "Tomato"],
    details: "Cook tomato gravy, add paneer and cream, simmer in butter."
  },
  {
    name: "Grilled Cheese Sandwich",
    ingredients: ["Bread", "Cheese", "Butter"],
    details: "Butter bread, place cheese between slices, grill till golden brown."
  },
  {
    name: "Veg Biryani",
    ingredients: ["Rice", "Vegetables", "Spices"],
    details: "Cook rice and vegetables separately, layer with spices, steam together."
  },
  {
    name: "Mango Smoothie",
    ingredients: ["Mango", "Yogurt", "Milk"],
    details: "Blend all ingredients till smooth, serve chilled."
  },
  {
    name: "Omelette",
    ingredients: ["Egg", "Salt"],
    details: "Beat eggs, cook on pan until fluffy."
  },
  {
    name: "Fish Curry",
    ingredients: ["Fish", "Tomato", "Spices"],
    details: "Marinate fish, cook in tomato and spice gravy."
  },
  {
    name: "Chicken Curry",
    ingredients: ["Chicken", "Tomato", "Spices"],
    details: "Cook chicken with tomatoes and spices until tender."
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

// Display list
function displayRecipeList(filtered) {
  recipeList.innerHTML = '';
  if (filtered.length === 0) {
    recipeList.innerHTML = '<li>No recipes found.</li>';
    return;
  }
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
  }, 3000);
});

function toggleIngredientFilter() {
  const filterDiv = document.getElementById('ingredientFilter');
  filterDiv.classList.toggle('hidden');
}

function applyFilter() {
  const selected = Array.from(document.querySelectorAll('#ingredientFilter input[type="checkbox"]:checked')).map(cb => cb.value);
  if (selected.length === 0) {
    displayRecipeList(recipes);
    return;
  }

  const filtered = recipes.filter(recipe =>
    selected.every(ing => recipe.ingredients.includes(ing))
  );

  displayRecipeList(filtered);
}
