const Animal = function (type, name) {
  return {
    type,
    name,
    adopted: false,
  };
};

const Queue = function () {
  const queue = [];

  return {
    enqueue: function (animal) {
      queue.unshift(animal);
    },

    dequeue: function () {
      return queue.pop();
    },

    size: function () {
      return queue.length;
    },

    peek: function () {
      if (queue.length > 0) {
        return queue[0];
      }
    },
  };
};

const Shelter = function () {
  const dogQueue = Queue();
  const catQueue = Queue();
  const allQueue = Queue();

  return {
    hasDogs: function () {},

    hasCats: function () {},

    hasPets: function () {
      return allQueue.size() > 0;
    },

    enqueue: function (type, name) {
      //create animal using the animal()
      const animal = Animal(type, name);
      //is this a dog or cat
      //if dog
      if(type === 'dog'){
        //console.log('enqueing dog', animal);
        //add dog to queue
        dogQueue.enqueue(animal);
        //add to allqueue
        allQueue.enqueue(animal);
      }
      //if cat
      else if(type === 'cat'){
        //console.log('enqueing cat', animal);
        //add cat to queue
        catQueue.enqueue(animal);
        //set to not adopted
        //add to all queue
        allQueue.enqueue(aimal);
      }
    },

    dequeueDog: function () {
      if(dogQueue.size === 0){
        console.log("no dogs left");
      }
      //get dog from dog q
      const dog = dogQueue.dequeue();
      //dq from dog queue
      dog.adopted = true;
      //find dog from allqueue
      //set this thingy as adopted
      return dog;
    },

    dequeueCat: function () {
      if(catQueue.size === 0){
        console.log("no cats left");
        return
      }
      //get dog from dog q
      const cat = catQueue.dequeue();
      //dq from dog queue
      cat.adopted = true;
      //find dog from allqueue
      //set this thingy as adopted
      return cat;
    },

    dequeueAny: function () {
      let pet = allQueue.dequeue();
      while(pet.adopted){
        
      }
      if(pet.adopted){

      }else{
        pet.adopted = true;
        return pet;
      }
    },
  };
};

module.exports = Shelter;

const s = Shelter();

s.enqueue("dog", "milo");
s.enqueue("cat", "cleo");
s.enqueue("dog", "rhubarb");
s.enqueue("cat", "lithium");


