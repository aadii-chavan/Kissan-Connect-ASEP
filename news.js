// news.js

document.addEventListener("DOMContentLoaded", () => {
    // Get API key from environment variable
    const apiKey = "2fd3f49de3cb41e2944c55fc8d42e04a";
    const apiUrl = `https://newsapi.org/v2/everything?q=agriculture%20India&apiKey=${apiKey}`;
    const newsContainer = document.getElementById('news-container');
    const loadingMoreEl = document.getElementById('loading-more');
    let articles = [];
    let articlesToShow = 6;
    let articlesIndex = 0;
    let loading = false;
    let observer = null;

    function fetchNews() {
        if (loadingMoreEl) loadingMoreEl.style.display = 'block';
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                articles = Array.isArray(data.articles) ? data.articles : [];
                // Initial render
                displayNews();
                // Setup observer for infinite scroll if more articles available
                setupInfiniteScroll();
            })
            .catch(error => {
                console.error('Error fetching news:', error);
                if (loadingMoreEl) {
                    loadingMoreEl.textContent = 'Failed to load news.';
                    loadingMoreEl.style.display = 'block';
                }
            });
    }

    function displayNews() {
        if (loading) return;
        loading = true;
        if (loadingMoreEl) loadingMoreEl.style.display = 'block';

        const slicedArticles = articles.slice(articlesIndex, articlesIndex + articlesToShow);
        slicedArticles.forEach(article => {
            const newsItem = document.createElement('div');
            newsItem.classList.add('news-box');

            newsItem.innerHTML = `
                <div class="image">
                    <img src="${article.urlToImage || './images1/widget/portfolio-1.jpg'}" alt="" class="lazyload">
                </div>
                <div class="content">
                    <a href="${article.url}" target="_blank" class="title">${article.title}</a>
                    <p class="text">${article.description || 'Description not available.'}</p>
                    <a href="${article.url}" target="_blank" class="tf-btn-read">Read More</a>
                </div>
            `;

            newsContainer.appendChild(newsItem);
        });

        articlesIndex += articlesToShow;
        loading = false;

        // If done, stop observing and hide loader
        if (articlesIndex >= articles.length) {
            if (observer && loadingMoreEl) observer.unobserve(loadingMoreEl);
            if (loadingMoreEl) loadingMoreEl.style.display = 'none';
        } else {
            if (loadingMoreEl) loadingMoreEl.style.display = 'block';
        }
    }

    function setupInfiniteScroll() {
        if (!loadingMoreEl) return;
        if (observer) {
            try { observer.disconnect(); } catch (e) {}
        }
        observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !loading && articlesIndex < articles.length) {
                displayNews();
            }
        }, { root: null, rootMargin: '0px', threshold: 0.1 });
        observer.observe(loadingMoreEl);
    }

    fetchNews();
});
