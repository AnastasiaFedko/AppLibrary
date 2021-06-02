import * as $ from '../dist/bundle.js';
import { metTexture, grassTexture, breadTexture, ifcTextures}  from './assets.js';
import styles from './main.css';

const params = {
    body: document.body,
    path: './assets/model/slurrytank.ifc',
    wasm: './assets/ifc/',
    sphereTexture: metTexture, 
    grassTexture: grassTexture,
    bread: './assets/bread/3DBread005_HQ.obj',
    ifcTextures: ifcTextures,
    breadTexture: breadTexture,
}

const ifcExampleApp = new $.IFCExampleApp( params );

ifcExampleApp.init();