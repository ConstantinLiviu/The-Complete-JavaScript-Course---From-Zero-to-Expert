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

// SPLICE - same as slice only the sliced part is removed from the array
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
//  LESSON - THE BANKIST APP
//

// Elements
const transactionsContainerEl = document.querySelector(
  ".transactions-row-container"
);

// Data
const account1 = {
  owner: "John Gamble",
  transactions: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Millie Melvin",
  transactions: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Jack Jacob Johanson",
  transactions: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Serena Davis",
  transactions: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/**
 * Takes in the user's account transactions and creates/displays an element on the page provinding all available infor about each transaction
 * @param {Array} transactions - array that represents deposits/withdrawals from users' accounts
 * @returns {Element} appends an element with transaction info on the page
 */
const displayTransactions = function (transactions) {
  transactions.forEach(function (transaction, index) {
    const transactionRow = document.createElement("div");
    transactionRow.classList.add(
      "transactions-row",
      "d-flex",
      "px-3",
      "py-5",
      "px-0",
      "justify-content-between",
      "align-items-center",
      "border-bottom",
      "border-1"
    );
    transactionRow.innerHTML = `<div
      class="transaction-type ${
        transaction > 0 ? "deposit" : "withdrawal bg-danger"
      } p-0  rounded-pill text-white"
    >
      ${index + 1} ${transaction > 0 ? "deposit" : "withdrawal"}
    </div>
    <div class="transaction-date me-auto ms-5">TBD</div>
    <div class="transaction-value">${transaction} €</div>`;
    if (index === 0) {
      transactionRow.classList.remove("border-bottom", "border-1");
    }
    transactionsContainerEl.insertBefore(
      transactionRow,
      transactionsContainerEl.firstChild
    );
  });
};

displayTransactions(account1.transactions);

//
/* ****************************************************************************************************** */
//
