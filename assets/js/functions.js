const recipeUrl = "https://foodista.brathcodestudio.com/wp-json/wp/v2/posts/";
const baseUrl = "https://foodista.brathcodestudio.com/wp-json/wp/v2/";
let recipeData;
let newsData;

function renderAllrecipes(containerToFill, recipes) {

    recipes.sort((a, b) => a.acf.title.localeCompare(b.acf.title));
    containerToFill.innerHTML = "";
    recipes.forEach(recipe => {
        containerToFill.innerHTML += `<div class="recipeForm">
        <a href="./recipe.html?id=${recipe.id}"><img src="${recipe.acf.image.sizes.large}" alt="${recipe.acf.image.alt}" loading="lazy"> <p>${recipe.acf.title}</p></a>
        </div>
        `
    });
}

function renderNewrecipes(containerToFill, recipes) {

    containerToFill.innerHTML = "";
    recipes.forEach(recipe => {
        containerToFill.innerHTML += `<div class="newRecipe">
        <a href="./recipe.html?id=${recipe.id}"><img src="${recipe.acf.image.sizes.medium}" alt="${recipe.acf.image.alt}" loading="lazy"><p>${recipe.acf.title}</p></a>
        </div>
        `
    });
}

function getAmountOfRecipes(quantity) {
    return fetch(baseUrl + `posts?per_page=` + quantity + `&categories=4`)
        .then((res) => res.json())
        .then((recipes) => {
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

function getAmountOfNews(quantity, categoryId) {
    return fetch(baseUrl + `posts?per_page=` + quantity + `&categories=` + categoryId)
        .then((res) => res.json())
        .then((news) => {
            newsData = news;
            return (news);
        })
        .catch(err => console.log("Fejl", err));
}

function renderNews(containerToFill, news) {

    containerToFill.innerHTML = "";
    news.forEach(story => {
        containerToFill.innerHTML += `<div class="newNews">
        <a href="./article.html?id=${story.id}"><img src="${story.acf.image.sizes.large}" alt="${story.acf.image.alt}" loading="lazy"><p>${story.acf.titel}</p></a>
        </div>
        `
    });
}

function renderPosts(containerToFill, news) {

    containerToFill.innerHTML = "";
    news.forEach(story => {
        containerToFill.innerHTML += `<div class="newPosts">
            <a href="./blogPost.html?id=${story.id}"><img src="${story.acf.image.sizes.large}" alt="${story.acf.image.alt}" loading="lazy"><p>${story.acf.titel}</p></a>
            </div>
            `
    });
}

function getOneRecipeOrNews() {
    const urlParams = new URLSearchParams(window.location.search);

    const recipeId = urlParams.get('id');
    return fetch(recipeUrl + recipeId)
        .then((res) => res.json())
        .then((recipes) => {
            recipeData = recipes;
            return (recipes);
        })
        .catch(err => console.log("Fejl", err));
}

function renderOneArticle(containerToFill, story) {
    let textBox1 = "";
    if (story.acf.textinput) {
        for (const key in story.acf.textinput) {
            const value = story.acf.textinput[key];

            if (value) {

                if (value.small_title) {
                    textBox1 += `<h4>${value.small_title}</h4>`;
                }

                textBox1 += `<p>${value.textbox_1}</p>`;

                if (value.image && value.image.url) {
                    textBox1 += `<img src="${value.image.sizes.large}" alt="${value.image.alt}" loading="lazy"> <br>`;
                }

                textBox1 += `<a href="">${value.textbox_2}</a>`;
            }
        }
    }

    containerToFill.innerHTML = "";
    containerToFill.innerHTML = `
   
    <article class="links">
    <a href="./newsAndBlogs.html">News & Blogs </a>
    <p>&gt;</p>
    <a href="#">${story.acf.titel}</a>
  </article>

  <div class="articleSection">
    <h1 class="articleHeadline">${story.acf.titel}</h1>
    <img src="${story.acf.image.sizes.large}" alt="${story.acf.image.alt}">
    <h2>${story.acf.introduction.chapter_1}</h2>
    <div class="authorsLine">
    <p>${story.acf.author[0].post_title}</p>
    <p>${story.date}</p>
    </div>
    ${textBox1}
  </div>

    `
}

function renderOnerecipe(containerToFill, recipes) {

    let ingredientsList = "";
    if (recipes.acf.ingredients) {
        // Gennemgår hver nøgle (ingrediens) i objektet
        for (const key in recipes.acf.ingredients) {
            const ingredient = recipes.acf.ingredients[key];
            if (ingredient) {
                ingredientsList += `<dd>${ingredient}</dd>`;

            }
            // Opretter en paragraph for hver ingrediens og tilføjer den til ingredientsList

        }
    }

    let methodList = "";
    if (recipes.acf.method) {
        // Gennemgår hver nøgle (ingrediens) i objektet
        for (const key in recipes.acf.method) {
            const instruction = recipes.acf.method[key];
            if (instruction) {
                methodList += `<dd>${instruction}</dd> <br>`;

            }
            // Opretter en paragraph for hver ingrediens og tilføjer den til ingredientsList
        }
    }

    let videoEl = "";
    if (recipes.acf.video) {
        // Gennemgår hver nøgle (ingrediens) i objektet
        for (const key in recipes.acf.video) {
            const value = recipes.acf.video[key];
            if (value) {
                videoEl += `${value}`;
            }
            // Opretter en paragraph for hver ingrediens og tilføjer den til ingredientsList

        }
    }


    containerToFill.innerHTML = "";
    containerToFill.innerHTML = `
      <section class="hero">
      <article>
        <div class="title">
          <h1>Recipe</h1>
          <h2>${recipes.acf.title}</h2>
        </div>
        <div class="searchBox">
          <p>Search...</p>
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </article>
      </section>
      <div class="wave"></div>
  
    <section class="recipeInformation">
      <article class="links">
        <a href="./recipes.html">Recipes</a>
        <p>&gt;</p>
        <a href="./recipe.html">${recipes.acf.title}</a>
      </article>
  
      <article class="recipeData">
        <img src="${recipes.acf.image.url}" alt="${recipes.acf.image.alt}" />
        <div>
          <p><i class="fa-regular fa-clock"></i> Time</p>
          <p>
            <i class="fa-solid fa-people-group"></i> Servings
            <i class="fa-solid fa-arrows-up-down"></i>
          </p>
          <p>
            <i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star"></i> Rating
          </p>
        </div>
      </article>
    </section>
  
    <section class="theRecipe">
      <article class="description">
        <h3>Description</h3>
        <p>
        ${recipes.acf.description}
        </p>
      </article>
  
      <article class="ingredients">
        <h3>Ingredients</h3>
        ${ingredientsList}
      </article>
  
      <article class="preparation">
        <h3>Instructions</h3>
        <ol>
        ${methodList}
     </ol>
      </article>
      
      <article id="informationBox">
        <div class="publishingInformation">
          <i class="fa-solid fa-user"></i>
          <div>
            <p>${recipes.acf.author[0].post_title}</p>
            <p>${recipes.date}</p>
          </div>
          <i class="fa-solid fa-share-from-square"></i>
        </div>
  
        <button>
          <i class="fa-solid fa-toggle-on"></i> I'm in the kitchen
        </button>
        <br />
        <button>
          <i class="fa-solid fa-cart-shopping"></i> Add ingredients to
          shopping list
        </button>
      </article>
    </section>
    <div class="videoContainer">
    ${videoEl}
    </div>
    <section class="recipeSuggestions">
          <h4>Maybe you would also like...</h4>
          <article>
            <a href=""
              ><img
                src="./assets/img/eggOnToast.jpg"
                alt="A toast with an egg topped with herbs"
                loading="lazy"
            /></a>
            <a href=""
            ><img
            src="./assets/img/pieStuffedWithEggAndSpinach.jpg"
            alt="a pie stuffed with boiled eggs, green onions, parsley, dill and spinach"
            loading="lazy"
            /></a>
            <a href=""
            ><img
            src="./assets/img/filletWithSauceAndPotatoes.jpg"
            alt="a fillet in a creamy sauce with boiled potatoes"
            loading="lazy"
            /></a>
            </article>
            </section>`
    // KILDER TIL IMG I CLASS="SUGGESTIONS"
    // KILDE: ADDICTIVE STOCK CREATIVES. https://www.colourbox.com/image/delicious-breakfast-of-fried-eggs-with-toast-and-salad-image-61237509. Colourbox. 2024. Accessed 29.04.2024.
    // KILDE: Sergii Koval. https://www.colourbox.com/image/homemade-delicious-pie-stuffed-with-boiled-eggs-green-onions-parsley-dill-and-spinach-close-up-on-a-wooden-board-horizontal-image-56650955. Colourbox. 2024. Accessed 29.04.2024. 
    // KILDE: Sergii Koval. https://www.colourbox.com/image/spicy-herring-fillet-in-a-creamy-sauce-with-a-garnish-of-boiled-potatoes-close-up-in-a-plate-horizontal-image-58864668. Colourbox. 2024. Accessed 29.04.2024.
};

function getRecipeById(tagId) {
    fetch(baseUrl + "posts?tags=" + tagId)
        .then((res) => res.json())
        .then((data) => {
            if (data.length > 5) {
                data = data.slice(0, 5);
            }
            data.forEach((recipe, index) => renderRecipebyId(recipe, index))
        })
        .catch((err) => {
            alert("Error! We're sorry to inform you that a mistake has been made. Please try again", err)
        })
};

function renderRecipebyId(recipe, index) {
    mealPlanEls[index].innerHTML += `
    <a href="./recipe.html?id=${recipe.id}"><img src="${recipe.acf.image.url}" class="WPImg" alt="${recipe.title.rendered}">
    <p class="WPData">${recipe.title.rendered}</p></a>
    `
};

function renderPreviousRecipebyId(recipe) {
    previousMealPlans.innerHTML += `
    <img src="${recipe.acf.image.url}" class="WPImg flexboxColumn" alt="${recipe.title.rendered}">
    `
};

function mealPlanChanger(id, title) {
    mealPlanEls.forEach((mealPlanEl) => {
        mealPlanEl.innerHTML = "";
    });
    getRecipeById(id);
    titleOfMealPlan.innerHTML = title;
};

