import { addBook } from './products.js';

document.getElementById('add__book-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const imageFile = formData.get('image');
    const imageURL = imageFile ? URL.createObjectURL(imageFile) : '';

    const newBook = {
        id: Date.now(),
        title: formData.get('title'),
        author: formData.get('author'),
        priceUAH: formData.get('priceUAH'),
        image: imageURL
    };

    addBook(newBook);

    this.reset();
});