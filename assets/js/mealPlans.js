// Variables 
const baseUrl = "https://foodista.brathcodestudio.com/wp-json/wp/v2/";
// KILDE TIL DATA: Foodista. https://foodista.brathcodestudio.com/wp-json/wp/v2/, Foodista Inc, 2008. Accessed: 17/04/2024.
const mealPlanEls = document.querySelectorAll(".weekMealPlan");
const previousMealPlans = document.querySelector(".previousMealPlanContainer");



// Functions (hente post fra wordpress efter specifik "tagId")

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
getRecipeById(65);


// Render posts in HTML
function renderRecipebyId(recipe, index) {
    mealPlanEls[index].innerHTML += `
    <a href="/recipe.html"><img src="${recipe.acf.image.url}" class="WPImg" alt="${recipe.title.rendered}">
    <p class="WPData">${recipe.title.rendered}</p></a>
    `
};

// Hente tidligere meal plan (family) fra wordpress

fetch(baseUrl + "posts?tags=" + 106)
    .then((res) => res.json())
    .then((data) => {
        if (data.length > 4) {
            data = data.slice(0, 4);
        }
        data.forEach(recipe => renderPreviousRecipebyId(recipe))
    })
    .catch((err) => {
        alert("Error! We're sorry to inform you that a mistake has been made. Please try again", err)
    });

function renderPreviousRecipebyId(recipe) {
    previousMealPlans.innerHTML += `
    <img src="${recipe.acf.image.url}" class="WPImg flexboxColumn" alt="${recipe.title.rendered}">
    `
};

// onclick listener som kalder URL og henter ny data fra wordpress til det valgte emne

const budgetMealPlan = document.querySelector(".budget");
const familyMealPlan = document.querySelector(".family");
const vegetarianMealPlan = document.querySelector(".vegetarian");
const glutenfreeMealPlan = document.querySelector(".glutenfree");
const titleOfMealPlan = document.querySelector("#mealPlanTitle");

budgetMealPlan.addEventListener("click", mealPlanChanger.bind(this, 103, "Budget Meal Plan"));
familyMealPlan.addEventListener("click", mealPlanChanger.bind(this, 65, "Family Meal Plan"));
vegetarianMealPlan.addEventListener("click", mealPlanChanger.bind(this, 105, "Vegetarian Meal Plan"));
glutenfreeMealPlan.addEventListener("click", mealPlanChanger.bind(this, 104, "Glutenfree Meal Plan"));

function mealPlanChanger(id, title) {
    mealPlanEls.forEach((mealPlanEl) => {
        mealPlanEl.innerHTML = "";
    });
    getRecipeById(id);
    titleOfMealPlan.innerHTML = title;
};


// ændre billedet opacity ved aktivt 
const images = document.querySelectorAll(".mealPlansOverview img");
const textColors = document.querySelectorAll(".mealPlansOverview p");
const mealPlanContainers = document.querySelectorAll(".oneMealPlan");

mealPlanContainers.forEach((mealPlanContainer) => {
    mealPlanContainer.addEventListener("click", function () {
        images.forEach((image) => {
            image.style.opacity = '0.5';
        });
        textColors.forEach((textColor) => {
            textColor.style.color = `black`;
        });
        mealPlanContainer.querySelector("img").style.opacity = '1.0';
        mealPlanContainer.querySelector("p").style.color = 'hsl(22, 87%, 59%)';
        });
    });



    // åbne opskrift i recipe.html
    // Finde frem til den enkelte opskrifts id 
    // lave en eventlistener ("click") som skal åbne en recipe.html med opskriftens id som parameter, fx recipe.html?id=65


