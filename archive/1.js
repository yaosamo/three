// Globals
let scene, camera, renderer;


function createAssets() {
    const loader = new THREE.TextureLoader()
    loader.crossOrigin = ''
    
    loader.load(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/uvtemplate.png',
        function(texture) {
            // On load complete
            
            // Using a simple GEOMETRY
            const geometry1 = new THREE.PlaneGeometry(1.8, 1.8);
            const material = new THREE.MeshBasicMaterial({ map: texture });

            // No UV mapping
            const mesh1 = new THREE.Mesh(geometry1, material);
            mesh1.position.y = 0.1;
            mesh1.rotation.x = -Math.PI/2
            scene.add(mesh1);


            // The mapping of the image starts from the bottom left
            // The coordinate being: 0,0 bottom left of the image and 1,1 top right
            const map1 = [
                new THREE.Vector2(0, 0), // [x,y] bottom left point
                new THREE.Vector2(1, 0), // [x,y] bottom right point
                new THREE.Vector2(1, 1), // [x,y] top right point
                new THREE.Vector2(0, 1)  // [x,y] top left point

            ]
            // The geometry to be mapped
            const geometry2 = geometry1.clone()
            geometry2.faceVertexUvs[0] = []
            // Each face is made of two triangles
            // Top left triangle
            geometry2.faceVertexUvs[0][0] = [map1[3],map1[0],map1[2]] // [top left], [bottom left], [top right]
            // Bottom right triangle
            geometry2.faceVertexUvs[0][1] = [map1[0],map1[1],map1[2]] // [bottom left], [bottom right], [top right]
            
            const mesh2 = new THREE.Mesh(geometry2, material);
            mesh2.position.x = 2;
            mesh2.position.y = 0.1;
            mesh2.rotation.x = -Math.PI/2
            scene.add(mesh2);
            
            // Second example
            // We're now just showing a section of the image
            const map2 = [
                new THREE.Vector2(0, 0.765), // [x,y] bottom left point
                new THREE.Vector2(0.225, 0.765), // [x,y] bottom right point
                new THREE.Vector2(0.225, 1), // [x,y] top right point
                new THREE.Vector2(0, 1)  // [x,y] top left point
            ]
            // The geometry to be mapped
            const geometry3 = geometry1.clone();
            
            // clear default UV mapping
            geometry3.faceVertexUvs[0] = [];
            
            // Each face is made of two triangles
            // Top left triangle
            geometry3.faceVertexUvs[0][0] = [
                map2[3], // [top left]
                map2[0], // [bottom left]
                map2[2], // [top right]
            ]
            
            // Bottom right triangle
            // geometry3.faceVertexUvs[0][1] = [
            //     map2[0],
            //     map2[1],
            //     map2[2]
            // ] // [bottom left], [bottom right], [top right]
            
            const mesh3 = new THREE.Mesh(geometry3, material);
            mesh3.position.x = 2;
            mesh3.position.y = 0.1;
            mesh3.position.z = 2;
            mesh3.rotation.x = -Math.PI/2
            scene.add(mesh3);
            
            
            // TODO
            // PlaneBufferGeometry
        
            // Don't forget to wait for the texture before rendering
            render(); 
        }
    )
    
}


function render() { 
    renderer.render(scene, camera);
};


function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.z = 5;
    camera.position.y = 5;
    camera.position.x = 5;


    const devicePixelRatio = window.devicePixelRatio || 1;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(devicePixelRatio);

    document.body.appendChild(renderer.domElement);
    
    
    const gridHelper = new THREE.GridHelper(20, 20);
    scene.add(gridHelper);

    // Imported from: https://codepen.io/dipscom/pen/peVzVz
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = 1.4; // radians
    
    createAssets();
}


init();