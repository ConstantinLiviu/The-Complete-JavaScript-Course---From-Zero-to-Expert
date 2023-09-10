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
const balanceDateEl = document.querySelector(".date span");

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
  transactions: [
    [200, "2019-11-18T21:31:17.178Z"],
    [450, "2019-12-23T07:42:02.383Z"],
    [-400, "2020-01-28T09:15:04.904Z"],
    [3000, "2020-04-01T10:17:24.185Z"],
    [-650, "2020-05-08T14:11:59.604Z"],
    [-130, "2020-07-26T17:01:17.194Z"],
    [70, "2020-07-28T23:36:17.929Z"],
    [1300, "2020-08-01T10:51:36.790Z"],
  ],
  interestRate: 1.2, // %
  pin: 1111,
  locale: "en-US",
};

const account2 = {
  owner: "Maria Melinescu",
  transactions: [
    [5000, "2019-11-01T13:15:33.035Z"],
    [3400, "2019-11-30T09:48:16.867Z"],
    [-150, "2019-12-25T06:04:23.907Z"],
    [-790, "2020-01-25T14:18:46.235Z"],
    [-3210, "2020-02-05T16:33:06.386Z"],
    [-1000, "2020-04-10T14:43:26.374Z"],
    [8500, "2020-06-25T18:49:59.371Z"],
    [-30, "2020-07-26T12:01:20.894Z"],
  ],
  interestRate: 1.5,
  pin: 2222,
  locale: "ro-RO",
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
const displayTransactions = function (account) {
  transactionsContainerEl.innerHTML = "";

  account.transactions
    .map((transaction) => transaction[0])
    .forEach(function (transaction, index) {
      // const date = new Date(account.transactions[index][1]);
      // const day = `${date.getDate()}`.padStart(2, 0);
      // const month = `${date.getMonth() + 1}`.padStart(2, 0);
      // const year = `${date.getFullYear()}`;
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
      <div class="transaction-date me-auto ms-5">${formatDate(
        new Date(account.transactions[index][1]),
        currentAccount
      )}</div>
      <div class="transaction-value">€ ${transaction.toFixed(2)}</div>`;
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
  const balance = account.transactions
    .map((transaction) => transaction[0])
    .reduce((acc, el) => acc + el, 0);
  account.balance = balance;
  balanceEl.textContent = `${balance.toFixed(2)} €`;
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
    .map((transaction) => transaction[0])
    .filter((transaction) => transaction > 0)
    .reduce((acc, transaction) => acc + transaction);
  // const income = account.transactions.filter(
  //   (transaction) => transaction[0] > 0
  // );
  // .reduce((acc, transaction) => acc + transaction[0]);
  valueInEl.textContent = `${income.toFixed(2)} €`;

  const outgoing = account.transactions
    .map((transaction) => transaction[0])
    .filter((transaction) => transaction < 0)
    .reduce((acc, transaction) => acc + transaction);
  // const outgoing = account.transactions
  //   .filter((transaction) => transaction < 0)
  //   .reduce((acc, transaction) => acc + transaction);
  valueOutEl.textContent = `${Math.abs(outgoing).toFixed(2)} €`;

  const interest = account.transactions
    .map((transaction) => transaction[0])
    .filter((transaction) => transaction > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((interest, index, array) => {
      return interest >= 1;
    })
    .reduce((acc, interest) => acc + interest);
  // const interest = account.transactions
  //   .filter((transaction) => transaction > 0)
  //   .map((deposit) => (deposit * account.interestRate) / 100)
  //   .filter((interest, index, array) => {
  //     return interest >= 1;
  //   })
  //   .reduce((acc, interest) => acc + interest);
  valueInterestEl.textContent = `${interest.toFixed(2)} €`;
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
  displayTransactions(account);
  // Display summary
  calcDisplaySummary(account);
};

//
/* ****************************************************************************************************** */
// TASK - Add Dates

/**
 * Takes in a date and formats it based on the user's localazation
 * @param {Date} date account or system generated date
 * @param {Object} acc predefined account object
 * @returns A formated date string based on user's account localization
 */
function formatDate(date, acc) {
  const options = {
    // hour: "numeric",
    // minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    // weekday: "short",
  };
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const hours = `${date.getHours()}`.padStart(2, 0);
  // const minutes = `${date.getMinutes()}`.padStart(2, 0);

  // return `${loginTime.getDate()}/${month}/${loginTime.getFullYear()}, ${hours}:${minutes}`;
  return new Intl.DateTimeFormat(acc.locale, options).format(date);
}

// //day/month/year format
// const loginTime = new Date();

// balanceDateEl.textContent = formatDate(new Date(), currentAccount);

// balanceDateEl.textContent = `${loginTime.getDate()}/${month}/${loginTime.getFullYear()}, ${hours}:${minutes}`;

/* ****************************************************************************************************** */
// TASK - Login

let currentAccount;

// Login bypass
currentAccount = account1;
updateUI(currentAccount);
appContainerEl.style.opacity = 1;

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

      // populate UI
      updateUI(currentAccount);
      // format and display date
      balanceDateEl.textContent = formatDate(new Date(), currentAccount);

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
    currentAccount.transactions.push([-amount, new Date().toISOString()]);
    beneficiary.transactions.push([amount, new Date().toISOString()]);
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

  // const loanAmount = +loanAmountEl.value;
  // updated following the Numbers section of the course
  const loanAmount = Math.floor(loanAmountEl.value);

  if (
    loanAmount > 0 &&
    currentAccount.transactions
      .map((transaction) => transaction[0])
      .some((transaction) => transaction >= loanAmount / 10)
  ) {
    loanAmountEl.value = "";
    // add deposit
    currentAccount.transactions.push([loanAmount, new Date().toISOString()]);
    console.log(currentAccount.transactions);
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
// BUG - sorting function no longer works since introducing dates for transactions;
// TODO - restructure data and fix sorting function;
// TASK - Sorting transactions
//
let sorted = false;

sortBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // if (sorted === false) {
  //   const sortedTransactions = currentAccount.transactions
  //     .slice()
  //     .sort((a, b) => a - b);
  //   // displayTransactions(sortedTransactions);
  //   sorted = true;
  // } else {
  //   // displayTransactions(currentAccount.transactions);
  //   sorted = false;
  // }
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
