alert("Hello World!");

// variable declaration
// variable type / variable name / variable value
// variable names can't start with digits and can't be reserver words such as "let"
// variables can store any kind of value
// 7 types - number, string, boolean, undefined, null, symbol, bigint
// let js = "amazing";

// conditional statement
// conditional keyword / condition to be tested / executable code if condition is met

// code will be executed as js's value is "amazing"
// if (js === "amazing") alert("Javascript is FUN!");
// code will not be executed as js's value isn't "boring"
// if (js === "boring") alert("Javascript is boring");

// displaying code in browser console
// console.log(40 + 8 + 23 - 10);
// console.log("John");
// console.log(15);

// let firstName = "Bob";
// console.log(firstName);

// let $aba = "asdsad";
// console.log($aba);

/*****************************************************************************************/
// CHALLENGE #1 & #2
const calcBtn = document.querySelector(".calc-btn");

const markBMIEl = document.querySelector(".mark-BMI-value");
const johnBMIEl = document.querySelector(".john-BMI-value");
const markVsJohnEl = document.querySelector(".boolean-value");
const secondChallengeAddon = document.querySelector(".challenge2addon");

calcBtn.addEventListener("click", () => {
  let massMark = document.querySelector(".weightM").value;
  let heightMark = document.querySelector(".heightM").value;
  let massJohn = document.querySelector(".weightJ").value;
  let heightJohn = document.querySelector(".heightJ").value;

  if (massMark && heightMark && massJohn && heightJohn) {
    document.querySelector(".error-msg").style.opacity = 0;
  } else {
    document.querySelector(".error-msg").style.opacity = 1;
    markBMIEl.textContent = "";
    johnBMIEl.textContent = "";
    markVsJohnEl.textContent = "";
    secondChallengeAddon.textContent = "\u00A0";
    return;
  }

  let BMIMark = (massMark / heightMark ** 2).toFixed(2);
  let BMIJohn = (massJohn / heightJohn ** 2).toFixed(2);

  markBMIEl.textContent = BMIMark;
  johnBMIEl.textContent = BMIJohn;
  markVsJohnEl.textContent = BMIMark > BMIJohn;

  if (BMIMark > BMIJohn) {
    document.querySelector(".boolean-value").style.color = "var(--green28)";
    secondChallengeAddon.textContent = `Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`;
  } else {
    document.querySelector(".boolean-value").style.color = "var(--redff)";
    secondChallengeAddon.textContent = `John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})!`;
  }

  document.querySelector(".weightM").value = "";
  document.querySelector(".heightM").value = "";
  document.querySelector(".weightJ").value = "";
  document.querySelector(".heightJ").value = "";
});
/*****************************************************************************************/

// Strings and Template Literals

// const firstName = "Jonas";
// const job = "teacher";
// const birthYear = 1991;
// const year = 2037;

// const jonas =
//   "I'm " + firstName + ", a " + (year - birthYear) + " years old " + job + "!";

// console.log(jonas);

// const jonasConcat = `I'm ${firstName}, a ${year - birthYear} years old ${job}!`;
// console.log(jonasConcat);

// console.log("String \nwith\nmultiple \nlines");
// console.log(`String
// with
// multiple
// lines`);

/*****************************************************************************************/

// If/else statements

// const age = 19;
// // const age = 15;
// const isOldEnough = age >= 18;
// console.log(isOldEnough);

// if (isOldEnough) {
//   console.log("Sarah can start driving 🚗");
// } else {
//   console.log(`Sarah must wait ${18 - age} more years to start driving`);
// }

// const birthYear = 1991;
// if (birthYear <= 2000) {
//   let century = 20;
// } else {
//   let century = 21;
// }

/*****************************************************************************************/

// Type conversion and Coercion

// // conversion
// const inputYear = "1991";
// console.log(Number(inputYear), inputYear);
// console.log(inputYear + 18);

// console.log(Number("Jonas"));
// console.log(typeof NaN);

// console.log(String(23), 23);

// // coercion
// console.log("I am " + 23 + " years old");
// console.log("I am " + "23 " + "years old");

// console.log("23" - "10" - 3);
// console.log("23" + "10" - 3);
// console.log("23" * "2");
// console.log("23" - "3");
// console.log("jonas" - "nas");

/*****************************************************************************************/

// Truthy / Falsy values

// // Falsy
// // 0, '', undefined, null, NaN;
// console.log(Boolean(0));
// console.log(Boolean(""));
// console.log(Boolean(undefined));
// console.log(Boolean(null));
// console.log(Boolean(NaN));

// console.log(Boolean("Jonas"));
// console.log(Boolean({}));

// // const money = 0;
// const money = 100;
// if (money) {
//   console.log("Don't spend it all!");
// } else {
//   console.log("You should get a job!");
// }

// // let height;
// // let height = 123;
// let height = 0;
// if (height) {
//   console.log("Yay! Height is defined");
// } else {
//   console.log("Height is undefined");
// }

/*****************************************************************************************/

// // Equality operators

// const age = 18;
// // const age = 19;
// if (age === 18) console.log("You just became an adult");

// // === strict equality operator - doesn't perform type coercion
// // == loose equality operator - does type coercion

// console.log(18 === 18);
// console.log(18 === "18");

// if (age == "18") console.log("You just became an adult");

// let favorite = prompt("what's your favorite number?");
// console.log(favorite);
// if (favorite == 18) console.log("Cool! 18 is an amazing number!");

// let favorite2 = Number(prompt("what's your favorite number?"));
// console.log(favorite2);
// if (favorite2 === 20) console.log("Cool! 20 is an amazing number!");

/*****************************************************************************************/

// Logical operators

// const hasDriverLicense = true;
// // const hasGoodVision = false;
// const hasGoodVision = true;

// console.log(hasDriverLicense && hasGoodVision);
// console.log(hasDriverLicense || hasGoodVision);
// console.log(!hasDriverLicense || hasGoodVision);
// console.log(hasDriverLicense && !hasGoodVision);

// const shouldDrive = hasDriverLicense && hasGoodVision;
// if (shouldDrive) {
//   console.log("Sarah is able to drive.");
// } else {
//   console.log("Someone else should drive!");
// }

// // const isTired = true;
// const isTired = false;

// console.log(hasDriverLicense || hasGoodVision || isTired);
// console.log(hasDriverLicense && hasGoodVision && isTired);

// if (hasDriverLicense && hasGoodVision && !isTired) {
//   console.log("Sarah is able to drive.");
// } else {
//   console.log("Someone else should drive!");
// }

/*****************************************************************************************/
// CHALLENGE #3

const winnerBtnEl = document.querySelector(".winner-btn");
const dolphinsGamesEl = document.querySelectorAll(".dolphins input");
const koalasGamesEl = document.querySelectorAll(".koalas input");
const championEl = document.querySelector(".champion");

function clearFields() {
  dolphinsGamesEl.forEach((score) => {
    score.value = "";
  });
  koalasGamesEl.forEach((score) => {
    score.value = "";
  });
}

winnerBtnEl.addEventListener("click", () => {
  let scoreDolphins = 0;
  let scoreKoalas = 0;
  for (i = 0; i < dolphinsGamesEl.length; i++) {
    if (dolphinsGamesEl[i].value) {
      scoreDolphins += Number(dolphinsGamesEl[i].value);
      document.querySelector(".error-msg2").style.opacity = 0;
    } else {
      document.querySelector(".error-msg2").style.opacity = 1;
      scoreDolphins = 0;
      scoreKoalas = 0;
      championEl.textContent = "\u00A0";
      return;
    }
  }

  for (i = 0; i < koalasGamesEl.length; i++) {
    if (koalasGamesEl[i].value) {
      scoreKoalas += Number(koalasGamesEl[i].value);
      document.querySelector(".error-msg2").style.opacity = 0;
    } else {
      document.querySelector(".error-msg2").style.opacity = 1;
      scoreDolphins = 0;
      scoreKoalas = 0;
      championEl.textContent = "\u00A0";
      return;
    }
  }

  if (scoreDolphins > scoreKoalas) {
    championEl.textContent = "Dolphins win the trophy! 🏆";
    clearFields();
  } else if (scoreKoalas > scoreDolphins) {
    championEl.textContent = "Koalas win the trophy! 🏆";
    clearFields();
  } else {
    championEl.textContent = "Both win the trophy. 🤝";
    clearFields();
  }
});

/*****************************************************************************************/

// Switch Statements

// const day = "Monday";
// // const day = "Thursday";
// // const day = "Monashf";

// switch (day) {
//   case "Monday": // day === "Monday"
//     console.log("Plan course structure");
//     console.log("Go to coding meetup");
//     break;

//   case "Tuesday":
//     console.log("Prepare theory videos");
//     break;

//   case "Wednesday":
//   case "Thursday":
//     console.log("Write code examples");
//     break;

//   case "Friday":
//     console.log("Record video");
//     break;

//   case "Saturday":
//   case "Sunday":
//     console.log("Enjoy the weekend!");
//     break;

//   default:
//     console.log("Not a valid day!");
// }

// // switch as if/else

// if (day === "Monday") {
//   console.log("Plan course structure");
//   console.log("Go to coding meetup");
// } else if (day === "Tuesday") {
//   console.log("Prepare theory videos");
// } else if (day === "Wednesday" || day === "Thursday") {
//   console.log("Write code examples");
// } else if (day === "Friday") {
//   console.log("Record video");
// } else if (day === "Saturday" || day === "Sunday") {
//   console.log("Enjoy the weekend!");
// } else {
//   console.log("Not a valid day!");
// }

/*****************************************************************************************/

// Statements and Expressions

// // 3+4 is an expression as it produces a value
// // 1991 is an expression as it will produce a value
// // true && false && !false will eventually produce a boolean value

// // statements are a sequence of actions, expressions are like the words  which make up a sentence

// // an if statement doesn't produce a value, it only declares the value of a variable (in this particular case)
// // it only performs an action
// if (23 > 10) {
//   const str = "23 is bigger";
// }

// console.log(`I'm ${2037 - 1991} years old.`);
// // an expression

// // console.log(`I'm ${if (23 > 10) {
// //     const str = "23 is bigger";
// //   }} years old`);
// // a statement which can't be used to substitute an expression. As it doesn't produce a value it can't substitute expressions

// const me = "Jonas";
// console.log(`I'm ${2037 - 1991} years old. My name is ${me}`);
// // as a variable has value it can be used in the above mentioned example

/*****************************************************************************************/

// The Conditional (Ternary) Operator

// // const age = 23;
// const age = 15;

// // condition
// age >= 18
//   ? // if part
//     console.log("I like drinking wine 🍷")
//   : // else part
//     console.log("I like drinking juice 🥤");

// // an operator is an expression as it produces value
// const drink = age >= 18 ? "wine 🍷" : "juice 🥤";
// console.log(drink);

// // Ternary operator as an if/else statement
// let drink2;
// if (age >= 18) {
//   drink2 = "wine 🍷";
// } else {
//   drink2 = "juice 🥤";
// }

// console.log(drink2);

// // ternary operator usage in a template literal
// let age2 = 25;
// console.log(`I like to drink ${age2 >= 18 ? "wine 🍷" : "juice 🥤"}`);

/*****************************************************************************************/
// CHALLENGE #4

const billAmountEl = document.querySelector(".restaurant-bill input");
const tipCalcBtnEl = document.querySelector(".tip-calc-btn");
const fullAmountEl = document.querySelector(".full-amount");

tipCalcBtnEl.addEventListener("click", () => {
  if (!billAmountEl.value) {
    document.querySelector(".error-msg3").style.opacity = 1;
    fullAmountEl.textContent = "\u00A0";
    return;
  } else {
    let bill = Number(billAmountEl.value);
    const tip = 300 >= bill && bill >= 50 ? 0.15 * bill : 0.2 * bill;
    document.querySelector(".error-msg3").style.opacity = 0;
    billAmountEl.value = "";
    fullAmountEl.textContent = `The bill was ${bill}$, the tip was ${tip}$ and the total value ${
      bill + tip
    }$.`;
  }
});

/*****************************************************************************************/
