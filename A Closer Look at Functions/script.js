"use strict";

//
/* ****************************************************************************************************** */
//  LESSON - Default Parameters

const bookingArr = [];

const createBooking = function (flightNum, numPassangers = 1, price = 199) {
  // ES5
  //   numPassangers = numPassangers || 1;
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassangers,
    price,
  };
  console.log(booking);
  bookingArr.push(booking);
};

createBooking("LH123");
createBooking("LH123", 2, 800);

// Arguments can't be skipped
const createBooking2 = function (
  flightNum,
  numPassangers = 1,
  price = 199 * numPassangers
) {
  const booking = {
    flightNum,
    numPassangers,
    price,
  };
  console.log(booking);
  bookingArr.push(booking);
};

createBooking2("LH123", 2);
createBooking2("LH123", 5);

// Workaround for skipping parameters
createBooking2("LH123", undefined, 1000);

//
/* ****************************************************************************************************** */
//  LESSON - Passing arguments: Values vs. Reference

const flight = "LH234";
const john = {
  name: "John Jones",
  passport: 25189275891,
};

const checkIn = function (flightNum, passenger) {
  flightNum = "LH999";
  passenger.name = "Mr. " + passenger.name;

  //   if (passenger.passport === 25189275891) {
  //     alert("Check in");
  //   } else {
  //     alert("Wrong passport no.");
  //   }
};

checkIn(flight, john);
console.log(flight);
console.log(john);
// is the same as
// const flightNum = flight;
// const passenger = john;

//when passing a reference type to a function, what is copied is just the reference to the memory heap

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
};

newPassport(john);
checkIn(flight, john);

// JS doesn't have passing by reference, only by value

//
/* ****************************************************************************************************** */
//  LESSON - First-Class and Higher-Order Functions
//

// FIRST CLASS FUNCTIONS
// JS treats functions as first-class citizens, as a result, functions are basically values

// Functions in JS are just another type of object
// const add = (a, b) => a + b;
// const counter = {
//   value: 23,
//   inc: function () {
//     this.value++;
//   },
// };

// Functions can be passed as arguments to other functions:
// const greet = () => console.log("Hey Jonas");
// btnClose.addEventListener("click", greet);

// We can also return functions from functions

// Methods can be called on functions
// counter.inc.bind(someOtherObject);

// HIGHER ORDER FUNCTIONS
// Are functions that receive another function as an argument, that return a new function or both
// const greet = () => console.log("Hey Jonas"); <- callback function
// btnClose.addEventListener("click", greet); <- Higher order function;

// Function returning a function
// function count() {  <- Higher order function
//   let counter = 0;
//   return function () { <- Returned function
//     counter++;
//   };
// }

//
/* ****************************************************************************************************** */
//  LESSON - Functions Accepting Callback Functions
//

const oneWord = function (str) {
  return str.replaceAll(" ", "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

// takes a function as a param thus is a higher order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  // an example of methods called on functions
  console.log(`Transformed by: ${fn.name}`);
};

transformer("Javascript is the best!", upperFirstWord);

transformer("Javascript is the best!", oneWord);

// JS uses callback all the time
const high5 = function () {
  console.log("🖐");
};

document.body.addEventListener("click", high5);
["John", "Martha", "Adam"].forEach(high5);

//
/* ****************************************************************************************************** */
//  LESSON - Functions Returning Functions
//

// This works due to closures
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

// the function greet returned a new function which was stored in the greeterHey variable
const greeterHey = greet("Hey");
greeterHey("Jonas");
greeterHey("Steven");

// shorthand for the above
greet("Hello")("John");

// Challenge use arrow functions instead of functions returning functions
const greet2 = (greeting, name) => console.log(`${greeting} ${name}`);
greet2("Easily", "done");

// const greet3 = (greeting) =>
//   (name = (name) => console.log(`${greeting} ${name}`));
// greet3("Testing")("arrows");

const greet3 = (greeting) => (name) => console.log(`${greeting} ${name}`);
greet3("Arrows")("Tested");

//
/* ****************************************************************************************************** */
//  LESSON - The call and apply Methods
//

const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, "John Jonas");
lufthansa.book(635, "Sam Smith");
console.log(lufthansa.bookings);

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

// in this case the "this" keyword will point to undefined
// const book = lufthansa.book;
// book(23, "Sarah Williams");
// to fix it we make use of one of the three methods: call(), apply(), bind()
// .call() - arguments as they come
const book = lufthansa.book;
book.call(lufthansa, 239, "Mary Cooper");
console.log(lufthansa);
book.call(eurowings, 23, "Sarah Williams");
console.log(eurowings);

const swiss = {
  airline: "Swiss Air Lines",
  iataCode: "LX",
  bookings: [],
};

book.call(swiss, 583, "Lily Malone");
console.log(swiss);
// console.log([...lufthansa.bookings, ...eurowings.bookings, ...swiss.bookings]);

// .apply() - arguments as an array
const flightData = [583, "George Cooper"];
book.apply(swiss, flightData);
// a workaround for using call instead of apply
// book.call(swiss, ...flightData);
console.log(swiss);

//
/* ****************************************************************************************************** */
//  LESSON - The bind Method
//
