"use strict";

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
