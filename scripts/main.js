import tabJourEnOrdre from './Utilitaire/gestionTemps.js';

const KEYAPI = 'eb390bec3071d5c5fe67db048d163633';
let resultatsAPI;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');                        //UTILISER QUERY SELECTOR ALL
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const chargementContainer = document.querySelector('.overlay-icone-chargement');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJourDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcon = document.querySelector('.logo-meteo')


//permet de retourner la position. On peut refuser avec la tipbox
if(navigator.geolocation){ 
    navigator.geolocation.getCurrentPosition(position => {

        console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        appelAPI(long,lat);

    }, () => {
        alert(`Vous avez refusé la géolocalisation. l'application ne peut pas fonctionner, veuillez l'activer.`);
    })
}

//on utilise long et lat pour appeler l'API
function appelAPI(long,lat){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${KEYAPI}`)//permet une requete http pour aller prendre les données de cet api

    .then((reponse) => {
        return reponse.json();
    })

    .then((data) => {
        console.log(data);
        resultatsAPI = data;

        temps.innerText = resultatsAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`;
        localisation.innerText = resultatsAPI.timezone;

        //les heures, par tranche de 3, avec leurs températures.
        let heureActuelle = new Date().getHours();

        for(let i = 0; i < heure.length; i++) {

            console.log('dans la boucle');
            let heureIncr = heureActuelle + i * 3;
            
            if(heureIncr > 24) {
                heure[i].innerText = `${heureIncr - 24} h`;
            } else if(heureIncr === 24) {
                heure[i].innerText = "0 h"
            } else {
                heure[i].innerText = `${heureIncr} h`;
            }
        }

        //temp pour 3 h
        for(let j = 0; j < tempPourH.length ; j++){
            tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j * 3].temp)}°`
        }

        //3 premieres lettres des jours
        for(let k = 0; k < tabJourEnOrdre.length; k++){
            joursDiv[k].innerText = tabJourEnOrdre[k].slice(0,3);
        }
        
        //temp par jour
        for (let m = 0; m < 7; m++){
            tempJourDiv[m].innerText = `${Math.trunc(resultatsAPI.daily[m+1].temp.day)}°`;
        }

        //incone dynamique
        if(heureActuelle >= 6 && heureActuelle <21){
            imgIcon.src= `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`;
        }
        else{
            imgIcon.src= `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`;

        }

        //loading overlay
        chargementContainer.classList.add('disparition');
    })
}