<template>
  <div ref="canvas" class="canvas--container"></div>
</template>
<script>
import * as THREE from 'three'
import Particle from '../canvas/Particle'

export default {
  mounted() {
    this.initThree()
    this.createCurve()
    this.addParticles()
    const draw = () => {
      this.raf = window.requestAnimationFrame(draw)
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].update(this.curve)
        if (this.particles[i].burst && this.particles[i].percent > 1) {
          this.particles.splice(i, 1)
          i--
        }
      }
      this.renderer.render(this.scene, this.camera)
    }
    draw()
    window.addEventListener('resize', () => {
      this.initThree()
      this.createCurve()
      this.addParticles()
    })
  },
  destroyed() {
    window.cancelAnimationFrame(this.raf)
  },
  methods: {
    initThree() {
      const canvas = this.$refs.canvas
      this.W = canvas.clientWidth
      this.H = canvas.clientHeight

      // renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      const devicePixelRatio = window.devicePixelRatio
        ? Math.min(1.6, window.devicePixelRatio)
        : 1
      this.renderer.setPixelRatio(devicePixelRatio)
      this.renderer.setSize(this.W, this.H)
      this.renderer.setClearColor(new THREE.Color('#24003b'))
      if (canvas.firstChild) canvas.firstChild.remove()
      canvas.appendChild(this.renderer.domElement)

      this.camera = new THREE.PerspectiveCamera(8, this.W / this.H, 0.01, 100)
      this.camera.rotation.y = Math.PI
      this.camera.position.z = 0.35
      this.scene = new THREE.Scene()
      this.scene.fog = new THREE.Fog(0x000d25, 0.05, 1.6)
    },
    createCurve() {
      const points = []
      for (let i = 0; i < 5; i += 1) {
        console.log((Math.random() * 10).toFixed(0))
        points.push(new THREE.Vector3(0, 0, 2.5 * (i / 4)))
      }
      points[4].y = -0.1
      this.curve = new THREE.CatmullRomCurve3(points)
      this.curve.type = 'catmullrom'
    },
    addParticles() {
      this.particles = []
      for (let i = 0; i < 300; i++) {
        this.particles.push(new Particle(this.scene))
      }
    },
  },
}
</script>

<style scoped lang="scss">
.canvas--container {
  position: absolute;
  top: 0px;
  min-height: 83vh;
  width: 100vw;
  z-index: 1;
  @media (max-width: 768px) {
    min-height: 75vh;
  }
}
</style>
