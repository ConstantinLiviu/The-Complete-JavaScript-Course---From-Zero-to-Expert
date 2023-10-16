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

const formEl = document.querySelector("form");
const distanceInputEl = document.getElementById("inputDistance");
const durationInputEl = document.getElementById("inputDuration");
const cadenceContainerEl = document.querySelector(".cadence-container");
const elevationContainerEl = document.querySelector(".elevation-container");
const selectInputEl = document.getElementById("selectOptions");

let map;
let mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      //   console.log(latitude, longitude);
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coordinates = [latitude, longitude];

      map = L.map("map").setView(coordinates, 15);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // L.marker(coordinates)
      //   .addTo(map)
      //   .bindPopup("A pretty CSS popup.<br> Easily customizable.")
      //   .openPopup();

      // console.log(map);

      map.on("click", function (e) {
        mapEvent = e;
        formEl.classList.remove("invisible");
        distanceInputEl.focus();

        // // console.log(mapEvent.latlng);

        // // console.log(lat);
      });
    },
    function () {
      alert("Could not get your position");
    }
  );
}

formEl.addEventListener("submit", () => {
  const { lat, lng } = mapEvent.latlng;
  const coords = [lat, lng];

  // console.log(map);
  // console.log(mapEvent);

  L.marker(coords)
    .addTo(map)
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
});

selectInputEl.addEventListener("change", () => {
  cadenceContainerEl.classList.toggle("d-none");
  elevationContainerEl.classList.toggle("d-none");
});
//
// ************************************************************************************************************************ //
// LESSON - Rendering Workout Input Form
//
