"use strict";

//
/* ****************************************************************************************************** */
//  PROJECT - THE BANKIST APP
//

// Misc Elements
const sortBtn = document.querySelector(".sort-transactions-list");

// Header elements
const welcomeMsgEl = document.querySelector(".welcome-msg");

// Login
const loginBtn = document.querySelector(".login-btn");
const userLoginEl = document.querySelector(".username-login");
const loginPinEl = document.querySelector(".pin-login");

// Balance elements
const balanceEl = document.querySelector(".balance-value h1");

// Main
const appContainerEl = document.querySelector(".main");

// Transactions elements
const transactionsContainerEl = document.querySelector(
  ".transactions-row-container"
);

// Summary elements
const valueInEl = document.querySelector(".value-in");
const valueOutEl = document.querySelector(".value-out");
const valueInterestEl = document.querySelector(".value-interest");

// Transfer money elements
const approveTransferBtn = document.querySelector(".form-transfer button");
const transferAmount = document.getElementById("inputAmount");
const transferRecipient = document.getElementById("inputRecipient");

// Loan money elements
const loanBtn = document.querySelector(".form-loan button");
const loanAmountEl = document.getElementById("amount");

// Close account elements
const confirmUserEl = document.getElementById("confirmUser");
const confirmPinEl = document.getElementById("confirmPIN");
const confirmCloseAccountBtn = document.querySelector(".form-close button");

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
  transactionsContainerEl.innerHTML = "";
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
  account.balance = balance;
  balanceEl.textContent = `${balance} €`;
};

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
const calcDisplaySummary = function (account) {
  const income = account.transactions
    .filter((transaction) => transaction > 0)
    .reduce((acc, transaction) => acc + transaction);
  valueInEl.textContent = `${income} €`;

  const outgoing = account.transactions
    .filter((transaction) => transaction < 0)
    .reduce((acc, transaction) => acc + transaction);
  valueOutEl.textContent = `${Math.abs(outgoing)} €`;

  const interest = account.transactions
    .filter((transaction) => transaction > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((interest, index, array) => {
      return interest >= 1;
    })
    .reduce((acc, interest) => acc + interest);
  valueInterestEl.textContent = `${interest} €`;
};

/**
 * Takes in the account that's been accessed and updates the balance/transactions/summary sections based on stored values
 * @param {Object} account one of the predefined objects
 * @returns {void} displays any UI element text content based on changes made on the account
 */
const updateUI = function (account) {
  // Display Balance
  calcDisplayBalance(account);
  // Display Transactions
  displayTransactions(account.transactions);
  // Display summary
  calcDisplaySummary(account);
};

//
/* ****************************************************************************************************** */
// TASK - Login

let currentAccount;

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // check login credentials
  if (!userLoginEl.value || !loginPinEl.value) {
    console.log("invalid login credentials");
    return;
  } else {
    currentAccount = accounts.find((acc) => acc.username === userLoginEl.value);

    if (currentAccount?.pin === +loginPinEl.value) {
      // Display UI & Welcome msg
      welcomeMsgEl.textContent = `Welcome back, ${
        currentAccount.owner.split(" ")[0]
      }!`;
      // Clear input fields
      userLoginEl.value = "";
      userLoginEl.blur();
      loginPinEl.value = "";
      loginPinEl.blur();
      updateUI(currentAccount);

      appContainerEl.style.opacity = 1;
    } else {
      console.log("wrong pin");
    }
    console.log(currentAccount);
  }
});

//
/* ****************************************************************************************************** */
// TASK - Account Transfers

approveTransferBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = +transferAmount.value;
  const beneficiary = accounts.find(
    (account) => account.username === transferRecipient.value
  );
  // reset input fields after confirming transfer
  transferAmount.value = transferRecipient.value = "";
  if (
    // amount > 0 && - input is set to accept amounts greater than 1 only
    currentAccount.balance >= amount &&
    beneficiary &&
    beneficiary?.username !== currentAccount.username
  ) {
    currentAccount.transactions.push(-amount);
    beneficiary.transactions.push(amount);
    updateUI(currentAccount);
  } else {
    console.log("invalid transfer");
  }
});

//
/* ****************************************************************************************************** */
// TASK - close accounts // THE FINDINDEX METHOD
//

// The .findIndex() method returns the index of the first element of an array that satisfies the condition of the callback function

confirmCloseAccountBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    confirmUserEl.value === currentAccount.username &&
    +confirmPinEl.value === currentAccount.pin
  ) {
    confirmPinEl.value = confirmUserEl.value = "";
    const index = accounts.findIndex(
      (account) => account.username === currentAccount.username
    );
    appContainerEl.style.opacity = 0;
    // welcomeMsgEl.textContent = "Account successfully deleted!";
    accounts.splice(index, 1);
  } else {
    console.log("Account credentials are invalid");
  }
});

//
/* ****************************************************************************************************** */
// TASK - Request loans functionality
//
// The bank grants a loan if there is at least one deposit worth at least 10% of the requested loan amount

loanBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const loanAmount = +loanAmountEl.value;

  if (
    loanAmount > 0 &&
    currentAccount.transactions.some(
      (transaction) => transaction >= loanAmount / 10
    )
  ) {
    loanAmountEl.value = "";
    // add deposit
    currentAccount.transactions.push(loanAmount);
    updateUI(currentAccount);
  }
});

//
/* ****************************************************************************************************** */
// TASK - Calculate balance of all transactions on all accounts
//

// The bank wants to calculate the overall balance of all transactions on all accounts combined

// FLAT
// const allAccountsTransactionsBalance = accounts
//   .map((account) => account.transactions)
//   .flat()
//   .reduce((acc, el) => acc + el);

// FLATMAP
const allAccountsTransactionsBalance = accounts
  .flatMap((account) => account.transactions)
  .reduce((acc, el) => acc + el);

console.log(allAccountsTransactionsBalance);

//
/* ****************************************************************************************************** */
// TASK - Sorting transactions
//
let sorted = false;

sortBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (sorted === false) {
    const sortedTransactions = currentAccount.transactions
      .slice()
      .sort((a, b) => a - b);
    displayTransactions(sortedTransactions);
    sorted = true;
  } else {
    displayTransactions(currentAccount.transactions);
    sorted = false;
  }
});

//
/* ****************************************************************************************************** */
// LESSON - Create and fill arrays programatically // THE FILL METHOD
//

// turning a DOM node to an array
balanceEl.addEventListener("click", () => {
  // select DOM elements
  const transactionsLog = document.querySelectorAll(".transaction-value");
  console.log(transactionsLog);

  // This will not work as NodeList objects are not arrays
  // console.log(
  //   transactionsLog.map((transaction) =>
  //     transaction.textContent.replace("€", "")
  //   )
  // );

  // We can you this as the callback function for the array.from method
  // console.log(
  //   transactionsLogArray.map((transaction) =>
  //     Number(transaction.textContent.replace("€", ""))
  //   )
  // );

  // As the nodelist is turned into an array using the Array.from() method, we can call array methods on it
  const transactionsLogArray = Array.from(transactionsLog, (transaction) =>
    Number(transaction.textContent.replace("€", ""))
  );
  console.log(transactionsLogArray);

  //
  // Spread operator method
  // the same result can be achieved by using map function, but without chaining it
  const transactionsLogArraySpread = [
    ...document.querySelectorAll(".transaction-value"),
  ];
  console.log(transactionsLogArraySpread);
});

//
/* ****************************************************************************************************** */
// PRACTICE - Create and fill arrays programatically // THE FILL METHOD
//

// 1. How much was deposited, in total in the bank?

const bankDepositSum = accounts
  .map((account) => account.transactions)
  .flat()
  .filter((transaction) => transaction > 0)
  .reduce((acc, el) => acc + el);

// alt solution
// const bankDepositSum = accounts
//   .flatMap((account) => account.transactions)
//   .filter((transaction) => transaction > 0)
//   .reduce((acc, el) => acc + el);

console.log(bankDepositSum);

// alt solution using reduce
const bankDepositSum2 = accounts
  .flatMap((account) => account.transactions)
  .reduce((acc, el) => (el > 0 ? acc + el : acc), 0);

console.log(`reduce result ${bankDepositSum2}`);

/**********************/

// 2. How many deposits over $1000 have there been?
const depositsOver1k = accounts
  .flatMap((account) => account.transactions)
  .filter((transaction) => transaction > 1000).length;

// alt solution using reduce
const depositsOver1k2 = accounts
  .flatMap((account) => account.transactions)
  .reduce(
    (count, el) =>
      el > 1000
        ? ++count /* unable to use count++, explanation below; we used the prefixed variant ++count */
        : count,
    0
  );

console.log(depositsOver1k, depositsOver1k2);

// The increment operator works, but the result of the expression (variable&increment operator) is still the initial value of the variable
// To fix this, we use the prefixed variant
// let a = 10;
// console.log(a++);
// console.log(a);
// console.log(++a);
// console.log(a);

/**********************/

// 3. Create an object that contains the sum of the deposits and the sum of the withdrawals

const transactionsSums = accounts
  .flatMap((account) => account.transactions)
  .reduce(
    (acc, el) => {
      // el > 0 ? (acc.depositsSum += el) : (acc.withdrawalsSum += Math.abs(el));
      // refactoring
      acc[el > 0 ? "depositsSum" : "withdrawalsSum"] += Math.abs(el);
      return acc; // arrow function with {} body requires a "return" keyword
    },
    { depositsSum: 0, withdrawalsSum: 0 }
  );

console.log(transactionsSums);

/**********************/

// 4. Create a simple function to change a string's case to title case
// this is a nice title -> This Is a Nice Title

const changeTitleCase = function (title) {
  const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];

  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) =>
      exceptions.includes(word)
        ? word
        : word.replace(word[0], word[0].toUpperCase())
    )
    .join(" ");

  console.log(titleCase.replace(titleCase[0], titleCase[0].toUpperCase()));
};

changeTitleCase("a little example");
changeTitleCase("this is a LONG title but not too long");
changeTitleCase("and here is another title with an EXAMPLE");
