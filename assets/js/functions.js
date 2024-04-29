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
        <a href="#"><img src="${story.acf.image.sizes.large}" alt="${story.acf.image.alt}"><p>${story.acf.titel}</p></a>
        </div>
        `
    });
}

function renderPosts(containerToFill, news) {

    containerToFill.innerHTML = "";
    news.forEach(story => {
        containerToFill.innerHTML += `<div class="newPosts">
            <a href="#"><img src="${story.acf.image_1.sizes.large}" alt="${story.acf.image_1.alt}"><p>${story.acf.title}</p></a>
            </div>
            `
    });
}

