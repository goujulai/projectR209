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
                    console.log(`Météo pour ${nomVille} :`, meteo);
                });
        }
    });

