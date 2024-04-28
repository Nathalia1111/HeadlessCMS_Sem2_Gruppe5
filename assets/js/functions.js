const baseUrl = "https://foodista.brathcodestudio.com/wp-json/wp/v2/";
let recipeData;
const selectEl = document.querySelectorAll("select")

function renderAllrecipes(containerToFill, recipes) {

    recipes.sort((a, b) => a.acf.title.localeCompare(b.acf.title));
    containerToFill.innerHTML = "";
    recipes.forEach(recipe => {
        containerToFill.innerHTML += `<div class="recipeForm">
        <img src="${recipe.acf.image.sizes.medium}" alt="${recipe.acf.image.alt}">
        <h3>${recipe.acf.title}</h3>
        </div>
        `
    });
}

function renderNewrecipes(containerToFill, recipes) {

    containerToFill.innerHTML = "";
    recipes.forEach(recipe => {
        containerToFill.innerHTML += `<div class="newRecipe">
        <img src="${recipe.acf.image.sizes.medium}" alt="${recipe.acf.image.alt}">
        <h3>${recipe.acf.title}</h3>
        <p>${recipe.date}</p>
        </div>
        `
    });
}


function getRecipes(quantity) {
    return fetch(baseUrl + `posts?per_page=` + quantity + `&categories=4`)
        .then((res) => res.json())
        .then((recipes) => {
            console.log(recipes)
            recipeData = recipes;
            return (recipes);
        })
        .catch(err => console.log("Fejl", err));
}

