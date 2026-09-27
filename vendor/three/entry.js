// three.js 本体と OrbitControls・GLTFLoader を1ファイルにまとめ、グローバル変数 THREE として使えるようにするための入口
export * from 'three';
export { OrbitControls } from 'three/addons/controls/OrbitControls.js';
export { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
