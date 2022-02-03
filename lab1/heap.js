const { assert } = require("console");

const Heap = function () {
  // This will be the underlying type for your Heap ADT.
  // You'll definitely want to use some functions from
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
  const heap = [];

  /**
   * @function getMin
   * @returns {integer | null} the minimum value in the Heap but doesn't remove it.
   *                           if there are no elements, this function returns null
   */
  const getMin = function () {
    if (heap.length === 0) {
      return null;
    } else {
      return heap[0];
    }
  };

  /**
   * @function insert
   * @description inserts
   * @param {int} value to be inserted into the heap
   * @returns {void}
   */
  /*
if(heap.length == 0){
  heap[0] = 0;
}else{
  heap.puch(value);
  i = heap.length-1;
  while(i > 0){
    let parent = Math.floor((i+1)/2)-1;
    if(heap[parent] > heap [i]){
      let temp = heap[parent];
      heap[parent] = heap[index];
      heap[i] = temp;
    }
    i = parent;
  }
};

 */
  const insert = function (value) {
    console.log("\nHeap before insert:", heap); // TA
    console.log("Value inserted:", value); // TA
    if (heap.length === 0) {
      heap[0] = value;
    } else {
      heap.push(value);
      let i = heap.length - 1;
      while (i > 0) {
        let parent = Math.floor((i + 1) / 2) - 1;
        if (heap[i] < heap[parent]) {
          //i, parent
          let temp = heap[parent];
          heap[parent] = heap[i];
          heap[i] = temp;
        }
        i = parent;
      }
    }
    console.log("Heap after reordering:", heap); // TA
  };

  /**
   * @function popMin
   * @returns {integer | null} the minimum value in the Heap and removes it
   *                           if there are no elements, this function returns null
   */
  const popMin = function () {
    if (heap.length === 0) {
      return null;
    }
    //switch root and current
    let current = 0;

    let root = heap[current];
    //let end = heap.length - 1;

    heap[current] = heap[heap.length - 1];
    heap[heap.length - 1] = root;

    let popElt = heap.pop();
    let popped = false;
    while (!popped) {
      let left = 2 * current + 1;
      let right = 2 * current + 2;
      let small = current;

      if (left < heap.length && heap[left] < heap[small]) {
        //if left is not at end and left is less than small
        small = left; // set small to left
      }
      if (right < heap.length && heap[right] < heap[small]) {
        //if right not at end and right is less than small
        small = right; //set small to right
      }
      if (small === current) {
        //if the smallest is still the current
        popped = true; //set popped to true
      } else {
        let temp = heap[current]; //if not, shift temp to heap[current]
        heap[current] = heap[small]; //assign small value to current
        heap[small] = temp; // set small to temp

        current = small; //set current to small
      }
    }
    return popElt;
  };

  /**
   * Don't worry about anything after here. Just focus on filling in the functions above
   */
  return {
    getMin,
    popMin,
    insert,
  };
};

module.exports = Heap;
