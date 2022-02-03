const assert = require("assert");
const Shelter = require("./shelter");

/**
 * @function testShelter
 * @description tests the different functions in the shelter program
 */
const testShelter = function () {
  it("should dequeue a dog", function () {
    const shelter = Shelter();
    shelter.enqueue("dog", "fido");
    assert(shelter.hasPets());

    const fido = shelter.dequeueDog();
    assert(fido.name === "fido");
    assert(fido.adopted);
    assert(!shelter.hasDogs());
    assert(!shelter.hasPets());
  });

  it("should dequeue a cat", function () {
    const shelter = Shelter();
    shelter.enqueue("cat", "milo");
    assert(shelter.hasPets());

    const milo = shelter.dequeueCat();
    assert(milo.name === "milo");
    assert(milo.adopted);
    assert(!shelter.hasCats());
    assert(!shelter.hasPets());
  });

  it("should dequeue a cat then a dog and have no pets left", function () {
    const shelter = Shelter();
    shelter.enqueue("cat", "milo");
    shelter.enqueue("dog", "fido");
    assert(shelter.hasPets());

    const milo = shelter.dequeueCat();
    assert(milo.name === "milo");
    assert(milo.adopted);
    assert(!shelter.hasCats());
    assert(shelter.hasPets());

    const fido = shelter.dequeueDog();
    assert(fido.name === "fido");
    assert(fido.adopted);
    assert(!shelter.hasDogs());
    assert(!shelter.hasPets());
  });

  it("should dequeue a cat first then have no cats left", function () {
    const shelter = Shelter();
    shelter.enqueue("cat", "milo");
    shelter.enqueue("dog", "fido");
    assert(shelter.hasPets());

    const milo = shelter.dequeueAny();
    assert(milo.name === "milo");
    assert(milo.adopted);
    assert(!shelter.hasCats());
    assert(shelter.hasDogs());
    assert(shelter.hasPets());

    const cat = shelter.dequeueCat();
    assert(!cat);
    assert(shelter.hasPets());
  });
};

/**
 * @const results
 * @description An array containing of TestResults for each executed test
 */
const results = [];
/**
 * @function TestResult
 * @description creates a test result
 */
const TestResult = function (name = "", err = "") {
  return { name, err };
};

/**
 * @function it
 * @description wraps a test to display nicely in the console and catch errors
 *
 * @example it('should be ok', function() { assert.ok(true) })
 */
const it = function (name, fn) {
  try {
    fn();
    results.push(TestResult(name));
  } catch (err) {
    if (err.code === "ERR_ASSERTION") {
      results.push(
        TestResult(
          name,
          err.message.replace("\n\n", "\n").replace("\n", "\n  > ")
        )
      );
    } else {
      results.push(TestResult(name, `${err.message}\n${err.stackTrace}`));
    }
  }
};

/**
 * https://nodejs.org/docs/latest-v14.x/api/modules.html#modules_accessing_the_main_module
 * require.main blocks are only run when this is directly invoked as the node main module
 */
if (require.main === module) {
  testShelter();

  const stats = {
    pass: 0,
    fail: 0,
    total: 0,
  };

  for (const result of results) {
    stats.total++;
    if (result.err) {
      stats.fail++;
      console.log(`❌ ${result.name}\n  >${result.err}`);
    } else {
      stats.pass++;
      console.log(`✅ ${result.name}`);
    }
  }

  console.log("Results\n---");
  console.log(
    `TOTAL: ${stats.total}\n✅ PASS: ${stats.pass}\n❌ FAIL: ${stats.fail}\n`
  );
}
