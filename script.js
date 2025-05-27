const searchInput = document.getElementById('searchInput');
const recipeList = document.getElementById('recipeList');
const randomBtn = document.getElementById('randomBtn');
const loader = document.getElementById('loader');
const randomContainer = document.getElementById('randomRecipeContainer');
const randomName = document.getElementById('randomRecipeName');
const viewRandomBtn = document.getElementById('viewRandomDetailsBtn');

const toggleFilterBtn = document.getElementById('toggleFilterBtn');
const ingredientFilter = document.getElementById('ingredientFilter');
const applyFilterBtn = document.getElementById('applyFilterBtn');

const recipes = [
  {
    name: "Omelette",
    details: "Ingredients: Eggs, onion, green chili, salt.\n\nInstructions: Beat eggs with chopped veggies, cook on pan till fluffy.",
    ingredients: ["Egg"]
  },
  {
    name: "Mango Smoothie",
    details: "Ingredients: Mango, yogurt, honey.\n\nInstructions: Blend all ingredients till smooth, serve chilled.",
    ingredients: ["Mango", "Milk"]
  },
  {
    name: "Grilled Cheese Sandwich",
    details: "Ingredients: Bread, cheese, butter.\n\nInstructions: Butter bread, place cheese between slices, grill till golden brown.",
    ingredients: ["Milk"]
  },
  {
    name: "Fish Curry",
    details: "Ingredients: Fish, spices, coconut milk.\n\nInstructions: Cook fish in spicy curry with coconut milk.",
    ingredients: ["Fish"]
  },
  {
    name: "Chicken Curry",
    details: "Ingredients: Chicken, spices, tomato.\n\nInstructions: Cook chicken with spices and tomato gravy.",
    ingredients: ["Chicken"]
  }
];

function displayRecipeList(list) {
  recipeList.innerHTML = '';
  list.forEach(recipe => {
    const li = document.createElement('li');
    li.textContent = recipe.name;
    li.addEventListener('click', () => {
      sessionStorage.setItem('selectedRecipe', JSON.stringify(recipe));
      window.location.href = 'recipe.html';
    });
    recipeList.appendChild(li);
  });
}

// Toggle ingredient filter visibility
toggleFilterBtn.addEventListener('click', () => {
  ingredientFilter.classList.toggle('hidden');
});

// Apply ingredient filter
applyFilterBtn.addEventListener('click', () => {
  const selected = Array.from(ingredientFilter.querySelectorAll('input[type="checkbox"]:checked'))
    .map(input => input.value);

  const filtered = recipes.filter(recipe =>
    selected.every(ingredient => recipe.ingredients.includes(ingredient))
  );

  displayRecipeList(filtered);
});

// Search by name
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(query)
  );
  displayRecipeList(filtered);
});

// Chef's choice
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

// Initial list
window.addEventListener('load', () => {
  displayRecipeList(recipes);
});
