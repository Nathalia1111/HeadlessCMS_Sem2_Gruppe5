const recipeIndexEl = document.querySelector(".recipeIndex")
const thisWeekEl = document.querySelector(".thisWeek")

getRecipes(100)
    .then(recipes => renderAllrecipes(recipeIndexEl, recipes))
    .catch(err => console.error("Fejl under hentning af opskrifter:", err));


getRecipes(5)
    .then(recipes => renderNewrecipes(thisWeekEl, recipes))
    .catch(err => console.error("Fejl under hentning af opskrifter:", err));


