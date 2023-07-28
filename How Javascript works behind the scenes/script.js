"use strict";

// Scope in practice

// Global scope

function calcAge(birthYear) {
  // function scope
  const age = 2037 - birthYear;

  console.log(age);
  function printAge() {
    // This function can use the age and birthYear variables as it has access to its parent scope level
    // Only the inner scope has access to the outer scope!
    // Outer scope can't access inner scope
    let output = `You are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      // Block scope, same principle applies

      var millenial = true;

      // this superceedes the global const firstName as JS tries to look for variables in local scope first
      //   const firstName = "Steven";

      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        // Although function scope it is still inside a block
        // As such, it can't be accessed outside the block in which it was declared
        return a + b;
      }

      // Reasigning the value of a variable in inner scope
      output = "new output";
    }
    // As str was declared inside the if block, it can't be accessed outside it's parent scope block
    // console.log(str);

    // as var type variables are function scoped (ignore block scope), it can be accessed even if declared in child/block scope that's part of the function
    console.log(millenial);
    // As this function is declared inside the if block, it can't be accessed outside it
    // add(2, 3);

    // As the variable's value was changed inside a child scope, the new value is displayed in the console
    console.log(output);
  }

  printAge();
  return age;
}

// firstName has global scope so it can be used by a function as an argument or inside the function as a variable
const firstName = "John";
calcAge(1991);

// As the function is inside the global scope it can't be accessed outside the calcAge() function
// console.log(millenial);

// The "output" variable was not declared in the global scope, as a result it can't be accessed by the global scope
// console.log(output);

// ************************************************************************************************************* //

// Hoisting

// In JS Hoisting allows function execution to be written before the function declaration
// Some types of variables are accesible/usable before they are actually declared as they are lifted to the top of their scope
// This is possible because previous to the the code being executed, it is scanned for variable declarations and for each variable a new property is created in the variable environment object

// HOISTING
// YES - function declaration, var variables
// NO - let and const variables (technically yes, but value set to uninitialized; behaves as if hosting never happened)

// INITIAL VALUE
// function declaration - actual function
// var variables - undefined
// let and const variables - uninitialized, placed in the Temporal Dead Zone (TDZ)
// function expressions and arrows

// SCOPE
// function declaration - block in strict mode, funciton otherwise
// var variables - function
// let and const variables - block
// function expressions and arrows

// For function expressions and arrows it depends on using var or let/const as they are basically variables and behave as such

// WHY DOES JS HAVE A TDZ?
// Makes it easier to avoid and catch errors: accessing variables before declaration is bad practice and should be avoided
// Makes const variables actually work

// Hoisting and TDZ in Practice

// Start of Global scope
// // Variables
console.log(me);
// // console.log(job); // Variable is still in TDZ at the moment of executing the console.log
// // console.log(birthYear); // Variable is still in TDZ at the moment of executing the console.log

// Point where variables are defined
var me = "John"; // Hoisted to the value of undefined
let job = "teacher";
const birthYear = 1985;

// // Functions
console.log(addDeclaration(2, 3));
// console.log(addExpression(2, 3)); // As addExpression is basically a variable (const) it is in the TDZ at this point
// console.log(addArrow(2, 3)); // As addArrow is basically a variable (const) it is in the TDZ at this point

function addDeclaration(a, b) {
  return a + b;
}

const addExpression = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

// // variables declared with var are hoisted as undefined; trying to call undefined can't be a function
// var addExpression = function (a, b) {
//   return a + b;
// };

// var addArrow = (a, b) => a + b;

// // "Hoisting is bad" Example
// At this point in time, numProducts is undefined (a "consequence" of Hoisting)
// As undefined is a falsy value, the condition is evaluated as true and the code executes
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log("All products deleted!");
}

var x = 1;
// let and const don't create properties in the window object (assigned in TDZ)
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);

// ************************************************************************************************************* //

// The "this" keyword

// this keyword/variable is a special variable created for every execution contect(every function)
// it takes the value of (points to) its "owner" (the function in which the "this" keyword is used)
// this is not static - it depends on how the function is called and its value is assigned only when the function is actually called

// // this as method
const john = {
  name: "John",
  year: 1989,
  calcAge: function () {
    return 2037 - this.year;
    // In this case, this referrs to the year property(and its value) inside the john object(the "owner" of the this keyword)
  },
};

john.calcAge();
console.log(john.calcAge());

// // this as simple function call -> this = undefined (strict mode); when not using strict mode it will point to the window object;

// // arrow functions don't get the this keyword; it points to the this keyword of it's parent function/scope; this becomes a lexical this;

// // event listener -> this points to the element that the handler is attached to

// // this doesn't point to the function itself, nor to its variable environment

// This keyword in practice

// global scope, this points to the window object
console.log(this);

const calcAge2 = function (birthYear) {
  console.log(2037 - birthYear);
  // as I use strict mode, this points to undefined, otherwise, just like above, it would point to the window object
  console.log(this);
};

// a simple call - function has no owner/not used as a method
calcAge2(1989);

const calcAgeArrow = (birthYear) => {
  console.log(2037 - birthYear);
  // as arrow functions don't get a this keyword, it gets a lexical this keyword which points to the window object
  // this here is the this keyword of its parent which in this case happens to be the window object/global scope
  console.log(this);
};

calcAgeArrow(1989);

const michael = {
  year: 1975,
  calcAge: function () {
    console.log(this);
    console.log(2036 - this.year);
  },
};

// in this situation the this keyword points to its parent, the michael object
michael.calcAge();

const matilda = {
  year: 2017,
};

// method borrowing
// as it is used in a method, the this keyword points to the object that's calling the method which includes the use of the this keyword
matilda.calcAge = michael.calcAge;
matilda.calcAge();

const f = michael.calcAge;
// in this case there is no owner of the f function. As a result it will be evaluated as undefined
// f();

// ************************************************************************************************************* //

// REGULAR FUNCTIONS VS ARROW FUNCTIONS

var firstName2 = "Matilda";

const jack = {
  firstName: "Jack",
  year: "1995",
  calcAge: function () {
    console.log(this);
    console.log(2040 - this.year);

    // using a variable outside the method as a workaround for the lack of this keyword in regular functions
    // this allows us to reference the object property
    // this workaround can be used for arrow functions as well
    const self = this;
    const isMillenial = function () {
      //   // for regular function calls this is evaluated as undefined
      //   console.log(this);
      //   console.log(this.year >= 1981 && this.year <= 1996);

      console.log(self);
      console.log(self.year >= 1981 && self.year <= 1996);
    };
    isMillenial();
  },
  // as arrowfunctions don't get a this keyword, it is evaluated as undefined
  // as objects aren't block scoped but part of the global scope(in this case) the this keyword here will point to the global scope
  greet: () => console.log(`Hey, ${this.firstName}! Hey, ${this.firstName2}!`),
};
jack.greet();
jack.calcAge();

// ************************************************************************************************************* //

// // arguments keyword

const addExpression2 = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpression2(2, 5);

// // arrow functions don't get the arguments keyword
// var addArrow2 = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };

// addArrow2(2, 5);

// ************************************************************************************************************* //

// PRIMITIVES VS OBJECTS

let currentAge = 30;
let oldAge = currentAge;
currentAge = 31;

console.log(currentAge);
console.log(oldAge);

const myself = {
  name: "John",
  age: 30,
};

const friend = myself;

friend.age = 27;
console.log(myself, friend);

// JS PRIMITIVES (primitive types):
// Number, String, Boolean, Undefined, Null, Symbol, BigInt
// Primitve types are stored in the CALL STACK in the following way:
// Identifier   Address   Value
//     age        0001      30

// In our specific case things look like this
// currentAge ->  0001  30
// oldAge  /^ (0001  30)
// upon changing the currentAge value a new memory space is used and a new value is stored
// currentAge   0002   31

//
//
//

// JS OBJECTS (reference types):
// Object literal, Arrays, Functions etc.
// Reference types are stored in the HEAP in the following way:
// Address         value
//                  {
// D30F               name: "John";
//                    age: 30;
//                  }
//
//
// In our specific case, the myself object is stored in the call stack by referencing it's address in the heap
// Identifier   Address    Value
//    myself         0003        D30F
// the friend identifier will point to the same address as myself, which in turn points to the address in the heap
// as a resulf, since they both point to the same address in the heap, changing one's value affects both

//
//
//

// PRACTICE
// primitive types
let lastName = "Williams";
let oldLastName = lastName;
lastName = "Davis";
console.log(lastName, oldLastName);

// reference types
const jessica = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
};

const marriedJessica = jessica;
marriedJessica.lastName = "Davies";
console.log("Before marriage:", jessica);
console.log("After marriage:", marriedJessica);

// copying objects
const clarissa = {
  firstName: "Clarissa",
  lastName: "Williams",
  age: 27,
  family: ["Alice", "Bob"],
};

const clarissaCopy = Object.assign({}, clarissa);
clarissaCopy.lastName = "Davis";
console.log(clarissa, clarissaCopy);
// to change deep nested object, saved in the heap we need a deep clone which is not part of the scope of this section
clarissaCopy.family.push("Mary", "John");
console.log(clarissa, clarissaCopy);
