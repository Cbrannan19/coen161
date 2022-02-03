const path = require("path");
/**
 * For the first 3 routes you don't need to use the pathToRegexp
 * library. For the bottom 4 to match, you will
 */

const returnNotAllowed = function (res)
{
  res.statusCode = 405; //request method is known by the server but is not supported by the target resource
  res.end();
};


//appears as though from a portion of the url, it performs a specific function
module.exports = function (extraRoutes)
{
  return Object.assign(
    {
      "/": function (req, res) {
        if (req.method !== "GET") //if not a GET,
        {
          return returnNotAllowed(res); //there is nothing to return if it isn't a GET
        }

        res.statusCode = 200; //request has succeeded
        res.write("Yay!, you hit the index route");
        res.end();
      },

      "/public/(.*)": function (req, res)
      {
        if (req.method !== "GET")
        {
          return returnNotAllowed(res); //there is nothing to return if it isn't a GET
        }

        res.statusCode = 200; //request has succeeded
        const filePath = req.url.split("/");
        const response = [
          "If this were the lab, you would return the file at:",
          path.join(...filePath.splice(1)),
        ]; //What is the purpose of this?
        res.write(response.join("\n"));
        res.end();
      },

      "/about": function (req, res)
      {
        if (req.method !== "GET")
        {
          return returnNotAllowed(res);
        }
        res.statusCode = 200;
        res.write("Would have fetched about.html page!"); //if a GET request succeeded @ about page
        res.end();
      },

      "/visitors": function (req, res)
      {
        if (req.method !== "GET") {
          return returnNotAllowed(res);
        }

        const allVisitors = Object.keys(req.app.visitors);

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json"); //response.setHeader(name, value)
        res.write(JSON.stringify(allVisitors)); //convert object of all visitors to strings
        res.end();
      },

      "/hello/:name": function (req, res)
      {
        if (req.method !== "GET") {
          return returnNotAllowed(res);
        }

        const visitor = req.params.name; //save visitor
        const visits = req.app.visitors[visitor]; //save # of visits of visitor

        let body = `Hello ${req.params.name}`; //says hello to visitor
        if (visits > 0)
        {
          body = `Hello again ${req.params.name}`; //depends on if not new visitor
        }

        res.statusCode = 200;
        res.write(body);
        res.end();
      },

      "/hello/from/:name": function (req, res)
      {
        if (req.method !== "POST")
        {
          return returnNotAllowed(res); //can't return anything if not a POST, why?
        }

        res.statusCode = 200;
        const visitor = req.params.name; //save visitor name
        if (!req.app.visitors[visitor]) //haven't visited before
        {
          req.app.visitors[visitor] = 1; //save first visit
        }

        else
        {
          req.app.visitors[visitor] += 1; //add if visited before
        }

        const visits = req.app.visitors[visitor]; //save total visits
        res.write(`Hello ${visitor}, you've dropped by ${visits} times.`); //say hi to visitor and tells how many visits made
        res.end();
      },
    },
    extraRoutes
  );
};
