import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

const constrolRecipes = async function () {
    try {
        const id = window.location.hash.slice(1);
        console.log(id);

        if (!id) return;
        recipeView.renderSpiner();

        // 1) Loading recipe
        await model.loadRecipe(id);

        // 2) Loading recipe
        recipeView.render(model.state.recipe);
        // const recipeView = new recipeView(model.state.recipe);
    } catch (err) {
        recipeView.renderError();
    }
};
// constrolRecipes();

const controlSearchResults = async function () {
    try {
        resultsView.renderSpiner();

        // 1) get search query
        const query = searchView.getQuery();
        if (!query) return;

        // 2) Load search results
        await model.loadSearchResults(query);

        // 3) Render results
        console.log(model.state.recipe);
    } catch (err) {
        console.error(err);
    }
};

controlSearchResults();
const init = function () {
    recipeView.addHandlerRender(constrolRecipes);
    searchView.addHandlerSearch(controlSearchResults);
};
init();
