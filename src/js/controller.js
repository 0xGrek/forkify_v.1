import * as model from './model';
import recipeView from './views/recipeView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const constrolRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpiner(recipeContainer);

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Loading recipe
    recipeView.render(model.state.recipe);
    // const recipeView = new recipeView(model.state.recipe);
  } catch (err) {
    console.log(err);
  }
};
constrolRecipes();

const init = function () {
  recipeView.addHandlerRender(constrolRecipes);
};
init();
