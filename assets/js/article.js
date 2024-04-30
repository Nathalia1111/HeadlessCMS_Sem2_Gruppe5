const newArticleEl = document.querySelector(".newArticle");



getOneRecipeOrNews()
  .then(recipes => renderOneArticle(newArticleEl, recipes))
  .catch(err => console.error("Fejl under hentning af opskrifter:", err));



