"use strict";

//
/* ****************************************************************************************************** */
//  PROJECT - THE BANKIST APP
//

// Elements
const transactionsContainerEl = document.querySelector(
  ".transactions-row-container"
);
const balanceEl = document.querySelector(".balance-value h1");

// Summary elements
const valueInEl = document.querySelector(".value-in");
const valueOutEl = document.querySelector(".value-out");
const valueInterestEl = document.querySelector(".value-interest");

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

//
/* ****************************************************************************************************** */
//
// TASK - update transactions

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

// TASK - compute usernames

/**
 * Loops through all user objects and creates a username key and assigns it a value
 * @param {Array} accounts - an array consisting all user objects
 */
const createUsername = function (accounts) {
  accounts.forEach((account) => {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((el) => el[0])
      .join("");
  });
};

createUsername(accounts);

// const user = "Steven Thomas Williams";
// const username = user
//   .toLowerCase()
//   .split(" ")
//   .map((el) => el[0])
//   .join("");

// createUsername("Ana Nicoleta Augusta Lovisneanu");

//
/* ****************************************************************************************************** */
// TASK - display account balance

const calcDisplayBalance = function (account) {
  const balance = account.transactions.reduce((acc, el) => acc + el, 0);
  balanceEl.textContent = `${balance} €`;
};

calcDisplayBalance(account1);

//
/* ****************************************************************************************************** */
// TASK - currency convertor // chaining methods // display summary

// CHAINING METHODS EXAMPLE
// const eurToUSD = 1.1;
// const transactions = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // PIPELINE
// const totalDepositsUSD = transactions
//   .filter((transaction) => transaction > 0)
//   .map((transaction) => transaction * eurToUSD)
//   .reduce((acc, transaction) => acc + transaction);

// console.log(totalDepositsUSD);

// // DEB*GGING CHAINED METHODS
// const totalDepositsUSD2 = transactions
//   .filter((transaction) => transaction < 0)
//   .map((transaction, index, array) => {
//     console.log(array);
//     return transaction * eurToUSD;
//   })
//   .reduce((acc, transaction) => acc + transaction);

/**
 * Takes in all available account transactions and displays the total amount for deposits, withrawals and the interest owed by the bank
 * @param {Array} transactions Transaction values stored for each account
 * @returns {void} void
 */
const calcDisplaySummary = function (transactions) {
  const income = transactions
    .filter((transaction) => transaction > 0)
    .reduce((acc, transaction) => acc + transaction);
  valueInEl.textContent = `${income} €`;

  const outgoing = transactions
    .filter((transaction) => transaction < 0)
    .reduce((acc, transaction) => acc + transaction);
  valueOutEl.textContent = `${Math.abs(outgoing)} €`;

  const interest = transactions
    .filter((transaction) => transaction > 0)
    .map((deposit) => (deposit * 1.2) / 100)
    .filter((interest, index, array) => {
      // console.log(array);
      return interest >= 1;
    })
    .reduce((acc, interest) => acc + interest);
  valueInterestEl.textContent = `${interest} €`;
};

calcDisplaySummary(account1.transactions);
//
/* ****************************************************************************************************** */
// TASK -
