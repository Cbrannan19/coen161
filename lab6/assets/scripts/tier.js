const TierColors = {
  S: "#44bd32",
  A: "#0097e6",
  B: "#8c7ae6",
  C: "#e1b12c",
  D: "#c23616",
  "?": "#7f8fa6",
};

/**
 * @function loadTierColors
 * @description For each .tier element, set the first child element's background
 *              color to the color specified in the TierColors variable.
 *
 */
const loadTierColors = function () {
  console.log("loadTiercolors");
  const tier_headers = document.querySelectorAll('.tier');
  for(let i = 0; i < tier_headers.length; i++){
    const letter = tier_headers[i].dataset.tier;
    tier_headers[i].firstElementChild.style.backgroundColor = TierColors[letter];
  }
};

/**
 * @task Create drop listeners, make sure to the current state of the application
 * into localStorage once an item has been dropped into a tieer.
 * Resource: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
 */
 function dragover_handler(ev) {
  console.log("dragover handler!");
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}

function drop_handler(ev) {
  console.log("drop handler!");
  ev.preventDefault();
  // Get the id of the target and add the moved element to the target's DOM
  const data = ev.dataTransfer.getData("text/plain");
  ev.target.appendChild(document.getElementById(data));
}
/**
 * @function  createTierDropzones
 * @description turn each .tier-container into a droppable zone
 */
const createTierDropzones = function () {
  console.log("createTierDropzones!");
  const tier_sections = document.querySelectorAll('.tier-container');
  for(let i = 0; i < tier_sections.length; i++){
    tier_sections[i].addEventListener("dragover", dragover_handler);
    tier_sections[i].addEventListener("drop", drop_handler);
  }
};

/**
 * @task Add an event listener for the DOMContentLoaded (just like in restaurant.js)
 * to loadTierColors and createTierDropzones
 */
 window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded');
  loadTierColors();
  createTierDropzones();
});

/**
 * @task Add an event listener for the dblClick function for the UNKNOWN data tier's h1
 * element to reset all the tiers and to store the new result
 */
 const unknown_tier = document.querySelector('[data-tier="?"] h1');
 unknown_tier.addEventListener('dblclick', (event) => {
   console.log('Reset all tiers and store the new result');
 
   const rest_images = document.querySelectorAll('img');
   const location = document.querySelector('[data-tier="?"] .tier-container');
   for(let i = 0; i < rest_images.length; i++){
 
     image = rest_images[i];
     location.appendChild(image);
 
   }
 
 });