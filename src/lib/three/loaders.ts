import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
export const loadModel = (url: string) => new Promise(resolve => {
  new GLTFLoader().load(url, gltf => resolve(gltf))
})