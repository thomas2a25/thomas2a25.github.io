// Initialisation de la carte centrée sur une position par défaut (Europe)
var map = L.map('map').setView([46.603354, 1.888334], 6);

// Ajout d'une couche OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Récupérer la position GPS de l'utilisateur
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var userLat = position.coords.latitude;
    var userLng = position.coords.longitude;

    // Centrer la carte sur la position de l'utilisateur
    map.setView([userLat, userLng], 13);

    // Ajouter un marqueur sur la position de l'utilisateur
    L.marker([userLat, userLng]).addTo(map)
      .bindPopup('Vous êtes ici')
      .openPopup();
  });
} else {
  alert("La géolocalisation n'est pas supportée par ce navigateur.");
}

// Ajouter un marqueur sur Nice (centre-ville)
var niceLat = 43.7009358;
var niceLng = 7.2683912;
L.marker([niceLat, niceLng]).addTo(map)
  .bindPopup('Nice, Centre-ville')
  .openPopup();
