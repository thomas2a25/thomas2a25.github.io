document.getElementById('requestPermissionBtn').addEventListener('click', () => {
    // Demande de permission pour DeviceOrientationEvent (orientation)
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission().then(permissionState => {
            if (permissionState === 'granted') {
                window.addEventListener('deviceorientation', handleOrientation);
            } else {
                alert("Permission pour l'orientation refusée.");
            }
        }).catch(console.error);
    } else {
        window.addEventListener('deviceorientation', handleOrientation);
    }

    // Demande de permission pour DeviceMotionEvent (mouvement)
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission().then(permissionState => {
            if (permissionState === 'granted') {
                window.addEventListener('devicemotion', handleMotion);
            } else {
                alert("Permission pour le mouvement refusée.");
            }
        }).catch(console.error);
    } else {
        window.addEventListener('devicemotion', handleMotion);
    }
});

// Fonction pour gérer les événements d'orientation (alpha, beta, gamma)
function handleOrientation(event) {
    const alpha = event.alpha || 0; // Rotation autour de l'axe Z
    const beta = event.beta || 0;   // Inclinaison autour de l'axe X
    const gamma = event.gamma || 0; // Inclinaison autour de l'axe Y

    document.getElementById('alpha').innerText = alpha.toFixed(2);
    document.getElementById('beta').innerText = beta.toFixed(2);
    document.getElementById('gamma').innerText = gamma.toFixed(2);
}

// Fonction pour gérer les événements de mouvement (accélération et rotation)
function handleMotion(event) {
    const accelerationX = event.acceleration.x || 0;
    const accelerationY = event.acceleration.y || 0;
    const accelerationZ = event.acceleration.z || 0;

    const rotationAlpha = event.rotationRate.alpha || 0;
    const rotationBeta = event.rotationRate.beta || 0;
    const rotationGamma = event.rotationRate.gamma || 0;

    document.getElementById('accelerationX').innerText = accelerationX.toFixed(2);
    document.getElementById('accelerationY').innerText = accelerationY.toFixed(2);
    document.getElementById('accelerationZ').innerText = accelerationZ.toFixed(2);
    document.getElementById('rotationAlpha').innerText = rotationAlpha.toFixed(2);
    document.getElementById('rotationBeta').innerText = rotationBeta.toFixed(2);
    document.getElementById('rotationGamma').innerText = rotationGamma.toFixed(2);
}
