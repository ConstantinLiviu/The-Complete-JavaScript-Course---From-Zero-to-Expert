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

const calcBtnEl = document.querySelector('.calc-btn');
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
