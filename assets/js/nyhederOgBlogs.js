getAmountOfNews(4, 95)
    .then(news => renderNews(freshNewsEl, news))
    .catch(err => console.error("Fejl under hentning af opskrifter:", err));

getAmountOfNews(3, 107)
    .then(news => renderPosts(freshPostsEl, news))
    .catch(err => console.error("Fejl under hentning af opskrifter:", err));