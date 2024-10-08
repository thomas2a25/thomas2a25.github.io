// Créer le canvas et le moteur Babylon.js
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const engine = new BABYLON.Engine(canvas, true);

// Créer la scène
const createScene = function () {
    const scene = new BABYLON.Scene(engine);

    // Créer une caméra ArcRotate
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 3, 6, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // Ajouter une lumière hémisphérique
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // Créer une sphère avec un matériau texturé
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
    const material = new BABYLON.StandardMaterial("sphereMaterial", scene);
    material.diffuseTexture = new BABYLON.Texture("https://www.babylonjs.com/assets/earth.jpg", scene);
    sphere.material = material;

    // Rendre la scène
    return scene;
}

const scene = createScene();

// Boucle de rendu
engine.runRenderLoop(function () {
    scene.render();
});

// Redimensionner le canvas lorsque la fenêtre change de taille
window.addEventListener("resize", function () {
    engine.resize();
});
