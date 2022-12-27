import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) module.hot.accept();

const controlRecipes = async function () {
  try {
    // https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcd09

    recipeView.renderSpinner();
    const id = window.location.hash.slice(1);
    if (!id) return;
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError(err);
  }
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();
    bookmarksView.render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (error) {
    console.log(error);
    addRecipeView.renderError(error);
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (page) {
  resultsView.render(model.getSearchResultsPage(page));
  model.state.search.page = page;
  paginationView.render(model.state.search);
};

const controlServings = function (toIncrease) {
  if (model.state.recipe.servings < 2) return;
  model.updateServings(toIncrease);
  recipeView.update(model.state.recipe);
};

const init = function () {
  window.history.pushState('', document.title, window.location.pathname);
  recipeView.addHanderRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  bookmarksView.render(model.state.bookmarks);
};

init();
