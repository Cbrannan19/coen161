const graph = require("./data-structures/graph");
const fs = require("fs");
const chalk = require("chalk");
const { EventEmitter } = require("stream");

const main = function (origin, destination) {
  const g = graph.Graph();

  /**
   * @task add event handlers heree. Keep it all before the next
   * comment just so there's a bit of distinction in your code
   */
   g.eventPublisher.on("start", function(start_object){
    console.log("hi", "start", start_object["origin"], start_object["destination"]);
  });
   g.eventPublisher.on("not-found", function(notFound_object){
    console.log("hey", "not-found", notFound_object);
  });
  //g.eventPublisher.on("err", function(err_object){
  //  console.log("err", origin, destination);
  //});

  g.eventPublisher.on("route-found", function(route_object){
    console.log("peace", "route-found", route_object['path']);
  });
  g.eventPublisher.on("hub", function(hub_object){
    console.log("sup", "hub", hub_object['path']);
  });

  /**
   * @task read the routes.csv file using the fs module. done
   * Use the encoding utf-8 and pass a callback function
   *
   * This callback iterates separate each line in the file into
   * its two constituent airports. Add each edge into the graph using
   * the g.addEdge() method
   *
   * After that, it runs a the bfs algorithm to find a path between the origin
   * and destination
   */

  fs.readFile('./routes.csv', 'utf-8', (err, data)=>{

    if(err){
      console.error(err);
      return;
    }
    let lines = data.split("\n");
    lines.forEach((line)=>{
      let arr = line.split(",");
      g.addEdge(arr[0], arr[1]);
    });
    g.bfs(origin, destination);
  });
};


if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log(
      chalk.red(
        `ERROR: must pass in 2 airports but only received ${args.length}`
      )
    );
    process.exit(1);
  }

  main(args[0], args[1]);
}

module.exports = main;
