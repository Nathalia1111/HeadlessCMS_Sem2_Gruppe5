// ------Variables------- 
const baseUrl = "https://foodista.brathcodestudio.com/wp-json/wp/v2/";
// KILDE TIL DATA: Foodista. https://foodista.brathcodestudio.com/wp-json/wp/v2/, Foodista Inc, 2008. Accessed: 17/04/2024.

const mealPlanEls = document.querySelectorAll(".weekMealPlan");

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
