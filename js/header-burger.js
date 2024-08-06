export function initializeBurgerMenu() {
    const menuBtn = document.querySelector('.menu__button');
    const menu = document.querySelector('.header__nav');

    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            const isActive = menu.classList.contains('active');
            menuBtn.classList.toggle('active', !isActive);
            menu.classList.toggle('active', !isActive);
            menuBtn.setAttribute('aria-expanded', !isActive);
        });
    }
}