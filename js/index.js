import { initializeBurgerMenu } from "./header-burger.js";
import { initializeSwiper } from "./hero-swiper.js";
import { initializeProducts } from "./products.js";
import { initializeCart } from "./cart.js";
import { blogItemsData, renderBlogItems } from "./blog.js";
import './addbook.js';

document.addEventListener("DOMContentLoaded", () => {
	initializeBurgerMenu();
	initializeSwiper();
	initializeProducts();
	initializeCart();
	renderBlogItems(blogItemsData);
});