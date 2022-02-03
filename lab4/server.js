const http = require("http");
const pathToRegexp = require("path-to-regexp");
const path = require("path");
const fs = require("fs/promises");
const routes = require("./routes/index");
let staticFilesDirectory;
/**
 * @task create a Routing Table which maps a URL string to a
 * function.
 */
//routing table with the 3 possible paths
const routingTable = {
  "/": routes.home,
  "/about": routes.about,
  "/public": routes.public
}

//function to call when a path is not found
const returnNotAllowed = function (req, res) {
  res.statusCode = 404;
  res.end();
};

//creates the cache object attached to req's app property
let cache = {};



/**
 * @function routeRequest
 * @description Given a request object from Node.js, returns
 *              a handler function to call. Also assigns the
 *              req.params object to any parameters in the request.
 *              For parsing parameters in a URL, it should use
 *              the path-to-regexp library - https://github.com/pillarjs/path-to-regexp
 * @param {http.ClientRequest} req - The http.ClientRequest to route
 * @returns {function(http.ClientRequest, httpClientResponse)} a request handler
 */
const routeRequest = function (req) {
  /**
   * Take the routeRequest function from homeework and it should roughly
   * work in here. You might have to change somee things around.
   */
  //defaults response to send a not found method
  const url = req.url;
  let response = returnNotAllowed;

  //makes sure that url is defined
  if(url === undefined) {
    return response;
  }
 
  //searches the routing table object in order to find a match with the paths
  Object.entries(routingTable).forEach(potentialPath => {
    const potentialUrl = potentialPath[0];
    const callback = potentialPath[1];

    //compares the two paths: one from routing table and the other what the user searched
    const fn = pathToRegexp.match(potentialUrl, { decode: decodeURIComponent });
    const result = fn(url);
    //if the req's URL matches the potential path, sets req's params
    // and preps callback function for return
    if(result != false) {
      req.params = {
        ...req.params,
        ...result.params
      }
      response = callback;
    }
  });

  return response;
};

/**
 * @function requestListener
 * @description Routes the http.ClientRequest based on the pathname. This will
 *              be siimilar to classwork we do in Week 5.
 *
 * @param {http.ClientRequest} req - The http.ClientRequest to route
 * @param {http.ServerResponse} res - the http.ServerResponse that will be sent
 *
 * @returns
 */
const requestListener = function (req, res) {
  /**
   * Take the body of the anonymous function returned from the requestListener homework
   * and paste it into here. You want the code  that starts with reteurn function(reeq, res)
   */
  //attaches necessary properties to req
  req['params'] = {};
  req['app'] = {
    staticFilesDirectory,
    routes,
    cache
  };

  //checks to see if the page is in the cache and that it is fresh enough to send
  //considered fresh if it was accessed less than a minute ago
  if(Object.keys(cache).includes(req.url)) {
    if(cache[req.url].lastTimeAccessed - Data.now() < 60000) {
      res.statusCode = 200;
      res.write(cache[req.url].page);
      res.end();
      return;
    }
  }

  //attempts to load to the webpage after it was either not found in the cache or too old
  const responses = routeRequest(req);
  return responses(req, res);
};

// This block only gets run when you invoke this as "node server.js <args>"
// This block will NOT be run when you use "npm run grade".
if (require.main === module) {
  /**
   * @task Make sure that you take in 1 command line argument
   * which specifies where all the static files are.
   */
  //sets directory to whatever the user passed in
  staticFilesDirectory = process.argv[2];
  if (!staticFilesDirectory) {
    console.error("directory is a required argument");
    process.exit(1);
  }
  /**
   * @task Create and start a server using `http.createServer`. If
   * the request has  a url field, route it using the Routing Table
   * created about. If it doesn't exist, send a 404
   */
  //creates a server and listens on port 8080
  const server = http.createServer(requestListener);
  server.listen(8080);
}

module.exports = { requestListener };