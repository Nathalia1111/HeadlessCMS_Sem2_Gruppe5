const mainRecipeEl = document.querySelector(".mainRecipe");

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
  if (recipes.acf.ingredients) {
    // Gennemgår hver nøgle (ingrediens) i objektet
    for (const key in recipes.acf.ingredients) {
      const instruction = recipes.acf.ingredients[key];
      if (instruction) {
        methodList += `<dd>${instruction}</dd>`;

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
      <input class="searchbar" type="text" placeholder="Search... " />
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
}



getOneRecipeOrNews()
  .then(recipes => renderOnerecipe(mainRecipeEl, recipes))
  .catch(err => console.error("Fejl under hentning af opskrifter:", err));