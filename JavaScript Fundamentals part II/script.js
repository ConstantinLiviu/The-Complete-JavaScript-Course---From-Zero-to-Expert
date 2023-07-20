'use strict';

// PRETTIER TEST

// const x = 23;
// const abcs = 'jbsadia';
// if (x === 23) console.log(23);

// const calcAge = birthYear => 2037 - birthYear;

/***********************************************************************************/

// TASK #1
// We work for a company building a smart home thermometer. Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a senson error."

// const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// 1) Understand the problem
//   - What is temperature amplitude? A: the difference between the highest and the lowest temperature
//   - How to compute max and min temperature?
//   - What is a sensor error and how to process it? A: ignore error

// 2) Break the problem into sub-problems
//  - How to ignore errors
//  - Find min/max values
//  - Subtract min from max (=amplitude) and return it

// const calcTempAmplitude = function (temps) {
//   let min = temps[0];
//   let max = temps[0];
//   let amplitude;
//   for (let i = 0; i < temps.length; i++) {
//     if (typeof temps[i] !== 'number') {
//       continue;
//     } else {
//       if (temps[i] < min) min = temps[i];
//       if (temps[i] > max) max = temps[i];
//     }
//   }
//   return (amplitude = max - min);
// };

// console.log(calcTempAmplitude(temperatures));

/***********************************************************************************/

// TASK #2
// Function should now receive 2 arrays of temps

// 1) Understand the problem:
//   - With 2 arrays do we need to run the function multiple times? A: No, just merge the arrays;

// 2) Break the problem into sub-problems
//   - How to merge 2 arrays?

const calcBtnEl = document.querySelector('.amplitude-btn');
const optArrEl = document.querySelector('.optional-values-array');
const minTempEl = document.querySelector('.lowest-temp');
const maxTempEl = document.querySelector('.highest-temp');
const amplitudeEl = document.querySelector('.amplitude-value');

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

const calcTempAmplitude = function (temps, temps2) {
  temps = temps.concat(temps2);
  let min = temps[0];
  let max = temps[0];
  let amplitude;
  for (let i = 0; i < temps.length; i++) {
    if (typeof temps[i] !== 'number') {
      continue;
    } else {
      if (temps[i] < min) min = temps[i];
      if (temps[i] > max) max = temps[i];
    }
  }
  minTempEl.textContent = `${min}℃ ❄`;
  maxTempEl.textContent = `${max}℃ 🌡`;
  amplitudeEl.textContent = `${(amplitude = max - min)}℃ 📊`;
  return (amplitude = max - min);
};

calcBtnEl.addEventListener('click', () => {
  let textareavalues = optArrEl.value.split(',');
  let temperatures2 = [];
  for (let i = 0; i < textareavalues.length; i++) {
    if (isNaN(+textareavalues[i])) {
      continue;
    } else {
      temperatures2.push(+textareavalues[i]);
    }
  }
  console.log(calcTempAmplitude(temperatures, temperatures2));
  optArrEl.value = '';
});

/***********************************************************************************/

// // INTRO TO DEBUGGING

// const measureKelvin = function () {
//   const measurement = {
//     type: 'temp',
//     unit: 'celsius',
//     // C) FIX THE BUG
//     value: Number(prompt('Degrees celsius: ')),
//   };

//   // B) FIND THE BUG
//   console.log(measurement);
//   console.table(measurement);

//   //   console.log(measurement.value);
//   //   console.warn(measurement.value);
//   //   console.error(measurement.value);

//   const kelvin = measurement.value + 273;
//   return kelvin;
// };

// // A) IDENTIFY THE BUG

// console.log(measureKelvin());

/***********************************************************************************/

// TASK #3

const tempArrEl = document.querySelector('.forecast-array');
const forecastBtn = document.querySelector('.forecast-btn');
const forecastStmtEl = document.querySelector('.forecast-statement');

forecastBtn.addEventListener('click', () => {
  let maxTempArr = tempArrEl.value.split(',');
  console.log(printForecast(maxTempArr));
});

function printForecast(arr) {
  let dayCount = 1;
  let forecastMsg = '';
  for (let i = 0; i < arr.length; i++) {
    if (isNaN(+arr[i])) {
      continue;
    } else {
      forecastMsg += `${arr[i]}℃ in ${dayCount} ${
        dayCount > 1 ? 'days, ' : 'day, '
      }`;
      dayCount++;
    }
  }
  forecastStmtEl.textContent = `${forecastMsg.slice(0, -2) + '.'}`;
  tempArrEl.value = '';
}

// // //////////////////////////////////////////////////////////////////////////////////////////////////////
// // JS Practice

// // LECTURE: Functions
// // 1. Write a function called 'describeCountry' which takes three parameters:
// // 'country', 'population' and 'capitalCity'. Based on this input, the
// // function returns a string with this format: 'Finland has 6 million people and its
// // capital city is Helsinki'
// // 2. Call this function 3 times, with input data for 3 different countries. Store the
// // returned values in 3 different variables, and log them to the console

// function describeCountry(country, population, capitalCity) {
//   return `${country} has ${population} million people and its capital city is ${capitalCity}`;
// }

// const romania = describeCountry('Romania', 18, 'Bucharest');
// const finland = describeCountry('Finland', 6, 'Helsinki');
// const germany = describeCountry('Germany', 80, 'Berlin');

// console.log(romania, finland, germany);

// // LECTURE: Function Declarations vs. Expressions
// // 1. The world population is 7900 million people. Create a function declaration
// // called 'percentageOfWorld1' which receives a 'population' value, and
// // returns the percentage of the world population that the given population
// // represents. For example, China has 1441 million people, so it's about 18.2% of
// // the world population
// // 2. To calculate the percentage, divide the given 'population' value by 7900
// // and then multiply by 100
// // 3. Call 'percentageOfWorld1' for 3 populations of countries of your choice,
// // store the results into variables, and log them to the console
// // 4. Create a function expression which does the exact same thing, called
// // 'percentageOfWorld2', and also call it with 3 country populations (can be
// // the same populations)

// function percentageofWorld1(population) {
//   return `${((population / 7900) * 100).toFixed(2)}%`;
// }

// console.log(
//   percentageofWorld1(1441),
//   percentageofWorld1(18),
//   percentageofWorld1(300)
// );

// const percentageOfWorld2 = function (population) {
//   return `${((population / 7900) * 100).toFixed(2)}%`;
// };

// console.log(
//   percentageOfWorld2(152),
//   percentageOfWorld2(2000),
//   percentageOfWorld2(99)
// );

// // LECTURE: Arrow Functions
// // 1. Recreate the last assignment, but this time create an arrow function called
// // 'percentageOfWorld3'

// const percentageOfWorld3 = population => {
//   return `${((population / 7900) * 100).toFixed(2)}%`;
// };

// console.log(
//   percentageOfWorld3(4500),
//   percentageOfWorld3(144),
//   percentageOfWorld3(6)
// );

// // LECTURE: Functions Calling Other Functions
// // 1. Create a function called 'describePopulation'. Use the function type you
// // like the most. This function takes in two arguments: 'country' and
// // 'population', and returns a string like this: 'China has 1441 million people,
// // which is about 18.2% of the world.'
// // 2. To calculate the percentage, 'describePopulation' call the
// // 'percentageOfWorld1' you created earlier
// // 3. Call 'describePopulation' with data for 3 countries of your choice

// function describePopulation(country, population) {
//   return `${country} has ${population} million people, which is ${percentageofWorld1(
//     population
//   )} of the world population.`;
// }

// console.log(
//   describePopulation('Romania', 18),
//   describePopulation('Germany', 18),
//   describePopulation('Finland', 6)
// );

// // LECTURE: Introduction to Arrays
// // 1. Create an array containing 4 population values of 4 countries of your choice.
// // You may use the values you have been using previously. Store this array into a
// // variable called 'populations'
// // 2. Log to the console whether the array has 4 elements or not (true or false)
// // 3. Create an array called 'percentages' containing the percentages of the
// // world population for these 4 population values. Use the function
// // 'percentageOfWorld1' that you created earlier to compute the 4
// // percentage values

// const populations = [1441, 18, 6, 300];
// console.log(populations.length === 4 ? true : false);

// let percentages = [
//   percentageofWorld1(1441),
//   percentageofWorld1(18),
//   percentageofWorld1(6),
//   percentageofWorld1(300),
// ];
// console.log(percentages);

// // LECTURE: Basic Array Operations (Methods)
// // 1. Create an array containing all the neighbouring countries of a country of your
// // choice. Choose a country which has at least 2 or 3 neighbours. Store the array
// // into a variable called 'neighbours'
// // 2. At some point, a new country called 'Utopia' is created in the neighbourhood of
// // your selected country. So add it to the end of the 'neighbours' array
// // 3. Unfortunately, after some time, the new country is dissolved. So remove it from
// // the end of the array
// // 4. If the 'neighbours' array does not include the country ‘Germany’, log to the
// // console: 'Probably not a central European country :D'
// // 5. Change the name of one of your neighbouring countries. To do that, find the
// // index of the country in the 'neighbours' array, and then use that index to
// // change the array at that index position. For example, you can search for
// // 'Sweden' in the array, and then replace it with 'Republic of Sweden'.

// const neighbours = ['Ukraine', 'Moldova', 'Bulgaria', 'Serbia', 'Hungary'];
// neighbours.push('Utopia');
// console.log(neighbours);
// neighbours.pop();
// console.log(neighbours);

// if (!neighbours.includes('Germany'))
//   console.log('Probably not a central European country :D');

// neighbours[1] = 'Republic of Moldova';

// console.log(neighbours);

// // //////////////////////////////////////////////////////////////////////////////////////////////////////

// // LECTURE: Introduction to Objects
// // 1. Create an object called 'myCountry' for a country of your choice, containing
// // properties 'country', 'capital', 'language', 'population' and
// // 'neighbours' (an array like we used in previous assignments)

// let myCountry = {
//   country: 'Romania',
//   capital: 'Bucharest',
//   language: 'romanian',
//   population: 18,
//   neighbours: ['Ukraine', 'Moldova', 'Bulgaria', 'Serbia', 'Hungary'],
//   describe: function () {
//     console.log(
//       `${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}`
//     );
//   },
//   checkIsland: function () {
//     console.log(
//       `${(this.isIsland = this.neighbours.length === 0 ? true : false)}`
//     );
//     // simpler version
//     // this.isIsland = !Boolean(this.neighbours.length);
//   },
// };

// // LECTURE: Dot vs. Bracket Notation
// // 1. Using the object from the previous assignment, log a string like this to the
// // console: 'Finland has 6 million finnish-speaking people, 3 neighbouring countries
// // and a capital called Helsinki.'
// // 2. Increase the country's population by two million using dot notation, and then
// // decrease it by two million using brackets notation.

// console.log(
//   `${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}`
// );

// console.log(
//   `${myCountry.country} has ${myCountry.population + 2} million ${
//     myCountry.language
//   }-speaking people, ${
//     myCountry.neighbours.length
//   } neighbouring countries and a capital called ${myCountry.capital}`
// );

// console.log(
//   `${myCountry.country} has ${myCountry['population'] - 2} million ${
//     myCountry.language
//   }-speaking people, ${
//     myCountry.neighbours.length
//   } neighbouring countries and a capital called ${myCountry.capital}`
// );

// // LECTURE: Object Methods
// // 1. Add a method called 'describe' to the 'myCountry' object. This method
// // will log a string to the console, similar to the string logged in the previous
// // assignment, but this time using the 'this' keyword.
// // 2. Call the 'describe' method
// // 3. Add a method called 'checkIsland' to the 'myCountry' object. This
// // method will set a new property on the object, called 'isIsland'.
// // 'isIsland' will be true if there are no neighbouring countries, and false if
// // there are. Use the ternary operator to set the property.

// myCountry.describe();
// myCountry.checkIsland();

// // //////////////////////////////////////////////////////////////////////////////////////////////////////

// // LECTURE: Iteration: The for Loop
// // 1. There are elections in your country! In a small town, there are only 50 voters.
// // Use a for loop to simulate the 50 people voting, by logging a string like this to
// // the console (for numbers 1 to 50): 'Voter number 1 is currently voting'

// for (let v = 1; v <= 50; v++) {
//   console.log(`Voter ${v} is currently voting`);
// }

// // LECTURE: Looping Arrays, Breaking and Continuing
// // 1. Let's bring back the 'populations' array from a previous assignment
// // 2. Use a for loop to compute an array called 'percentages2' containing the
// // percentages of the world population for the 4 population values. Use the
// // function 'percentageOfWorld1' that you created earlier
// // 3. Confirm that 'percentages2' contains exactly the same values as the
// // 'percentages' array that we created manually in the previous assignment,
// // and reflect on how much better this solution is

// let percentages2 = [];
// for (let i = 0; i < populations.length; i++) {
//   percentages2.push(percentageofWorld1(populations[i]));
// }

// console.log(percentages2, percentages === percentages2 ? true : false);
// // LECTURE: Looping Backwards and Loops in Loops
// // 1. Store this array of arrays into a variable called 'listOfNeighbours'
// // [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden',
// // 'Russia']];
// // 2. Log only the neighbouring countries to the console, one by one, not the entire
// // arrays. Log a string like 'Neighbour: Canada' for each country
// // 3. You will need a loop inside a loop for this. This is actually a bit tricky, so don't
// // worry if it's too difficult for you! But you can still try to figure this out anyway �

// const listOfNeighbours = [
//   ['Canada', 'Mexico'],
//   ['Spain'],
//   ['Norway', 'Sweden', 'Russia'],
// ];

// for (let i = 0; i < listOfNeighbours.length; i++) {
//   for (let j = 0; j < listOfNeighbours[i].length; j++) {
//     console.log(`Neighbour: ${listOfNeighbours[i][j]}`);
//   }
// }

// // LECTURE: The while Loop
// // 1. Recreate the challenge from the lecture 'Looping Arrays, Breaking and Continuing',
// // but this time using a while loop (call the array 'percentages3')
// // 2. Reflect on what solution you like better for this task: the for loop or the while
// // loop?

// let percentages3 = [];
// let i = 0;
// while (i < percentages.length) {
//   percentages3.push(percentageofWorld1(populations[i]));
//   i++;
// }

// console.log(percentages3);
