"use strict";
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
