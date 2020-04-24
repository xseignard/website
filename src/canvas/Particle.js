import * as THREE from 'three'

import keyboard0 from '../assets/images/particles/keyboard-0.png'
import keyboard1 from '../assets/images/particles/keyboard-1.png'
import keyboard2 from '../assets/images/particles/keyboard-2.png'

import mcu0 from '../assets/images/particles/mcu-0.png'
import mcu1 from '../assets/images/particles/mcu-1.png'
import mcu2 from '../assets/images/particles/mcu-2.png'

import solder0 from '../assets/images/particles/solder2-0.png'
import solder1 from '../assets/images/particles/solder2-1.png'
import solder2 from '../assets/images/particles/solder2-2.png'

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const images = [
  keyboard0,
  keyboard1,
  keyboard2,
  mcu0,
  mcu1,
  mcu2,
  solder0,
  solder1,
  solder2,
]
const loader = new THREE.TextureLoader()
const materials = images.map(image => {
  const texture = loader.load(image)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  return new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide,
  })
})
const plane = new THREE.PlaneGeometry(1 / 256, 1 / 256)

export default class Particle {
  constructor(scene) {
    this.geometry = plane
    const random = Math.random()
    if (random > 0.6) {
      this.material = materials[getRandomInt(0, 3)]
    } else if (random > 0.3) {
      this.material = materials[getRandomInt(3, 6)]
    } else {
      this.material = materials[getRandomInt(6, 8)]
    }
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.position.set(0, 0, 1.5)
    this.percent = Math.random()
    this.offset = new THREE.Vector3(
      (Math.random() - 0.5) * 0.1,
      (Math.random() - 0.5) * 0.1,
      0
    )
    this.speed = Math.random() * 0.001 + 0.0001
    this.rotate = new THREE.Vector3(
      -Math.random() * 0.1 + 0.01,
      0,
      Math.random() * 0.01
    )
    scene.add(this.mesh)
  }
  update(curve) {
    this.percent += this.speed

    const newPos = curve.getPoint(1 - (this.percent % 1)).add(this.offset)
    this.mesh.position.x = newPos.x
    this.mesh.position.y = newPos.y
    this.mesh.position.z = newPos.z
    this.mesh.rotation.x += this.rotate.x
    this.mesh.rotation.y += this.rotate.y
    this.mesh.rotation.z += this.rotate.z
  }
}
