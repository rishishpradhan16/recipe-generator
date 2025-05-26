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
    details: "Ingredients: Pasta, eggs, cheese, bacon.\n\nInstructions: Boil pasta, mix with scrambled eggs and cheese, add cooked bacon."
  },
  {
    name: "Paneer Butter Masala",
    details: "Ingredients: Paneer, butter, cream, tomato gravy.\n\nInstructions: Cook tomato gravy, add paneer and cream, simmer in butter."
  },
  {
    name: "Grilled Cheese Sandwich",
    details: "Ingredients: Bread, cheese, butter.\n\nInstructions: Butter bread, place cheese between slices, grill till golden brown."
  },
  {
    name: "Veg Biryani",
    details: "Ingredients: Basmati rice, vegetables, spices.\n\nInstructions: Cook rice and vegetables separately, layer with spices, steam together."
  },
  {
    name: "Mango Smoothie",
    details: "Ingredients: Mango, yogurt, honey.\n\nInstructions: Blend all ingredients till smooth, serve chilled."
  },
  {
    name: "Omelette",
    details: "Ingredients: Eggs, onion, green chili, salt.\n\nInstructions: Beat eggs with chopped veggies, cook on pan till fluffy."
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
  }, 3000);
});
