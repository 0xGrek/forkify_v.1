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

        // 0) Update results view to mark selected search result
        resultsView.update(model.getSearchResultPage());

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
        resultsView.render(model.getSearchResultPage());

        // 4)Initial pagination buttons
        paginationView.render(model.state.search);
    } catch (err) {
        console.error(err);
    }
};

const controlPagination = function (goToPage) {
    // 1) Render NEW results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultPage(goToPage));

    // 2)Initial NEW pagination buttons
    paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
    // Update the recipe servings (in state)
    model.updateServings(newServings);

    // Update the recipe view
    recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
    model.addBookmark(model.state.recipe);
    console.log(model.state.recipe);
    recipeView.update(model.state.recipe);
};

controlSearchResults();
const init = function () {
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
};
init();
