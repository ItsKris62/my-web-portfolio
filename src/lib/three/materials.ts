import * as THREE from 'three'
export const wireframeMaterial = new THREE.MeshBasicMaterial({ wireframe: true })
export const standardMaterial = new THREE.MeshStandardMaterial({ metalness: 0.7, roughness: 0.2 })