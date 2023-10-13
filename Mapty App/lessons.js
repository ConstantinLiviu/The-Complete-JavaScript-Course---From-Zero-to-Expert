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
const dropdownEl = document.querySelector(".dropdown-toggle");
// const
// const
// const

dropdownEl.addEventListener("click", (e) => {
  console.log(dropdownEl.value);
  if (e.value === "running") console.log("fuj!");
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      //   console.log(latitude, longitude);
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coordinates = [latitude, longitude];

      const map = L.map("map").setView(coordinates, 15);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // L.marker(coordinates)
      //   .addTo(map)
      //   .bindPopup("A pretty CSS popup.<br> Easily customizable.")
      //   .openPopup();

      console.log(map);

      map.on("click", function (mapEvent) {
        console.log(mapEvent.latlng);
        const { lat, lng } = mapEvent.latlng;

        console.log(lat);
        const coords = [lat, lng];

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
    },
    function () {
      alert("Could not get your position");
    }
  );
}

//
// ************************************************************************************************************************ //
// LESSON - Rendering Workout Input Form
//
