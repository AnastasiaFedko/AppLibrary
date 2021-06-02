import * as THREE from 'three';
import { MeshStandardMaterial } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { IFCLoader } from 'three/examples/jsm/loaders/IFCLoader.js';

export class IFCExampleApp {

    constructor(params) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.body = params.body;
        this.modelPath = params.path;
        this.wasmPath = params.wasm;
        this.metTextures = params.sphereTexture;
        this.grassTextures = params.grassTexture;
        this.ifcTextures = params.ifcTextures;
        this.bread = params.bread;
        this.breadTextures = params.breadTexture;
    }

    init() {

        //Scene
        this.scene.background = new THREE.Color(0x8cc7de);

        //Camera
        this.camera.position.z = 50;
        this.camera.position.y = 0;
        this.camera.position.x = 0;

        //Textures
        const textureLoader = new THREE.TextureLoader();

        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(2048, {
            format: THREE.RGBFormat,
            generateMipmaps: true,
            minFilter: THREE.LinearFilter,
            encoding: THREE.sRGBEncoding // temporary -- to prevent the material's shader from recompiling every frame
        });

        this.cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);

        const normalMetTexture = textureLoader.load(this.metTextures[0]);
        const colorMetTexture = textureLoader.load(this.metTextures[1]);
        const displacementMetTexture = textureLoader.load(this.metTextures[2]);
        const roughnessMetTexture = textureLoader.load(this.metTextures[3]);
        const metalMetTexture = textureLoader.load(this.metTextures[4]);

        const normalGrTexture = textureLoader.load(this.grassTextures[0]);
        const colorGrTexture = textureLoader.load(this.grassTextures[1]);
        const displacementGrTexture = textureLoader.load(this.grassTextures[2]);
        const roughnessGrTexture = textureLoader.load(this.grassTextures[3]);
        const aoGrTexture = textureLoader.load(this.grassTextures[4]);

        const normalBrTexture = textureLoader.load(this.breadTextures[0]);
        const colorBrTexture = textureLoader.load(this.breadTextures[1]);
        const aoBrTexture = textureLoader.load(this.breadTextures[2]);

        const normalIFCTexture = textureLoader.load(this.ifcTextures[0]);
        const colorIFCTexture = textureLoader.load(this.ifcTextures[1]);
        const displacementIFCTexture = textureLoader.load(this.ifcTextures[2]);
        const roughnessIFCTexture = textureLoader.load(this.ifcTextures[3]);
        const metalIFCTexture = textureLoader.load(this.ifcTextures[4]);

        //Initial plane
        this.geometryPlane = new THREE.PlaneGeometry(100, 100, 1000, 1000);

        const materialPlane = new MeshStandardMaterial({
            normalMap: normalGrTexture,
            map: colorGrTexture,
            displacementMap: displacementGrTexture,
            displacementScale: 2,
            roughnessMap: roughnessGrTexture,
            roughness: 0.0,

            aoMap: aoGrTexture,
        });

        const plane = new THREE.Mesh(this.geometryPlane, materialPlane);
        plane.rotation.x = - Math.PI / 2;
        plane.position.y = -10;
        this.scene.add(plane);

        //Initial sphere
        const geometrySphere = new THREE.SphereGeometry(10, 50, 50);
        const materialSphere = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            normalMap: normalMetTexture,
            map: colorMetTexture,
            displacementMap: displacementMetTexture,
            roughnessMap: roughnessMetTexture,
            metalnessMap: metalMetTexture,
            metalness: 0.6,
            roughness: 0.2,
        });
        const sphere = new THREE.Mesh(geometrySphere, materialSphere);
        sphere.position.x = 20;
        this.scene.add(sphere);

        //Initial bread
        const materialBread = new THREE.MeshStandardMaterial({
            normalMap: normalBrTexture,
            map: colorBrTexture,
            aoMap: aoBrTexture,
        });

        const loader = new OBJLoader();
        loader.load(this.bread,
            (obj) => {
                obj.traverse(object => {
                    if (object.isMesh) {
                        object.material = materialBread;
                        object.scale.set(150.0, 150.0, 150.0);
                        object.position.set(-20, 0, -5);
                        this.scene.add(object);
                        this.render();
                    }
                });
            },
            (xhr) => { console.log((xhr.loaded / xhr.total * 100) + '% loaded'); },
            (err) => { console.error('An error happened', err); }
        );

        //Lights
        const directionalLight1 = new THREE.DirectionalLight('whitesmoke', 0.8);
        directionalLight1.position.set(25, 15, 30);
        this.scene.add(directionalLight1);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight2.position.set(- 2, 20, - 10);
        this.scene.add(directionalLight2);

        const ambientLight = new THREE.AmbientLight(0xffffee, 0.25);
        this.scene.add(ambientLight);

        const onError = function (error) { console.log(error.message) };

        //Setup IFC Loader

        const materialIFC = new THREE.MeshStandardMaterial({
            normalMap: normalIFCTexture,
            map: colorIFCTexture,
            displacementMap: displacementIFCTexture,
            metalnessMap: metalIFCTexture,
            roughnessMap: roughnessIFCTexture,
            roughness: 0.1,
            metalness: 0.7,
            envMap: cubeRenderTarget.texture,
        });

        console.log(cubeRenderTarget.texture);

        const ifcLoader = new IFCLoader();
        ifcLoader.setWasmPath(this.wasmPath);
        ifcLoader.load(this.modelPath, (model) => {
            model.traverse(object => {
                if (object.isMesh) {
                    object.material = materialIFC;

                }
            });
            model.scale.set(2.0, 2.0, 2.0);
            model.position.set(-8, 0, 0);
            model.add(this.cubeCamera);
            this.scene.add(model);
            this.render();

        }, () => { }, onError);

        //Renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.body.appendChild(this.renderer.domElement);

        //Controls
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.addEventListener('change', () => {
            this.render();
        });

        window.addEventListener('resize', () => {
            this.onWindowResize();
        });

        this.render();
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
        this.cubeCamera.update(this.renderer, this.scene);
    }
}