const searchInput = document.getElementById('searchInput');
const recipeList = document.getElementById('recipeList');
const randomBtn = document.getElementById('randomBtn');
const loader = document.getElementById('loader');
const randomContainer = document.getElementById('randomRecipeContainer');
const randomName = document.getElementById('randomRecipeName');
const viewRandomBtn = document.getElementById('viewRandomDetailsBtn');
const toggleFilterBtn = document.getElementById('toggleFilterBtn');
const ingredientOptions = document.getElementById('ingredientOptions');
const applyFilterBtn = document.getElementById('applyFilterBtn');

const recipes = [
  {
    name: "Spaghetti Carbonara",
    details: "Ingredients: Pasta, eggs, cheese, bacon.",
    ingredients: ["Pasta", "Egg", "Cheese", "Bacon"]
  },
  {
    name: "Paneer Butter Masala",
    details: "Ingredients: Paneer, butter, cream, tomato gravy.",
    ingredients: ["Paneer", "Butter", "Cream", "Tomato"]
  },
  {
    name: "Grilled Cheese Sandwich",
    details: "Ingredients: Bread, cheese, butter.",
    ingredients: ["Bread", "Cheese", "Butter"]
  },
  {
    name: "Veg Biryani",
    details: "Ingredients: Basmati rice, vegetables, spices.",
    ingredients: ["Rice", "Vegetables", "Spices"]
  },
  {
    name: "Mango Smoothie",
    details: "Ingredients: Mango, yogurt, honey.",
    ingredients: ["Mango", "Yogurt", "Honey"]
  },
  {
    name: "Omelette",
    details: "Ingredients: Eggs, onion, green chili, salt.",
    ingredients: ["Egg", "Onion", "Chili", "Salt"]
  }
];

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

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(query)
  );
  displayRecipeList(filtered);
});

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

// Filter functionality
toggleFilterBtn.addEventListener('click', () => {
  ingredientOptions.classList.toggle('hidden');
});

applyFilterBtn.addEventListener('click', () => {
  const selected = Array.from(document.querySelectorAll('#ingredientOptions input:checked')).map(cb => cb.value);
  const filtered = recipes.filter(recipe =>
    selected.length > 0 &&
    recipe.ingredients.every(ing => selected.includes(ing))
  );
  displayRecipeList(filtered.length ? filtered : []);
});
