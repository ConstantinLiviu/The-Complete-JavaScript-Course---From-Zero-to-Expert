"use strict";

//
// *******************************************************************************************************************//
// CHALLENGE #1
//

// // TASK - Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// const dacia = new Car("Dacia", 90);
// const ford = new Car("Ford", 140);

// // TASK - Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;

// Car.prototype.accelerate = function () {
//   return (this.speed += 10);
// };

// console.log(dacia.accelerate());
// console.log(ford.accelerate());

// // TASK - Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;

// Car.prototype.brake = function () {
//   console.log(this.speed - 5);
// };

// dacia.brake();
// ford.brake();

const submitBtn = document.querySelector(".submit-btn");
const car1AccelerationBtn = document.querySelector(".acc1");
const car2AccelerationBtn = document.querySelector(".acc2");
const car1BreakBtn = document.querySelector(".br1");
const car2BreakBtn = document.querySelector(".br2");
const car1Make = document.querySelector(".car1-make");
const car2Make = document.querySelector(".car2-make");
const car1Speed = document.querySelector(".car1-speed");
const car2Speed = document.querySelector(".car2-speed");

const resultsEl = document.querySelector(".results");
const car1ResultEl = document.querySelector(".car1result");
const car2ResultEl = document.querySelector(".car2result");

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  return (this.speed += 10);
};

Car.prototype.brake = function () {
  if (this.speed === 0) {
    return (this.speed = 0);
  } else {
    return (this.speed -= 5);
  }
};

let cars = [];

const createCars = function (car) {
  const carObj = new Car(...car);
  cars.push(carObj);
};

submitBtn.addEventListener("click", function () {
  cars = [];
  const make1 = car1Make.value || "BMW";
  car1Make.value = "";
  const speed1 = +car1Speed.value || 120;
  car1Speed.value = "";

  const make2 = car2Make.value || "Mercedes";
  car2Make.value = "";
  const speed2 = +car2Speed.value || 95;
  car2Speed.value = "";

  let car1 = [make1, speed1];
  let car2 = [make2, speed2];

  createCars(car1);
  createCars(car2);

  resultsEl.classList.remove("invisible");
  car1ResultEl.textContent = `${cars[0].make} going at ${cars[0].speed} km/h`;
  car2ResultEl.textContent = `${cars[1].make} going at ${cars[1].speed} km/h`;
});

car1AccelerationBtn.addEventListener("click", function () {
  car1ResultEl.textContent = `${
    cars[0].make
  } going at ${cars[0].accelerate()} km/h`;
});

car2AccelerationBtn.addEventListener("click", function () {
  car2ResultEl.textContent = `${
    cars[1].make
  } going at ${cars[1].accelerate()} km/h`;
});

car1BreakBtn.addEventListener("click", function () {
  cars[0].brake();

  car1ResultEl.textContent = `${cars[0].make} going at ${
    cars[0].speed === 0 ? "has stopped" : cars[0].speed + " km/h"
  }`;
});

car2BreakBtn.addEventListener("click", function () {
  cars[1].brake();

  car2ResultEl.textContent = `${cars[1].make} going at ${
    cars[1].speed === 0 ? "has stopped" : cars[1].speed + " km/h"
  }`;
});

//
// *******************************************************************************************************************//
// CHALLENGE #2
//

const ch2CarMake = document.querySelector(".ch2-car2-make");
const ch2CarSpeed = document.querySelector(".ch2-car2-speed");

const ch2SubmitBtn = document.querySelector(".ch2-submit-btn");
const ch2AccBtn = document.querySelector(".ch2-acc1");
const ch2BrBtn = document.querySelector(".ch2-br1");
const ch2MphBtn = document.querySelector(".ch2-mph");

const ch2ResultsCnt = document.querySelector(".ch-2-results");
const ch2ResultEl = document.querySelector(".ch-2-car1result");

// TASK - Re-create challenge 1, but this time using an ES6 class.

// TASK - Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6).

// TASK - Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6).

class CarClass {
  constructor(carMake, carSpeed) {
    this.carMake = carMake;
    this.carSpeed = carSpeed;
  }

  accelerate = function () {
    return (this.carSpeed += 10);
    // this.carSpeed += 10;
    // console.log(`${this.carMake} is going at ${this.carSpeed}`);
  };

  brake = function () {
    if (this.carSpeed === 0) {
      return (this.carSpeed = 0);
    } else {
      return (this.carSpeed -= 5);
    }
  };

  get speedUS() {
    return this.carSpeed / 1.6;
  }

  set speedUS(speed) {
    this.carSpeed = speed * 1.6;
  }
}

// const ford = new CarClass("Ford", 120);
// console.log(ford);
// console.log(ford.speedUS);
// ford.accelerate();
// ford.accelerate();
// console.log(ford.brake());
// ford.speedUS = 50;
// console.log(ford.carSpeed);

let cars2 = [];

const createCars2 = function (make, speed) {
  const car = new CarClass(make, speed);
  cars2.push(car);
};

ch2SubmitBtn.addEventListener("click", function () {
  cars2 = [];
  const make = ch2CarMake.value || "Ford";
  ch2CarMake.value = "";
  const speed = +ch2CarSpeed.value || 120;
  ch2CarSpeed.value = "";

  createCars2(make, speed);
  ch2ResultsCnt.classList.remove("invisible");
  ch2ResultEl.textContent = `${cars2[0].carMake} going at ${cars2[0].carSpeed} km/h`;
});

ch2AccBtn.addEventListener("click", function () {
  ch2ResultEl.textContent = `${
    cars2[0].carMake
  } going at ${cars2[0].accelerate()} km/h`;
});

ch2BrBtn.addEventListener("click", function () {
  cars2[0].brake();

  ch2ResultEl.textContent = `${cars2[0].carMake} going at ${
    cars2[0].carSpeed === 0 ? "has stopped" : cars2[0].carSpeed + " km/h"
  }`;
});

ch2MphBtn.addEventListener("click", function () {
  ch2ResultEl.textContent = `${cars2[0].carMake} going at ${
    cars2[0].speedUS === 0 ? "has stopped" : cars2[0].speedUS + " mph"
  }`;
});

//
// *******************************************************************************************************************//
// CHALLENGE #3
//

// Cloned constr for readability purposes
const CarCh3 = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

CarCh3.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

CarCh3.prototype.brake = function () {
  this.speed -= 5;
  if (this.speed < 1) {
    resultCh3Txt.textContent = `${this.make} has stopped`;
    this.charge = 0;
  } else {
    console.log(`${this.make} is going at ${this.speed} km/h`);
    resultCh3Txt.textContent = `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}%`;
  }
};

// TASK - Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property).

const EV = function (make, speed, charge) {
  CarCh3.call(this, make, speed);
  this.charge = charge;
};

// link prototypes
EV.prototype = Object.create(CarCh3.prototype);

// TASK - Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo'.
EV.prototype.chargeBattery = function (chargeTo) {
  if (chargeTo < this.charge) {
    resultCh3Txt.textContent = `Charging goes up, not down!`;
  } else {
    this.charge = chargeTo;
    resultCh3Txt.textContent = `${this.make} battery recharged to ${this.charge}%`;
  }
};

// TASK - Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%'.
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  if (this.charge < 1) {
    resultCh3Txt.textContent = `${this.make} is out of Juice. Recharge the battery!`;
    this.charge = 0;
  } else {
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`
    );
    resultCh3Txt.textContent = `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}%`;
  }
};

// const tesla = new EV("Tesla", 120, 23);

// console.log(tesla);

// // TASK -  Set 'chargeBattery' method to charge the battery to 90%.
// tesla.chargeBattery(90);

// tesla.brake();
// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();

// With UI
let cars3 = [];

const submitBtnCh3 = document.querySelector(".ch3-submit-btn");
const acc1Ch3Btn = document.querySelector(".ch3-acc1");
const brakeCh3Btn = document.querySelector(".ch3-br1");
const chargeCh3Btn = document.querySelector(".ch3-recharge");

const makeCh3El = document.querySelector(".ch3-car2-make");
const speedCh3El = document.querySelector(".ch3-car2-speed");
const chargeCh3El = document.querySelector(".ch3-car2-charge");

const resultCh3El = document.querySelector(".ch-3-results");
const resultCh3Txt = document.querySelector(".ch-3-car1result");

submitBtnCh3.addEventListener("click", function () {
  cars3 = [];
  const make = makeCh3El.value || "Tesla";
  ch2CarMake.value = "";
  const speed = +speedCh3El.value || 140;
  ch2CarSpeed.value = "";
  const charge = +chargeCh3El.value || 23;
  chargeCh3El.value = "";

  const tesla = new EV(make, speed, charge);
  cars3.push(tesla);

  resultCh3El.classList.remove("invisible");
  resultCh3Txt.textContent = `${cars3[0].make} is going at ${cars3[0].speed} km/h, with a charge of ${cars3[0].charge}%`;
});

acc1Ch3Btn.addEventListener("click", function () {
  cars3[0].accelerate();
});

brakeCh3Btn.addEventListener("click", function () {
  cars3[0].brake();
});

chargeCh3Btn.addEventListener("click", function () {
  if (cars3.length === 0) return;
  if (!chargeCh3El.value) chargeCh3El.value = 1;
  cars3[0].chargeBattery(+chargeCh3El.value);
  chargeCh3El.value = "";
});

//
// *******************************************************************************************************************//
// CHALLENGE #4
//

// 1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
// 2. Make the 'charge' property private;
// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

// DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

//
// *******************************************************************************************************************//
// LESSON - What is OOP?
//

// Object oriented programming is a programming paradigm (style of code/the way we organize the code) based on the concept of objects
// It uses objects to model (describe) real world or abstract features
// Objects may contain data (properties) and code (methods). By using objects, we pack data and the corresponding behavior into one block

// In OOP objects are self-contained pieces/blocks of code
// Objects are building blocks of applocations and interact with one another
// Interactions happen thorugh a public interface (API): methods that the code outside of the object can access and use to communicate with the object

// CLASSES are the blueprints used to create objects
// INSTANCES are objects that are created using classes

//
// There are 4 fundamental principles:
// 1. ABSTRACTION
// 2. ENCAPSULATION
// 3. INHERITANCE
// 4. POLYMORPHISM

// ABSTRACTION hides internal implementation details (from users). Helps one get an overview perspective regarding what is being implemented.

// ENCAPSULATION keeps properties and methods private inside a class. This prevents access from outside the class (prevents accidental or intentional manipulation)

// INHERITANCE  allows object to inherit properties and methods from a parent object, reducing the need for duplicate code. It allows programmers to reuse already writtent logic.

// POLYMORPHISM allows children classes to overwrite parent classes methods

//
// *******************************************************************************************************************//
// LESSON - OOP in JS
//

// In classical OOP classes are used to instantiate objects
// Methods are copied from the class to all instances

// In Javascript there are PROTOTYPES and objects are linked to a prototype object
// Prototype Objects contain methods and properties that get inherited by all objects linked to that prototype. (prototypal inheritance/delegation - behavior is deelegated to the linked prototype object)
//
// To instantiate objects in JS there are three methods:
// 1. CONSTRUCTOR FUNCTIONS
// - used to create objects from a function
// - this is how built-in objects like Arrays, Maps or Sets are actually implemented

// 2. ES6 CLASSES
// - modern alternative to constructor function syntax
// - "Syntactic sugar": behind the scenes, ES6 classes work like constructor functions;
// - ES6 classes do NOT behave like classes in classical OOP

// 3. Object.create()
// - easiest way to link an object to a prototype object

//
// *******************************************************************************************************************//
// LESSON - Constructor Functions and the "new" Operator
//

// constructor functions start with a capital letter (convention)
// arrow functions can't be used as they have no "this" keyword
const Person = function (firstName, birthYear) {
  // Instance properties - available on all instances of the Person object
  this.firstName = firstName;
  this.birthYear = birthYear;

  //   We can add both properties and methods
  //   Never create methods inside constructor functions; for big scale apps it would mean creating hundreds/thousands of copies of this function
  //   To solve the issue just use prototypal inheritance
  //   this.calcAge = function () {
  //     console.log(2023 - this.birthYear);
  //   };
};

const john = new Person("John", 1981);

// BEHIND THE SCENES:
// 1. New empty object is created
// 2. Function is called, this = {} (will point to the empty object that was just created)
// 3. The empty object is linked to the prototype
// 4. The function automatically returns the object

console.log(john);

const matilda = new Person("Matilda", 2017);
const mark = new Person("Mark", 1975);
console.log(matilda);
console.log(mark);

const jay = "Jay";
console.log(john instanceof Person);
console.log(jay instanceof Person);

// john.calcAge();

//
// *******************************************************************************************************************//
// LESSON - Prototypes
//

console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};

// Using the calcAge() method on the john object is possible due to prototypal inheritance
john.calcAge();

// The prototype of the john object is the prototype property of the constructor function
console.log(john.__proto__);
console.log(john.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(john));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person));

// inherited methods are not part of the object proper
Person.prototype.species = "Homo Sapiens";
console.log(john.species, matilda.species);

console.log(john.hasOwnProperty("firstName"));
console.log(john.hasOwnProperty("species"));

//
// *******************************************************************************************************************//
// LESSON - Prototypal Inheritance and The Prototype Chain on Built-In Objects
//

console.log(john.__proto__);
// Object.prototype (top of prototype chain)
console.log(john.__proto__.__proto__);
console.log(john.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);
console.dir(Person.prototype.constructor.__proto__);

const arr = [3, 5, 4, 23, 5, 67, 7, 3, 7]; // [] === new Array
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());
const btn = document.querySelector(".main-page-btn");
console.dir(btn);
console.dir((x) => x + 1);

//
// *******************************************************************************************************************//
// LESSON - ES6 Classes
//

// class expression
// const PersonCl = class {};

// class declaration
class PersonCl {
  // properties
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  // methods - addded to the .prototype property
  calcAge() {
    console.log(2023 - this.birthYear);
  }

  greet() {
    console.log(`Hey! My name is ${this.firstName}`);
  }
}

const jessica = new PersonCl("Jessica", 2000);
console.log(jessica);
jessica.calcAge();
console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey! My name is ${this.firstName}`);
// };
jessica.greet();

// 1. Classes are NOT hoisted (unable to use before declaration)
// 2. Classes are first-class citizens
// 3. Classes are executed in strict mode

//
// *******************************************************************************************************************//
// LESSON - Setters and Getters
//

// All JS objects can have setters and getters. They are called assesor properties. ("normal" properties are called data properties)

const account = {
  owner: "Jonas",
  transactions: [200, 530, 120, 300],

  get latestTransaction() {
    return this.transactions.slice(-1).pop();
  },

  set latestTransaction(trans) {
    this.transactions.push(trans);
  },
};

console.log(account.latestTransaction);

account.latestTransaction = 50;
console.log(account.transactions);

class PersonCl2 {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2023 - this.birthYear);
  }

  greet() {
    console.log(`Hey! My name is ${this.firstName}`);
  }

  get age() {
    return 2023 - this.birthYear;
  }

  // when trying to set a property that already exists
  set fullName(name) {
    if (name.includes(" ")) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  }

  get fullName() {
    return this._fullName;
  }
}

const jimmy = new PersonCl2("Jimmy Drake", 1997);
console.log(jimmy.age);

const walter = new PersonCl2("Walter White", 1965);
console.log(walter);

//
// *******************************************************************************************************************//
// LESSON - Static Methods
//

class PersonCl3 {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2023 - this.birthYear);
  }

  greet() {
    console.log(`Hey! My name is ${this.firstName}`);
  }

  get age() {
    return 2023 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(" ")) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  }

  get fullName() {
    return this._fullName;
  }
}

// PersonCl3.prototype.hey = function () {
//   console.log("Hey! 🖐");
// };

PersonCl3.hey = function () {
  console.log("Hey! 🖐");
  console.log(this);
};

PersonCl3.hey();

const elena = new PersonCl3("Elena J.", 1970);
// elena.hey();

// How to use static methods in classes
class PersonCl4 {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2023 - this.birthYear);
  }

  greet() {
    console.log(`Hey! My name is ${this.firstName}`);
  }

  get age() {
    return 2023 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(" ")) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`);
    }
  }

  get fullName() {
    return this._fullName;
  }

  //   above are instance methods
  //   static method - useful as helper functions for the class
  static hey() {
    console.log("Hey there! 😘");
  }
}

//
// *******************************************************************************************************************//
// LESSON - Object.create
//

// Maintains the idea of prototypal inheritance, but there are no prototype properties involved, no constructor and no "new" operator
// We can use Object.create to manually set the prototype of an object to any other object that we want

// recreating the Person class from before
const PersonProto = {
  calcAge() {
    console.log(2023 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = "Steven";
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init("Sarah", 1980);
sarah.calcAge();

//
// *******************************************************************************************************************//
// LESSON - Inheritance between Classes: Constructor Functions
//

// Using constructors
const PersonDuplicate = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

PersonDuplicate.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};

// The student constructor function and its prototype property and the mike object linked to its prototype (the constructor function's prototype property)
// The link between instance and prototype has been made automatically by creating the mike object with the new operator

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;

  PersonDuplicate.call(this, firstName, birthYear);
  this.course = course;
};

// We want to make the Student.prototype a child of PersonDuplicate.prototypeso we will use Object.create()
// This will create an empty object
// this must be done before any methods are added to the Student object

// Linking prototypes
Student.prototype = Object.create(PersonDuplicate.prototype);

Student.prototype.introduce = function () {
  console.log(`Hey! My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student("Mike", 2000, "Computer Science");
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);
