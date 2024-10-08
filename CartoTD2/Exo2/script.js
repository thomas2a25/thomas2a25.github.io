// Coordonnées des sommets du Triangle des Bermudes
const bermudaTriangle = [
    [25.774, -80.190],  // Miami
    [32.321, -64.757],  // Bermudes
    [18.466, -66.118]   // Porto Rico
];

// Coordonnées de Marseille et Nice
const marseille = [43.2965, 5.3698];
const nice = [43.7102, 7.2620];

// Initialiser la carte avec la carte Stamen Toner
const map = L.map('map').setView([25.774, -80.190], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Tracer le triangle des Bermudes en rouge
const triangle = L.polygon(bermudaTriangle, {color: 'red'}).addTo(map);

// Géolocalisation de l'utilisateur
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const accuracy = position.coords.accuracy;

        // Ajouter un cercle autour de la position de l'utilisateur avec une taille selon la précision
        L.circle([userLat, userLng], {
            color: 'blue',
            fillColor: '#30f',
            fillOpacity: 0.5,
            radius: accuracy
        }).addTo(map).bindPopup("Vous êtes ici avec une précision de " + accuracy + " mètres.");

        // Ajouter un segment entre Marseille et Nice
        const line = L.polyline([marseille, nice], {color: 'green'}).addTo(map);

        // Calculer la distance entre Marseille et la position de l'utilisateur
        const distance = calculateGreatCircleDistance(marseille[0], marseille[1], userLat, userLng);

        // Afficher la distance dans un popup
        L.popup()
            .setLatLng([userLat, userLng])
            .setContent("Distance à Marseille : " + distance.toFixed(2) + " km")
            .openOn(map);
    });
} else {
    alert("La géolocalisation n'est pas supportée par ce navigateur.");
}

// Fonction pour calculer la distance entre deux points avec la formule du grand cercle
function calculateGreatCircleDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Rayon de la Terre en km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function toRadians(deg) {
    return deg * (Math.PI / 180);
}
