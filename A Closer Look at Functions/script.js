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

// document.body.addEventListener("click", high5);
// ["John", "Martha", "Adam"].forEach(high5);

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

// bind doesn't call the function, it creates a new one instead
// the param inside the bind parantheses defines the "this" keyword, in the case below being the lufthansa obj
const bookEW = book.bind(eurowings);
bookEW(15, "Steven Williams");

// Useful with callbacks, create the function once and use it at will
// Each function sets the "this" key word and can be reused when needed
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

// creating a bind for a specific set of parameters (in this case, a certain flight) - partial aplication
const bookEW23 = book.bind(eurowings, 23);
bookEW23("Sarah Mitchell");
bookEW23("Micah Bell");

// With event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

// lufthansa.buyPlane();

// document
//   .querySelector("body")
//   .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));
// calls the lufthansa method to which you add the lufthansa this keyword

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
//we are not interested in the "this" keyword, so we use "null"
const addVAT = addTax.bind(null, 0.23);
// this is what the function looks like now
// addVAT = value => value+value*0.23
console.log(addVAT(100));

// Using function returning function to mimic the example above

const addVAT2 = function (rate) {
  return function (value) {
    console.log(value + value * rate);
  };
};

const addVAT2Applied = addVAT2(0.23);
addVAT2Applied(200);
//
/* ****************************************************************************************************** */
//  CHALLENGE #1
//
// Let's build a simple poll app!

// A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

// Here are your tasks:

// 1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
//   1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
//         What is your favourite programming language?
//         0: JavaScript
//         1: Python
//         2: Rust
//         3: C++
//         (Write option number)

//   1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
// 2. Call this method whenever the user clicks the "Answer poll" button.
// 3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
// 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

// HINT: Use many of the tools you learned about in this and the last section 😉

// BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

// BONUS TEST DATA 1: [5, 2, 3]
// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

// GOOD LUCK 😀

const answerPollBtn = document.querySelector(".answer-poll");
const bonusDataBtn = document.querySelector(".bonus-data-btn");
const dataSet1 = document.querySelector(".bonus-data-set-1");
const dataSet2 = document.querySelector(".bonus-data-set-2");

const javascriptFill = document.querySelector(".javascript .fill");
const resetPoll = document.querySelector(".reset-poll");
const pythonFill = document.querySelector(".python .fill");
const rustFill = document.querySelector(".rust .fill");
const cPlusFill = document.querySelector(".cplus .fill");
const pollTextContentEl = document.querySelector(".poll-text-entries");

const optionsDivs = [javascriptFill, pythonFill, rustFill, cPlusFill];

/**
 * Increases chart values based on poll answers array
 * @param {Element} element - chart element
 * @param {Number} limit - poll array value
 */
function changeChartBg(element, limit) {
  element.style.background = `linear-gradient(
    to right,
    var(--orangeff) ${(limit / 2) * 10}%,
    lightgrey ${(limit / 2) * 10}% 100%
  )`;
}

const poll = {
  question: "What is your favourite programming language?",
  options: ["1: Javascript", "2: Python", "3: Rust", "4: C++"],
  // This generates [0,0,0,0]. More in the next section.
  answers: new Array(4).fill(0),
  // TASK #1
  registerNewAnswer() {
    const answer = +prompt(
      `${this.question}\n${this.options.join("\n")}\n(Write option number)`
    );

    !isNaN(answer) && //check if the answer field was left empty/string was used
      answer > 0 && //check if answer is greater than 0
      answer <= poll.options.length && // check if answer is less than the totl number of available options
      this.answers[answer - 1]++; // increase reponse counter depending on the answer

    // TASK #4
    this.displayResults();
    this.displayResults("string");
    for (const el of optionsDivs) {
      changeChartBg(el, this.answers[optionsDivs.indexOf(el)]);
      el.textContent = this.answers[optionsDivs.indexOf(el)];
    }
  },
  // TASK #3
  displayResults(type = "array") {
    const newP = document.createElement("p");
    if (type === "array") {
      newP.textContent = `[${this.answers}]`;
      pollTextContentEl.appendChild(newP);
    }
    if (type === "string") {
      newP.textContent = `Poll results are ${this.answers.join(", ")}`;
      pollTextContentEl.appendChild(newP);
    }
  },
};

// TASK #2
answerPollBtn.addEventListener("click", poll.registerNewAnswer.bind(poll));

// BONUS
// poll.displayResults.call({ answers: [5, 2, 3] });
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, "string");

// BONUS TASK
bonusDataBtn.addEventListener("click", () => {
  const bonusData = [
    dataSet1.value || [5, 2, 3],
    dataSet2.value || [1, 5, 3, 9, 6, 1],
  ];
  if (typeof bonusData[0] === "string") console.log("e string");

  if (dataSet1.value && dataSet1.value.startsWith("[")) {
    const first = dataSet1.value.replace(/[\[\]]/g, "").split(",");
    bonusData[0] = first;
  }
  if (dataSet2.value && dataSet2.value.startsWith("[")) {
    const second = dataSet2.value.replace(/[\[\]]/g, "").split(",");
    bonusData[1] = second;
  }

  for (const el of bonusData) {
    if (Array.isArray(el)) poll.displayResults.call({ answers: el });
    if (typeof el === "string") {
      let newEl = el.split(",");
      poll.displayResults.call({ answers: newEl }, "string");
    }
  }
});

resetPoll.addEventListener("click", () => {
  for (const el of optionsDivs) {
    changeChartBg(el, 0);
    el.textContent = "0";
    pollTextContentEl.innerHTML = "";
  }
});

//
/* ****************************************************************************************************** */
//  LESSON - Imemediately Invoked Function Expressions (IIFE)
//

// IIFE are functions meant to run only once
// not quite an IIFE as it can be called again countless times
const runOnce = function () {
  console.log("This will never run again");
};
runOnce();

// turning a statement into an expression using wrapping it in () and using () at the end to call it
// This is an IIFE
// The utility of IIFE is scope management, such as securing variables, by encapsulating them
(function () {
  console.log("This will never run again");
  // const isPrivate = 23; //variable is encapsulated
})();

// console.log(isPrivate);

(() => console.log("This will also never run again"))();

{
  const isPrivate = 23; // can't be accessed by outer scope as const establishes the scope of the variable
  var notPrivate = 46; // global variable, can be accessed from outer/global scope
}

// console.log(isPrivate);
console.log(notPrivate);

//
/* ****************************************************************************************************** */
//  LESSON - Closures
//

// A closure is not a feature we implement/set up (i.e. defining an array)
// A closure happens in certain situations
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passangers`);
  };
};

const booker = secureBooking();
booker();
booker();
booker();

// once the secureBooking function executes it is removed from the stack
// even so, as the returned function still has access to the passengerCount variable it is able to update the value of the variable in question even if the function execution was removed from the stack
// Closures help a function remember all the variables that existed at the function's birthplace (in our case, secureBooking is the birthplace of the booker function)
//
//
//
// The global execution environment contains secureBooking and booker
// a new execution context is created when the booker function is run, the variable content being empty (no variable declared in the context)
// the booker scope remains a child of the global scope and as such it shouldn't have access to another global scope child scope
//
// Closures translate into any function having access to the variable environment of the execution context in which the function was created.
// Thanks to closures functions don't lose the connection with variables diclared in the execution context of their delaration
//
// The booker function was created in the execution context of the secureBooking function (which in our case was popped off the stack previously)
// As a result the booker function will get access to the variable environment of the secureBooking execution context (in our case passengerCount)
// This is what allows the booker function to read and manipulate the passengerCount variable

console.dir(booker);

//
/* ****************************************************************************************************** */
//  LESSON - Closures Example
//

// TASK #1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// reassigning function
h();
f();

console.dir(f);

// TASK #2
const boardPassangers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passangers`);
    console.log(`There are 3 groups, each with ${perGroup} passangers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

// const perGroup = 1000; <- proof that closure has priority over scope chain
boardPassangers(180, 3);

//
/* ****************************************************************************************************** */
//  CHALLENGE #2
//
/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/
const changeColorBtn = document.querySelector(".change-color-btn");
const explanationTextEl = document.querySelector(".explanation-text");

(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";

  changeColorBtn.addEventListener("click", () => {
    header.style.color = "var(--blue0d)";
    explanationTextEl.innerHTML = `<p>The IIFE executes as soon as it enters the stack. It assigns the h1 element to the header constant and sets its (h1) text color to red. It then creates an event listener for the button element declared outside the scope of the IIFE and then its execution ends.</p> 
      <p>The listener callback function waits for a user to click the aforementioned button element. Due to closure, it has access to the header constant (which was declared inside the same scope the callback function is declared) and is able to change its (h1) color property, even if the IIFE execution has already ended.</p> 
      <p>It also adds this text as text content to the explanationTextEl (green border) that was declared outside of the IIFE scope.</p>`;
    explanationTextEl.classList.add("border", "border-success", "p-2");
  });
})();
