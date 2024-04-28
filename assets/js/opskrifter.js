const recipeIndexEl = document.querySelector(".recipeIndex")
const thisWeekEl = document.querySelector(".thisWeek")

getRecipes(100)
    .then(recipes => renderAllrecipes(recipeIndexEl, recipes))
    .catch(err => console.error("Fejl under hentning af opskrifter:", err));


getRecipes(5)
    .then(recipes => renderNewrecipes(thisWeekEl, recipes))
    .catch(err => console.error("Fejl under hentning af opskrifter:", err));




document.addEventListener("DOMContentLoaded", function () {
    const filterBtn = document.querySelector(".filterBtn");
    const filtersSectionEl = document.querySelector(".filters");
    const searchFilterBtn = document.querySelector(".searchFilter");
    const cookingTimeSelect = document.querySelector("#cookingTime"); // Hent cooking time select elementet
    const cookingMethodSelect = document.querySelector("#cookingMethod");
    const cuisinesSelect = document.querySelector("#cuisines");

    filterBtn.addEventListener("click", function () {
        filtersSectionEl.classList.toggle("show");
        searchFilterBtn.classList.toggle("searchFilterShow");
    });

    searchFilterBtn.addEventListener("click", function () {
        const selectedCookingTime = cookingTimeSelect.value; // Hent den valgte cooking time
        const selectedCookingMethod = cookingMethodSelect.value; // Hent den valgte cooking method
        const selectedCuisine = cuisinesSelect.value; // Hent den valgte cooking method


        // Filtrer opskrifter baseret på den valgte cooking time
        let filteredRecipes = recipeData;
        if (selectedCookingTime !== "default") {
            filteredRecipes = filteredRecipes.filter(recipe =>
                recipe.acf.cooking_time.name === selectedCookingTime
            );
        }

        // Filtrer opskrifter baseret på den valgte cooking method
        if (selectedCookingMethod !== "default") {
            filteredRecipes = filteredRecipes.filter(recipe =>
                recipe.acf.cooking_method.some(method => method.name === selectedCookingMethod)
            );
        }

        if (selectedCuisine !== "default") {
            filteredRecipes = filteredRecipes.filter(recipe =>
                recipe.acf.cuisine.name === selectedCuisine
            );
        }

        // Opdater opskriftslisten med de filtrerede opskrifter
        renderAllrecipes(recipeIndexEl, filteredRecipes);
    });
});