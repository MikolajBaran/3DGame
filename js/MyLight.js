/*
    klasa światła, utworzona w pliku MyLight.js
*/

function MyLight(color, scene) {

    //puste zmienne: materiał , geometria, światło, mesh
    var material;
    var geometry;
    var light;
    var mesh;

    // kontener
    var container = new THREE.Object3D();

    // init
    function init() {

        // tu utwórz materiał , geometria, światło, mesh
        // i dodaj je do kontenera (add)


        material = new THREE.MeshPhongMaterial({
            specular: 0xffffff,
            shininess: 50,
            side: THREE.DoubleSide,
            map: THREE.ImageUtils.loadTexture("mats/lamp.jpg"),
        })

        geometry = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
        mesh = new THREE.Mesh(geometry, material);
        container.add(mesh);

        light = new THREE.PointLight(color);
        light.position.set(0, 0, 0);
        light.lookAt(scene.position);
        container.add(light);

    }

    init();

    // funkcja publiczna zwracająca obiekt kontenera
    // czyli nasze światło wraz z bryłą

    this.getLight = function () {
        return container;
    }

    // inne funkcje publiczne, np zmiana koloru bryły, zmiana koloru światła

    this.changeLightColor = function (colour) {
        light.color.setHex(colour)
        console.log("zmiana koloru na " + colour)
    }

}