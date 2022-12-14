//everyone elses code lol









//Abhay code
function compute_pos_x(start_ang, rad, timestep, ang_vel) {
    new_x = rad*Math.cos((start_ang+(ang_vel*timestep))*Math.PI/180);
    return new_x;
}

function compute_pos_z(start_ang, rad, timestep, ang_vel) {
    new_z = rad*Math.sin((start_ang+(ang_vel*timestep))*Math.PI/180);
    return new_z;
}

// Add overall scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);

// Renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );
document.body.appendChild(renderer.domElement);

// Sun (Scene -> Sun)
var sungeometry = new THREE.SphereGeometry(4, 50, 50);
var sunmaterial = new THREE.MeshBasicMaterial({color: 0xffff00 });
var sun = new THREE.Mesh(sungeometry, sunmaterial);
scene.add(sun);

// Mercury (Scene -> Mercury)
var mercurygeometry = new THREE.SphereGeometry(0.5, 50, 50);
var mercurymaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("static/mercury.jpg")});
var mercury = new THREE.Mesh(mercurygeometry, mercurymaterial);
scene.add(mercury);

// Venus (Scene -> Venus)
var venusgeometry = new THREE.SphereGeometry(1, 50, 50);
var venusmaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("static/venus.jpg")});
var venus = new THREE.Mesh(venusgeometry, venusmaterial);
scene.add(venus);

// Earth (Scene -> Earth)
var earthgeometry = new THREE.SphereGeometry(1, 50, 50);
var earthmaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("static/earth.jpg")});
var earth = new THREE.Mesh(earthgeometry, earthmaterial);
scene.add(earth);

// Moon (Scene -> Earth -> Moon)
var moongeometry = new THREE.SphereGeometry(0.25, 50, 50);
var moonmaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("static/moon.jpg")});
var moon = new THREE.Mesh(moongeometry, moonmaterial);
moon.position.x = 2;
earth.add(moon);

// Mars (Scene -> Mars)
var marsgeometry = new THREE.SphereGeometry(0.7, 50, 50);
var marsmaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("static/mars.jpg")});
var mars = new THREE.Mesh(marsgeometry, marsmaterial);
scene.add(mars);

// Jupiter (Scene -> Jupiter)
var jupitergeometry = new THREE.SphereGeometry(2, 50, 50);
var jupitermaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("static/jupiter.jpg")});
var jupiter = new THREE.Mesh(jupitergeometry, jupitermaterial);
scene.add(jupiter);

// Saturn (Scene -> Saturn)
var saturngeometry = new THREE.SphereGeometry(1.4, 50, 50);
var saturnmaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("static/saturn.jpg")});
var saturn = new THREE.Mesh(saturngeometry, saturnmaterial);
scene.add(saturn);

// Saturn Ring (Scene -> Saturn -> Ring)
const ringgeometry = new THREE.RingGeometry( 1.5, 2, 32 );
const ringmaterial = new THREE.MeshBasicMaterial( { color: 0x808080, side: THREE.DoubleSide } );
const ring = new THREE.Mesh( ringgeometry, ringmaterial );
ring.rotation.x=90;
saturn.add( ring );

// Uranus (Scene -> Uranus)
var uranusgeometry = new THREE.SphereGeometry(0.5, 50, 50);
var uranusmaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("static/uranus.jpg")});
var uranus = new THREE.Mesh(uranusgeometry, uranusmaterial);
scene.add(uranus);

// Neptune (Scene -> Neptune)
var neptunegeometry = new THREE.SphereGeometry(0.5, 50, 50);
var neptunematerial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("static/neptune.jpg")});
var neptune = new THREE.Mesh(neptunegeometry, neptunematerial);
scene.add(neptune);

// Paths (Scene -> Paths)
const mercurypathgeometry = new THREE.RingGeometry( 7, 7.1, 100 );
const venuspathgeometry = new THREE.RingGeometry( 7, 7.1, 100 );
const earthpathgeometry = new THREE.RingGeometry( 7, 7.1, 100 );
const marspathgeometry = new THREE.RingGeometry( 7, 7.1, 100 );
const jupiterpathgeometry = new THREE.RingGeometry( 7, 7.1, 100 );
const saturnpathgeometry = new THREE.RingGeometry( 7, 7.1, 100 );
const uranuspathgeometry = new THREE.RingGeometry( 7, 7.1, 100 );
const neptunepathgeometry = new THREE.RingGeometry( 7, 7.1, 100 );

const pathmaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: 0.25, side: THREE.DoubleSide } );
const path = new THREE.Mesh( mercurypathgeometry, pathmaterial );
path.rotation.x=Math.PI/2;
scene.add( path );

camera.position.z=20;
camera.position.y=30;
camera.position.x=-55;
camera.lookAt(0, 0, 0);

let timestep = 0.0;

var render = function () {
    requestAnimationFrame(render);

    sun.rotation.y+=0.005;

    mercury.rotation.y+=0.008;
    mercury.position.x = compute_pos_x(45, 7, timestep, 0.05);
    mercury.position.z = compute_pos_z(45, 7, timestep, 0.05);
    
    venus.rotation.y+=0.008;
    venus.position.x = compute_pos_x(315, 9, timestep, 0.045);
    venus.position.z = compute_pos_z(315, 9, timestep, 0.045);

    earth.rotation.y+=0.008;
    earth.position.x = compute_pos_x(270, 11, timestep, 0.041);
    earth.position.z = compute_pos_z(270, 11, timestep, 0.041);

    moon.rotation.y-=0.02;

    mars.rotation.y+=-0.01
    mars.position.x = compute_pos_x(0, 13, timestep, 0.036);
    mars.position.z = compute_pos_z(0, 13, timestep, 0.036);

    jupiter.rotation.y+=0.01
    jupiter.position.x = compute_pos_x(225, 16.5, timestep, 0.027);
    jupiter.position.z = compute_pos_z(225, 16.5, timestep, 0.027);

    saturn.rotation.y+=0.01
    saturn.position.x = compute_pos_x(135, 20, timestep, 0.023);
    saturn.position.z = compute_pos_z(135, 20, timestep, 0.023);

    uranus.rotation.y+=0.008;
    uranus.position.x = compute_pos_x(90, 24, timestep, 0.018);
    uranus.position.z = compute_pos_z(90, 24, timestep, 0.018);

    neptune.rotation.y+=0.008;
    neptune.position.x = compute_pos_x(180, 29, timestep, 0.01);
    neptune.position.z = compute_pos_z(180, 29, timestep, 0.01);

    // Timestep control
    timestep+=1.0;

    if (timestep==(360*360*360)/(0.5*0.4*0.3)) {
        timestep=0.0;
    }

    renderer.setPixelRatio(0.5);
    renderer.render(scene, camera);
};

render();