/*
    klasa ognia, utworzona w pliku Fire.js
*/

function Laser(v1, v2) {

    //puste zmienne: materiał , geometria, światło, mesh
    var particles;
    var particleMaterial;
    var particleSystem = undefined;
    var tab = [];
    // kontener
    var container = new THREE.Object3D();

    // init
    function init() {

        // tu utwórz materiał , geometria, meshe
        // i dodaj je do kontenera (add)

        particles = new THREE.Geometry() // geometria - tablica cząsteczek

        particleMaterial = new THREE.PointsMaterial(
            {
                color: 0xff3300,
                size: 100, // ta wartośc zmieniamy suwakiem skali
                map: THREE.ImageUtils.loadTexture("mats/particle.png"), // grafika zapewniająca "okrągły" kształt cząsteczki
                blending: THREE.AdditiveBlending,
                transparent: true,
                depthWrite: false,
                opacity: 0.6
            });

        var subV = new THREE.Vector3(
	            v1.x - v2.x,
	            v1.y - v2.y,
	            v1.z - v2.z
                );

        var particlesCount = 1000;

        var stepV = subV.divideScalar(particlesCount) // particlesCount - przewidywana ilość cząsteczek

            for (var i = 0; i < particlesCount; i++) {
                var particle = new THREE.Vector3(
                //particle.x +
                    stepV.x * i,
               // particle.y +
                    stepV.y * i,
              //  particle.z +
                    stepV.z * i)
                particles.vertices.push(particle);
            }

            particleSystem = new THREE.Points(particles, particleMaterial);
            container.add(particleSystem);
        
    }

    init();

    this.getLaser = function () {
        return container;
    }

    this.animateLaser = function () {
        var verts = particles.vertices;

        for (var i = 0; i < verts.length; i++) {
            var particle = verts[i];
            // tu zmieniaj losowo pozycję x,y,z każdej z cząsteczek       
            particle.x = Math.floor(Math.random() * 2) + 0;
            particle.y = Math.floor(Math.random() * 100) + 0;
            particle.z = Math.floor(Math.random() * 2) + 0;

        }

        particleSystem.geometry.verticesNeedUpdate = true;
        particleSystem.material.size = 5 // zmiana skali wszystkich cząsteczek
    }
}