"use strict";

// TABBED CONTENT TEXT
const tabbedContentText = [
  [
    "img/icons.svg#icon-upload",
    "Tranfser money to anyone, instantly! No fees, no BS.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "bg-warning",
  ],
  [
    "img/icons.svg#icon-home",
    "Buy a home or make your dreams come true, with instant loans.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "bg-success",
  ],
  [
    "img/icons.svg#icon-user-x",
    "No longer need your account? No problem! Close it instantly.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "bg-danger",
  ],
];

// ELEMENT SELECTION

// MISC
const htmlDoc = document.querySelector("html");

// NAVBAR
const navbarEl = document.querySelector(".navbar");
const navbarElsCnt = document.querySelector(".navbar .container-fluid");
const navLinksListEl = document.querySelector(".navbar-nav");
const navLinksEls = document.querySelectorAll(".nav-link");
const navbarLogoEl = document.querySelector(".bankist-logo");

// SECTIONS
const section1El = document.getElementById("section1");
const section2El = document.getElementById("section2");
const section3El = document.getElementById("section3");
const section4El = document.getElementById("section4");

// HERO SECTION:
const scrollBtnHero = document.querySelector(".hero-btn-scroll");

// OPERATIONS SECTION
const operationsBtnsCnt = document.querySelector(".tabbed-btns-container");
const operationsBtns = document.querySelectorAll(".tabbed-btn");
const operationsIconContEl = document.querySelector("#section3 .feature-icon");
const tabbedTitleEl = document.querySelector("#section3 .section-text h3");
const tabbedTextEl = document.querySelector("#section3 .section-text p");

//
//**************************************************************************************************************************//
// TASK - enable smooth scrolling
//

// get the required padding from scrolling, due to fixed navbar height, task handled in html/css
htmlDoc.style.scrollPaddingTop = getComputedStyle(navbarEl).height;

// // strictly JS method
// scrollBtnHero.addEventListener("click", (e) => {
// // OLD WAY
//   const s2coords = section2El.getBoundingClientRect();
//   console.log(s2coords);

//   console.log(e.target.getBoundingClientRect());
//   console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);

//   console.log(
//     "height/width viewport",
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );

//   //   window.scrollTo(
//   //     s2coords.left + window.pageXOffset,
//   //     s2coords.top + window.pageYOffset
//   //   );

//   window.scrollTo({
//     left: s2coords.left + window.pageXOffset,
//     top: s2coords.top + window.pageYOffset,
//     behavior: "smooth",
//   });

// // NEW WAY
//   section2El.scrollIntoView({ behavior: "smooth" });
// });

//
//**************************************************************************************************************************//
// TASK - Smooth scrolling through event delegation
// Already handled in CSS/HTML
//

// // without event delegation
// // navLinksEls.forEach((el, i) => {
// //   if (i <= 3) {
// //     el.addEventListener("click", function (e) {
// //       e.preventDefault();
// //       const id = this.getAttribute("href");
// //       console.log(id);
// //       document.querySelector(id).scrollIntoView({
// //         behavior: "smooth",
// //       });
// //     });
// //   }
// // });

// // with event delegation
// // 1. Add event listener to common parent
// navLinksListEl.addEventListener("click", function (e) {
//   //   console.log(e.target);
//   // 2. Determine which element triggered the event
//   if (e.target.classList.contains("nav-link")) {
//     e.preventDefault();
//     const id = e.target.getAttribute("href");
//     document.querySelector(id).scrollIntoView({
//       behavior: "smooth",
//     });
//   }
// });

//
//**************************************************************************************************************************//
// TASK - Tabbed components
//

operationsBtnsCnt.addEventListener("click", (e) => {
  // determine click trigger
  const clicked = e.target;
  // prevent out of bounds click (guard clause)
  if (!clicked) return;
  // get index of clicked element
  let i = [...operationsBtnsCnt.children].indexOf(clicked);

  operationsBtns.forEach((el) => {
    el.classList.remove("active");
  });

  clicked.classList.add("active");

  //   filter to remove preset class
  let removableClass = [...operationsIconContEl.classList].filter((el) =>
    el.startsWith("bg")
  );
  operationsIconContEl.classList.remove(removableClass);
  operationsIconContEl.classList.add(tabbedContentText[i][3]);
  tabbedTitleEl.textContent = tabbedContentText[i][1];
  tabbedTextEl.textContent = tabbedContentText[i][2];
  operationsIconContEl
    .querySelector("svg use")
    .setAttribute("xlink:href", tabbedContentText[i][0]);
});

//
//**************************************************************************************************************************//
// LESSON - How the DOM works
//

// The DOM is the interface between JS and the browser. It determines how HTML files are rendered.
// It is a very complex API that contains a lot of methods and propeties to interact with the document tree

// The DOM tree is a collection of elements and node elements
// A Node is represented by a Javascript Object (which gets node methods: .textContent .childNodes .parentNode .cloneNode())

// Nodes have children :
// Element type - > <p>***</p>
//      .innerHTML .classList .children .parentElement .append() etc.
//      Element types have a child type. Each element has exactly one type for each child element that exists (a Button type, a link type etc.: HTMLButtonElemen, HTMLDivElement)
//      For example, an image type has a source attribute that no other element type has. The same for an anchor element and so on.

// Text type -> <p>Some text</p>
// Comment type -> <!-- Some HTML comment -->

// Document type -> .querySelector(), .createElement(), .getElementByID();
//      Event listeners work because there is a special node type called EventTarget which is a parent of both the node type and the Window (GLOBAL OBJECTS) node type

// All of this works as such due to INHERITANCE.
// Inheritance means that all child types get access to methods and properties of all their parent node types.
// An HTML element  will get access to everything from the element type, like .innerHTML or .classList() and will also get access to anything from the node type because that is also its parent type

//
//**************************************************************************************************************************//
// LESSON - Selecting, creating and deleting documents
//

// // SELECTING ELEMENTS

// // selecting the entire document, head and body
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// // selecting elements
// console.log(document.querySelector(".modal"));
// console.log(document.getElementById("section1"));
// const section1Demo = document.getElementById("section1");

// // selecting a node list
// const allSections = document.querySelectorAll(".section");
// console.log(allSections);

// // returns an HTML collection (live collection - it's updated automatically and imediately if the DOM changes)
// console.log(document.getElementsByTagName("button"));
// console.log(document.getElementsByClassName("section"));

// // CREATING AND INSERTING ELEMENTS

// // .insertAdjecentHTML() - see bankist app

// const message = document.createElement("div");
// message.classList.add("section-title");
// // message.textContent = "We use cookies for improved functionality and analytics.";
// message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn-info deletable" style="background-color:var(--testColor)">OK</button>`;
// section1Demo.prepend(message);
// // section1Demo.append(message);
// section1Demo.after(message);

// // Delete elements
// document.querySelector(".deletable").addEventListener("click", () => {
//   message.remove();
// });

//
//**************************************************************************************************************************//
// LESSON - Styles, Attributes and Classes
//

// // STYLES
// // set styles
// message.style.backgroundColor = "#37383d";
// message.style.width = "120%";

// // reading styles
// // Only works for inline styling, not class set styling
// console.log(message.style.height);
// console.log(message.style.width);
// const section2Demo = document.getElementById("section2");
// // console.log(section2Demo);
// // console.log(section2Demo.style.height);

// // reading styles from classes
// console.log(getComputedStyle(section2Demo).height);
// // change style
// section2Demo.style.height =
//   Number.parseFloat(getComputedStyle(section2Demo).height, 10) + 100 + "px";
// console.log(getComputedStyle(section2Demo).height);

// // for custom properties
// document.documentElement.style.setProperty("--testColor", "orangered");

// // ATTRIBUTES
// const logo = document.querySelector(".bankist-logo");
// console.log(logo.alt);

// // absolute path and get att value (relative path); same for href
// console.log(logo.src);
// console.log(logo.getAttribute("src"));

// console.log(logo.className);

// console.log(logo.designer); // <-won't work for non-standard attributes
// console.log(logo.getAttribute("designer")); // how to access non-standard attributes values

// // setting attributes
// logo.alt = "Alt value changed";
// console.log(logo.alt);
// logo.setAttribute("company", "Bankist");

// // DATA ATTRIBUTES
// console.log(logo.dataset.versionNumber);

// // CLASSES
// logo.classList.add("c", "j");
// logo.classList.remove("c");
// logo.classList.toggle("c");
// logo.classList.contains("c");

// // will overwrite all existing classes
// // logo.className = "example";

//
//**************************************************************************************************************************//
// LESSON - Types of Events and Event Handlers
//

// An event is a type of signal generated by an event node (mouse moving, click, etc.)
// const h1 = document.querySelector("h1");

// h1.addEventListener("mouseenter", (e) => {
//   alert("addEventListener: Great! You're reading the modal msg");
// });

// All event listeners have an onX equivalent
// h1.onmouseenter = function (e) {
//   alert("onmouseenter: Great! You're reading the modal msg");
// };

// addEventListener allows multiple uses; onX only overwrites when used multiple times

// addEventListener using functions
// const alertH1 = function (e) {
//   alert("addEventListener: Great! You're reading the modal msg");
//   //   h1.removeEventListener("mouseenter", alertH1);
// };

// h1.addEventListener("mouseenter", alertH1);
// setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 10000);

//
//**************************************************************************************************************************//
// LESSON - Event Propagation: Bubbling and Capturing
//

// listeners capture events during the bubble phase, not the capture phase

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
// console.log(randomColor());
// // section2El.style.backgroundColor = randomColor();

// document.querySelector(".nav-link").addEventListener("click", function (e) {
//   console.log("link", e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();
//   //   e.currentTarget === this.X

//   //   stop propagation of events
//   e.stopPropagation();
// });

// document.querySelector(".navbar-nav").addEventListener("click", function (e) {
//   console.log("container", e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();
// });

// // the 3rd parameters determine if the listener captures the event during the capture phase or the bubble phase; set to false by default
// document.querySelector(".navbar").addEventListener(
//   "click",
//   function (e) {
//     console.log("navbar", e.target, e.currentTarget);
//     this.style.backgroundColor = randomColor();
//   }
//   //   true
// );

//
//**************************************************************************************************************************//
// LESSON - DOM Traversing
//

// const h1 = document.querySelector(".hero h1");

// // Going downwards: child
// console.log(h1.querySelectorAll(".highlight"));
// console.log(h1.children);
// console.log(h1.firstElementChild);
// h1.firstElementChild.style.backgroundColor = "red";
// h1.lastElementChild.style.backgroundColor = "orange";

// // Going upwards: parent
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest("div").style.backgroundColor = "blue";
// // closest is the opposite of querySelector

// // Going Sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach((el) => {
//   if (el !== h1) el.style.transform = "scale(0.5)";
// });

//
//**************************************************************************************************************************//
// // LESSON - Passing Arguments to Event Handlers
// //

// // first method function
// // const handleHover = function (event, opacity) {
// //   if (event.target.classList.contains("nav-link")) {
// //     const link = event.target;

// //     navbarLogoEl.style.opacity = opacity;
// //     navLinksEls.forEach((el) => {
// //       if (el !== link) {
// //         el.style.opacity = opacity;
// //       }
// //     });
// //   }
// // };

// // second method function
// // const handleHover = function (event) {
// //   if (event.target.classList.contains("nav-link")) {
// //     const link = event.target;

// //     navbarLogoEl.style.opacity = this;
// //     navLinksEls.forEach((el) => {
// //       if (el !== link) {
// //         el.style.opacity = this;
// //       }
// //     });
// //   }
// // };

// // third method function
// const handleHover = function (opacity) {
//   return function (e) {
//     if (e.target.classList.contains("nav-link")) {
//       const link = e.target;

//       navbarLogoEl.style.opacity = opacity;
//       navLinksEls.forEach((el) => {
//         if (el !== link) {
//           el.style.opacity = opacity;
//         }
//       });
//     }
//   };
// };

// // First method
// // navbarElsCnt.addEventListener("mouseover", function (e) {
// //   handleHover(e, 0.5);
// // });

// // navbarElsCnt.addEventListener("mouseout", function (e) {
// //   handleHover(e, 1);
// // });

// // Second method
// // navbarElsCnt.addEventListener("mouseover", handleHover.bind(0.5));

// // navbarElsCnt.addEventListener("mouseout", handleHover.bind(1));

// //Third method
// navbarElsCnt.addEventListener("mouseover", handleHover(0.5));
// navbarElsCnt.addEventListener("mouseout", handleHover(1));
