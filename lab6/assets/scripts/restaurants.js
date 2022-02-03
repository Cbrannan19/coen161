/**
 * Once this script is loaded, you'll have access to a global variable
 * called Restaurants. Remember to load your scripts in the correct order
 * though. If loaded in the improper order, scripts loaded before this one
 * may not have access to the Restaurants object.
 */
const Restaurants = {
  arbys: {
    path: "./assets/images/arbys.jpg",
    tier: "UNKNOWN",
  },
  bk: {
    path: "./assets/images/bk.jpg",
    tier: "UNKNOWN",
  },
  canes: {
    path: "./assets/images/canes.jpg",
    tier: "UNKNOWN",
  },
  carlsjr: {
    path: "./assets/images/carlsjr.jpg",
    tier: "UNKNOWN",
  },
  chickfila: {
    path: "./assets/images/chickfila.jpg",
    tier: "UNKNOWN",
  },
  chipotle: {
    path: "./assets/images/chipotle.jpg",
    tier: "UNKNOWN",
  },
  dennys: {
    path: "./assets/images/dennys.jpg",
    tier: "UNKNOWN",
  },
  dominos: {
    path: "./assets/images/dominos.jpg",
    tier: "UNKNOWN",
  },
  elpolloloco: {
    path: "./assets/images/elpolloloco.jpg",
    tier: "UNKNOWN",
  },
  fiveguys: {
    path: "./assets/images/fiveguys.jpg",
    tier: "UNKNOWN",
  },
  ihop: {
    path: "./assets/images/ihop.jpg",
    tier: "UNKNOWN",
  },
  innout: {
    path: "./assets/images/innout.jpg",
    tier: "UNKNOWN",
  },
  jackinthebox: {
    path: "./assets/images/jackinthebox.jpg",
    tier: "UNKNOWN",
  },
  kfc: {
    path: "./assets/images/kfc.jpg",
    tier: "UNKNOWN",
  },
  mcdonalds: {
    path: "./assets/images/mcdonalds.jpg",
    tier: "UNKNOWN",
  },
  panda: {
    path: "./assets/images/panda.jpg",
    tier: "UNKNOWN",
  },
  panera: {
    path: "./assets/images/panera.jpg",
    tier: "UNKNOWN",
  },
  popeyes: {
    path: "./assets/images/popeyes.jpg",
    tier: "UNKNOWN",
  },
  shackeshack: {
    path: "./assets/images/shakeshack.jpg",
    tier: "UNKNOWN",
  },
  sonic: {
    path: "./assets/images/sonic.jpg",
    tier: "UNKNOWN",
  },
  tacobell: {
    path: "./assets/images/tacobell.jpg",
    tier: "UNKNOWN",
  },
  whataburger: {
    path: "./assets/images/whataburger.jpg",
    tier: "UNKNOWN",
  },
  wingstop: {
    tier: "UNKNOWN",
    path: "./assets/images/wingstop.jpg",
  },
};

/**
 * @function loadTierData
 * @description checks localStorage for a "restaurants" key
 *              -> if it exists and has parseable JSON data, sets the tiers
 *                  for each restaurant whose tier has been saved.
 *                -> if JSON data isn't parseable, deletes that key
 *              -> else it does nothing
 */
 const loadTierData = function () {

};

// Dragstart handler
function dragstart_handler(ev) {
  // Add the target element's id to the data transfer object
  ev.dataTransfer.setData("text/plain", ev.target.id);
  ev.dataTransfer.effectAllowed = "move";
}

/**
 * @function loadRestaurantImagesIntoTiers
 * @description For each restaurant of Restaurants, creates a restaurant <img>
 *              you can drag into any tier container
 */
const loadRestaurantImagesIntoTiers = function () {
  const rest_keys = Object.keys(Restaurants);
  const location = document.querySelector('[data-tier="?"] .tier-container');
  for(let i = 0; i < rest_keys.length; i++){
    var image = document.createElement("img");
    image.src = Restaurants[rest_keys[i]].path;
    image.className = "restaurant-image";
    location.appendChild(image);
    image.addEventListener("dragstart", dragstart_handler);
    image.id = i;
  }
};

/**
 * @task add an event listener for the DOMContentLoaded event
 * that loads all the restaurant images into different tiers
 */
window.addEventListener('DOMContentLoaded', (event) => {
  console.log('Load Rest. Images Into Tiers');
  loadRestaurantImagesIntoTiers();
});