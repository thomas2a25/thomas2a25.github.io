// Initialisation de la carte centrée sur Nice
var map = L.map('map').setView([43.7102, 7.2620], 12);  // Zoom ajusté pour une vue plus large de Nice

// Utilisation d'un fond de carte alternatif ArcGIS
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Sources: Esri, NAVTEQ, USGS, iPC, NRCAN, Esri Japan, METI, Esri China, TomTom, 2012'
}).addTo(map);

// URL des données GeoJSON pour les communes du département 06
var geojsonUrl = 'https://geo.api.gouv.fr/communes?codeDepartement=06&fields=nom,code,population&format=geojson&geometry=centre';

// Récupérer et afficher les données GeoJSON
fetch(geojsonUrl)
    .then(response => response.json())
    .then(data => {
        // Ajouter les données GeoJSON sur la carte
        L.geoJSON(data, {
            style: function(feature) {
                return {color: "blue", weight: 1};  // Style personnalisé pour chaque commune
            },
            onEachFeature: function(feature, layer) {
                // Ajouter un popup avec plus d'informations sur la commune
                layer.bindPopup(
                    `<h3>${feature.properties.nom}</h3>
                    <b>Code Insee:</b> ${feature.properties.code}<br>
                    <b>Population:</b> ${feature.properties.population.toLocaleString()}`
                );
            }
        }).addTo(map);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données GeoJSON:', error);
    });
