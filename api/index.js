const containerDisplay = document.getElementById('container');

const cardComponent = (title, description, images, price) => {
  const imageSrc = Array.isArray(images) ? images[0] : images;

  const data = `
<div class="col-md-3 col-sm-6">
  <div class="product-box h-100 d-flex flex-column">
    <div class="product-imitation">
      <img src="${imageSrc}" alt="gambar product">
    </div>
    <div class="product-desc mt-auto">
      <span class="product-price">$${price}</span>
      <small class="text-muted d-block mb-1">Category</small>
      <a href="#" class="product-name">${title}</a>
      <p class="small text-muted">${description.slice(0, 60)}...</p>
      <div class="text-end mt-2">
        <button type="button" class="btn btn-sm" style="background-color: var(--accent); color: var(--white); border-radius: 50px; transition: 0.3s;">
          Info
        </button>
      </div>
    </div>
  </div>
</div>
  `;
  containerDisplay.insertAdjacentHTML('beforeend', data);
};

const alertComponent = (message) => {
  const data = `
    <div class="alert alert-danger text-center" role="alert">
      <strong>Terjadi Kesalahan:</strong> ${message}
    </div>
  `;
  containerDisplay.insertAdjacentHTML('afterbegin', data);
};

const fetchAllProducts = () => {
  return fetch("https://dummyjson.com/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

function render() {
  fetchAllProducts()
    .then((response) => {
      if (response.products) {
        response.products.forEach(result => {
          cardComponent(result.title, result.description, result.images, result.price);
        });
      } else {
        alertComponent("Data produk tidak ditemukan.");
      }
    })
    .catch((error) => {
      alertComponent(error.message);
    });
}

render();
