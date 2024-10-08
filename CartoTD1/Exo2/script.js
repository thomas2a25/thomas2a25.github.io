// Options pour améliorer la précision et définir des délais
var options = {
    enableHighAccuracy: true,  // pour une meilleure précision
    timeout: 5000,             // délai maximal d'attente
    maximumAge: 0              // ne pas utiliser une position mise en cache
};

// Obtenir la position actuelle une seule fois au chargement de la page
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showCurrentPosition, showError, options);
    navigator.geolocation.watchPosition(showWatchPosition, showError, options);
} else {
    alert("La géolocalisation n'est pas supportée par ce navigateur.");
}

// Affichage pour getCurrentPosition
function showCurrentPosition(position) {
    document.getElementById("current-longitude").textContent = position.coords.longitude;
    document.getElementById("current-latitude").textContent = position.coords.latitude;
    document.getElementById("current-altitude").textContent = position.coords.altitude !== null ? position.coords.altitude : "Non disponible";
    document.getElementById("current-precision").textContent = position.coords.accuracy + " mètres";
    document.getElementById("current-speed").textContent = position.coords.speed !== null ? position.coords.speed + " m/s" : "Non disponible";
    document.getElementById("current-timestamp").textContent = new Date(position.timestamp).toLocaleString();
}

// Affichage pour watchPosition
function showWatchPosition(position) {
    document.getElementById("watch-longitude").textContent = position.coords.longitude;
    document.getElementById("watch-latitude").textContent = position.coords.latitude;
    document.getElementById("watch-altitude").textContent = position.coords.altitude !== null ? position.coords.altitude : "Non disponible";
    document.getElementById("watch-precision").textContent = position.coords.accuracy + " mètres";
    document.getElementById("watch-speed").textContent = position.coords.speed !== null ? position.coords.speed + " m/s" : "Non disponible";
    document.getElementById("watch-timestamp").textContent = new Date(position.timestamp).toLocaleString();
}

// Gestion des erreurs
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("L'utilisateur a refusé la demande de géolocalisation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Les informations de localisation ne sont pas disponibles.");
            break;
        case error.TIMEOUT:
            alert("La demande de localisation a expiré.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Une erreur inconnue est survenue.");
            break;
    }
}
