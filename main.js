import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerWidth, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(50)

renderer.render( scene, camera)

const geometry = new THREE.TorusKnotGeometry( 15, 1, 300, 8, 8, 7 )
const material = new THREE.MeshStandardMaterial( { color: 0xffffff } )
const torusKnot = new THREE.Mesh( geometry, material )
torusKnot.position.set(0,0,0)
scene.add( torusKnot )

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(0,0,0)
const ambientLight = new THREE.AmbientLight(0x111111)
scene.add(pointLight, ambientLight)

const gridHelper = new THREE.GridHelper(200, 50)
scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)


const imgUrl = "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
const backGround = new THREE.TextureLoader().load(imgUrl)
scene.background = backGround

function addStar() {
  const geometry = new THREE.SphereGeometry(0.5, 24, 24)
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x,y,z)
  scene.add(star)
}

// Array(200).fill().forEach(addStar)

function animate() {
  requestAnimationFrame(animate)

  torusKnot.rotation.x += 0.00005
  torusKnot.rotation.y += 0.0025
  torusKnot.rotation.z += 0.005

  controls.update()

  renderer.render(scene, camera)
}

animate()

//npm run dev