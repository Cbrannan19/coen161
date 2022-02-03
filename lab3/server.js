const chalk = require("chalk");
const fs = require("fs/promises");
const http = require("http");
const { TaskResponse } = require("./task-list/response");
const { TaskList } = require("./task-list/task-list");
const readBody = require("./utils/read-body");
const sendResponse = require("./utils/send-response");

const handleRequest = function (tasklist, file) {
  /**
   * @function requestHandler
   * For documentation check: https://nodejs.org/docs/latest-v14.x/api/http.html#http_http_createserver_options_requestlistener
   * This function will get really long and that's okay. It allows you
   * to have access to the tasklist and file variables wherever necessary
   *
   */
  return function (req, res) {
    /**
     * Reference for Status Codes https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
     * Check the lab handout for most information.
     *
     * @task (1) Handle requests when the _url_ is "/tasks"
     *  (a) if the request method is GET return all the tasks in default sort order with the OK status code
     * @task (2) Handle requests when the _url_ _startsWith "/task"
     *  (a) If the request method is POST, the url will be just "/task", then you should
     *      _read the body_ of the request to see the description of the task
     *      that's being sent. Commit that to both the in memory structure and a local file called 'tasks'
     *  (b) For requests where the method is GET, PUT, and DELETE, return the following status codes
     *    BAD_REQUEST - if there was no id provided
     *    NOT_FOUND - if there specified id was not provided
     *    NO_CONTENT, ACCEPTED, OK - if the response was successful, but you'll have to figure out which is which.
     *  (c) For requests where the method is anything else, return the status code for METHOD_NOT_ALLOWED.
     * @task (3) Handle requests when the _url_ is anything else, return the status code for NOT_FOUND
     * @task (4) For any request that _mutates_ data, write all the tasks out to a tasks file
     */

    //task 1
    if (req.url === "/tasks") {//READ ALL
      if (req.method === "GET") {
        //for loop add tasks through read
        if(tasklist === null){
          return sendResponse(res, 404, "NOT FOUND");
        }
        return sendResponse(res, 200, tasklist.readAllTasks());
        //return readAllTasks;
      }else{
        return sendResponse(res, 405, "WRONG METHOD");
      }
    }
    //task 2
    if (req.url.startsWith("/task")) {
      let taskId = req.url.split("/");
      if (req.method === "POST") {//SERIALIZE
        //creating
        //let body;
        return readBody(req).then(function(value){
          let body = value;
          if(!body){
            return sendResponse(res, 400, "no body");
          }
          let TaskResponse = tasklist.createTask(body);
          return sendResponse(res, 201, TaskResponse.task.toString());
        }).then(function(){
          return fs.writeFile('tasks', tasklist.serializeTasks());
        });
      }

      if (req.method === "GET") {//
        if(!taskId[2]){
          return sendResponse(res, 400, "NO ID")
        }
        let TaskResponse = tasklist.readTask(taskId[2]);
        if (TaskResponse.errorMessage) {
          //no match
          return sendResponse(res, 404, "not found");
        }
        return sendResponse(res, 200, TaskResponse.task.toString());
      }

      if (req.method === "PUT") {//complete task
        let TaskResponse = tasklist.completeTask(taskId[2]);
        if (!taskId[2]) {
          //no id
          return sendResponse(res, 400, "no id");
        }
        //let TaskResponse = tasklist.completeTask(taskId[2]);
        // if (TaskResponse === null) {
        //   //no match
        //   return sendResponse(res, 404);
        // }
        if(TaskResponse.errorMessage){
          return sendResponse(res, 404, "not found");

        }
        sendResponse(res, 200, TaskResponse.task.toString());
        return fs.writeFile(file, tasklist.serializeTasks());
      }

      if (req.method === "DELETE") {//DELETE
        console.log(taskId[2]);
        if (!taskId[2]) {
          //no id
          return sendResponse(res, 400, "NO ID");
        }
        let TaskResponse = tasklist.deleteTask(taskId[2]);
        if (TaskResponse.errorMessage) {
          //no match
          return sendResponse(res, 404, TaskResponse.errorMessage);
        }
        sendResponse(res, 204);
        return fs.writeFile('tasks', tasklist.serializeTasks());
      }else {
          return sendResponse(res, 405);
      }
    } else {
      //method not allowed
      return sendResponse(res, 404);
    }
  }
  
};

if (require.main === module) {
  const tl = TaskList();
  let server = http.createServer(handleRequest(tl, "tasks"));
  server.listen(8080);

  /**
   * @task (1) read the tasks file using fs/promises
   *  (a) if the contents are a parseable JSON array, then load those tasks into the task list and start the server
   *  (b) if the file doesn't exist, print a message to the console and then start the server
   *  (c) if the file exists but the content is not a _parseable_ _JSON_ _array_, print a message to the console and use process.exit(1)
   * @task (2) after you've finished this block, remove the server.listen above and instead,
   *   and find where to put it below (after handling errors)
   *
   */
  //fs.readFile('./tasks', 'utf8').then(function(req)){

  //});
  const parsed = JSON.parse(read);
  if(parsed){
    //load to task server
  }else if(!fs.existsSync('./task')){
    console.log("No file found");
    
    //start server
  }else{
    console.log("Not Parseable");
    process.exit(1);
  }
  //server.listen(8080);

}

module.exports = handleRequest;
