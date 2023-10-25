"use strict";

//
// ************************************************************************************************************************* //
// LESSON - First AJAX Call: XMLHttpRequest
//

const flagEl = document.querySelector(".flag");
const nameEl = document.querySelector(".name");
const continentEl = document.querySelector(".continent");
const populationEl = document.querySelector(".population");
const languageEl = document.querySelector(".language");
const currencyEl = document.querySelector(".currency");

// Old school way
const request = new XMLHttpRequest();
request.open("GET", "https://restcountries.com/v3.1/name/romania");
request.send();

request.addEventListener("load", function () {
  console.log(this);

  const [data] = JSON.parse(this.responseText);
  console.log(data);

  const html = `
  <div class="card-container">
    <div class="flag"></div>
    <div class="country-data">
        <div class="country-name">
            <h2 class="name"></h2>
            <h3 class="continent"></h3>
        </div>
        <div class="country-data">
            <p class="population"></p>
            <p class="language"></p>
            <p class="currency"></p>
        </div>
    </div>
  </div>`;
});
