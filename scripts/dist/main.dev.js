"use strict";

var _gestionTemps = _interopRequireDefault(require("./Utilitaire/gestionTemps.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var KEYAPI = 'eb390bec3071d5c5fe67db048d163633';
var resultatsAPI;
var temps = document.querySelector('.temps');
var temperature = document.querySelector('.temperature');
var localisation = document.querySelector('.localisation');
var heure = document.querySelectorAll('.heure-nom-prevision'); //UTILISER QUERY SELECTOR ALL

var tempPourH = document.querySelectorAll('.heure-prevision-valeur');
var chargementContainer = document.querySelector('.overlay-icone-chargement');
var joursDiv = document.querySelectorAll('.jour-prevision-nom');
var tempJourDiv = document.querySelectorAll('.jour-prevision-temp');
var imgIcon = document.querySelector('.logo-meteo'); //permet de retourner la position. On peut refuser avec la tipbox

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    var _long = position.coords.longitude;
    var lat = position.coords.latitude;
    appelAPI(_long, lat);
  }, function () {
    alert("Vous avez refus\xE9 la g\xE9olocalisation. l'application ne peut pas fonctionner, veuillez l'activer.");
  });
} //on utilise long et lat pour appeler l'API


function appelAPI(_long2, lat) {
  fetch("https://api.openweathermap.org/data/2.5/onecall?lat=".concat(lat, "&lon=").concat(_long2, "&exclude=minutely&units=metric&lang=fr&appid=").concat(KEYAPI)) //permet une requete http pour aller prendre les données de cet api
  .then(function (reponse) {
    return reponse.json();
  }).then(function (data) {
    console.log(data);
    resultatsAPI = data;
    temps.innerText = resultatsAPI.current.weather[0].description;
    temperature.innerText = "".concat(Math.trunc(resultatsAPI.current.temp), "\xB0");
    localisation.innerText = resultatsAPI.timezone; //les heures, par tranche de 3, avec leurs températures.

    var heureActuelle = new Date().getHours();

    for (var i = 0; i < heure.length; i++) {
      console.log('dans la boucle');
      var heureIncr = heureActuelle + i * 3;

      if (heureIncr > 24) {
        heure[i].innerText = "".concat(heureIncr - 24, " h");
      } else if (heureIncr === 24) {
        heure[i].innerText = "0 h";
      } else {
        heure[i].innerText = "".concat(heureIncr, " h");
      }
    } //temp pour 3 h


    for (var j = 0; j < tempPourH.length; j++) {
      tempPourH[j].innerText = "".concat(Math.trunc(resultatsAPI.hourly[j * 3].temp), "\xB0");
    } //3 premieres lettres des jours


    for (var k = 0; k < _gestionTemps["default"].length; k++) {
      joursDiv[k].innerText = _gestionTemps["default"][k].slice(0, 3);
    } //temp par jour


    for (var m = 0; m < 7; m++) {
      tempJourDiv[m].innerText = "".concat(Math.trunc(resultatsAPI.daily[m + 1].temp.day), "\xB0");
    } //incone dynamique


    if (heureActuelle >= 6 && heureActuelle < 21) {
      imgIcon.src = "ressources/jour/".concat(resultatsAPI.current.weather[0].icon, ".svg");
    } else {
      imgIcon.src = "ressources/nuit/".concat(resultatsAPI.current.weather[0].icon, ".svg");
    } //loading overlay


    chargementContainer.classList.add('disparition');
  });
}