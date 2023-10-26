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
const appContainerEl = document.querySelector(".app-container");

// // Old school way
// const request = new XMLHttpRequest();
// request.open("GET", "https://restcountries.com/v3.1/name/romania");
// request.send();

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    console.log(this);

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = document.createElement("div");
    html.classList.add("card-container");
    html.innerHTML = `
    <img class="flag" src="${data.flags.svg}" alt="${data.flags.alt}"/>
    <div class="country-data">
        <div class="country-name">
            <h2 class="name">${data.name.official}</h2>
            <h3 class="continent">${data.region}</h3>
        </div>
        <div class="country-data">
            <p class="population">${(+data.population / 1000000).toFixed(1)}</p>
            <p class="language">${Object.values(data.languages)[0]}</p>
            <p class="currency">${
              Object.entries(Object.values(data.currencies)[0])[0][1]
            }</p>
        </div>
    </div>`;

    appContainerEl.appendChild(html);
  });
};

getCountryData("romania");
getCountryData("spain");
getCountryData("portugal");
getCountryData("usa");
