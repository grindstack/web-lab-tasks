let products = [];

// Fetch JSON using ES6 arrow function + async/await
const loadProducts = async () => {
  try {
    const response = await fetch("products.json");
    products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error("Error loading products:", error);
  }
};

// Render products to page
const renderProducts = (items) => {
  const container = document.getElementById("products");
  container.innerHTML = items
    .map(({ name, price, category }) => `
      <div class="product">
        <h3>${name}</h3>
        <p>Price: $${price}</p>
        <p>Category: ${category}</p>
      </div>
    `)
    .join("");
};

// Filtering + sorting combined
const applyFilters = () => {
  const filterVal = document.getElementById("filter").value;
  const sortVal = document.getElementById("sort").value;

  let filtered = [...products];

  if (filterVal !== "all") {
    filtered = filtered.filter(p => p.category === filterVal);
  }

  if (sortVal === "asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortVal === "desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderProducts(filtered);
};

// Event listeners
document.getElementById("filter").addEventListener("change", applyFilters);
document.getElementById("sort").addEventListener("change", applyFilters);

// Initial load
loadProducts();
