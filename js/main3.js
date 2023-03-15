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
    object.children[0].rotation.x+=amt
    object.children[1].rotation.y+=amt
    object.children[2].rotation.z+=amt
}

var w = window.innerWidth, h = window.innerHeight;

var container, renderer, scene, camera, controls, children;
var timestep= 0;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(-1, -1);

var camHelper, stats, isDown = false,
    isDragging = false;

let object;

// renderer
renderer = new THREE.WebGLRenderer({
    antialias: true//,
    //preserveDrawingBuffer: true,  // so canvas.toBlob() make sense
    //alpha:true,   // so png background is transparent
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
camera.position.z = 20;
controls = new THREE.OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
scene.add( ambientLight );

const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
camera.add( pointLight );
scene.add( camera );

function loadModel() {

    object.traverse( function ( child ) {

        //if ( child.isMesh ) child.material.map = texture;
        console.log(child);

    } );
    scene.add( object.children[0] );

}

const manager = new THREE.LoadingManager( loadModel );

// texture

//const textureLoader = new THREE.TextureLoader( manager );
//const texture = //textureLoader.load( 'textures/uv_grid_opengl.jpg' );

// model

function onProgress( xhr ) {

    if ( xhr.lengthComputable ) {

        const percentComplete = xhr.loaded / xhr.total * 100;
        console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );

    }

}

function onError() {}

const loader = new THREE.OBJLoader( manager );
loader.load( 'models/Space.obj', function ( obj ) {

    object = obj;

}, onProgress, onError );


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();