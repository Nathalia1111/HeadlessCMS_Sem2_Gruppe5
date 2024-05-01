const mealPlanEls = document.querySelectorAll(".weekMealPlan");
const previousMealPlans = document.querySelector(".previousMealPlanContainer");

getRecipeById(65);


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

const budgetMealPlan = document.querySelector(".budget");
const familyMealPlan = document.querySelector(".family");
const vegetarianMealPlan = document.querySelector(".vegetarian");
const glutenfreeMealPlan = document.querySelector(".glutenfree");
const titleOfMealPlan = document.querySelector("#mealPlanTitle");

budgetMealPlan.addEventListener("click", mealPlanChanger.bind(this, 103, "Budget Meal Plan"));
familyMealPlan.addEventListener("click", mealPlanChanger.bind(this, 65, "Family Meal Plan"));
vegetarianMealPlan.addEventListener("click", mealPlanChanger.bind(this, 105, "Vegetarian Meal Plan"));
glutenfreeMealPlan.addEventListener("click", mealPlanChanger.bind(this, 104, "Glutenfree Meal Plan"));


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


