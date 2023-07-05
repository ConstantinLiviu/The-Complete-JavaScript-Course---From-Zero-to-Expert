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

  if (massMark || heightMark || massJohn || heightJohn) {
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
