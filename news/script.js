const apiKey = 'e1f0a2204de14a58aeff09d265f11afc';

let page = 1;
let page_size = 8;
let max_page = 0;

const getURL = () => {
    let newsUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&page=${page}&pageSize=${page_size}`;
    return newsUrl;
};

async function getNews() {
    try {
        const response = await fetch(getURL());
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching news: ', error);
        return [];
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('news-list');
    newsContainer.innerHTML = '';

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('card', 'm-3');
        articleElement.style.width = "18rem";

        if (article.urlToImage) {
            const img = document.createElement('img');
            img.setAttribute("src", article.urlToImage);
            img.classList.add('card-img-top');
            img.style.width = "285px";
            articleElement.appendChild(img);
        }

        const div2 = document.createElement('div');
        div2.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.innerHTML = article.title;

        const description = document.createElement('p');
        description.classList.add('card-text');
        description.innerHTML = article.description;

        const source = document.createElement('a');
        source.setAttribute("href", article.url);
        source.classList.add('btn', 'btn-primary');
        source.innerHTML = 'Details';

        div2.appendChild(title);
        div2.appendChild(description);
        div2.appendChild(source);
        articleElement.appendChild(div2);

        newsContainer.appendChild(articleElement);
    });

    updatePagination(); 
}

window.onload = async () => {
    let result = await getNews();
    max_page = Math.ceil(result.totalResults / page_size);
    checkButtons();
    displayNews(result.articles);
};

const updateNews = async () => {
    const newsContainer = document.getElementById('news-list');
    newsContainer.innerHTML = '';
    const data = await getNews();
    displayNews(data.articles);
};

const nextPage = () => {
    if (page < max_page) {
        page++;
        updateNews();
    }
    checkButtons();
};

const prevPage = () => {
    if (page > 1) {
        page--;
        updateNews();
    }
    checkButtons();
};

const checkButtons = () => {
    const prevButton = document.getElementById("btnPrev");
    const nextButton = document.getElementById("btnNext");
    prevButton.disabled = (page === 1);
    nextButton.disabled = (page >= max_page);
};

const updatePagination = () => {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const prevButton = document.createElement('li');
    prevButton.classList.add('page-item');
    prevButton.innerHTML = `
        <a id="btnPrev" class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
        </a>`;
    prevButton.addEventListener('click', prevPage);

    pagination.appendChild(prevButton);

    for (let i = 1; i <= max_page; i++) {
        const pageButton = document.createElement('li');
        pageButton.classList.add('page-item');
        pageButton.innerHTML = `
            <a id="page${i}" class="page-link" href="#">${i}</a>`;
        if (i === page) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            page = i;
            updateNews();
        });
        pagination.appendChild(pageButton);
    }

    const nextButton = document.createElement('li');
    nextButton.classList.add('page-item');
    nextButton.innerHTML = `
        <a id="btnNext" class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </a>`;
    nextButton.addEventListener('click', nextPage);

    pagination.appendChild(nextButton);

    checkButtons(); 
};

