const baseUrl = "https://foodista.brathcodestudio.com/wp-json/wp/v2/";
const freshNewsEl = document.querySelector(".freshNews")
let newsData;


function getAmountOfNews(quantity) {
    return fetch(baseUrl + `posts?per_page=` + quantity + `&categories=95`)
        .then((res) => res.json())
        .then((news) => {
            console.log(news)
            newsData = news;
            return (news);
        })
        .catch(err => console.log("Fejl", err));
}

getAmountOfNews(3)


function renderNews(containerToFill, news) {

    containerToFill.innerHTML = "";
    news.forEach(story => {
        containerToFill.innerHTML += `<div class="newNews">
        <img src="${story.acf.image.sizes.medium}" alt="${story.acf.image.alt}">
        <h3>${story.acf.title}</h3>
        </div>
        `
    });
}

renderNews(freshNewsEl, news)