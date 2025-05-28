const searchInput = document.getElementById('searchInput');
const recipeList = document.getElementById('recipeList');
const randomBtn = document.getElementById('randomBtn');
const loader = document.getElementById('loader');
const randomContainer = document.getElementById('randomRecipeContainer');
const randomName = document.getElementById('randomRecipeName');
const viewRandomBtn = document.getElementById('viewRandomDetailsBtn');
const ingredientFilter = document.getElementById('ingredientFilter');

const recipes = [
  { name: "Spaghetti Carbonara", ingredients: ["Pasta", "Egg", "Cheese", "Bacon"], details: "Ingredients: Pasta, Egg, Cheese, Bacon.\n\nInstructions: Boil pasta, mix with scrambled eggs and cheese, add cooked bacon." },
  { name: "Paneer Butter Masala", ingredients: ["Paneer", "Butter", "Cream", "Tomato"], details: "Ingredients: Paneer, Butter, Cream, Tomato.\n\nInstructions: Cook tomato gravy, add paneer and cream, simmer in butter." },
  { name: "Grilled Cheese Sandwich", ingredients: ["Bread", "Cheese", "Butter"], details: "Ingredients: Bread, Cheese, Butter.\n\nInstructions: Butter bread, place cheese between slices, grill till golden brown." },
  { name: "Veg Biryani", ingredients: ["Rice", "Vegetables", "Spices"], details: "Ingredients: Rice, Vegetables, Spices.\n\nInstructions: Cook rice and vegetables separately, layer with spices, steam together." },
  { name: "Mango Smoothie", ingredients: ["Mango", "Milk"], details: "Ingredients: Mango, Milk.\n\nInstructions: Blend all ingredients till smooth, serve chilled." },
  { name: "Omelette", ingredients: ["Egg", "Milk"], details: "Ingredients: Egg, Milk.\n\nInstructions: Beat eggs with milk, cook on pan till fluffy." },
  { name: "Fried Fish", ingredients: ["Fish", "Spices"], details: "Ingredients: Fish, Spices.\n\nInstructions: Marinate fish in spices, shallow fry until crispy." },
  { name: "Chicken Curry", ingredients: ["Chicken", "Tomato", "Spices"], details: "Ingredients: Chicken, Tomato, Spices.\n\nInstructions: Cook chicken in spicy tomato gravy until tender." }
];

function displayRecipeList(list) {
  recipeList.innerHTML = '';
  if (list.length === 0) {
    recipeList.innerHTML = '<li>No recipes found.</li>';
    return;
  }
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

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = recipes.filter(recipe => recipe.name.toLowerCase().includes(query));
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

function toggleIngredientFilter() {
  ingredientFilter.classList.toggle('hidden');
}

function applyIngredientFilter() {
  const selected = Array.from(ingredientFilter.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
  const matched = recipes.filter(recipe =>
    selected.every(ing => recipe.ingredients.includes(ing))
  );
  displayRecipeList(matched);
}
