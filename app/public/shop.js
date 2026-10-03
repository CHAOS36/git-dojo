// Fonctions partagées par toutes les pages de la boutique.
// "Qui est connecté" (la session) et le panier sont gardés dans le localStorage :
// une petite mémoire que le navigateur garde pour chaque site.
const Shop = {
  getSession() {
    return JSON.parse(localStorage.getItem('session') || 'null');
  },
  setSession(session) {
    localStorage.setItem('session', JSON.stringify(session));
  },
  requireLogin() {
    if (!Shop.getSession()) location.replace('/');
  },
  logout() {
    localStorage.removeItem('session');
    localStorage.removeItem('cart');
    location.href = '/';
  },
  getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  },
  saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    Shop.renderHeader();
  },
  isInCart(id) {
    return Shop.getCart().some((item) => item.id === id);
  },
  addToCart(product) {
    if (!Shop.isInCart(product.id)) Shop.saveCart([...Shop.getCart(), product]);
  },
  removeFromCart(id) {
    Shop.saveCart(Shop.getCart().filter((item) => item.id !== id));
  },
  cartTotal() {
    return Shop.getCart().reduce((sum, item) => sum + item.price, 0);
  },
  formatPrice(amount) {
    return '$' + amount.toFixed(2);
  },
  renderHeader() {
    const badge = document.querySelector('[data-testid="cart-badge"]');
    if (badge) {
      const count = Shop.getCart().length;
      badge.textContent = String(count);
      badge.hidden = count === 0;
    }
    const logout = document.getElementById('logout');
    if (logout) logout.onclick = Shop.logout;
  },
};
