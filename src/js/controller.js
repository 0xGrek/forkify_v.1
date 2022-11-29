import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

if (module.hot) {
    module.hot.accept();
}

const controlRecipes = async function () {
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
// controlRecipes();

const controlSearchResults = async function () {
    try {
        resultsView.renderSpiner();

        // 1) get search query
        const query = searchView.getQuery();
        if (!query) return;

        // 2) Load search results
        await model.loadSearchResults(query);

        // 3) Render results
        // resultsView.render(model.state.search.results);
        resultsView.render(model.getSearchResultPage(4));

        // 4)Initial pagination buttons
        paginationView.render(model.state.search);
    } catch (err) {
        console.error(err);
    }
};

const controlPagination = function () {
    console.log(`Pag controler`);
};

controlSearchResults();
const init = function () {
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
};
init();
