// Initialisation de la scène BabylonJS
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);

// Création de la caméra arc-rotate
var camera = new BABYLON.ArcRotateCamera("camera", BABYLON.Tools.ToRadians(0), BABYLON.Tools.ToRadians(45), 6, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, true);

// Ajout de la lumière
var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

// Création de la sphère représentant la Terre
var earth = BABYLON.MeshBuilder.CreateSphere("earth", {diameter: 2}, scene);

// Application de la texture de la Terre
var earthMaterial = new BABYLON.StandardMaterial("earthMaterial", scene);
earthMaterial.diffuseTexture = new BABYLON.Texture("textures/2k_earth_daymap.jpg", scene);
earth.material = earthMaterial;
earthMaterial.diffuseTexture.vScale = -1;
earth.scaling = new BABYLON.Vector3(-1, 1, 1);

// Fonction de conversion des coordonnées Lat/Lon vers cartesiennes (XYZ)
function latLonToCartesian(lat, lon, radius) {
    var phi = (90 - lat) * (Math.PI / 180);
    var theta = (-lon + 180) * (Math.PI / 180); // Inversion de la longitude ici
    var x = -(radius * Math.sin(phi) * Math.cos(theta));
    var z = radius * Math.sin(phi) * Math.sin(theta);
    var y = radius * Math.cos(phi);
    return new BABYLON.Vector3(x, y, z);
}


// Récupérer les positions de plusieurs pays et afficher des marqueurs en forme de cube avec drapeaux
fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(countries => {
        countries.forEach(country => {
            if (country.latlng && country.flags && country.flags.png) {
                var latitude = country.latlng[0];
                var longitude = country.latlng[1];
                
                // Convertir les coordonnées en cartesiennes
                var position = latLonToCartesian(latitude, longitude, 1.05); // Ajuste pour la surface
                
                // Créer un cube pour chaque pays
                var countryMarker = BABYLON.MeshBuilder.CreateBox("countryMarker", {size: 0.05}, scene);
                countryMarker.position = position;
                
                // Appliquer la texture du drapeau du pays
                var flagMaterial = new BABYLON.StandardMaterial("flagMaterial", scene);
                flagMaterial.diffuseTexture = new BABYLON.Texture(country.flags.png, scene); // Drapeau du pays
                countryMarker.material = flagMaterial;
            }
        });
    });

// Démarrer la boucle de rendu
engine.runRenderLoop(function () {
    scene.render();
});

// Redimensionner la scène lors du redimensionnement de la fenêtre
window.addEventListener("resize", function () {
    engine.resize();
});
