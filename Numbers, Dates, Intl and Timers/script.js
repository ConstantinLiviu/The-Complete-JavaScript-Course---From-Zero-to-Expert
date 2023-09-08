"use strict";
//
/****************************************************************************************************************************/
// LESSON - NUMBERS
//

// all numbers are represented as floating point numbers (decimals)
console.log(23 === 23.0);

// they are stored in a 64 base 2 format (binary) which makes certain calculations difficult
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

// converting strings to numbers
console.log(Number("23"));
// when JS encounters a + it resorts to type coercion
console.log(+"23");

// Parsing
console.log(Number.parseInt("30px"));
console.log(Number.parseFloat(30));

// without a radix(base), the default value is base 10
console.log(Number.parseInt("99", 10));
console.log(Number.parseInt("0110", 2));

// when using the parseX method we need the string to start with a number
console.log(Number.parseInt("f11", 10));
// there can be spaces in the string
console.log(Number.parseInt("    111234   ", 10));

// to parse floating point numbers
console.log(Number.parseInt("2.5rem"));
console.log(Number.parseFloat("2.5rem"));

// parseX is a global function, they don't need to be called on the Number obj; number provides a namespace
console.log(parseInt("1018", 10));

// isNan - check if the value is a NaN
console.log(Number.isNaN(20));
console.log(Number.isNaN("20"));
console.log(Number.isNaN(+"20x"));
console.log(Number.isNaN("abc"));
console.log(Number.isNaN(23 / 0));

// isFinite - check if value is a number
console.log(Number.isFinite(20));
console.log(Number.isFinite("20"));
console.log(Number.isFinite(+"20X"));
console.log(Number.isFinite(20 / 0));

// isInteger() - check if value is an integer
console.log(Number.isInteger(20));
console.log(Number.isInteger(20.0));
console.log(Number.isInteger(20.4));
console.log(Number.isInteger("20"));
console.log(Number.isInteger(+"20x"));
console.log(Number.isInteger(23 / 0));

//
/****************************************************************************************************************************/
// LESSON - MATH AND ROUNDING
//

// roots
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

// max value
console.log(Math.max(5, 18, 23, 11, 2));
// max method does type coercion
console.log(Math.max(5, 18, "23", 11, 2));
// max method doesn't do parsing
console.log(Math.max(5, 18, "23px", 11, 2));

// min value
console.log(Math.min(5, 18, 23, 11, 2));
console.log(Math.min(5, 18, 23, 11, "2"));

// constants
// use pi to calculate the area of a circle with a 10px radius
console.log(Math.PI * Number.parseFloat("10px") ** 2);

// generate random numbers
console.log(Math.trunc(Math.random() * 6) + 1);
const randomInt = (min, max) =>
  // .floor() is a better choice as it can also handle negative numbers
  Math.floor(Math.random() * (max - min) + 1) + min;
randomInt(1, 6);

// rounding integers - all methods do type coercion
console.log(Math.trunc(23.6));
console.log(Math.round(23.6));
console.log(Math.round(23.1));

console.log(Math.ceil(13.6));
console.log(Math.ceil(13.1));

console.log(Math.floor(79.9));
console.log(Math.floor(79.1));
console.log(Math.floor("79.1"));

// rounding decimals
// .toFixed returns a string; param represents the numbers of decimals you want return and will add 0 to fulfill request
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
// change type to number
console.log(+(2.7).toFixed(2));

//
/****************************************************************************************************************************/
// LESSON - REMAINDER OPERATOR
//

console.log(5 % 2);
console.log(8 % 3);
console.log(6 % 2);

// check if a number is even
const isEven = (n) => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(15));
console.log(isEven(282));

//
/****************************************************************************************************************************/
// LESSON - NUMERIC SEPARATORS
//

// used to increase readability of large numbers
// cannot be placed at the beginning/end of the number, not before/after decimal point or multiple in a row
// 287,460,000,000
const solarSystemDiameter = 287_460_000_000;
console.log(solarSystemDiameter);

const price = 345_99 / 100;
console.log(price);

// numeric separators can't be used when parsing
console.log(Number("230_000"));
console.log(Number.parseInt("230_000"));

//
/****************************************************************************************************************************/
// LESSON - BigInt
//

//Big Integer - primitive type
console.log(2 ** 53 - 1);
// biggest number JS can calculate accurately
console.log(Number.MAX_SAFE_INTEGER);

console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);
console.log(2 ** 53 + 5);

// BigInt
console.log(4845743657465984387652934875623785n);
// constructor function may not be as accurate, depending on how big the number is
console.log(BigInt(4845743657465984387652934875623785));

// Oprations with BIgInt
console.log(10000n + 10000n);
console.log(18239721630712037123097219703128037189n * 1273672167n);

// can't mix regular ints and BigInts
// console.log(17234729642734972342432847n * 23);
// console.log(Math.sqrt(1273672167n));

// Exceptions
console.log(17234729642734972342432847n * BigInt(23));
console.log(20n > 15);
console.log(20n === 20);
console.log(20n == 20);
console.log(17234729642734972342432847n + " works!");

// Divisions
console.log(10n / 3n);

//
/****************************************************************************************************************************/
// LESSON - Creating Dates
//

const now = new Date();
console.log(now);

// JS can parse the string we pass as an arg to the date constructor
console.log(new Date("Sep 08 2023 15:01:29"));
console.log(new Date("March 11, 1997"));
console.log(new Date("2019-11-18T21:31:17.178Z"));

console.log(new Date(2037, 10, 19, 15, 23, 5));
// JS can autocorrect date info, such as November 31st
console.log(new Date(2037, 10, 31));

// unix time
console.log(new Date(0));
// days, hours, minutes, seconds, miliseconds = timestamp
console.log(new Date(3 * 24 * 60 * 60 * 1000));

// Dates have methods
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());
// miliseconds passed since unix time start
console.log(new Date().getTime());
// miliseconds to date
console.log(new Date(2142249780000));
// time stamp for present moment
console.log(Date.now());

console.log(future.setFullYear(2040));
console.log(future);
