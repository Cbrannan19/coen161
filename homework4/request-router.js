/**
 * @task1 Questions
 *
 * 1. What are all the routes that this server can handle?
 * 2. How do you send a request to the server when the port is 8080?
 * 3. What is printed (only for the last request)when you send 5
 *    requests to /hello/from/arman and then 1 request to /visitors
 * 4. What file is requested if you make a request to /public/foo/bar/baz?
 * 5. For the /hello/:name route, what properties from req are used?
 * 6. What is the value of the Content-Type header for the /visitors route?
 * 7. What are the two request methods this server wiil receive?
 * 8. What status code is sent back if you send a request not using one of the specified request methods?
 * 9. What function is used to write the body of a response?
 * 10. How do you start the server but not the grading script?
 *
 */
 const http = require("http");
 const pathToRegexp = require("path-to-regexp");
 //const routingTables = require("./routing-tables");
 const createRoutingTable = require("./routing-tables");
 const { match } = require("assert");
 
 
 // /**
 //  * @task5 extract the path from the request object and try to
 //  * match it against the routing table that's held in the app
 //  * state.
 //  */
 const routeRequest = function (req)
 {
   //extracting path
   let appState = req.app;
   let routingTable = appState.routes;
   let path = req.url;
 
   for (let key in routingTable) //iterates through keys from routing table
   {
     //saves function for transforming path of req
     const foundFunction = pathToRegexp.match(key, { decode: decodeURIComponent });
     let isPath = foundFunction(path);
 
     //if found path exists?
     if (isPath)
     {
       //update request parameters
       req.params = isPath.params;
       return key; //MATCH
     }
 
   }
 
   return null; //if there is no match found
 
 };
 
 /**
  * @task3 Create a higher-order function that takes in an object
  * to be used as the application state and returns a function that
  * can be used as the callback for http.createServer
  */
 
 
 const requestListener = function (appState)
 {
   /**
    * @task4 Add 2 new properties to each request objct, then
    * try to route the request by calling the routeRequest function
    * from above. If no request is matched, remember to sened the
    * proper status code. If it is, then call the assocaited handler.
    * @hint - For the types of req and res, look here
    * https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener
    */
 
   return function (req, res)
   {
     //2 properties
     req.params = null;
     req.app = appState;
 
     //route request
     let ifReq = routeRequest(req);
 
     // does route exist?
     if (!ifReq)
     {
       res.statusCode = 404; //NOT FOUND
       res.write("not found");
       res.end();
     }
 
     else
     {
       let fxn = appState.routes[ifReq];
       fxn(req, res); //perform fxn of matched path
     }
   }
 };
 
 /**
  * This if statement ensures the server is only started when run
  * using `node server.js <port>`. When you use the grading script,
  * this file won't be the "main module" so the condition
  * evaluates to false.
  */
 if (require.main === module)
 {
   const port = process.argv[2];
   if (!port)
   {
     console.error("port is a required argument");
     process.exit(1);
   }
 
   else if (port < 1000)
   {
     console.warn(
       "You might have some issues if your port is less than 1000. Try using 8080"
     );
   }
 
   /**
    * @task2 Create an http server that uses the requestListener function
    * as the callback for when requests are received. Start the server
    * on the port from above
    */
   const intialAppState =
   {
     visitors: [],
     routes: createRoutingTable(),
   };
 
   http.createServer(requestListener(intialAppState)).listen(port);
 }
 
 module.exports =
 {
   requestListener,
 };