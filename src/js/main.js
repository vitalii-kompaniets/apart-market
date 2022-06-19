import homePage from './pages/homePage'
import singleItem from './pages/singleItemPage'
import bidsPage from './pages/bidsPage'
import favouritesPage from './pages/favouritesPage'
import errorPage from './pages/errorPage'
import EventEmitter from './utils/eventEmitter'
import Favourites from './favourites/favouritesModel'

const state = {
   results: [],
   emitter: new EventEmitter(),
   favourites: new Favourites()
}

// Только для тестирования. После - удалить!!!
window.state = state

// Routs
const routes = [
  { path: "/", component: homePage },
  { path: "item", component: singleItem },
  { path: "favourite", component: favouritesPage },
  { path: "bids", component: bidsPage },
];

function findComponentByPath(path, routes) {
  return routes.find(function (route) {
    return route.path === path;
  });
}

// Router
function router() {
  // Split path to array
  const pathArray = location.hash.split("/");

  // Set current path
  let currentPath = pathArray[0] === "" ? "/" : pathArray[1];
  currentPath = currentPath === "" ? "/" : currentPath;

  // Save rout params
  state.routeParams = pathArray[2] ? pathArray[2] : ''

  // Choose matching component from Router or Error page
  const { component = errorPage } =
    findComponentByPath(currentPath, routes) || {};

  component(state);
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
