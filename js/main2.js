console.clear();

function compute_pos_x(start_ang, rad, timestep, ang_vel) {
    var new_x = rad*Math.cos((start_ang+(ang_vel*timestep))*Math.PI/180);
    return new_x;
}

function compute_pos_z(start_ang, rad, timestep, ang_vel) {
    var new_z = rad*Math.sin((start_ang+(ang_vel*timestep))*Math.PI/180);
    return new_z;
}

window.addEventListener('load', function() {
    if (!Detector.webgl) Detector.addGetWebGLMessage();

    var w = window.innerWidth,
        h = window.innerHeight;

    var container, renderer, scene, camera, controls, children;
    var raycaster, mouse = new THREE.Vector2(),
        INTERSECTED, bbox;
    var timestep= 0;

    var camHelper, stats, isDown = false,
        isDragging = false;

    (function init() {
        // renderer
        renderer = new THREE.WebGLRenderer({
            antialias: true//,
            //preserveDrawingBuffer: true,  // so canvas.toBlob() make sense
            //alpha:true,   // so png background is transparent
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        container = document.getElementById('container');
        renderer.setSize(w*0.8, h*0.8);
        container.appendChild(renderer.domElement);

        stats = new Stats();

        // world
        scene = new THREE.Scene();

        // camera
        camera = new THREE.PerspectiveCamera(60, w / h, 1, 2000);
        camera.position.x = 140;
        camera.position.y = 55;
        camera.position.z = 140;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        controls = new THREE.OrbitControls(camera, renderer.domElement);

        // lights
        //light = new THREE.DirectionalLight(0xffffff);
        //light.position.set(1, 1, 1);
        //scene.add(light);
        //light = new THREE.DirectionalLight(0x002288);
        //light.position.set(-1, -1, -1);
        //scene.add(light);
        //light = new THREE.AmbientLight(0x222222);
        //scene.add(light);


        raycaster = new THREE.Raycaster();
        
        // Sun (Scene -> Sun)
        var sungeometry = new THREE.SphereGeometry(4, 50, 50);
        
        var sunmaterial = new THREE.MeshBasicMaterial({color: 0xffff00 });
        var sun = new THREE.Mesh(sungeometry, sunmaterial);
        sun.name = "sun";
        scene.add(sun);

        // Mercury (Scene -> Mercury)
        var mercurygeometry = new THREE.SphereGeometry(0.5, 50, 50);
        var mercurymaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("/static/rotating_planets_imgs/mercury.jpg")});
        var mercury = new THREE.Mesh(mercurygeometry, mercurymaterial);
        mercury.name = "mercury";
        scene.add(mercury);

        // Venus (Scene -> Venus)
        var venusgeometry = new THREE.SphereGeometry(1, 50, 50);
        var venusmaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("/static/rotating_planets_imgs/venus.jpg")});
        var venus = new THREE.Mesh(venusgeometry, venusmaterial);
        venus.name = "venus";
        scene.add(venus);

        // Earth (Scene -> Earth)
        var earthgeometry = new THREE.SphereGeometry(1, 50, 50);
        var earthmaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("/static/rotating_planets_imgs/earth.jpg")});
        var earth = new THREE.Mesh(earthgeometry, earthmaterial);
        earth.name = "earth";
        scene.add(earth);

        // Moon (Scene -> Earth -> Moon)
        var moongeometry = new THREE.SphereGeometry(0.25, 50, 50);
        var moonmaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("/static/rotating_planets_imgs/moon.jpg")});
        var moon = new THREE.Mesh(moongeometry, moonmaterial);
        moon.name = "moon";
        moon.position.x = 2;
        earth.add(moon);

        // Mars (Scene -> Mars)
        var marsgeometry = new THREE.SphereGeometry(0.7, 50, 50);
        var marsmaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("/static/rotating_planets_imgs/mars.jpg")});
        var mars = new THREE.Mesh(marsgeometry, marsmaterial);
        mars.name = "mars";
        scene.add(mars);

        // Jupiter (Scene -> Jupiter)
        var jupitergeometry = new THREE.SphereGeometry(2, 50, 50);
        var jupitermaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("/static/rotating_planets_imgs/jupiter.jpg")});
        var jupiter = new THREE.Mesh(jupitergeometry, jupitermaterial);
        jupiter.name = "jupiter";
        scene.add(jupiter);

        // Saturn (Scene -> Saturn)
        var saturngeometry = new THREE.SphereGeometry(1.4, 50, 50);
        var saturnmaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("/static/rotating_planets_imgs/saturn.jpg")});
        var saturn = new THREE.Mesh(saturngeometry, saturnmaterial);
        saturn.name = "saturn";
        scene.add(saturn);

        // Saturn Ring (Scene -> Saturn -> Ring)
        const ringgeometry = new THREE.RingGeometry( 1.5, 2, 32 );
        const ringmaterial = new THREE.MeshBasicMaterial( { color: 0x808080, side: THREE.DoubleSide } );
        const ring = new THREE.Mesh( ringgeometry, ringmaterial );
        ring.rotation.x=90;
        saturn.add( ring );

        // Uranus (Scene -> Uranus)
        var uranusgeometry = new THREE.SphereGeometry(0.5, 50, 50);
        var uranusmaterial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("/static/rotating_planets_imgs/uranus.jpg")});
        var uranus = new THREE.Mesh(uranusgeometry, uranusmaterial);
        scene.add(uranus);

        // Neptune (Scene -> Neptune)
        var neptunegeometry = new THREE.SphereGeometry(0.5, 50, 50);
        var neptunematerial = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("/static/rotating_planets_imgs/neptune.jpg")});
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
        camera.position.y=0;
        camera.position.x=-55;
        camera.lookAt(0, 0, 0);

        window.addEventListener('resize', onWindowResize, false);
        container.addEventListener('mousemove', onMouseMove, false);
        container.addEventListener('mousedown', onMouseDown, false);
        container.addEventListener('mouseup', onMouseUp, false);
        container.addEventListener('click', onClick, false);
    })();

    function onWindowResize() {
        w = window.innerWidth;
        h = window.innerHeight / 2;

        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }

    function onMouseMove(event) {
        event.preventDefault();
        if (isDown) isDragging = true;

        if (!isDragging) {
            mouse.x = (event.clientX / w) * 2 - 1;
            mouse.y = -(event.clientY / h) * 2 + 1;
            //console.log(mouse.x, mouse.y);
            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects(scene.children);
            if (intersects.length > 0) {
                console.log(mouse.x, mouse.y);
                if (INTERSECTED != intersects[0].object) {
                    if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
                    INTERSECTED = intersects[0].object;
                    INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                    INTERSECTED.material.emissive.setHex(0xffff00);
                    container.style.cursor = 'pointer';
                }
            } else {
                if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
                INTERSECTED = null;
                container.style.cursor = 'auto';
            }
        }
    }

    function onClick(event) {
        event.preventDefault();
        if (!isDragging && INTERSECTED) {
            var bsphere = bbox.geometry.boundingSphere;
            var centroid = bsphere.center;
            controls.target.copy(centroid);
            controls.update();
            // camera.position.setY( centroid.y );
            camera.position.sub(centroid).normalize().multiplyScalar(bsphere.radius * 1.7).add(centroid);
            controls.update();
        }
    }

    function onMouseDown(event) {
        event.preventDefault();
        isDown = true;
    }

    function onMouseUp(event) {
        event.preventDefault();
        isDown = false;
        isDragging = false;
    }

    (function animate() {
        requestAnimationFrame(animate);

        scene.children[0].rotation.y+=0.005;

        scene.children[1].rotation.y+=0.008;
        scene.children[1].position.x = compute_pos_x(45, 7, timestep, 0.05);
        scene.children[1].position.z = compute_pos_z(45, 7, timestep, 0.05);
        
        scene.children[2].rotation.y+=0.008;
        scene.children[2].position.x = compute_pos_x(315, 9, timestep, 0.045);
        scene.children[2].position.z = compute_pos_z(315, 9, timestep, 0.045);
    
        scene.children[3].rotation.y+=0.008;
        scene.children[3].position.x = compute_pos_x(270, 11, timestep, 0.041);
        scene.children[3].position.z = compute_pos_z(270, 11, timestep, 0.041);
    
        //console.log(scene.children[4].children)

        scene.children[3].children[0].rotation.y-=0.02;
    
        scene.children[4].rotation.y+=-0.01
        scene.children[4].position.x = compute_pos_x(0, 13, timestep, 0.036);
        scene.children[4].position.z = compute_pos_z(0, 13, timestep, 0.036);
    
        scene.children[5].rotation.y+=0.01
        scene.children[5].position.x = compute_pos_x(225, 16.5, timestep, 0.027);
        scene.children[5].position.z = compute_pos_z(225, 16.5, timestep, 0.027);
    
        scene.children[6].rotation.y+=0.01
        scene.children[6].position.x = compute_pos_x(135, 20, timestep, 0.023);
        scene.children[6].position.z = compute_pos_z(135, 20, timestep, 0.023);
    
        scene.children[7].rotation.y+=0.008;
        scene.children[7].position.x = compute_pos_x(90, 24, timestep, 0.018);
        scene.children[7].position.z = compute_pos_z(90, 24, timestep, 0.018);
    
        scene.children[8].rotation.y+=0.008;
        scene.children[8].position.x = compute_pos_x(180, 29, timestep, 0.01);
        scene.children[8].position.z = compute_pos_z(180, 29, timestep, 0.01);
    
        // Timestep control
        timestep+=1.0;
    
        if (timestep==(360*360*360)/(0.5*0.4*0.3)) {
            timestep=0.0;
        }

        renderer.render(scene, camera);
        stats.update();
    })();
});
