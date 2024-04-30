const mainRecipeEl = document.querySelector(".mainRecipe");

function getOneRecipe() {
    const urlParams = new URLSearchParams(window.location.search);

    const recipeId = urlParams.get('id');
    return fetch(recipeUrl + recipeId)
        .then((res) => res.json())
        .then((recipes) => {
            console.log(recipes)
            recipeData = recipes;
            return (recipes);
        })
        .catch(err => console.log("Fejl", err));
}

function renderOnerecipe(containerToFill, recipes) {

    let ingredientsList;
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

    let methodList;
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
}



getOneRecipe()
    .then(recipes => renderOnerecipe(mainRecipeEl, recipes))
    .catch(err => console.error("Fejl under hentning af opskrifter:", err));