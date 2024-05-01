const mealPlanEls = document.querySelectorAll(".weekMealPlan");
const freshNewsEl = document.querySelector(".freshNews");
const thisWeekEl = document.querySelector(".thisWeeks")


getAmountOfRecipes(5)
    .then(recipes => renderNewrecipes(thisWeekEl, recipes))
    .catch(err => console.error("Fejl under hentning af opskrifter:", err));

getRecipeById(65);


getAmountOfNews(4, 95)
    .then(news => renderNews(freshNewsEl, news))
    .catch(err => console.error("Fejl under hentning af artikler:", err));

