const products = document.querySelectorAll(".product");
const modal = document.getElementById("product-modal");
const closeModal = document.getElementById("close-modal");

const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalPrice = document.getElementById("modal-price");

const addToCartBtn = document.getElementById("add-to-cart");
const cartCountEl = document.getElementById("cart-count");

let cartCount = 0;

products.forEach(product => {
  product.addEventListener("click", () => {
    modalImg.src = product.dataset.img;
    modalTitle.textContent = product.dataset.name;
    modalDesc.textContent = product.dataset.desc;
    modalPrice.textContent = product.dataset.price + " €";

    modal.style.display = "block";
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

addToCartBtn.addEventListener("click", () => {
  cartCount++;
  cartCountEl.textContent = cartCount;
  alert("Antifeuerlöscher wurde dem Warenkorb hinzugefügt 🔥");
});
