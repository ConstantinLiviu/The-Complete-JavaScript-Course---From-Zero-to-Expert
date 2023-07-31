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