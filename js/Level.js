/// <reference path="../index.html" />
/// <reference path="MyLight.js" />
/// <reference path="LevelData.js" />


function Level(scene) {

    this.tabFire = [];
    this.fire = undefined;
    this.mixer3 = undefined;
    this.mixer4 = undefined;
    var leveldata = new LevelData().getData();
    console.log(leveldata);

    var mat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 10,
        side: THREE.DoubleSide,
        map: THREE.ImageUtils.loadTexture("mats/ground.png"),
    });

    var geom = new THREE.PlaneBufferGeometry(4096, 4096);

    var mesh = new THREE.Mesh(geom, mat);
    mesh.rotateX(Math.PI / 2);
    mesh.rotateY(0);
    //mesh.rotateZ(obrot_w_radianach); 
    mesh.material.map.repeat.set(1, 1); //gęstość powtarzania
    mesh.material.map.wrapS = mesh.material.map.wrapT = THREE.RepeatWrapping; // powtarzanie w obu kierunkach
    mesh.position.set(256, 0, 256);
    mesh.castShadow = true;
    scene.add(mesh);

    /*var myLight = new MyLight(0xffffff, scene).getLight();
    myLight.position.y = 600;
    myLight.position.x = 100;
    myLight.position.z = 100;
    scene.add(myLight);*/

    //materiały i geometrie
    var geometry = new THREE.CubeGeometry(100, 100, 100, 3, 3, 3);
    var geometry_items = new THREE.CubeGeometry(20, 20, 20, 3, 3, 3);

    var material_wall = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 50,
        side: THREE.DoubleSide,
        map: THREE.ImageUtils.loadTexture("mats/wall.png"),
    });

    var material_treasure = new THREE.MeshPhongMaterial({
        color: 0xffcc00,
        specular: 0xffffff,
        shininess: 50,
        side: THREE.DoubleSide,
        map: THREE.ImageUtils.loadTexture("mats/treasure.jpg"),
    });

    var material_item1 = new THREE.MeshPhongMaterial({
        color: 0x662200,
        specular: 0xffffff,
        shininess: 50,
        side: THREE.DoubleSide,
        map: THREE.ImageUtils.loadTexture("mats/item1.jpg"),
    });

    var material_item2 = new THREE.MeshPhongMaterial({
        color: 0x5fd00b,
        specular: 0xffffff,
        shininess: 50,
        side: THREE.DoubleSide,
        map: THREE.ImageUtils.loadTexture("mats/item2.jpg"),
    });

    

    /////////////////
    for (var i = 0; i < leveldata.level.length; i++) {
        if (leveldata.level[i].type == "wall") {
            var mesh = new THREE.Mesh(geometry, material_wall);
            scene.add(mesh);
            mesh.position.x = leveldata.level[i].x * 100;
            mesh.position.z = leveldata.level[i].y * 100;
            mesh.position.y = 50;
        }
        else if (leveldata.level[i].type == "treasure") {
            var mesh = new THREE.Mesh(geometry_items, material_treasure);
            scene.add(mesh);
            mesh.position.x = leveldata.level[i].x * 100 + 0;
            mesh.position.z = leveldata.level[i].y * 100 + 0;
            mesh.position.y = 10;
        }
        else if (leveldata.level[i].type == "item1") {
            var mesh = new THREE.Mesh(geometry_items, material_item1);
            scene.add(mesh);
            mesh.position.x = leveldata.level[i].x * 100 + 0;
            mesh.position.z = leveldata.level[i].y * 100 + 0;
            mesh.position.y = 10;
        }
        else if (leveldata.level[i].type == "item2") {
            var mesh = new THREE.Mesh(geometry_items, material_item2);
            scene.add(mesh);
            mesh.position.x = leveldata.level[i].x * 100 + 0;
            mesh.position.z = leveldata.level[i].y * 100 + 0;
            mesh.position.y = 10;
        }
        else if (leveldata.level[i].type == "light") {
            var mylight = new MyLight("yellow", scene).getLight();
            mylight.position.set((100 * leveldata.level[i].x), 100, (100 * leveldata.level[i].y));
            console.log(mylight.position)
            //light.lookAt(mesh.position);
            scene.add(mylight);
            
            this.fire = new Fire();
            this.fire.getFire().position.set((100 * leveldata.level[i].x), 8, (100 * leveldata.level[i].y));
            scene.add(this.fire.getFire());
            this.tabFire.push(this.fire.getFire());
        }
        else if (leveldata.level[i].type == "enemy") {
            var material_enemy = new THREE.MeshBasicMaterial(
            {
                map: THREE.ImageUtils.loadTexture("mats/unit02.gif"),
                morphTargets: true,

            });

            var material_enemy_weapon = new THREE.MeshBasicMaterial(
                     {
                         map: THREE.ImageUtils.loadTexture("mats/weapon_unit02.jpg"),
                         morphTargets: true,

                     });

            var loader = new THREE.JSONLoader();

            var that = this;
            this.x = leveldata.level[i].x;
            this.z = leveldata.level[i].y
            var meshModel3;
            var meshModel4;
            loader.load('models/tris_unit02.js', function (geometry) {

                meshModel3 = new THREE.Mesh(geometry, material_enemy)
                meshModel3.name = "body-unit02";

                var box = new THREE.Box3().setFromObject(meshModel3);
                // console.log(box.getSize().y);

                meshModel3.rotation.y = Math.PI; // ustaw obrót modelu
                meshModel3.position.y = box.getSize().y - 25; // ustaw pozycje modelu
                meshModel3.position.x = that.x * 100 + 0;
                meshModel3.position.z = that.z * 100 + 0;
                meshModel3.scale.set(1, 1, 1); // ustaw skalę modelu
                scene.add(meshModel3);

                this.mixer3 = new THREE.AnimationMixer(meshModel3);
                this.mixer3.clipAction("cr1stand").play();
                //console.log(geometry.animations)

                loader.load('models/weapon_unit02.js', function (geometry) {

                    meshModel4 = new THREE.Mesh(geometry, material_enemy_weapon)
                    meshModel4.name = "weapon-enemy";

                    var box = new THREE.Box3().setFromObject(meshModel4);

                    meshModel4.rotation.y = Math.PI; // ustaw obrót modelu
                    meshModel4.position.y = box.getSize().y; // ustaw pozycje modelu
                    meshModel4.position.x = that.x * 100 + 0;
                    meshModel4.position.z = that.z * 100 + 0;
                    meshModel4.scale.set(1, 1, 1); // ustaw skalę modelu
                    scene.add(meshModel4);

                    this.mixer4 = new THREE.AnimationMixer(meshModel4);
                    this.mixer4.clipAction("cr1stand").play();

                })
            })
        }
    }
    /////postaci

}