import { async } from "regenerator-runtime";
import { API_URL, RES_PER_PAGE } from "./config";

import { getJSON } from "./helpers";

export const state = {
    recipe: {},
    search: {
        query: "",
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    },
    bookmarks: [],
};

export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}/${id}`);

        // reformat
        const { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };
        //PROBLEM
        if (state.bookmarks.some((bookmark) => bookmark.id === id))
            state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;
    } catch (err) {
        console.error(`${err} 👀`);
        throw err;
    }
};

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        console.log(query);
        const data = await getJSON(`${API_URL}?search=${query}`);

        state.search.results = data.data.recipes.map((rec) => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            };
        });
        // refresh the page will always be 1
        state.search.page = 1;
        // console.log(state.search.results);
        // console.log(state.recipe.id);
    } catch (err) {
        console.error(`${err} 👀`);
        throw err;
    }
};

export const getSearchResultPage = function (page = state.search.page) {
    state.search.page = page;

    // trust use
    const start = (page - 1) * state.search.resultsPerPage; //0;
    const end = page * state.search.resultsPerPage; //10;

    return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach((ing) => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
        // formula newQt = oldQt * newServings / oldServ; 2 * 8 / 4
    });

    state.recipe.servings = newServings;
};

export const presistBokmarks = function () {
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
    // Add bookmark
    state.bookmarks.push(recipe);
    console.log(recipe);
    // Mark curretn reipe as bookmark
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    presistBokmarks();
};

export const deleteBookmark = function (id) {
    // delete bookmarkl
    console.log(id);

    const index = state.bookmarks.findIndex((el) => el.id === id);
    state.bookmarks.splice(id, 1);

    // Mark curretn reipe as NOT bookmark
    if (id === state.recipe.id) state.recipe.bookmarked = false;

    presistBokmarks();
};

const init = function () {
    const storage = localStorage.getItem("bookmarks");

    if (storage) state.bookmarks = JSON.parse(storage);
};
init();
// console.log(state.bookmarks);

const clearBookmarks = function () {
    localStorage.clear("bookmarks");
};
clearBookmarks();
