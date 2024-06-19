const apiKey = 'e1f0a2204de14a58aeff09d265f11afc'; // Заміни на свій API ключ з News API
const newsUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;


async function getNews() {
    try {
        const response = await fetch(newsUrl);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news: ', error);
    }
}


function displayNews(articles) {
    const newsContainer = document.getElementById('news-list');
    newsContainer.innerHTML = ''; 

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('card');
        articleElement.style.width="18rem";
        articleElement.classList.add("m-3");

        const img = document.createElement('img');
        img.setAttribute("src", article.urlToImage)
        img.classList.add('card-img-top');
        img.style.width="285px";

        const div2 = document.createElement('div');
        div2.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.innerHTML = article.title;

        const description = document.createElement('p');
        description.classList.add('card-text');
        description.innerHTML = article.description;

        const source = document.createElement('a');
        source.setAttribute("href",article.url);
        source.classList.add('btn','btn-primary');
        source.innerHTML = 'Details';



        articleElement.appendChild(title);
        articleElement.appendChild(img);
        articleElement.appendChild(description);
        articleElement.appendChild(source);


        newsContainer.appendChild(articleElement);
    });
}


getNews();