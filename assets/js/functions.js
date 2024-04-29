const baseUrl = "https://foodista.brathcodestudio.com/wp-json/wp/v2/";
const freshNewsEl = document.querySelector(".freshNews");
const freshPostsEl = document.querySelector(".freshPosts");
let newsData;


function getAmountOfNews(quantity, categoryId) {
    return fetch(baseUrl + `posts?per_page=` + quantity + `&categories=` + categoryId)
        .then((res) => res.json())
        .then((news) => {
            console.log(news)
            newsData = news;
            return (news);
        })
        .catch(err => console.log("Fejl", err));
}



function renderNews(containerToFill, news) {

    containerToFill.innerHTML = "";
    news.forEach(story => {
        containerToFill.innerHTML += `<div class="newNews">
        <img src="${story.acf.image.sizes.large}" alt="${story.acf.image.alt}">
        <h3>${story.acf.titel}</h3>
        </div>
        `
    });
}

getAmountOfNews(3, 95)
    .then(news => renderNews(freshNewsEl, news))
    .catch(err => console.error("Fejl under hentning af opskrifter:", err));



function renderPosts(containerToFill, news) {

    containerToFill.innerHTML = "";
    news.forEach(story => {
        containerToFill.innerHTML += `<div class="newPosts">
            <img src="${story.acf.image_1.sizes.large}" alt="${story.acf.image_1.alt}">
            <h3>${story.acf.title}</h3>
            </div>
            `
    });
}



getAmountOfNews(3, 107)
    .then(news => renderPosts(freshPostsEl, news))
    .catch(err => console.error("Fejl under hentning af opskrifter:", err));