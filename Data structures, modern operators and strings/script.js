"use strict";

// LESSON DATA

const restaurant = {
  name: "Classico Ialiano",
  location: "Via Angelo Travanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = "20:00",
    address,
  }) {
    // console.log(obj);
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is you delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  },
  orderPizza: function (mainIng, ...otherIng) {
    console.log(mainIng, otherIng);
  },
};

// ****************************************************************************************************************** //

// LESSON - DESTRUCTURING ARRAYS
// old ways
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// ES6 way
const [x, y, z] = arr;
console.log(a, b, c, x, y, z);

// getting first two elements
// const [first, second] = restaurant.categories;
// console.log(first, second);

// getting elements 1 and 3
let [first, , second] = restaurant.categories;
console.log(first, second);

// switching element position the old way
let [main, , secondary] = restaurant.categories;

let temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary);

// switching element position using destructuring
[first, second] = [second, first];
console.log([first, second]);

// receive two return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// nested arrays
const nested = [2, 4, [5, 6]];
const [one, , two] = nested;
console.log(one, two);

// default values
const [p = 1, q = 1, r = 1] = [8, 9];
const [s = 1, t = 1, u = 1] = [9];
console.log(p, q, r);
console.log(s, t, u);

// ****************************************************************************************************************** //

// LESSON - DESTRUCTURING OBJECTS
// as in objects the order ofthe elements is irrelevant, we don't need to skip elements when destructuring
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// default values
// starterMenu - new variable name + default value
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// mutating variables while destructuring objects
let d = 111;
let e = 999;
const obj = { d: 23, e: 7, f: 14 };
// to mutate variables you need to use brackets
// this is due to the fact that starting with curly braces JS expects a code block;
({ d, e } = obj);
console.log(d, e);

// nested objects
// retrieve Friday
const { fri } = openingHours;
console.log(fri);
const {
  fri: { open: o, close: f },
} = hours;
console.log(o, f);

//destructuring practical application
// simply logging the object
// restaurant.orderDelivery({
//   time: "22:30",
//   address: "Some address, 15",
//   mainIndex: "2",
//   starterIndex: "2",
// });

restaurant.orderDelivery({
  time: "22:30",
  address: "Some address, 15",
  mainIndex: "2",
  starterIndex: "2",
});

restaurant.orderDelivery({
  address: "Another address, 1",
  starterIndex: 1,
});

// ****************************************************************************************************************** //

// LESSON - THE SPREAD OPERATOR
// it works on iterable elements
// iterables - arrays, strings, maps, sets. NOT objects
const arr2 = [7, 8, 9];
const badNewArr = [1, 2, arr2[0], arr2[1], arr2[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr2];
console.log(newArr);
console.log(...newArr);

const newMenu = [...restaurant.mainMenu, "Gnocci"];
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join arrays
const menu2 = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu2);

// spread op for strings
const str = "Jonas";
const letters = [...str, "", "S."];
console.log(letters);
// console.log(...letters);
// will not work as we can't use multiple variables separated by a coma
// console.log(`${...str} Mann`);

// // using spread operator in obj method
// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt("Ingredient 2?"),
//   prompt("Ingredient 2?"),
// ];

// // console.log(ingredients);
// restaurant.orderPasta(...ingredients);

// spread operator for objects, possible since ES2018
const newRestaurant = {
  foundingYear: 1998,
  ...restaurant,
  founder: "Giuseppe",
};
console.log(newRestaurant);

// copying objects and changing values using the spread operator
const restaurantCopy = { ...restaurant };
restaurantCopy.name = "Ristorante Roma";
console.log(restaurant.name, restaurantCopy.name);

// ****************************************************************************************************************** //

// LESSON - REST PATTERN AND REST PARAMETERS
// rest is used to pack elements into an array

// spread -> right side of the operator (=)
const arr3 = [1, 2, ...[3, 4]];

// rest -> left side of the operator (=)
const [aa, bb, ...others] = [1, 2, 3, 4, 5];
console.log(aa, bb, others);

// rest pattern must always be the last in the assignment!
// there can only be one rest element in any assignment!
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza);
console.log(risotto);
console.log(otherFood);

// Rest pattern in Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// Rest parameters in Functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const w = [23, 5, 7];
add(...w);

restaurant.orderPizza("mushrooms", "onion", "olives", "spinach");
restaurant.orderPizza("mushrooms");

// ****************************************************************************************************************** //

// LESSON - Short circuiting (&& and ||)

// USE ANY data type, RETURN ANY type, return a short circuit evaluation

// THE || operator
// in this case use two non-boolean values; if the first value is truthy it returns the first value; JS won't even evaluate the second element; if not, it will return the second element
console.log(3 || "Jonas");

console.log("" || "Jonas");
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || "");

// logs Hello as it is the first truthy value
console.log(undefined || 0 || "" || "Hello" || 23 || null);

// restaurant.numGuests = 23;
// In practice
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

// the && operator short-circuits when encountering the first falsy value
console.log(0 && "Jonas");
console.log(7 && "Jonas");

console.log("Hello" && 23 && null && "jonas");

if (restaurant.orderPizza) {
  restaurant.orderPizza("mushroom", "spinach");
}

restaurant.orderPizza && restaurant.orderPizza("mushrooms", "spinach");

// ****************************************************************************************************************** //

// LESSON - The Nullish Coalescing Operator (??)

restaurant.numGuests = 0;
const guests3 = restaurant.numGuests || 10;
console.log(guests3);

// Nullish: null and undefined (NOT 0  or "")
const guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect);

// ****************************************************************************************************************** //

// LESSON - Logical Assignment Operators (ES2021)
const restaurant1 = {
  name: "Capri",
  // numGuests: 20,
  numGuests: 0,
};

const restaurant2 = {
  name: "La Piazza",
  owner: "Giovanni Rossi",
};

// restaurant1.numGuests = restaurant1.numGuests || 10;
// restaurant2.numGuests = restaurant2.numGuests || 10;
// console.log(restaurant1.numGuests, restaurant2.numGuests);

// // OR (||=) logical assignment operator
// restaurant1.numGuests ||= 10;
// restaurant2.numGuests ||= 10;
// console.log(restaurant1.numGuests);
// console.log(restaurant2.numGuests);

// NULLISH (??=) logical assignment operator (null / undefined)
restaurant1.numGuests ??= 10;
restaurant2.numGuests ??= 10;
console.log(restaurant1);
console.log(restaurant2);

// AND (&&=) logical assignment operator
// assign a value to a variable if it's truthy
// restaurant2.owner = restaurant2.owner && "Anonymous";
// restaurant1.owner = restaurant1.owner && "Anonymous";
restaurant1.owner &&= "Anonymus";
restaurant2.owner &&= "Anonymus";

console.log(restaurant2);
console.log(restaurant1);

// ****************************************************************************************************************** //
// CHALLENGE #1
// 1. Create one player array for each team (variables "players1" and "players2").

// 2. The first player in any player array is the goalkeeper and the other are field players. For Bayern Munich (team 1) create one variable ("gk") with the goalkeeper's name and one array ("fieldPlayers") with all the remaining 10 field players.

// 3. Create an array "allPlayers" containing all players of both teams (22 players).

// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ("players1Final") containing all the original team1 players plus "Thiago", "Coutinho" and "Perisic".

// 5. Based on the game.odds Object, create one variable for each odd (called 'team1', "draw" and "team2").

// 6. Write a function ("printGoals") that receives an arbitrary number of player names (Not an array) and prints each of them to the console, along with the number of goals who were scored (number of player names passed in).

// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

// TEST DATA FOR 6: Use players "Davies", "Muller", "Lewandowski" and "Kimmich". Then, call the function again with players from game.scored.

// const game = {
//   team1: "Bayern Munich",
//   team2: "Borrusia Dortmund",
//   players: [
//     [
//       "Neuer",
//       "Pavard",
//       "Martinez",
//       "Alaba",
//       "Davies",
//       "Kimmich",
//       "Goretzka",
//       "Coman",
//       "Muller",
//       "Gnarby",
//       "Lewandowski",
//     ],
//     [
//       "Burki",
//       "Schulz",
//       "Hummels",
//       "Akanji",
//       "Hakimi",
//       "Weigl",
//       "Witsel",
//       "Hazard",
//       "Brandt",
//       "Sancho",
//       "Gotze",
//     ],
//   ],
//   score: "4:0",
//   scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
//   date: "Nov 9th, 2037",
//   odds: {
//     team1: 1.33,
//     X: 3.25,
//     team2: 6.5,
//   },
// };

// // TASK #1
// const player1 = [...game.players[0]];
// const player2 = [...game.players[1]];
// console.log(player1);
// console.log(player2);

// // TASK #2
// const [gk, ...fieldPlayers] = player1;
// console.log(gk);
// console.log(fieldPlayers);

// // TASK #3
// const allPlayers = [...game.players[0], ...game.players[1]];
// console.log(allPlayers);

// // TASK #4
// const players1Final = [...game.players[0], "Thiago", "Coutinho", "Perisic"];
// console.log(players1Final);

// // TASK #5
// const { team1: team1, X: draw, team2: team2 } = game.odds;
// console.log(team1, draw, team2);
// ALT
// const {odds: {team1, x:draw, team2}} = game
// console.log(team1, draw, team2)

// // TASK #6
// function printGoals(...players) {
//   console.log(
//     `${players.length} ${players.length !== 1 ? "goals" : "goal"} ${
//       players.length !== 1 ? "were" : "was"
//     } scored`
//   );

//   let goalscorers = {};

//   for (let i = 0; i < players.length; i++) {
//     if (goalscorers[players[i]]) {
//       goalscorers[players[i]] += 1;
//     } else {
//       goalscorers[players[i]] = 1;
//     }
//   }
//   console.log(goalscorers);

//   for (const player in goalscorers) {
//     console.log(
//       `${player} scored ${goalscorers[player]}  ${
//         goalscorers.player !== 1 ? "goals" : "goal"
//       }`
//     );
//   }
// }
// printGoals(...game.scored);

// // TASK #7
// console.log(
//   `${
//     (game.odds.team1 < game.odds.team2 && game.team1) || game.team2
//   } is more likely to win`
// );

// USER INPUT CASE
const printChallengeResultsBtn = document.querySelector(
  ".print-challenge-results-btn"
);

const teamName1El = document.querySelector(".team1-input-name");
const teamName2El = document.querySelector(".team2-input-name");
const teamRoster1El = document.querySelector(".team1-input-roster");
const teamRoster2El = document.querySelector(".team2-input-roster");
const teamSubstitutes1El = document.querySelector(".team1-input-substitutes");
const teamSubstitutes2El = document.querySelector(".team2-input-substitutes");
const team1GoalscorersEl = document.querySelector(".team1-input-goalscorers");
const team2GoalscorersEl = document.querySelector(".team2-input-goalscorers");
const gameOddsWin1El = document.querySelector(".game-odds-win1-input");
const gameOddsDrawEl = document.querySelector(".game-odds-draw-input");
const gameOddsWin2El = document.querySelector(".game-odds-win2-input");
const team1ScoreEl = document.querySelector(".team1-input-score");
const team2ScoreEl = document.querySelector(".team2-input-score");
const errorMsgEl = document.querySelector(".error-msg");
const resultsEl = document.querySelector(".results");

/**
 * Displays the team roster
 * @param {arr} teamRoster - array of player names
 * @param {string} ind - team name
 * @returns {void} creates and adds a new element on page displaying the team roster
 */
function teamRoster(teamRoster, ind) {
  let [gk, ...players] = [...teamRoster];
  const newP = document.createElement("p");
  resultsEl.appendChild(newP);
  newP.innerHTML = `<span class="taskVariable">${ind}</span>'s goalkeeper is <span class="taskVariable">${gk}</span>. The rest of the team is made up of <span class="taskVariable">${players}</span>`;
}

/**
 * Displays the starting 11 of both teams
 * @param {arr} players - array of arrays of player names
 * @returns {void} - creates and adds a new element on page displaying every player
 */
function allPlayers(players) {
  const newP = document.createElement("p");
  resultsEl.appendChild(newP);
  newP.textContent = `Today's players are ${players}`;
}

/**
 * Displays team substitute players
 * @param {arr} players - arr of players' names
 * @param {string} subs - user input subs names
 * @param {string} teamName - team name
 * @returns {void} - creates and adds a new element on page displaying substitutes used during the game
 */
function substitutions(players, subs, teamName) {
  const newP = document.createElement("p");
  if (subs === "none") {
    newP.innerHTML = `<span class="taskVariable">${teamName}</span> didn't use any substitutes during this match. There were no roster changes.`;
  } else {
    let string = " " + subs.replaceAll(",", ", ").split(",").splice(0, 3);
    newP.innerHTML = `<span class="taskVariable">${teamName}</span> used substitutes in this match. The following players were on field during this match: <span class="taskVariable">${[
      players,
      string,
    ]}</span>`;
  }
  resultsEl.appendChild(newP);
}

/**
 * Displays goalscorers and the amount of goals each one scored
 * @param {arr} players
 * @param {string} team
 * @returns {void} - creates and adds a new element on page displaying who and how many goals they scored
 */
function printGoals(players, team) {
  const newP = document.createElement("p");
  if (players === "none") {
    newP.innerHTML = `<span class="taskVariable">${team}</span> scored no goals today.`;
    resultsEl.appendChild(newP);
    return;
  } else {
    let scorers = players.replaceAll(" ", "").split(",");
    newP.innerHTML = `<span class="taskVariable"> ${team} </span> scored ${+team1ScoreEl.value} ${
      +team1ScoreEl.value + +team2ScoreEl.value !== 1 ? "goals" : "goal"
    } during this match.`;

    let goalscorers = {};
    let finalString = "";

    for (let i = 0; i < scorers.length; i++) {
      if (goalscorers[scorers[i]]) {
        goalscorers[scorers[i]] += 1;
      } else {
        goalscorers[scorers[i]] = 1;
      }
    }

    for (const player in goalscorers) {
      finalString += ` <span class="taskVariable">${player}</span> scored <span class="taskVariable">${
        goalscorers[player]
      }</span> ${goalscorers[player] === 1 ? "goal" : "goals"},`;
    }
    newP.innerHTML += finalString.slice(0, finalString.length - 1).concat(".");
  }
  resultsEl.appendChild(newP);
}

/**
 * Predicts the winner of the game based on available odds
 * @param {obj} game - the game object
 * @returns {void} - creates and adds a new element on page displaying the team most likely to win the match
 */
function resultPrediction(game) {
  const newP = document.createElement("p");
  newP.innerHTML = `<span class="taskVariable">${
    (game.odds.team1 < game.odds.team2 && game.team1) || game.team2
  }</span> is more likely to win`;
  resultsEl.appendChild(newP);
}

printChallengeResultsBtn.addEventListener("click", () => {
  resultsEl.innerHTML = "";
  errorMsgEl.style.visibility = "none";
  if (
    !teamName1El.value ||
    !teamName2El.value ||
    !teamRoster1El.value ||
    !teamRoster2El.value ||
    !gameOddsWin1El.value ||
    !gameOddsDrawEl.value ||
    !gameOddsWin2El.value ||
    !team1ScoreEl.value ||
    !team2ScoreEl.value
  ) {
    errorMsgEl.style.display = "block";
    errorMsgEl.textContent =
      "* One or more required field(s) (team names, team rosters, game outcome, goalscorers or final score) were left empty or incomplete. The test data set will be used.";
    const game = {
      team1: "Bayern Munich",
      team2: "Borrusia Dortmund",
      players: [
        [
          " Neuer",
          " Pavard",
          " Martinez",
          " Alaba",
          " Davies",
          " Kimmich",
          " Goretzka",
          " Coman",
          " Muller",
          " Gnarby",
          " Lewandowski",
        ],
        [
          " Burki",
          " Schulz",
          " Hummels",
          " Akanji",
          " Hakimi",
          " Weigl",
          " Witsel",
          " Hazard",
          " Brandt",
          " Sancho",
          " Gotze",
        ],
      ],
      team1Subs: [" Thiago", " Coutinho", " Perisic"],
      score: "4:0",
      scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
      date: "Nov 9th, 2037",
      odds: {
        team1: 1.33,
        X: 3.25,
        team2: 6.5,
      },
    };

    allPlayers(game.players);
    teamRoster(game.players[0], game.team1);
    teamRoster(game.players[1], game.team2);
    const newP1 = document.createElement("p");
    newP1.innerHTML = `<span class="taskVariable">${
      game.team1
    }</span> used substitutes in this match. The following players were on field during this match: <span class="taskVariable">${[
      game.team1Subs,
    ]}</span>`;
    resultsEl.appendChild(newP1);

    const newP2 = document.createElement("p");
    newP2.innerHTML = `<span class="taskVariable">${game.team2}</span> didn't use any substitutes during this match. There were no roster changes.`;
    resultsEl.appendChild(newP2);

    const newP3 = document.createElement("p");
    newP3.innerHTML = `<span class="taskVariable">${game.team1}</span> scored 4 goals today. Lewandowski scored 2 goals, Gnarby scored 1 goal and Hummels scored 1 goal.`;
    resultsEl.appendChild(newP3);

    const newP4 = document.createElement("p");
    newP4.innerHTML = `<span class="taskVariable">${game.team2}</span> scored no goals today.`;
    resultsEl.appendChild(newP4);

    resultPrediction(game);
  } else {
    errorMsgEl.style.display = "none";
    const game = {
      team1: teamName1El.value,
      team2: teamName2El.value,
      players: [
        teamRoster1El.value.replaceAll(",", ", ").split(",").splice(0, 11),
        teamRoster2El.value.replaceAll(",", ", ").split(",").splice(0, 11),
      ],
      team1Subs: teamSubstitutes1El.value || "none",
      team2Subs: teamSubstitutes2El.value || "none",
      score: `${team1ScoreEl.value}:${team2ScoreEl.value}`,
      scored: team1GoalscorersEl.value || "none",
      scored2: team2GoalscorersEl.value || "none",
      date: "Nov 16th, 2037",
      odds: {
        team1: +gameOddsWin1El.value,
        X: +gameOddsDrawEl.value,
        team2: +gameOddsWin2El.value,
      },
    };
    allPlayers(game.players);
    teamRoster(game.players[0], game.team1);
    teamRoster(game.players[1], game.team2);
    substitutions(game.players[0], game.team1Subs, game.team1);
    substitutions(game.players[1], game.team2Subs, game.team2);
    printGoals(game.scored, game.team1);
    printGoals(game.scored2, game.team2);
    resultPrediction(game);
  }
});

// ****************************************************************************************************************** //

// LESSON - For ... of Loop

const restaurant3 = {
  name: "Classico Ialiano",
  location: "Via Angelo Travanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = "20:00",
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is you delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  },
  orderPizza: function (mainIng, ...otherIng) {
    console.log(mainIng, otherIng);
  },
};

const menu3 = [...restaurant3.starterMenu, ...restaurant3.mainMenu];

for (const item of menu3) console.log(item);

// getting the iterrated element index
for (const item of menu3.entries()) console.log(`${item[0] + 1}: ${item[1]}`);

// destructuring of element inside statement
for (const [i, item] of menu3.entries()) console.log(`${i + 1}: ${item}`);

// ****************************************************************************************************************** //

// LESSON - Enhanced Object Literals

// #4 compute property names
const weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

// #1 Object outside object
const openingHours2 = {
  [weekDays[3]]: {
    open: 12,
    close: 22,
  },
  [weekDays[4]]: {
    open: 11,
    close: 23,
  },
  [`day-${2 + 3}`]: {
    open: 0, // open 24 hours
    close: 24,
  },
};

const restaurant4 = {
  name: "Classico Ialiano",
  location: "Via Angelo Travanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  // before ES6
  // openingHours: openingHours2,
  /**************************** */
  // #2 ES6 enhanced object literals
  openingHours2,
  /**************************** */
  // #3 no more function expressions
  // order: function (starterIndex, mainIndex) {
  //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  // },
  // orderDelivery: function ({
  //   starterIndex = 1,
  //   mainIndex = 0,
  //   time = "20:00",
  //   address,
  // }) {
  //   console.log(
  //     `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
  //   );
  // },
  // orderPasta: function (ing1, ing2, ing3) {
  //   console.log(`Here is you delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  // },
  // orderPizza: function (mainIng, ...otherIng) {
  //   console.log(mainIng, otherIng);
  // },
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = "20:00", address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is you delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  },
  orderPizza(mainIng, ...otherIng) {
    console.log(mainIng, otherIng);
  },
};

console.log(restaurant4);

// ****************************************************************************************************************** //

// LESSON - Optional Chaining

// console.log(restaurant4.openingHours2.mon.open); - cannot reat property of undefined

// if the property exists log the value
if (restaurant4.openingHours2.fri)
  console.log(restaurant4.openingHours2.fri.open);

if (restaurant4.openingHours2 && restaurant4.openingHours2.thu)
  console.log(restaurant4.openingHours2.thu.open);

// WITH optional chaining
console.log(restaurant4.openingHours2.thu?.open);
// will return undefined immediately
console.log(restaurant4.openingHours2.mon?.open);
// chains
console.log(restaurant4.openingHours2?.mon?.open);

const weekDays2 = ["mon", "tue", "wed", "thu", "fri", "day-5", "sun"];
for (const day of weekDays2) {
  console.log(day);
  const open = restaurant4.openingHours2[day]?.open;
  // nullish coalescing operator in order to avoid an error if opening hour is 0 (open 24/7)
  console.log(`On ${day} the restaurant ${open ?? "is closed"}`);
}

// on calling methods
console.log(restaurant4.order?.(0, 1) ?? "Method doesn't exist");
console.log(restaurant4.orderRisotto?.(0, 1) ?? "Method doesn't exist");

// on arrays
const users = [
  {
    name: "John",
    email: "example@email.com",
  },
];

console.log(users[0]?.name ?? "User array empty");
console.log(users[1]?.name ?? "User array empty");

// ****************************************************************************************************************** //

// LESSON - Looping Objects(keys, values and entries)

// Looping through Object keys

for (const day of Object.keys(openingHours2)) console.log(day);

const properties = Object.keys(openingHours2);
console.log(properties);
console.log(`We are open ${properties.length} days per week.`);

let openStr = `We are open on ${properties.length} days:`;

for (const day of Object.keys(openingHours2)) {
  openStr += ` ${day}`;
}

console.log(openStr);

// Looping through Object values

const values2 = Object.values(openingHours2);
console.log(values2);

// Looping through entries
const entries = Object.entries(openingHours2);
console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(x);
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

// ****************************************************************************************************************** //
// CHALLENGE #2
// As it was somehow addressed in my solution for the first challenge I will only be writing the solutions here without additional implementation
// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
const game3 = {
  team1: "Bayern Munich",
  team2: "Borrusia Dortmund",
  players: [
    [
      " Neuer",
      " Pavard",
      " Martinez",
      " Alaba",
      " Davies",
      " Kimmich",
      " Goretzka",
      " Coman",
      " Muller",
      " Gnarby",
      " Lewandowski",
    ],
    [
      " Burki",
      " Schulz",
      " Hummels",
      " Akanji",
      " Hakimi",
      " Weigl",
      " Witsel",
      " Hazard",
      " Brandt",
      " Sancho",
      " Gotze",
    ],
  ],
  team1Subs: [" Thiago", " Coutinho", " Perisic"],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    X: 3.25,
    team2: 6.5,
  },
};

for (const [i, player] of game3.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}
// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
let oddsAverage = 0;

for (const odd of Object.values(game3.odds)) {
  oddsAverage += odd;
}
console.log(oddsAverage / Object.keys(game3.odds).length);

// 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
//       Odd of victory Bayern Munich: 1.33
//       Odd of draw: 3.25
//       Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

for (const [i, odd] of Object.entries(game3.odds)) {
  console.log(
    `Odd of ${i !== "X" ? "victory " : "draw"}${game3[i] || ""}: ${odd}`
  );
}

// BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
//       {
//         Gnarby: 1,
//         Hummels: 1,
//         Lewandowski: 2
//       }
// Already handled in first challenge

// ****************************************************************************************************************** //
// LESSON - Sets
//
// Sets don't contain duplicates; the order in a set is irrelevant
const orderSet = new Set([
  "Pasta",
  "Pizza",
  "Pizza",
  "Risotto",
  "Pizza",
  "Pizza",
]);
console.log(orderSet);

// To get the length of a set you use .size
console.log(orderSet.size);
// console.log(orderSet.length);

// How to check if a certain element is part of a set
console.log(orderSet.has("Pizza"));
console.log(orderSet.has("Bread"));

// Add new elements to a set
orderSet.add("Garlic Bread");
console.log(orderSet);
//still no duplicates
orderSet.add("Garlic Bread");
console.log(orderSet);

// Remove elements from set
orderSet.delete("Risotto");
console.log(orderSet);

// Can't use index to get element from set
const example = orderSet[1];
console.log(example);

// Clear all set elements
// orderSet.clear();
// console.log(orderSet);

// Sets are iterable
for (const el of orderSet) console.log(el);

// Set usecase:
// Remove duplicates in arrays
const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];
// const staffUnique = new Set(staff);
// console.log(staffUnique);
// Using destructuring you can take a set and turn it into an array
const staffUnique = [...new Set(staff)];
console.log(staffUnique, staffUnique[0]);
// alternative to getting all unique elements
console.log(
  new Set(["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"]).size
);
console.log(new Set("Antidisestablishmentarianism").size);

// ****************************************************************************************************************** //
// LESSON - Maps Fundamentals

// Store values in key-value pairs
// Unlike objects, Keys can be something other than strings (objects, arrays, other maps, etc.)

// Create a map
const rest = new Map();
// Add element (key-value pair)
rest.set("name", "Classico Italiano");
// the set method doesn't only update the map but it also returns the map
rest.set(1, "Firenze, Italy");
console.log(rest.set(2, "Lisbon, Portugal"));
// this allows us to chain methods:
rest
  .set("categories", ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "We are open!")
  .set(false, "We are closed :(");
console.log(rest);

// Read data from a map (.get(key))
console.log(rest.get("name"));
console.log(rest.get(true));
console.log(rest.get(1));

// const time = 21;
const time = 8;
console.log(rest.get(time > rest.get("open") && time < rest.get("close")));

// How to check if a map has a certain key
console.log(rest.has("categories"));

// Delete map elements & clear map
rest.delete(2);
console.log(rest);
rest.clear();
// console.log(rest);

// Check size
console.log(rest.size);

// Arrays and obj as map keys
rest.set([1, 2], "Test");
console.log(rest);
// Due to how JS works behind the scene (primitives vs objects) this will not work (the arrays are not the same object in the heap)
console.log(rest.get([1, 2]));
// As a result we need to turn the array into a variable first
const someArray = [1, 2];
rest.set(someArray, "Test");
console.log(rest.get(someArray));

// DOM type obj
rest.set(document.querySelector("h3"), "Heading");
console.log(rest);

// ****************************************************************************************************************** //
// LESSON - Maps Iterations

const question = new Map([
  ["question", "What is the best programming language in the world?"],
  [1, "C"],
  [2, "Java"],
  [3, "Javascript"],
  ["correct", 3],
  [true, "Correct! 🎉"],
  [false, "Try again!"],
]);
console.log(question);

// Converting Objects to Maps
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Iteration - quizz app prototype
console.log(question.get("question"));
for (const [key, value] of question) {
  if (typeof key === "number") console.log(`Answer ${key}: ${value}`);
}
// const answer = +prompt("Your answer");
const answer = 3;
console.log(answer);

console.log(question.get(question.get("correct") === answer));

// Convert map to array
console.log([...question]);
console.log([...question.entries()]);
console.log([...question.keys()]);
console.log([...question.values()]);

// ****************************************************************************************************************** //
// LESSON - Which Data Structures to use

// Arrays
// used when you need ordered lists of values
// used when you need to manipulate data

// Sets
// used when you need to work with unique values
// used when high-performance is really important
// used to remove duplicates from arrays

// Objects
// traditional key/value storage
// easier to write and access with . and []
// used when you need to include functions(methods)
// used when working with JSON (can convert to map)

// Maps
// offer better performance
// key can be any data type (used especially when you need keys to be something other than strings)
// easy to iterate
// easy to compute size
// used when you just need to map values to keys

// ****************************************************************************************************************** //
// CHALLENGE #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, "⚽️ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽️ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽️ GOAL"],
  [80, "⚽️ GOAL"],
  [92, "🔶 Yellow card"],
]);

// TASK #1
const eventsSet = new Set();
for (const [min, event] of gameEvents) {
  eventsSet.add(event);
}
const events = [...eventsSet];
console.log(events);
// ALT
const events2 = [...new Set(gameEvents.values())];
console.log(events2);

// TASK #2
gameEvents.delete(64);
console.log(gameEvents);

// TASK #3
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

// TASK #4
for (const [min, event] of gameEvents) {
  console.log(
    `${min > 45 ? "[SECOND HALF]" : "[FIRST HALF]"} ${min}: ${event}`
  );
}

// ****************************************************************************************************************** //
// CHALLENGE #3 with UI
const eventsMap = new Map();
const eventsUserInputEl = document.querySelector(".events-user-input");
const addEventBtn = document.querySelector(".add-event-btn");
const removeEventBtn = document.querySelector(".remove-event-btn");
const stoppageSecondEl = document.querySelector(".stoppage-second");
const printEventsReportBtn = document.querySelector(".print-events-report-btn");
const eventsReportEl = document.querySelector(".events-report");

/**
 * Adds a new input fields set for users to log an event
 * @param {void} none
 */
function addEventField() {
  const newDiv = document.createElement("div");
  newDiv.classList.add("input-group", "mb-4");
  newDiv.innerHTML = `<span class="input-group-text">Minute</span>
  <input
    type="number"
    class="form-control minute"
    placeholder="0"
    onkeyup="if(value<0 || value>90+Number(document.querySelector('.stoppage-second').value)) value=''"
  />
  <select class="custom-select w-50 border select-event" id="inputGroupSelect02">
                <option selected>Event options</option>
                <option value="⚽ Goal">⚽ Goal</option>
                <option value="🔁 Substitution">🔁 Substitution</option>
                <option value="🟨 Yellow Card">🟨 Yellow Card</option>
                <option value="🟥 Red Card">🟥 Red Card</option>
              </select>`;
  eventsUserInputEl.appendChild(newDiv);
}
/**
 * Generates the events report. Iterates through use input map and generates and appends elements on page as required
 * @param {Map} eventsMap
 */
function eventsReport(eventsMap) {
  const firstHalf = document.createElement("div");
  firstHalf.classList.add("mb-5");
  firstHalf.innerHTML = `<h3 style="text-decoration: underline; text-transform: uppercase; font-weight: 600">First half:</h3>`;
  eventsReportEl.appendChild(firstHalf);
  const secondHalf = document.createElement("div");
  secondHalf.classList.add("mb-5");
  secondHalf.innerHTML = `<h3 style="text-decoration: underline; text-transform: uppercase; font-weight: 600">Second half:</h3>`;
  eventsReportEl.appendChild(secondHalf);

  for (const [key, value] of eventsMap) {
    const newEntry = document.createElement("p");
    newEntry.innerHTML = `${key}' : ${value}`;
    if (key < 45) {
      console.log(typeof key);
      firstHalf.appendChild(newEntry);
    } else {
      secondHalf.appendChild(newEntry);
    }
  }
  if (firstHalf.childElementCount <= 1) {
    const noEvents = document.createElement("p");
    noEvents.textContent =
      "Nothing worth mentioning happened during the first half.";
    firstHalf.appendChild(noEvents);
  }
  if (secondHalf.childElementCount <= 1) {
    const noEvents = document.createElement("p");
    noEvents.textContent =
      "Nothing worth mentioning happened during the second half.";
    secondHalf.appendChild(noEvents);
  }

  eventsReportEl.appendChild(meanTimeForEvent(eventsMap));
}

/**
 * Function calculates the average time that passes between events
 * @param {Map} eventsMap - a map containing all user inputs (events)
 * @returns {Element} - returns the DOM element that's to be appended to the Events Report element
 */
function meanTimeForEvent(eventsMap) {
  const gameTime = 90 + Number(stoppageSecondEl.value);
  const meanEvents = document.createElement("p");
  meanEvents.innerHTML = `An event took place, on average, <span class="taskVariable">every ${Math.round(
    gameTime / eventsMap.size
  )} minutes</span>`;
  return meanEvents;
}

/**
 * Removes last element in game events list if there are 2 or more elements in the list. Updates user input map entries.
 * @param {void} none
 */
function removeGameEventEl() {
  if (eventsUserInputEl.childElementCount >= 2) {
    eventsMap.delete(
      eventsUserInputEl.lastChild.querySelector(".minute").value
    );
    eventsUserInputEl.removeChild(eventsUserInputEl.lastChild);
    console.log(eventsMap);
  }
}

addEventBtn.addEventListener("click", addEventField);

removeEventBtn.addEventListener("click", removeGameEventEl);

printEventsReportBtn.addEventListener("click", () => {
  console.log(eventsMap);

  eventsReportEl.innerHTML = "";
  const events = eventsUserInputEl.querySelectorAll(".input-group");
  events.forEach((el) => {
    if (
      el.querySelector(".minute").value === "" ||
      el.querySelector(".select-event").value === "" ||
      el.querySelector(".select-event").value === "Event options"
    ) {
      eventsReportEl.innerHTML = "It was a boring match, nothing happened.";
    } else {
      eventsMap.set(
        el.querySelector(".minute").value,
        el.querySelector(".select-event").value
      );
    }
  });
  if (eventsReportEl.innerHTML !== "It was a boring match, nothing happened.")
    eventsReport(eventsMap);
});
