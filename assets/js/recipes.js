
const recipeIndexEl = document.querySelector(".recipeIndex")
const thisWeekEl = document.querySelector(".thisWeeks")
const resetFiltersBtn = document.querySelector(".resetFilter");


getAmountOfRecipes(100)
    .then(recipes => renderAllrecipes(recipeIndexEl, recipes))
    .catch(err => console.error("Fejl under hentning af opskrifter:", err));


getAmountOfRecipes(5)
    .then(recipes => renderNewrecipes(thisWeekEl, recipes))
    .catch(err => console.error("Fejl under hentning af opskrifter:", err));


document.addEventListener("DOMContentLoaded", useFilter);

resetFiltersBtn.addEventListener("click", restAllFilters);