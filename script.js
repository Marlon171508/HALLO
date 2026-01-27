let cartCount = 0;

const cartCounter = document.getElementById("cart-count");
const buyButtons = document.querySelectorAll(".buy-btn");
const checkoutButton = document.getElementById("checkout");

buyButtons.forEach(button => {
  button.addEventListener("click", () => {
    cartCount++;
    cartCounter.textContent = cartCount;
  });
});

checkoutButton.addEventListener("click", () => {
  if (cartCount === 0) {
    alert("Dein Warenkorb ist leer. So wie der Sinn dieses Shops.");
  } else {
    alert("Haha! Du dachtest wirklich, du kannst das kaufen? 😄");
  }
});
