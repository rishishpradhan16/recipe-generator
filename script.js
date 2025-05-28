const recipes = [
  { name: "Omelette", ingredients: ["Egg", "Milk"] },
  { name: "Mango Smoothie", ingredients: ["Milk", "Mango"] },
  { name: "Grilled Cheese Sandwich", ingredients: ["Bread", "Cheese", "Butter"] },
  { name: "Chicken Curry", ingredients: ["Chicken", "Tomato", "Cream"] },
  { name: "Fish Fry", ingredients: ["Fish"] },
  { name: "Veg Pulao", ingredients: ["Rice", "Vegetables"] },
  { name: "Paneer Butter Masala", ingredients: ["Paneer", "Butter", "Tomato", "Cream"] },
  { name: "Bacon Pasta", ingredients: ["Pasta", "Bacon", "Cream"] },
  { name: "Spaghetti", ingredients: ["Pasta", "Tomato", "Cheese"] }
];

function renderRecipes(list) {
  const ul = document.getElementById("recipeList");
  ul.innerHTML = "";

  if (list.length === 0) {
    ul.innerHTML = "<li>No recipes found.</li>";
    return;
  }

  list.forEach(recipe => {
    const li = document.createElement("li");
    li.textContent = recipe.name;
    ul.appendChild(li);
  });
}

function filterRecipes(keyword) {
  const filtered = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(keyword.toLowerCase())
  );
  renderRecipes(filtered);
}

document.getElementById("searchInput").addEventListener("input", (e) => {
  filterRecipes(e.target.value);
});

function toggleIngredientFilter() {
  const filter = document.getElementById("ingredientFilter");
  filter.classList.toggle("hidden");
}

function applyIngredientFilter() {
  const checkboxes = document.querySelectorAll('#ingredientFilter input[type="checkbox"]:checked');
  const selected = Array.from(checkboxes).map(cb => cb.value);

  const filtered = recipes.filter(recipe =>
    selected.every(ingredient => recipe.ingredients.includes(ingredient))
  );

  renderRecipes(filtered);
}

document.getElementById("randomBtn").addEventListener("click", () => {
  const loader = document.getElementById("loader");
  const container = document.getElementById("randomRecipeContainer");
  const name = document.getElementById("randomRecipeName");
  const btn = document.getElementById("viewRandomDetailsBtn");

  loader.classList.remove("hidden");
  container.classList.add("hidden");

  setTimeout(() => {
    loader.classList.add("hidden");
    const recipe = recipes[Math.floor(Math.random() * recipes.length)];
    name.textContent = recipe.name;
    container.classList.remove("hidden");

    btn.onclick = () => {
      window.location.href = `recipe.html?name=${encodeURIComponent(recipe.name)}`;
    };
  }, 1000);
});
