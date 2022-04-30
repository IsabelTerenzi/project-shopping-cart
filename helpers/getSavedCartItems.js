const getSavedCartItems = () => {
  const cartItems = document.querySelector('.cart__items');
  const items = localStorage.getItem('cartItems');
  cartItems.innerHTML = items;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
