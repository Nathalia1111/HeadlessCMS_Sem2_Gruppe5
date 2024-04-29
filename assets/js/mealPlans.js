// Variables 
const baseUrl = "https://foodista.brathcodestudio.com/wp-json/wp/v2/";
const mealPlanEls = document.querySelectorAll(".weekMealPlan");
const thisWeekEl = document.querySelector(".WPData");

// Functions (hente post fra wordpress efter specifik kategori)

function getRecipeById(tagId){
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
    <img src="${recipe.acf.image.url}" class="WPImg" alt="${recipe.title.rendered}">
    <p class="WPData">${recipe.title.rendered}</p>
    `
};

// onclick listener som kalder URL og henter ny data fra wordpress til det valgte emne

const budgetMealPlan = document.querySelector(".budget");
const familyMealPlan = document.querySelector(".family");
const vegetarianMealPlan = document.querySelector(".vegetarian");
const glutenfreeMealPlan = document.querySelector(".glutenfree");
const titleOfMealPlan = document.querySelector("#mealPlanTitle");

budgetMealPlan.addEventListener("click", budgetMP);
familyMealPlan.addEventListener("click", familyMP);
vegetarianMealPlan.addEventListener("click", vegetarianMP);
glutenfreeMealPlan.addEventListener("click", glutenfreeMP);

function budgetMP(data) {
    mealPlanEls.forEach((mealPlanEl) => {
        mealPlanEl.innerHTML = " ";
        titleOfMealPlan.innerHTML = " ";
    });

    const dataBudget = baseUrl + "posts?tags=" + 103;
   
    fetch(dataBudget)
    .then((res) => res.json())
    .then((data) => {
        if (data.length > 5) {
            data = data.slice(0, 5);
        }
        data.forEach((recipe, index) => renderRecipebyId(recipe, index))
        titleOfMealPlan.innerHTML += "Budget Meal Plan"
    })
};

function familyMP(data) {
    mealPlanEls.forEach((mealPlanEl) => {
        mealPlanEl.innerHTML = " ";
        titleOfMealPlan.innerHTML = " ";
    });

    const dataFamily = baseUrl + "posts?tags=" + 65;
   
    fetch(dataFamily)
    .then((res) => res.json())
    .then((data) => {
        if (data.length > 5) {
            data = data.slice(0, 5);
        }
        data.forEach((recipe, index) => renderRecipebyId(recipe, index))
        titleOfMealPlan.innerHTML += "Family Meal Plan"
    })
}

function vegetarianMP(data) {
    mealPlanEls.forEach((mealPlanEl) => {
        mealPlanEl.innerHTML = " ";
        titleOfMealPlan.innerHTML = " ";
    });

    const dataVegetarian = baseUrl + "posts?tags=" + 105;
   
    fetch(dataVegetarian)
    .then((res) => res.json())
    .then((data) => {
        if (data.length > 5) {
            data = data.slice(0, 5);
        }
        data.forEach((recipe, index) => renderRecipebyId(recipe, index))
        titleOfMealPlan.innerHTML += "Vegetarian Meal Plan"
    })
}

function glutenfreeMP(data) {
    mealPlanEls.forEach((mealPlanEl) => {
        mealPlanEl.innerHTML = " ";
        titleOfMealPlan.innerHTML = " ";
    });

    const dataGlutenfree = baseUrl + "posts?tags=" + 104;
   
    fetch(dataGlutenfree)
    .then((res) => res.json())
    .then((data) => {
        if (data.length > 5) {
            data = data.slice(0, 5);
        }
        data.forEach((recipe, index) => renderRecipebyId(recipe, index))
        titleOfMealPlan.innerHTML += "Glutenfree Meal Plan"
    })
}

