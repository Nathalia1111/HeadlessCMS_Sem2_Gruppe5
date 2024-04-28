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
        console.log("Error! We're sorry to inform you that a mistake has been made. Please try again", err)
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

// onclikck listener som kalder URL og henter ny data fra wordpress til det valgte emne
// LAv en function 
// inde i funktion kaldes "getRecipeById" med et nyt id som parameter
// husk at nulstille ved at skrive "innerHTML = ''" 