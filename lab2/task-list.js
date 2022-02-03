const { compareAsc } = require("date-fns");
const responses = require("./response");
const { sortByCreatedDate } = require("./sort-task-list");
const sortTaskList = require("./sort-task-list");

/**
 * @const TaskListOrder
 * @description The different ways that a task list can be ordered by
 */
const TaskListOrder = {
  CreatedDate: Symbol("CreatedDate"),
  CompletedDate: Symbol("CompletedDate"),
};

/**
 * @function Task
 * @description Creates a task.
 */
const Task = function (id, description, completed = false) {
  return {
    id,
    description,
    completed,
    createdDate: new Date(),
    completedDate: null,
    toString: function () {
      if(completed){
        return '[✓]' + description;
      }else{
        return '[ ]' + description;
      }
    },
  };
};

const TaskList = function () {
  let taskCounter = 0;
  const tasks = {};

  /**
   * @function createTask
   * @description adds a new task into the tasks object with an autoincrementing id
   * @param {String} description the task to be completed
   * @returns {responses.TaskResponse} the newly created task
   */
  const createTask = function (description) {
    const task = Task(taskCounter, description);
    tasks[taskCounter] = task;
    taskCounter++;
    
    //add key object
    //return newly created task
    return responses.TaskResponse(task);
  };

  /**
   * @function readTask
   * @description returns the task that corresponds to the given ID
   * @param {String | number} id the id of the task too retrieve
   * @returns {responses.TaskResponse}
   *    errorMessage is filled in if the id isn't found
   *    task is filled in if a task with the given id exists
   */
  const readTask = function (id) {
    //search for task with given id
    if(tasks[id] === undefined){
      return responses.TaskResponse(null, 'does not exist');
    }else{
      return responses.TaskResponse(tasks[id]);
    }
    //if id does not exist return null
    //otherwise, return the task response
  };

  /**
   * @function completeTask
   * @description completes the task with the given ID, setting the completedDate and the completed field
   * @param {String | number} id the id of the task too retrieve
   * @returns {responses.TaskResponse}
   *    errorMessage is filled in if the id isn't found
   *    task is filled in with the newly completed task
   */
  const completeTask = function (id) {
    //access task with given id
    //if not found, return null
    if(tasks[id] === undefined){
      return responses.TaskResponse(null, 'does not exist');
    }else{
    //catQueue.enqueue(animal);
      tasks[id].completed = true;
      tasks[id].completedDate = new Date();
      return responses.TaskResponse(tasks[id]);
    }
  };

  /**
   * @function deleteTask
   * @description removes the task with the given ID (think about how to delete keys from an object)
   * @param {String | number} id the id of the task too retrieve
   * @returns {responses.TaskResponse}
   *    errorMessage is filled in if the id isn't found
   *    both errorMessage and task should be null if deleted successfully
   */
  const deleteTask = function (id) {
    if(tasks[id] === undefined){
      return responses.TaskResponse(null, 'does not exist');
    }
    delete tasks[id];
    return responses.TaskResponse(tasks[id]);
  };

  /**
   * @function readAllTasks
   * @description returns all the tasks available, sorting them by the specified order
   * @param {TaskListOrder} order (defaults to TaskListOrder.CreatedDate) the order in which to return tasks in
   * @returns {responses.ListResponse}
   *    tasks is filled in with all the tasks listed in the given order
   */
  const readAllTasks = function (order = TaskListOrder.CreatedDate) {
    
    if(order === TaskListOrder.CreatedDate){
      return responses.ListResponse(Object.values(tasks).sort(sortTaskList.sortByCreatedDate));
    }else{
      return responses.ListResponse(Object.values(tasks).sort(sortTaskList.sortByCompletedDate));
    }
    
  };

  /**
   * NOTE: Don't change this return statement.
   * It returns a bunch of functions to work with a TaskList.
   */
  return {
    createTask,
    completeTask,
    deleteTask,
    readAllTasks,
    readTask,
  };
};

/**
 * NOTE: Do not change this
 * All these exports are used to grade this assignment.
 */
module.exports = {
  Task,
  TaskList,
  TaskListOrder,
};
