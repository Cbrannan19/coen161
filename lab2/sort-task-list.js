const dateFns = require("date-fns");
const { TaskList } = require("./task-list");

// This is similar to the module.exports from the task-list.js file
// but this time we're defining our exporoted object all at once.
// Don't need to change this line, but fill in the functions below.
module.exports = {
  /**
   * @function sortByCreatedDate
   * @description given two tasks, orders them based on their createdDate field. This is meant to be
   *              used as the parameter to the arr.sort() method.
   * @param {Task} taskA a task
   * @param {Task} taskB another task
   * @returns {number}
   *  value > 0 if taskB was created before taskA
   *  value === 0 if taskB was created at the same time as taskA
   *  value < 0 if taskB was created after taskA
   */
  sortByCreatedDate: function (taskA, taskB) {
    // TODO: Fill this in
    return dateFns.compareAsc(taskA.createdDate, taskB.createdDate);
  },

  /**
   * @function sortByCompletedDate
   * @description given two tasks, orders them based on their createdDate field. This is meant to be
   *              used as the parameter to the arr.sort() method.
   * @param {Task} taskA a task
   * @param {Task} taskB another task
   * @returns {number}
   *  value > 0 if taskB was created before taskA
   *  value === 0 if taskB was created at the same time as taskA
   *  value < 0 if taskB was created after taskA
   */
  sortByCompletedDate: function (taskA, taskB) {
    // TODO: Fill this in.
    if(taskA.completedDate === null && taskB.completedDate === null){
      return 0;
    }else if(taskA.completedDate === null){
      return 1;
    }else if(taskB.completedDate === null){
      return -1;
    }else{
      return dateFns.compareAsc(taskA.completedDate, taskB.completedDate);
    }
  },
};
