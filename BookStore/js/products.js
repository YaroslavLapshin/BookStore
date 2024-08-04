//products.js

let booksPerPage = 12;
let currentPage = 1;
export let books = [];
let totalPages = 0;

export async function fetchBooks() {
    try {
        const response = await fetch('api/books.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const initialBooks = await response.json();
        const storedBooks = localStorage.getItem('books');

        books = storedBooks ? JSON.parse(storedBooks) : initialBooks;
        totalPages = Math.ceil(books.length / booksPerPage);
        return books;
    } catch (error) {
        console.error('Failed to fetch books:', error);
        return [];
    }
}

export function createBookCard(book) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('products__item');

    bookCard.innerHTML = `
        <div class="product__img">
            <img src="${book.image}" alt="Book" />
        </div>
        <div class="product__name">${book.title}</div>
        <div class="product__author">${book.author}</div>
        <div class="product__buy">
            <div class="product__price">${book.priceUAH} грн</div>
            <button class="product__btn" data-id="${book.id}">Додати в корзину</button>
        </div>
    `;

    return bookCard;
}

export function displayBooks() {
    const productsContainer = document.querySelector('.products__items');
    productsContainer.innerHTML = '';

    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = Math.min(startIndex + booksPerPage, books.length);
    const booksToDisplay = books.slice(startIndex, endIndex);

    booksToDisplay.forEach(book => {
        const bookCard = createBookCard(book);
        productsContainer.appendChild(bookCard);
    });

    updatePaginationControls();
}

function updatePaginationControls() {
    const prevButton = document.querySelector('.products__pagination-prev');
    const nextButton = document.querySelector('.products__pagination-next');
    const pageInfo = document.querySelector('.products__pagination-page-info');

    if (prevButton && nextButton && pageInfo) {
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
        pageInfo.textContent = `Сторінка ${currentPage} з ${totalPages}`;
    }
}

function scrollToHeader() {
    const header = document.querySelector('.products__header');
    if (header) {
        header.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function initializePagination() {
    const prevButton = document.querySelector('.products__pagination-prev');
    const nextButton = document.querySelector('.products__pagination-next');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayBooks();
                scrollToHeader();
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayBooks();
                scrollToHeader();
            }
        });
    }
}

export async function initializeProducts() {
    await fetchBooks();
    displayBooks();
    initializePagination();
}

export function addBook(book) {
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    totalPages = Math.ceil(books.length / booksPerPage);
    displayBooks();
    console.log('Книгу додано', book);
}