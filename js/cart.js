import { books } from './products.js';

const cartKey = 'cart';
const cartElement = document.querySelector('.cart');
const cartToggleButton = document.querySelector('.header__panel-cart');
const cartCloseButton = document.querySelector('.cart__button-close');
const cartProductContainer = document.querySelector('.cart__product-container');
const cartCountElement = document.querySelector('.cart-count');

let cart = loadCartFromLocalStorage();

function toggleCart() {
    cartElement.classList.toggle('cart--hidden');
}

function updateCartCount() {
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalQuantity;
    saveCartToLocalStorage();
    updateCartDisplay();
}

function addToCart(book) {
    const existingBook = cart.find(item => item.id === book.id);
    if (existingBook) {
        existingBook.quantity++;
    } else {
        cart.push({ ...book, quantity: 1 });
    }
    updateCartCount();
    renderCartItems();
}

function removeFromCart(bookId) {
    cart = cart.filter(item => item.id != bookId);
    saveCartToLocalStorage();

    const itemElement = cartProductContainer.querySelector(`.cart__product[data-id="${bookId}"]`);
    if (itemElement) {
        itemElement.remove();
    }
    updateCartCount();
    renderCartItems();
}

function renderCartItems() {
    cartProductContainer.innerHTML = cart.map(item => `
        <div class="cart__product" data-id="${item.id}">
            <div class="cart__product-image">
                <img src="${item.image}" alt="Product">
            </div>
            <div class="cart__product-name">
                <p>${item.title}</p>
            </div>
            <div class="cart__product-count">
                <input type="number" name="cart__product-count" class="cart__product-count__input" data-id="${item.id}" value="${item.quantity}" min="0">
            </div>
            <div class="cart__product-price">
                <span>${item.priceUAH} грн</span>
            </div>
            <div class="cart__product-delete">
                <button data-id="${item.id}">
                    <img src="img/cart/delete.svg" alt="Delete product from cart">
                </button>
            </div>
        </div>
    `).join('');

    const totalPrice = calculateTotalPrice();
    document.querySelector('.cart__product-title__price').textContent = `${totalPrice} грн`;
    updateCartDisplay();
}

function calculateTotalPrice() {
    return cart.reduce((total, item) => total + (item.priceUAH * item.quantity), 0);
}

function initializeQuantityListeners() {
    document.addEventListener('input', (event) => {
        if (event.target.classList.contains('cart__product-count__input')) {
            const input = event.target;
            const productId = input.dataset.id;
            const newQuantity = parseInt(input.value, 10);

            const product = cart.find(item => item.id == productId);
            if (product) {
                product.quantity = newQuantity;
                if (product.quantity <= 0) {
                    removeFromCart(product.id);
                } else {
                    renderCartItems();
                }
                updateCartCount();
            }
        }
    });
}

function initializeDeleteListeners() {
    cartProductContainer.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-id]');
        if (button) {
            const bookId = button.dataset.id;
            console.log(`Removing book with ID: ${bookId}`)
            removeFromCart(bookId);
        }
    });
}

function saveCartToLocalStorage() {
    localStorage.setItem(cartKey, JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const cartData = localStorage.getItem(cartKey);
    return cartData ? JSON.parse(cartData) : [];
}

function handleOrder() {
    const name = document.getElementById('client-name').value;
    const email = document.getElementById('client-email').value;
    const phone = document.getElementById('client-phone').value;
    const comment = document.getElementById('client-comment').value;

    const orderSummary = cart.map(item => 
        `${item.title} (${item.quantity} шт) - ${item.priceUAH * item.quantity} грн`
    ).join('\n');

    const totalPrice = calculateTotalPrice();
    const message = `
        Замовник: ${name}\n
        Email: ${email}\n
        Телефон: ${phone}\n
        Коментар: ${comment}\n\n
        Замовлення:\n${orderSummary}\n\n
        Загальна сума: ${totalPrice} грн
    `;

    alert(message);

    cart = [];
    updateCartCount();
    renderCartItems();
}

function updateCartDisplay() {
    const productContainer = cartProductContainer;
    const emptyMessage = document.querySelector('.cart__empty');
    const cartBody = document.querySelector('.cart__body');

    const hasItems = productContainer.children.length > 0;

    if (hasItems) {
        emptyMessage.style.display = 'none';
        cartBody.style.display = 'block';
    } else {
        emptyMessage.style.display = 'block';
        cartBody.style.display = 'none';
    }
}

cartToggleButton.addEventListener('click', toggleCart);
cartCloseButton.addEventListener('click', toggleCart);
document.querySelector('.cart__button-order').addEventListener('click', handleOrder);

export function initializeCart() {
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('product__btn')) {
            const bookId = event.target.dataset.id;
            const book = books.find(book => book.id == bookId);
            if (book) {
                addToCart(book);
            }
        }
    });

    initializeQuantityListeners();
    initializeDeleteListeners();
    renderCartItems();
    updateCartCount();
    updateCartDisplay();
}