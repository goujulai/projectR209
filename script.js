<<<<<<< HEAD
const axios = require('axios');

// Fonction pour obtenir le code INSEE d'une ville en fonction de son nom
async function getCodeInseeParNomVille(nomVille) {
    const apiUrl = `https://geo.api.gouv.fr/communes?nom=${nomVille}&fields=nom,code`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        // Vérifie si des villes ont été trouvées pour le nom donné
        if (data.length > 0) {
            // Supposons que nous utilisons les informations de la première ville trouvée
            const premiereVille = data[0];
            const codeInsee = premiereVille.code;
            return codeInsee;
        } else {
            console.log('Aucune ville trouvée pour le nom donné.');
            return null;
        }

    } catch (error) {
        console.error('Erreur lors de la récupération du code INSEE de la ville :', error);
        return null;
    }
}

async function getMeteoParCodeInsee(codeInsee) {
    const apiUrl = `https://api.meteo-concept.com/api/forecast/daily/0?token=1ccbcf76f9a6dc83aa91a60c303d9e7a6180b03278bf1a226dd64e74c60d9f4e&insee=${codeInsee}`;

    try {
        const response = await axios.get(apiUrl);
        return response.data;

    } catch (error) {
        console.error('Erreur lors de la récupération des informations météorologiques :', error);
        return null;
    }
}

const nomVille = 'Paris'; 
getCodeInseeParNomVille(nomVille)
    .then(codeInsee => {
        if (codeInsee) {
            getMeteoParCodeInsee(codeInsee)
                .then(meteo => {
                    // Afficher uniquement les informations météorologiques spécifiques
                    console.log(`Météo pour ${nomVille} :`);
                    console.log(`température minimal: ${meteo.forecast.tmin}`);
                    console.log(`température maximal: ${meteo.forecast.tmax}`);
                    console.log(`probabilité pluie: ${meteo.forecast.probarain}`);
                    console.log(`Ensoleillement journalier : ${meteo.forecast.sun_hours}`);
                });
        }
    });
=======
document.addEventListener("DOMContentLoaded", () => {

    const postalCodeInput = document.getElementById("code-postal");
    const villeSelect = document.getElementById("menu-deroulant");
    const submitButton = document.getElementById("submitbutton");

    async function getCitiesByPostalCode(postalCode) {
      try {
        const response = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${postalCode}`);
        const data = await response.json();
        console.table(data);
        return data;
      } catch (error) {
        console.error('Erreur:', error);
      }
    }

    postalCodeInput.addEventListener('input', async () => {
      const codePostal = postalCodeInput.value;
      villeSelect.innerHTML = "";
      if (codePostal.length === 5) {
        try {
          const data = await getCitiesByPostalCode(codePostal);
          displayCities(data);
        } catch (error) {
          console.error(
            "Une erreur est survenue lors de la recherche de la commune :",
            error
          );
          throw error;
        }
      }
    });

    function displayCities(data) {
      if (data.length === 1) {
        const town = data[0];
        villeSelect.innerHTML = `<option value="${town.code}">${town.nom}</option>`;
      } else if (data.length > 1) {
        data.forEach((town) => {
          const option = document.createElement("option");
          option.value = town.code;
          option.textContent = town.nom;
          villeSelect.appendChild(option);
        });
      }
      villeSelect.style.display = "block";
      submitButton.style.display = "block";
    };

    async function getmeteoparville(selectedville) {
      try {
        const response = await fetch( `https://api.meteo-concept.com/api/forecast/daily/0?token=1ccbcf76f9a6dc83aa91a60c303d9e7a6180b03278bf1a226dd64e74c60d9f4e&insee=${selectedville}`
        );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la requête API:", error);
      throw error;
    }
  }

  function displayHours(sunHours) {
      return sunHours + (sunHours > 1 ? " heures" : " heure");
    }

  submitButton.addEventListener("click", async () => {
  const selectedVille = villeSelect.value;
  if (selectedVille != null) {
    try {
      const data = await getmeteoparville(selectedVille);
      document.getElementById('temp-min').innerText = `Température minimale : ${data.forecast.tmin}°C`;
      document.getElementById('temp-max').innerText = `Température maximale : ${data.forecast.tmax}°C`;
      document.getElementById('prob-pluie').innerText = `Probabilité de pluie : ${data.forecast.probarain}%`;
      document.getElementById('ensoleillement').innerText = `Ensoleillement journalier : ${displayHours(data.forecast.sun_hours)}`;
    } catch (error) {
      console.error("Erreur lors de la requête API meteoConcept:", error);
      throw error;
    }
  }
});

    

  });
>>>>>>> 4c1ba35 (Projet à jour)
