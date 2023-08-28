"use strict";

//
/* ****************************************************************************************************** */
//  LESSON - Simple Array Methods
//

// Arrays are objects and get access to methods
let arr = ["a", "b", "c", "d", "e"];

// SLICE - get part of the array without modifying the original
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(1, -2));
// shallow copy
console.log(arr.slice());
console.log([...arr]);

// SPLICE - same as slice only the sliced part is removed from the original array
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

// REVERSE - returns reversed array; it mutates the original array
arr = ["a", "b", "c", "d", "e"];
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2);
console.log(arr2.reverse());
console.log(arr2);

// CONCAT - concatenates arrays; doesn't mutate arrays
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN - joins array elements separated by whatever's in the brackets
console.log(letters.join(" - "));

//
/* ****************************************************************************************************** */
//  LESSON - The new at Method
//

// gets an element at specified index
const arr3 = [23, 11, 64];
console.log(arr3[0]);
console.log(arr3.at(0));

// getting the last element
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1));

// at method
console.log(arr3.at(-1));

// at also works on strings
console.log("john".at(0));
console.log("john".at(-1));

//
/* ****************************************************************************************************** */
//  LESSON - Looping Arrays: forEach
//

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// LOOPING THROUGH ARRAYS
// for ... of option
// can break the loop
for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}
console.log(
  "----------------------------------------------------------------------------------"
);

// forEach option
// can't break the loop
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Transaction ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Transaction ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
});

// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...

//
/* ****************************************************************************************************** */
//  LESSON - forEach With Maps and Sets
//

// MAP
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// SET
const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
console.log(currenciesUnique);
// when it comes to sets, the value and key params are the same
// currenciesUnique.forEach(function (value, key, set) {
//   console.log(`${key}: ${value}`);
// });

currenciesUnique.forEach(function (value, _, set) {
  console.log(`${value}: ${value}`);
});

//
/* ****************************************************************************************************** */
//  LESSON - Data Transformation: Map, Filter, Reduce
//

// MAP - similar to forEach, but it creates a brand new array
// It maps the elements of the old array, executes the callback function and adds them new values to a new array
// Most useful when trying to create new arrays

// FILTER - filter elements from an array that satisfy a certain condition
// Returns a brand new array containing the elements that passed the test condition

// REDUCE - reduces all array elements to a single value (e.g. adding up all array elements)

// MAP
// converting currencies using the map method
const eurTousd = 1.1;
const exchangeUSD = movements.map(function (mov) {
  return Math.trunc(mov * eurTousd);
});

console.log(movements);
console.log(exchangeUSD);

// using for...of
const exchangeUSDfor = [];
for (const trans of movements)
  exchangeUSDfor.push(Math.trunc(trans * eurTousd));
console.log(exchangeUSDfor);

// MAP method using arrow functions
const exchangeUSD2 = movements.map((mov) => Math.trunc(mov * eurTousd));
console.log(exchangeUSD2);

// MAP method gets access to array elements, index and the array itself
const exchangesDescriptions = movements.map(
  (element, index, array) =>
    // if (element > 0) {
    //   // console.log(`Movement ${index + 1}: You deposited ${element}`);
    //   return `Movement ${index + 1}: You deposited ${element}`;
    // } else {
    //   // console.log(`Movement ${index + 1}: You withdrew ${Math.abs(element)}`);
    //   return `Movement ${index + 1}: You withdrew ${Math.abs(element)}`;
    // }
    `Exchange ${index + 1}: You ${
      element > 0 ? "deposited" : "withdrew"
    } $${Math.abs(element)}`
);
console.log(exchangesDescriptions);

//
/* ****************************************************************************************************** */
//  LESSON - The FILTER method
//

// The FILTER method gets access to element, index and the array itself
// movements.filter(function(element, index, array) {

// })

// create an array that only contains deposits(positive values)
const deposit = movements.filter(function (movements) {
  return movements > 0;
});
console.log(movements);
console.log(deposit);

// for...of variant
const depositsFor = [];
for (const movement of movements) {
  if (movement > 0) depositsFor.push(movement);
}
console.log(depositsFor);

// filter withdrawals (negative values)
const withdrawalsFiltered = movements.filter((withdrawal) => withdrawal < 0);
console.log(withdrawalsFiltered);

//
/* ****************************************************************************************************** */
//  LESSON - The REDUCE method
//

// reduce method callback function has the following parameters
// accumulator behaves like a snowball
// movements.reduce(function(accumulator, current element, index, array))

// the 0 at the end is the initial value of the accumulator
const balance = movements.reduce(function (accumulator, element, index, array) {
  console.log(`Iteration ${index}: ${accumulator}`);
  return accumulator + element;
}, 0);
console.log(balance);

// for...of variant
let balanceOf = 0;
for (const movement of movements) {
  balanceOf += movement;
}
console.log(balanceOf);

// arrow function
const balanceArrow = movements.reduce(
  (accumulator, element) => accumulator + element
);
console.log(balanceArrow);

// getting the maximum value
// const maxValue = movements.reduce((acc, el) => {
//   if (acc < el) acc = el;
//   return acc;
// }, movements[0]);
const maxValue = movements.reduce(
  (acc, el) => (acc = acc < el ? el : acc),
  movements[0]
);
console.log(maxValue);

//
/* ****************************************************************************************************** */
//  CHALLENGE #1
//

// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
const printResultsBtn = document.querySelector(".doggy-results-btn");
const dogsJuliaEl = document.querySelector(".dogs-julia");
const dogsKateEl = document.querySelector(".dogs-kate");
const resultsEl = document.querySelector(".results");
const juliaResultsEl = document.querySelector(".julia-results");
const kateResultsEl = document.querySelector(".kate-results");

// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];

// const dogsJulia2 = [9, 16, 6, 8, 3];
// const dogsKate2 = [10, 5, 6, 1, 4];

/**
 * Takes dogs age array, creates a shallow copy and removes the first and last two elements then determines, based on age, if a dog is an adult or a puppy
 * @param {Array} dogsArr1
 * @param {Array} dogsArr2
 * @returns {void} creates and appends elements on the page displaying the research info
 */
const checkDogs = function (dogsArr1, dogsArr2) {
  let correctdogsArr1 = dogsArr1.slice(1, -2);
  let correctdogsArr2 = dogsArr2.slice(1, -2);

  correctdogsArr1.forEach((dog, index) => {
    const newP = document.createElement("p");
    if (dog >= 3) {
      newP.textContent = `Dog number ${
        index + 1
      } is an adult and is ${dog} years old`;
      juliaResultsEl.appendChild(newP);
    } else if (dog < 0) {
      newP.textContent = `Dog number ${index + 1} is imaginary`;
      juliaResultsEl.appendChild(newP);
    } else {
      newP.textContent = `Dog number ${index + 1} is still a puppy 🐶`;
      juliaResultsEl.appendChild(newP);
    }
  });
  correctdogsArr2.forEach((dog, index) => {
    const newP = document.createElement("p");
    if (dog >= 3) {
      newP.textContent = `Dog number ${
        index + 1
      } is an adult and is ${dog} years old`;
      kateResultsEl.appendChild(newP);
    } else if (dog < 0) {
      newP.textContent = `Dog number ${index + 1} is imaginary`;
      kateResultsEl.appendChild(newP);
    } else {
      newP.textContent = `Dog number ${index + 1} is still a puppy 🐶`;
      kateResultsEl.appendChild(newP);
    }
  });
};

printResultsBtn.addEventListener("click", () => {
  resultsEl.classList.add("d-none");
  juliaResultsEl.innerHTML = "";
  kateResultsEl.innerHTML = "";
  resultsEl.classList.remove("d-none");
  const dogsJulia = dogsJuliaEl.value
    ? dogsJuliaEl.value.split(",")
    : [3, 5, 2, 12, 7];

  const dogsKate = dogsKateEl.value
    ? dogsKateEl.value.split(",")
    : [4, 1, 15, 8, 3];

  checkDogs(dogsJulia, dogsKate);
});

//
/* ****************************************************************************************************** */
//  CHALLENGE #2

/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const dogAgesEl = document.querySelector(".dog-ages");
const displayResultsBtn = document.querySelector(".challenge2-results-btn");
const dogAgesResultsEl = document.querySelector(".dog-ages-results");

displayResultsBtn.addEventListener("click", () => {
  dogAgesResultsEl.innerHTML = "";
  const ages = dogAgesEl.value
    ? dogAgesEl.value.split(",").map((el) => (el = +el))
    : [5, 2, 4, 1, 15, 8, 3];
  calcAverageHumanAge(ages);
});

/**
 * Takes in an array represent dog ages, converts values to human ages, filters "underage" dogs and calculates the average age of adult dogs. Also, creates elements and displays the information for the user.
 * @param {Array} ages user generated array representing dog ages
 * @returns {void}
 */
const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map((age) =>
    age <= 2 ? (age = 2 * age) : (age = 16 + 4 * age)
  );
  for (const el of humanAges) {
    const humanAgesEl = document.createElement("p");
    humanAgesEl.innerHTML = `Dog ${
      humanAges.indexOf(el) + 1
    }: In human years, this dog is <span class="taskVariable">${el} years old</span>.`;
    dogAgesResultsEl.appendChild(humanAgesEl);
  }

  const adultDogs = humanAges.filter((age) => age > 18);
  const adultDogsEl = document.createElement("p");
  if (adultDogs.length !== 0) {
    adultDogsEl.innerHTML = `There ${
      adultDogs.length < 2 ? "is" : "are"
    } <span class="taskVariable"> ${adultDogs.length}</span> adult ${
      adultDogs.length < 2 ? "dog" : "dogs"
    }, aged <span class="taskVariable">${adultDogs.join(", ")}</span>.`;
    dogAgesResultsEl.appendChild(adultDogsEl);
  } else {
    adultDogsEl.innerHTML = "There are no adult dogs.";
    dogAgesResultsEl.appendChild(adultDogsEl);
  }

  const averageDogAge = Math.trunc(
    adultDogs.reduce((acc, age) => acc + age, 0) / adultDogs.length
  );
  const averageDogAgeEl = document.createElement("p");
  averageDogAgeEl.innerHTML = `The average age of the adult dogs is <span class="taskVariable">${averageDogAge} years old</span>.`;
  dogAgesResultsEl.appendChild(averageDogAgeEl);
};

// no UI solution
// function calcAverageHumanAge(ages) {
//   const computedAges = ages
//     .map((age) => (age <= 2 ? (age = 2 * age) : (age = 16 + 4 * age)))
//     .filter((age) => age > 18);

//   return Math.trunc(
//     computedAges.reduce((acc, age) => acc + age, 0) / computedAges.length
//   );
//
//  alt for calculating averages
// const average = array.reduce((acc,age,i,arr)=>acc+age/arr.length,0)
// }

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

//
/* ****************************************************************************************************** */
//
