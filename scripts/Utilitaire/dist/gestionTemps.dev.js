"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
var ajd = new Date();
var options = {
  weekday: 'long'
};
var jourActuel = ajd.toLocaleDateString('fr-FR', options); // console.log(jourActuel,ajd);

jourActuel = jourActuel.charAt(0).toLocaleUpperCase() + jourActuel.slice(1);
var tabJourEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));
console.log(tabJourEnOrdre);
var _default = tabJourEnOrdre;
exports["default"] = _default;