/*
    klasa ognia, utworzona w pliku Fire.js
*/

function Fire(change) {

    //puste zmienne: materiał , geometria, światło, mesh
    var material;
    var geometry;
    var mesh;
    var tab = [];
    // kontener
    var container = new THREE.Object3D();

    // init
    function init() {

        // tu utwórz materiał , geometria, meshe
        // i dodaj je do kontenera (add)
        geometry = new THREE.CubeGeometry(1, 1, 1, 1, 1, 1);

        material = new THREE.MeshBasicMaterial({
            color: 0xff6600,
            transparent: true,
            opacity: 0.5,
            depthWrite: false,
            blending: THREE.AdditiveBlending, // kluczowy element zapewniający mieszanie kolorów poszczególnych cząsteczek
        });

        

        for (var i = 0; i < 50; i++) {
            mesh = new THREE.Mesh(geometry, material.clone());
            var scale = Math.floor(Math.random() * 12) + 1;
            mesh.scale.set(scale, scale, scale);
            mesh.position.y = 0;
            mesh.position.x = Math.floor(Math.random() * 20) + 0;
            mesh.position.z = Math.floor(Math.random() * 20) + 0;
            container.add(mesh);
            tab.push(mesh);
        }
    }

    init();

    this.getFire = function () {
        return container;
    }

    this.updateFire = function (meshTab) {
        for (var i = 0; i < meshTab.length; i++) {
            if (meshTab[i].position.y >= 30) {
                meshTab[i].position.y = Math.floor(Math.random() * 3) + 0
            }
            var speed = Math.random();
            meshTab[i].position.y += speed;
            meshTab[i].opacity -= 0.1;
        }
    }

    this.changeFire = function () {
        for (var i = 0; i < tab.length; i++) {
            tab[i].scale.set(change, change, change);
            //tab[i].position.x = change;
            // tab[i].position.z = change;
        }
    }
}