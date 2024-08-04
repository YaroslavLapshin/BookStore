export const blogItemsData = [
    {
        id: 1,
        description: 'Приєднуйтесь до нашого літнього книжкового фестивалю, де зможете познайомитись з улюбленими авторами та отримати автографи на свої улюблені книги.',
        image: 'img/blog/blog-img1.png',
    },
    {
        id: 2,
        description: 'Дізнайтеся про найцікавіші книги, які вийдуть цього місяця. Від нових романів до довгоочікуваних продовжень улюблених серій — не пропустіть жодної новинки!',
        image: 'img/blog/blog-img2.png',
    },
    {
        id: 3,
        description: 'Наша ексклюзивна інтерв\`ю з Джейн Сміт, авторкою нової бестселерної книги. Вона розповідає про натхнення, процес написання та плани на майбутнє.',
        image: 'img/blog/blog-img3.png',
    },
    {
        id: 4,
        description: 'Шукачі ідеальних подарунків можуть знайти натхнення у нашому списку книг, які варто подарувати близьким цього року. Від класики до сучасної літератури — у нас є щось для кожного.',
        image: 'img/blog/blog-img4.png',
    }
];

export function renderBlogItems(blogItems) {
    let blogItemHtml = '';
    for (const blogItem of blogItems) {
        blogItemHtml += `<div class="blog__item">
                <a href="" class="blog__item-img">
                  <img src="${blogItem.image}" alt="${blogItem.description}" />
                </a>
                <div class="blog__item-text">
                  <p>${blogItem.description}</p>
                </div>
              </div>`;
    }
    const blogItemsContainer = document.querySelector('.blog__items');
    if (blogItemsContainer) {
        blogItemsContainer.innerHTML = blogItemHtml;
    }
}