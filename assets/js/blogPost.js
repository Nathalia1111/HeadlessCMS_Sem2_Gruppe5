const blogPostContainerEl = document.querySelector(".blogPostContainer");



getOneRecipeOrNews()
  .then(recipes => renderOneArticle(blogPostContainerEl, recipes))
  .catch(err => console.error("Fejl under hentning af opskrifter:", err));