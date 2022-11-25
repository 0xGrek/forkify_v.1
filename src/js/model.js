import { async } from "regenerator-runtime";
import { API_URL } from "./config";
import { API_URL_SEARCH } from "./config";
import { getJSON } from "./helpers";

export const state = {
    recipe: {},
    search: {
        query: "",
        results: [],
    },
};

export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}${id}`);
        console.log(data);
        // reformat
        const { recipe } = data.data;
        state.recipe = {
            id: recipe.title,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };
    } catch (err) {
        console.error(`${err} 👀`);
        throw err;
    }
};

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;

        const data = await getJSON(`${API_URL_SEARCH}search?q=${query}`);
        console.log(data);

        state.search.results = data.recipes.map((rec) => {
            return {
                id: rec.title,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            };
        });
        console.log(state.search.results);
    } catch (err) {
        console.error(`${err} 👀`);
        throw err;
    }
};
