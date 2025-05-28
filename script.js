const searchInput = document.getElementById('searchInput');
const recipeList = document.getElementById('recipeList');
const randomBtn = document.getElementById('randomBtn');
const loader = document.getElementById('loader');
const randomContainer = document.getElementById('randomRecipeContainer');
const randomName = document.getElementById('randomRecipeName');
const viewRandomBtn = document.getElementById('viewRandomDetailsBtn');
const toggleIngredientsBtn = document.getElementById('toggleIngredientsBtn');
const ingredientFilter = document.getElementById('ingredientFilter');
const applyIngredientFilter = document.getElementById('applyIngredientFilter');
const noResults = document.getElementById('noResults');

const recipes = [
  { name: "Spaghetti Carbonara", ingredients: ["Pasta", "Egg"], details: "Boil pasta, mix with egg sauce." },
  { name: "Paneer Butter Masala", ingredients: ["Paneer", "Tomato"], details: "Cook tomato gravy, add paneer." },
  { name: "Grilled Cheese Sandwich", ingredients: ["Bread", "Cheese"], details: "Grill cheese in bread." },
  { name: "Veg Biryani", ingredients: ["Rice", "Tomato"], details: "Layer rice and veggies." },
  { name: "Mango Smoothie", ingredients: ["Mango", "Milk"], details: "Blend mango and milk." },
  { name: "Omelette", ingredients: ["Egg", "Milk"], details: "Beat and cook egg with milk." },
  { name: "Fish Curry", ingredients: ["Fish", "Tomato"], details: "Cook fish in curry." },
  { name: "Chicken Tikka", ingredients: ["Chicken"], details: "Grill marinated chicken." }
];

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = recipes.filter(recipe => recipe.name.toLowerCase().includes(query));
  displayRecipeList(filtered);
});

function displayRecipeList(list) {
  recipeList.innerHTML = '';
  noResults.classList.add('hidden');
  if (list.length === 0) {
    noResults.classList.remove('hidden');
  } else {
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
}

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
  }, 2000);
});

toggleIngredientsBtn.addEventListener('click', () => {
  ingredientFilter.classList.toggle('hidden');
});

applyIngredientFilter.addEventListener('click', () => {
  const selected = [...ingredientFilter.querySelectorAll('input:checked')].map(i => i.value);
  const filtered = recipes.filter(recipe =>
    selected.every(ing => recipe.ingredients.includes(ing))
  );
  displayRecipeList(filtered);
});
