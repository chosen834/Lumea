const productGrid = document.querySelector('.product-grid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

// Function to create product card with bounce effect
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:-translate-y-2 hover-bounce';
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
    <div class="p-4">
      <h4 class="text-lg font-semibold text-gray-800">${product.name}</h4>
      <p class="text-gray-600 mt-2">${product.price}</p>
      <p class="text-gray-500 mt-1 text-sm">${product.description || ''}</p>
    </div>
  `;
  return card;
}

// Load products from JSON (converted from CMS .yml)
async function loadProducts() {
  try {
    const response = await fetch('data/products.json');
    if (!response.ok) throw new Error('Failed to fetch products.json');

    const products = await response.json();

    function render(productsList) {
      productGrid.innerHTML = '';
      productsList.forEach(product => productGrid.appendChild(createProductCard(product)));
    }

    render(products);

    // Filter & search functionality
    function filterProducts() {
      const searchText = searchInput.value.toLowerCase();
      const category = categoryFilter.value;
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchText) &&
        (category === '' || p.category === category)
      );
      render(filtered);
    }

    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);

  } catch (error) {
    console.error('Error loading products:', error);
    productGrid.innerHTML = '<p class="text-center text-red-500 col-span-full">No products available at the moment.</p>';
  }
}

// Initialize
loadProducts();