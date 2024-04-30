const baseUrl1 = "https://foodista.brathcodestudio.com/wp-json/wp/v2/";
const recipeUrl = "https://foodista.brathcodestudio.com/wp-json/wp/v2/posts/";
let recipeData;

function renderAllrecipes(containerToFill, recipes) {

    recipes.sort((a, b) => a.acf.title.localeCompare(b.acf.title));
    containerToFill.innerHTML = "";
    recipes.forEach(recipe => {
        containerToFill.innerHTML += `<div class="recipeForm">
        <a href="opskrift.html?id=${recipe.id}"><img src="${recipe.acf.image.sizes.large}" alt="${recipe.acf.image.alt}"> <p>${recipe.acf.title}</p></a>
        </div>
        `
    });
}

function renderNewrecipes(containerToFill, recipes) {

    containerToFill.innerHTML = "";
    recipes.forEach(recipe => {
        containerToFill.innerHTML += `<div class="newRecipe">
        <a href="#"><img src="${recipe.acf.image.sizes.medium}" alt="${recipe.acf.image.alt}"><p>${recipe.acf.title}</p></a>
        </div>
        `
    });
}

function getAmountOfRecipes(quantity) {
    return fetch(baseUrl1 + `posts?per_page=` + quantity + `&categories=4`)
        .then((res) => res.json())
        .then((recipes) => {
            console.log(recipes)
            recipeData = recipes;
            return (recipes);
        })
        .catch(err => console.log("Fejl", err));
}

function useFilter() {
    // Fanger forskellige elementer i mit html. 
    const filterBtn = document.querySelector(".filterBtn");
    const resetBtn = document.querySelector(".resetFilter");
    const filtersSectionEl = document.querySelector(".filters");
    const searchFilterBtn = document.querySelector(".searchFilter");
    const cookingTimeSelect = document.querySelector("#cookingTime");
    const cookingMethodSelect = document.querySelector("#cookingMethod");
    const cuisinesSelect = document.querySelector("#cuisines");
    const dietSelect = document.querySelector("#diet");
    const holidaySelect = document.querySelector("#holidays");
    const nutritionSelect = document.querySelector("#nutritionalFocus");
    const timeSelect = document.querySelector("#timeOfYear");
    const courseSelect = document.querySelector("#dinnerCourse");
    const mealSelect = document.querySelector("#typeOfMeal");

    // Sørger for at gemmme og vise vores filtrering og knapper efter om vi trykker på filter knappen. Det sker ved at tilføje eller fjerne en klasse.
    filterBtn.addEventListener("click", function () {
        filtersSectionEl.classList.toggle("show");
        searchFilterBtn.classList.toggle("searchFilterShow");
        resetBtn.classList.toggle("resetFilterShow");

    });

    // Lytter efter klik på vores søg knap
    searchFilterBtn.addEventListener("click", function () {
        // Henter de valgte værdier og gemmer dem i en variabel
        const selectedCookingTime = cookingTimeSelect.value;
        const selectedCookingMethod = cookingMethodSelect.value;
        const selectedCuisine = cuisinesSelect.value;
        const selectedDiet = dietSelect.value;
        const selectedHoliday = holidaySelect.value;
        const selectedNutrition = nutritionSelect.value;
        const selectedTime = timeSelect.value;
        const selectedCourse = courseSelect.value;
        const selectedMeal = mealSelect.value;
        let filteredRecipes = recipeData;

        // Filtrer opskrifter baseret på den valgte cooking time hvis ikke den står på default.
        if (selectedCookingTime !== "default") {
            // Undersøger om der er noget match imellem name i cooking_time dataen og den værdi som brugeren har valgt. og sætter filteredRecipes til at indeholde dette. 
            filteredRecipes = filteredRecipes.filter(recipe =>
                recipe.acf.cooking_time.name === selectedCookingTime
            );
        }

        if (selectedCookingMethod !== "default") {
            filteredRecipes = filteredRecipes.filter(recipe =>
                // Some anvendes til at søge igennem vores array i cooking_method. Der ledes efter om noget matcher vores selectedCookingMethod. Den leder efter deenne bestemte værdi og returnere en true statement. Den stopper med at lede ligeså snart den finder et match. 
                recipe.acf.cooking_method.some(method => method.name === selectedCookingMethod)
            );
        }


        if (selectedCuisine !== "default") {
            filteredRecipes = filteredRecipes.filter(recipe =>
                recipe.acf.cuisine.name === selectedCuisine
            );
        }

        // Filtrer opskrifter baseret på den valgte diet hvis ikke den står på default. 
        if (selectedDiet !== "default") {
            filteredRecipes = filteredRecipes.filter(recipe => {
                // Kontrollere først, om recipe.acf.diet_preferences er et array hvis dette er tilfældes så skal der anvendes some(). Some anvendes til at søge igennem vores array i cooking_method. Der ledes efter om noget matcher vores selectedCookingMethod. Den leder efter deenne bestemte værdi og returnere en true statement. Den stopper med at lede ligeså snart den finder et match. 
                if (Array.isArray(recipe.acf.diet_preferences)) {
                    return recipe.acf.diet_preferences.some(preference => preference.name === selectedDiet);
                } else {
                    // Hvis det ikke er et array, da kontroller om det enkelte objekt matcher den valgte diet
                    return recipe.acf.diet_preferences.name === selectedDiet;
                }
            });
        }

        if (selectedHoliday !== "default") {
            filteredRecipes = filteredRecipes.filter(recipe => {
                if (Array.isArray(recipe.acf.holiday)) {
                    return recipe.acf.holiday.some(holiday => holiday.name === selectedHoliday);
                } else {
                    return recipe.acf.holiday.name === selectedHoliday;
                }
            });
        }

        if (selectedHoliday !== "default") {
            filteredRecipes = filteredRecipes.filter(recipe => {
                if (Array.isArray(recipe.acf.holiday)) {
                    return recipe.acf.holiday.some(holiday => holiday.name === selectedHoliday);
                } else {
                    return recipe.acf.holiday.name === selectedHoliday;
                }
            });
        }

        if (selectedNutrition !== "default") {
            filteredRecipes = filteredRecipes.filter(recipe => {
                if (Array.isArray(recipe.acf.nutritional_focus)) {
                    return recipe.acf.nutritional_focus.some(nutrition => nutrition.name === selectedNutrition);
                } else {
                    return recipe.acf.nutritional_focus.name === selectedNutrition;
                }
            });
        }

        if (selectedTime !== "default") {
            filteredRecipes = filteredRecipes.filter(recipe => {
                if (Array.isArray(recipe.acf.time_of_year)) {
                    return recipe.acf.time_of_year.some(time => time.name === selectedTime);
                } else {
                    return recipe.acf.time_of_year.name === selectedTime;
                }
            });
        }


        if (selectedCourse !== "default") {
            filteredRecipes = filteredRecipes.filter(recipe => {
                if (Array.isArray(recipe.acf.type_of_dinner_course)) {
                    return recipe.acf.type_of_dinner_course.some(course => course.name === selectedCourse);
                } else {
                    return recipe.acf.type_of_dinner_course.name === selectedCourse;
                }
            });
        }


        if (selectedMeal !== "default") {
            filteredRecipes = filteredRecipes.filter(recipe => {
                if (Array.isArray(recipe.acf.type_of_meal)) {
                    return recipe.acf.type_of_meal.some(meal => meal.name === selectedMeal);
                } else {
                    return recipe.acf.type_of_meal.name === selectedMeal;
                }
            });
        }

        // Hvis vi ikke får nogle svar tilbage ud fra vores filtrering så vil vores array dermed være under 0 i længden. Derfor vil vi skrive en bedsked til brugeren 
        if (filteredRecipes.length > 0) {
            renderAllrecipes(recipeIndexEl, filteredRecipes);
        } else {
            // Hvis der ikke er nogen opskrifter efter filtreringen, tilføj en besked til din DOM
            recipeIndexEl.innerHTML = `<p class = "noFound">Der blev desværre ikke fundet nogle opskrifter der matchede.</p>`;
        }
    })
}

function restAllFilters() {
    // Fanger elementer i min html
    const cookingTimeSelect = document.querySelector("#cookingTime");
    const cookingMethodSelect = document.querySelector("#cookingMethod");
    const cuisinesSelect = document.querySelector("#cuisines");
    const dietSelect = document.querySelector("#diet");
    const holidaySelect = document.querySelector("#holidays");
    const nutritionSelect = document.querySelector("#nutritionalFocus");
    const timeSelect = document.querySelector("#timeOfYear");
    const courseSelect = document.querySelector("#dinnerCourse");
    const mealSelect = document.querySelector("#typeOfMeal");

    // Nulstil værdierne for alle select-elementer til deres standardværdier
    cookingTimeSelect.value = "default";
    cookingMethodSelect.value = "default";
    cuisinesSelect.value = "default";
    dietSelect.value = "default";
    holidaySelect.value = "default";
    nutritionSelect.value = "default";
    timeSelect.value = "default";
    courseSelect.value = "default";
    mealSelect.value = "default";

    // Kalder alle opskrifter frem igen. 
    getAmountOfRecipes(100)
        .then(recipes => renderAllrecipes(recipeIndexEl, recipes))
        .catch(err => console.error("Fejl under hentning af opskrifter:", err));
};

function getOneRecipe() {
    const urlParams = new URLSearchParams(window.location.search);

    const recipeId = urlParams.get('id');
    return fetch(recipeUrl + recipeId)
        .then((res) => res.json())
        .then((recipes) => {
            console.log(recipes)
            recipeData = recipes;
            return (recipes);
        })
        .catch(err => console.log("Fejl", err));
}
