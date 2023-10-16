"use strict";

//
// ************************************************************************************************************************ //
// LESSON - Geolocation API
//

// takes in 2 callback functions - success and failure
// navigator.geolocation.getCurrentPosition(
//   function (position) {
//     console.log(position);
//   },
//   function () {
//     alert("Could not get your position");
//   }
// );

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       const { latitude } = position.coords;
//       const { longitude } = position.coords;
//       //   console.log(latitude, longitude);
//       console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
//     },
//     function () {
//       alert("Could not get your position");
//     }
//   );
// }

//
// ************************************************************************************************************************ //
// LESSON - Displaying a Map Using a Leaflet Library
// LESSON - Displaying a Map Marker
// LESSON - Rendering Workout Input Form

const formEl = document.querySelector("form");
const distanceInputEl = document.getElementById("inputDistance");
const durationInputEl = document.getElementById("inputDuration");
const cadenceContainerEl = document.querySelector(".cadence-container");
const cadenceInputEl = document.getElementById("inputCadence");
const elevationContainerEl = document.querySelector(".elevation-container");
const selectInputEl = document.getElementById("selectOptions");
const elevationInputEl = document.getElementById("inputElevation");

// let map;
// let mapEvent;

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       const { latitude } = position.coords;
//       const { longitude } = position.coords;
//       //   console.log(latitude, longitude);
//       console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

//       const coordinates = [latitude, longitude];

//       map = L.map("map").setView(coordinates, 15);

//       L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(map);

//       // L.marker(coordinates)
//       //   .addTo(map)
//       //   .bindPopup("A pretty CSS popup.<br> Easily customizable.")
//       //   .openPopup();

//       // console.log(map);

//       map.on("click", function (e) {
//         mapEvent = e;
//         formEl.classList.remove("invisible");
//         distanceInputEl.focus();

//         // // console.log(mapEvent.latlng);

//         // // console.log(lat);
//       });
//     },
//     function () {
//       alert("Could not get your position");
//     }
//   );
// }

// formEl.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const { lat, lng } = mapEvent.latlng;
//   const coords = [lat, lng];

//   distanceInputEl.value =
//     durationInputEl.value =
//     cadenceInputEl.value =
//     elevationInputEl.value =
//       "";
//   // console.log(map);
//   // console.log(mapEvent);

//   L.marker(coords)
//     .addTo(map)
//     .bindPopup(
//       L.popup([coords], {
//         maxWidth: 250,
//         minWidth: 100,
//         autoClose: false,
//         closeOnClick: false,
//         className: "running-pop-up",
//       })
//     )
//     .setPopupContent("Workout")
//     .openPopup();
// });

// selectInputEl.addEventListener("change", () => {
//   cadenceContainerEl.classList.toggle("d-none");
//   elevationContainerEl.classList.toggle("d-none");
// });
//

/* */

// ************************************************************************************************************************ //
// LESSON - Refactoring for Project Architecture
//

class App {
  // using private classfield to avoid using global variables
  #map;
  #mapEvent;

  // using the constructor to get position and generate a map on page load
  constructor() {
    this._getPosition();
    formEl.addEventListener("submit", this._newWorkout.bind(this));
    selectInputEl.addEventListener(
      "change",
      this._toggleElevationField.bind(this)
    );
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Could not get your position");
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coordinates = [latitude, longitude];

    this.#map = L.map("map").setView(coordinates, 15);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on("click", this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    formEl.classList.remove("invisible");
    distanceInputEl.focus();
  }

  _toggleElevationField() {
    cadenceContainerEl.classList.toggle("d-none");
    elevationContainerEl.classList.toggle("d-none");
  }

  _newWorkout(e) {
    e.preventDefault();
    // Clear input fields
    distanceInputEl.value =
      durationInputEl.value =
      cadenceInputEl.value =
      elevationInputEl.value =
        "";

    // Display marker
    const { lat, lng } = this.#mapEvent.latlng;
    const coords = [lat, lng];

    L.marker(coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup([coords], {
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: "running-pop-up",
        })
      )
      .setPopupContent("Workout")
      .openPopup();
  }
}

const app = new App();
console.log(app);

// ************************************************************************************************************************ //
// LESSON - Refactoring for Project Architecture
//
