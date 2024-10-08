const canvas = document.getElementById('drawingCanvas');
const context = canvas.getContext('2d');
const positionElement = document.getElementById('position');
const eventTypeElement = document.getElementById('eventType');

let drawing = false;

// Met à jour les informations de position et d'événement
function updateInfo(event, type) {
    const touch = event.touches[0];
    const x = touch.clientX - canvas.offsetLeft;
    const y = touch.clientY - canvas.offsetTop;

    positionElement.textContent = `x: ${x.toFixed(2)}, y: ${y.toFixed(2)}`;
    eventTypeElement.textContent = type;
}

// Commence le dessin
canvas.addEventListener('touchstart', (event) => {
    drawing = true;
    context.beginPath();
    const touch = event.touches[0];
    context.moveTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
    updateInfo(event, 'touchstart');
});

// Continue à dessiner pendant le mouvement
canvas.addEventListener('touchmove', (event) => {
    if (!drawing) return;
    const touch = event.touches[0];
    context.lineTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
    context.stroke();
    updateInfo(event, 'touchmove');
});

// Arrête le dessin
canvas.addEventListener('touchend', (event) => {
    drawing = false;
    updateInfo(event, 'touchend');
});

// Prévient le comportement par défaut (comme le scroll)
canvas.addEventListener('touchstart', (event) => event.preventDefault());
canvas.addEventListener('touchmove', (event) => event.preventDefault());
canvas.addEventListener('touchend', (event) => event.preventDefault());
