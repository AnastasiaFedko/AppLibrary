import { IFCExampleApp } from './IFCExampleApp';

export { IFCExampleApp };








// import * as THREE from '../node_modules/three/build/three.module.js';

// import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';

// import { IFCLoader } from '../node_modules/three/examples/jsm/loaders/IFCLoader.js';

// let scene, camera, renderer;

// init();

// function init() {

//     //Scene
//     scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x8cc7de);

//     //Camera
//     camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.z = - 70;
//     camera.position.y = 25;
//     camera.position.x = 90;

//     //Initial cube
//     const geometry = new THREE.BoxGeometry();
//     const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
//     const cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);

//     //Lights
//     const directionalLight1 = new THREE.DirectionalLight(0xffeeff, 0.8);
//     directionalLight1.position.set(1, 1, 1);
//     scene.add(directionalLight1);

//     const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
//     directionalLight2.position.set(- 1, 0.5, - 1);
//     scene.add(directionalLight2);

//     const ambientLight = new THREE.AmbientLight(0xffffee, 0.25);
//     scene.add(ambientLight);

//     const onError = function (error) { console.log(error.message) };
//     //Setup IFC Loader
//     const ifcLoader = new IFCLoader();
//     ifcLoader.setWasmPath( '../node_modules/three/examples/jsm/loaders/ifc/' );
//     ifcLoader.load( '../src/model/slurrytank.ifc', function ( model ) {

//     	scene.add( model );
//     	render();

//     }, () => {}, onError  );

//     //Renderer
//     renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     document.body.appendChild(renderer.domElement);

//     //Controls
//     const controls = new OrbitControls( camera, renderer.domElement );
//     controls.addEventListener( 'change', render );

//     window.addEventListener('resize', onWindowResize);

//     render();

// }

// function onWindowResize() {

//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);

//     render();

// }

// function render() {

//     renderer.render(scene, camera);

// }

