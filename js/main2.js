function compute_pos_x(start_ang, rad, timestep, ang_vel) {
    var new_x = rad*Math.cos((start_ang+(ang_vel*timestep))*Math.PI/180);
    return new_x;
}

function compute_pos_z(start_ang, rad, timestep, ang_vel) {
    var new_z = rad*Math.sin((start_ang+(ang_vel*timestep))*Math.PI/180);
    return new_z;
}

function new_obj(rad, colors, name, shiny) {
    if (shiny)
    {    var pinkMat1 = new THREE.MeshPhongMaterial({
            color: colors[0],
            emissive: 0xF66120,
            specular: 0xFFED22,
            shininess: 10,
            shading: THREE.FlatShading,
            transparent: 1,
            opacity: 1
        });
        var pinkMat2 = new THREE.MeshPhongMaterial({
            color: colors[1],
            emissive: 0xF66120,
            specular: 0xFFED22,
            shininess: 10,
            shading: THREE.FlatShading,
            transparent: 1,
            opacity: 1
        });
        var pinkMat3 = new THREE.MeshPhongMaterial({
            color: colors[2],
            emissive: 0xF66120,
            specular: 0xFFED22,
            shininess: 10,
            shading: THREE.FlatShading,
            transparent: 1,
            opacity: 1
        });
    }
    else {
        var pinkMat1 = new THREE.MeshLambertMaterial({
            color: colors[0],
            emissive: colors[0],
            shading: THREE.FlatShading,
        });
        var pinkMat2 = new THREE.MeshLambertMaterial({
            color: colors[1],
            emissive: colors[1],
            shading: THREE.FlatShading,
        });
        var pinkMat3 = new THREE.MeshLambertMaterial({
            color: colors[2],
            emissive: colors[2],
            shading: THREE.FlatShading,
        });
    }
    var obj1 = new THREE.Mesh(new THREE.IcosahedronGeometry(rad, 1), pinkMat1);
    obj1.name = name;
    var obj2 = new THREE.Mesh(new THREE.IcosahedronGeometry(rad, 1), pinkMat2);
    obj1.name = name;
    var obj3 = new THREE.Mesh(new THREE.IcosahedronGeometry(rad, 1), pinkMat3);
    obj1.name = name;
    var group = new THREE.Group();
    group.add(obj1);
    group.add(obj2)
    group.add(obj3)

    var light = new THREE.DirectionalLight(0xffffff, 0.1);
    light.position.set(1, 1, 1);
    group.add(light);

    group.name = name;

    return group
}

function update_rotation(object, amt) {
    if (object.children.length==4) {
        object.children[0].rotation.x+=amt
        object.children[1].rotation.y+=amt
        object.children[2].rotation.z+=amt
    } else {
        //object.rotation.x+=amt;
        object.rotation.y+=amt;
        //object.rotation.z+=amt;
    }
}

var w = window.innerWidth, h = window.innerHeight;

var container, renderer, scene, camera, controls, children;
var timestep= 0;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(-1, -1);

var camHelper, stats, isDown = false,
    isDragging = false;

let object;

var sun, earth, moon, venus, mars, mercury, jupiter, uranus, neptune, saturn, saturn_rings;

// renderer
renderer = new THREE.WebGLRenderer({
    antialias: true,
    //preserveDrawingBuffer: true,  // so canvas.toBlob() make sense
    alpha:true,   // so png background is transparent
});
renderer.setPixelRatio(window.devicePixelRatio);
container = document.getElementById('container');
renderer.setSize(w, h);
container.appendChild(renderer.domElement);

stats = new Stats();

// world
scene = new THREE.Scene();

// camera
camera = new THREE.PerspectiveCamera(60, w / h, 1, 2000);
camera.position.x = 14.884195356087229;
camera.position.y = 18.730496537477936;
camera.position.z = 35.93362629367636;
controls = new THREE.OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
//scene.add( ambientLight );

const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
camera.add( pointLight );
scene.add( camera );

sun = new_obj(4, [0xffff00, 0xffff00, 0xffff00], "sun", 1);
sun.position.x = 0;
sun.position.y = 0;
sun.position.x = 0;
scene.add(sun);

function loadModel() {
    earth = object.children[0];
    earth.name = "earth";
    earth.geometry.center();

    moon = object.children[1];
    moon.name = "moon";
    moon.geometry.center();
    moon.position.x = 2;

    venus = object.children[2];
    venus.name = "venus";
    venus.geometry.center();

    mars = object.children[3];
    mars.name = "mars";
    mars.geometry.center();

    mercury = object.children[4];
    mercury.name = "mercury";
    mercury.geometry.center();

    jupiter = object.children[5];
    jupiter.name = "jupiter";
    jupiter.geometry.center();

    uranus = object.children[6];
    uranus.name = "uranus";
    uranus.geometry.center();

    neptune = object.children[7];
    neptune.name = "neptune";
    neptune.geometry.center();

    saturn = object.children[10];
    saturn.name = "saturn";
    saturn.geometry.center();

    saturn_rings = object.children[9];
    saturn_rings.name = "saturn_rings";
    saturn_rings.geometry.center();

    earth.add(moon);
    saturn.add(saturn_rings)
    scene.add( mercury );
    scene.add(venus);
    scene.add(earth);
    scene.add(mars);
    scene.add(jupiter);
    scene.add(saturn);
    scene.add(uranus);
    scene.add(neptune);

}

const manager = new THREE.LoadingManager( loadModel );
function onProgress( xhr ) {
    if ( xhr.lengthComputable ) {
        const percentComplete = xhr.loaded / xhr.total * 100;
        console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
    }
}
function onError() {}
const loader = new THREE.OBJLoader( manager );
const materialsLoader = new THREE.MTLLoader(manager);
materialsLoader.load('models/Space.mtl', function (materialsCreator) {
    loader.setMaterials(materialsCreator);
    loader.load( 'models/Space.obj', function ( obj ) {

        object = obj;
    }, onProgress, onError );
}, onProgress, onError);

function animate() {
    requestAnimationFrame(animate);

    const sun = scene.getObjectByName('sun');
    if (sun) {update_rotation(sun, 0.005);}

    const mercury = scene.getObjectByName('mercury');
    if (mercury) {
        mercury.position.x = compute_pos_x(45, 7, 2*timestep, 0.05);
        mercury.position.z = compute_pos_z(45, 7, 2*timestep, 0.05);
        update_rotation(mercury, 0.005);
    }

    const venus = scene.getObjectByName('venus');
    if (venus) {
        venus.position.x = compute_pos_x(315, 9, timestep, 0.045);
        venus.position.z = compute_pos_z(315, 9, timestep, 0.045);
        update_rotation(venus, 0.005);
    }

    const earth = scene.getObjectByName('earth');
    if (earth) {
        earth.position.x = compute_pos_x(270, 11, timestep, 0.041);
        earth.position.z = compute_pos_z(270, 11, timestep, 0.041);
        update_rotation(earth, 0.005);
    }

    const mars = scene.getObjectByName('mars');
    if (mars) {
        mars.position.x = compute_pos_x(0, 13, timestep, 0.036);
        mars.position.z = compute_pos_z(0, 13, timestep, 0.036);
        update_rotation(mars, 0.005);
    }

    const jupiter = scene.getObjectByName('jupiter');
    if (jupiter) {
        jupiter.position.x = compute_pos_x(225, 16.5, timestep, 0.027);
        jupiter.position.z = compute_pos_z(225, 16.5, timestep, 0.027);
        update_rotation(jupiter, 0.005);
    }

    const saturn = scene.getObjectByName('saturn');
    if (saturn) {
        saturn.position.x = compute_pos_x(135, 20, timestep, 0.023);
        saturn.position.z = compute_pos_z(125, 20, timestep, 0.023);
        update_rotation(saturn, 0.005);
    }

    const uranus = scene.getObjectByName('uranus');
    if (uranus) {
        uranus.position.x = compute_pos_x(90, 24, timestep, 0.018);
        uranus.position.z = compute_pos_z(90, 24, timestep, 0.018);
        update_rotation(uranus, 0.005);
    }

    const neptune = scene.getObjectByName('neptune');
    if (neptune) {
        neptune.position.x = compute_pos_x(180, 29, timestep, 0.01);
        neptune.position.z = compute_pos_z(180, 29, timestep, 0.01);
        update_rotation(neptune, 0.005);
    }

    timestep+=1.0;
    
    if (timestep==(360*360*360)/(0.5*0.4*0.3)) {
        timestep=0.0;
    }
    console.log(camera);
    renderer.render(scene, camera);
}

animate();
