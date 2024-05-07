document.addEventListener("DOMContentLoaded", () => {

    const postalCodeInput = document.getElementById("code-postal");
    const villeSelect = document.getElementById("menu-deroulant");
    const submitButton = document.getElementById("submitbutton");
    const Button = document.getElementById('new')
    const form = document.getElementById('section');

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
      if (/^\d{5}$/.test(codePostal)) {
        try {
          const data = await getCitiesByPostalCode(codePostal);
          displayCities(data);
          document.getElementById('submitbutton').innerText = 'Validé'

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
      document.getElementById('new').innerText =  'Nouvelle recherche'
      Button.style.display = 'inline'
      form.style.display = 'none';
    } catch (error) {
      console.error("Erreur lors de la requête API meteoConcept:", error);
      throw error;
    }
  }
});

Button.addEventListener("click", function () {
  location.reload();
  
  });    
  

  });
