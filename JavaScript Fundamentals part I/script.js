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
// CHALLENGE #1
const calcBtn = document.querySelector(".calc-btn");

const markBMIEl = document.querySelector(".mark-BMI-value");
const johnBMIEl = document.querySelector(".john-BMI-value");
const markVsJohnEl = document.querySelector(".boolean-value");

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
    return;
  }

  let BMIMark = (massMark / heightMark ** 2).toFixed(2);
  let BMIJohn = (massJohn / heightJohn ** 2).toFixed(2);

  markBMIEl.textContent = BMIMark;
  johnBMIEl.textContent = BMIJohn;
  markVsJohnEl.textContent = BMIMark > BMIJohn;

  if (BMIMark > BMIJohn) {
    document.querySelector(".boolean-value").style.color = "var(--green28)";
  } else {
    document.querySelector(".boolean-value").style.color = "var(--redff)";
  }

  document.querySelector(".weightM").value = "";
  document.querySelector(".heightM").value = "";
  document.querySelector(".weightJ").value = "";
  document.querySelector(".heightJ").value = "";
});
/*****************************************************************************************/
