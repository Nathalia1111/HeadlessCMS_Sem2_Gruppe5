const blogPostContainerEl = document.querySelector(".blogPostContainer");

function renderOneArticle(containerToFill, story) {
  let textBox1 = "";
  if (story.acf.textinput) {
    for (const key in story.acf.textinput) {
      const value = story.acf.textinput[key];

      if (value) {

        if (value.small_title) {
          textBox1 += `<h4>${value.small_title}</h4>`;
        }

        textBox1 += `<p>${value.textbox_1}</p>`;

        if (value.image && value.image.url) {
          textBox1 += `<img src="${value.image.sizes.large}" alt="${value.image.alt}"> <br>`;
        }

        textBox1 += `<a href="">${value.textbox_2}</a>`;
      }
    }
  }

  containerToFill.innerHTML = "";
  containerToFill.innerHTML = `
  <h1 class="articleHeadline">${story.acf.titel}</h1>
  <img src="${story.acf.image.sizes.large}" alt="${story.acf.image.alt}">
  <h2>${story.acf.introduction.chapter_1}</h2>
  <div class="authorsLine">
  <p>${story.acf.author[0].post_title}</p>
  <p>${story.date}</p>
  </div>
  ${textBox1}
  `
}


getOneRecipeOrNews()
  .then(recipes => renderOneArticle(blogPostContainerEl, recipes))
  .catch(err => console.error("Fejl under hentning af opskrifter:", err));