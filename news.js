// news.js

document.addEventListener("DOMContentLoaded", () => {
    // Get API key from environment variable
    const apiKey = process.env.NEWS_API_KEY || "2fd3f49de3cb41e2944c55fc8d42e04a";
    const apiUrl = `https://newsapi.org/v2/everything?q=agriculture%20India&apiKey=${apiKey}`;
    const newsContainer = document.getElementById('news-container');
    let articles = [];
    let articlesToShow = 6;
    let articlesIndex = 0;
    let loading = false;

    function fetchNews() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                articles = data.articles;
                displayNews();
            })
            .catch(error => {
                console.error('Error fetching news:', error);
            });
    }

    function displayNews() {
        if (loading) return;
        loading = true;

        const slicedArticles = articles.slice(articlesIndex, articlesIndex + articlesToShow);
        slicedArticles.forEach(article => {
            const newsItem = document.createElement('div');
            newsItem.classList.add('box-infor', 'ic-hover', 'img-hover', 'style-1');

            newsItem.innerHTML = `
                <div class="image hover-item">
                    <img src="${article.urlToImage || './images/widget/portfolio-1.jpg'}" alt="" class="lazyload">
                </div>
                <div class="content">
                    <a href="${article.url}" target="_blank" class="title fs-23 fw-6 font-worksans hover-text-4">${article.title}</a>
                    <p class="text font-nunito">${article.description || 'Description not available.'}</p>
                    <a href="${article.url}" target="_blank" class="tf-btn-read hover-text-4">Read More</a>
                </div>
            `;

            newsContainer.appendChild(newsItem);
        });

        articlesIndex += articlesToShow;
        loading = false;
        if (articlesIndex >= articles.length) {
            window.removeEventListener('scroll', handleScroll);
        }
    }

    function handleScroll() {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            displayNews();
        }
    }

    window.addEventListener('scroll', handleScroll);

    fetchNews();
});
