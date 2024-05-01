const mainRecipeEl = document.querySelector(".mainRecipe");

getOneRecipeOrNews()
  .then(recipes => renderOnerecipe(mainRecipeEl, recipes))
  .catch(err => console.error("Fejl under hentning af opskrifter:", err));