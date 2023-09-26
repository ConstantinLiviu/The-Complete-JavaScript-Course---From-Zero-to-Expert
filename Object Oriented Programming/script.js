"use strict";

//
// *******************************************************************************************************************//
// CHALLENGE #1
//

// TASK - Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const dacia = new Car("Dacia", 90);
const ford = new Car("Ford", 140);

// TASK - Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;

Car.prototype.accelerate = function () {
  return (this.speed += 10);
};

console.log(dacia.accelerate());
console.log(ford.accelerate());

// TASK - Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;

Car.prototype.brake = function () {
  console.log(this.speed - 5);
};

dacia.brake();
ford.brake();
//
// *******************************************************************************************************************//
// LESSON - What is OOP?
//

// Object oriented programming is a programming paradigm (style of code/the way we organize the code) based on the concept of objects
// It uses objects to model (describe) real world or abstract features
// Objects may contain data (properties) and code (methods). By using objects, we pack data and the corresponding behavior into one block

// In OOP objects are self-contained pieces/blocks of code
// Objects are building blocks of applocations and interact with one another
// Interactions happen thorugh a public interface (API): methods that the code outside of the object can access and use to communicate with the object

// CLASSES are the blueprints used to create objects
// INSTANCES are objects that are created using classes

//
// There are 4 fundamental principles:
// 1. ABSTRACTION
// 2. ENCAPSULATION
// 3. INHERITANCE
// 4. POLYMORPHISM

// ABSTRACTION hides internal implementation details (from users). Helps one get an overview perspective regarding what is being implemented.

// ENCAPSULATION keeps properties and methods private inside a class. This prevents access from outside the class (prevents accidental or intentional manipulation)

// INHERITANCE  allows object to inherit properties and methods from a parent object, reducing the need for duplicate code. It allows programmers to reuse already writtent logic.

// POLYMORPHISM allows children classes to overwrite parent classes methods

//
// *******************************************************************************************************************//
// LESSON - OOP in JS
//

// In classical OOP classes are used to instantiate objects
// Methods are copied from the class to all instances

// In Javascript there are PROTOTYPES and objects are linked to a prototype object
// Prototype Objects contain methods and properties that get inherited by all objects linked to that prototype. (prototypal inheritance/delegation - behavior is deelegated to the linked prototype object)
//
// To instantiate objects in JS there are three methods:
// 1. CONSTRUCTOR FUNCTIONS
// - used to create objects from a function
// - this is how built-in objects like Arrays, Maps or Sets are actually implemented

// 2. ES6 CLASSES
// - modern alternative to constructor function syntax
// - "Syntactic sugar": behind the scenes, ES6 classes work like constructor functions;
// - ES6 classes do NOT behave like classes in classical OOP

// 3. Object.create()
// - easiest way to link an object to a prototype object

//
// *******************************************************************************************************************//
// LESSON - Constructor Functions and the "new" Operator
//

// constructor functions start with a capital letter (convention)
// arrow functions can't be used as they have no "this" keyword
const Person = function (firstName, birthYear) {
  // Instance properties - available on all instances of the Person object
  this.firstName = firstName;
  this.birthYear = birthYear;

  //   We can add both properties and methods
  //   Never create methods inside constructor functions; for big scale apps it would mean creating hundreds/thousands of copies of this function
  //   To solve the issue just use prototypal inheritance
  //   this.calcAge = function () {
  //     console.log(2023 - this.birthYear);
  //   };
};

const john = new Person("John", 1981);

// BEHIND THE SCENES:
// 1. New empty object is created
// 2. Function is called, this = {} (will point to the empty object that was just created)
// 3. The empty object is linked to the prototype
// 4. The function automatically returns the object

console.log(john);

const matilda = new Person("Matilda", 2017);
const mark = new Person("Mark", 1975);
console.log(matilda);
console.log(mark);

const jay = "Jay";
console.log(john instanceof Person);
console.log(jay instanceof Person);

// john.calcAge();

//
// *******************************************************************************************************************//
// LESSON - Prototypes
//

console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};

// Using the calcAge() method on the john object is possible due to prototypal inheritance
john.calcAge();

// The prototype of the john object is the prototype property of the constructor function
console.log(john.__proto__);
console.log(john.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(john));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person));

// inherited methods are not part of the object proper
Person.prototype.species = "Homo Sapiens";
console.log(john.species, matilda.species);

console.log(john.hasOwnProperty("firstName"));
console.log(john.hasOwnProperty("species"));

//
// *******************************************************************************************************************//
// LESSON - Prototypal Inheritance and The Prototype Chain on Built-In Objects
//

console.log(john.__proto__);
// Object.prototype (top of prototype chain)
console.log(john.__proto__.__proto__);
console.log(john.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);
console.dir(Person.prototype.constructor.__proto__);

const arr = [3, 5, 4, 23, 5, 67, 7, 3, 7]; // [] === new Array
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());
const btn = document.querySelector(".main-page-btn");
console.dir(btn);
console.dir((x) => x + 1);
