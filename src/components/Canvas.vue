<template>
	<div ref="canvas" class="canvas--container"></div>
</template>
<script>
import anime from 'animejs';
import * as THREE from 'three';
import { getRandomColor, throttle } from '@/utils';

const vertexShader = `
  precision mediump float;

  attribute vec3 aPosition;
  attribute vec3 aRotationAxis;
  attribute float aRotationAngle;

  varying vec2 vUv;
  varying float vRandom;

  uniform float uTime;

  #define PI 3.1415926538

  mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
  }

  vec3 rotate(vec3 v, vec3 axis, float angle) {
    mat4 m = rotationMatrix(axis, angle);
    return (m * vec4(v, 1.0)).xyz;
  }

  vec3 getDistortion(float at) {
    float t = uTime * 0.0;
    float mag = 0.5;
    vec3 freq = vec3(1.32, 0.98, 1.137) * 5.;

    vec3 distortion = vec3(
      sin(at * freq.x + t), 
      -sin(at * freq.y + t) * 0.1, 
      cos(-at * freq.z + t)
    );

    distortion *= mag;

    return distortion;
  }

  void main() {
    vUv = uv;
    vRandom = aRotationAngle;

    float separation = 10.;
    vec3 pos = position + aPosition * separation;

    float t = uTime * 0.5;

    vec3 distortion = getDistortion(pos.x); // Get a curvy distortion along the Y vertice component
    pos += distortion;

    // Rotate each instance geometry
    pos = rotate(pos, aRotationAxis, aRotationAngle * PI * 2.);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
  }
`;

const fragmentShader = `
  precision mediump float;

  varying vec2 vUv;
  varying float vRandom;

  uniform float uTime;

  // https://iquilezles.org/www/articles/palettes/palettes.htm
  vec3 palette(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
  }

  float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
  }

  void main() {
    float rt = map(vRandom, 0., 1., 0.05, 0.2); // Map value to a shorter range to have different progress in each geometry
    float t = uTime * rt;
    float o = fract(t); // Get fractional of time (0.1, 0.2 ... 0.99) for each second
    float length = map(vRandom, 0., 1., 0.01, 0.02); // Map value to a shorter range to have different progress lengths

    if(
      abs(vUv.x - o) > length && 
      abs(vUv.x - o - 1.) > length && 
      abs(vUv.x - o + 1.) > length
    ) {
      discard; // Comment this line to see the whole lines/ribbons
    }

    float freq = map(vRandom, 0., 1., 1., 5.);
    vec3 iQolor = palette(
      sin(vUv.x * freq + t),
      vec3(0.5, 0.5, 0.5),	
      vec3(0.5, 0.5, 0.5),	
      vec3(1.0, 1.0, 1.0), 
      vec3(0.00, 0.33, 0.67) 
    );

    gl_FragColor = vec4(iQolor, 1.);
  }
`;

export default {
	data: () => ({ lines: [] }),
	mounted() {
		this.initThree();

		this.createLines();

		const draw = () => {
			this.raf = window.requestAnimationFrame(draw);
			this.material.uniforms.uTime.value = this.clock.getElapsedTime();
			this.renderer.render(this.scene, this.camera);
		};
		draw();
		window.addEventListener('resize', () => {
			this.initThree();
			this.createLines();
		});
	},
	destroyed() {
		window.cancelAnimationFrame(this.raf);
		window.removeEventListener('resize', this.initThree);
	},
	methods: {
		initThree() {
			const canvas = this.$refs.canvas;
			this.W = canvas.clientWidth;
			this.H = canvas.clientHeight;

			this.clock = new THREE.Clock();

			this.scene = new THREE.Scene();
			this.camera = new THREE.PerspectiveCamera(50, this.W / this.H, 1, 1000);
			this.camera.position.set(0, 0, 10);
			this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
			const devicePixelRatio = window.devicePixelRatio
				? Math.min(1.6, window.devicePixelRatio)
				: 1;
			this.renderer.setPixelRatio(devicePixelRatio);
			this.renderer.setSize(this.W, this.H);
			this.renderer.setClearColor(new THREE.Color('#24003b'));
			if (canvas.firstChild) canvas.firstChild.remove();
			canvas.appendChild(this.renderer.domElement);
		},
		createLines() {
			// Base Geometry
			const baseGeometry = new THREE.PlaneBufferGeometry(3, 0.1, 1000, 1);

			// Material
			this.material = new THREE.ShaderMaterial({
				vertexShader,
				fragmentShader,
				uniforms: {
					uTime: new THREE.Uniform(null),
				},
				side: THREE.DoubleSide,
			});

			// Instance Geometry
			const instanceCount = 500;
			const instancedGeometry = new THREE.InstancedBufferGeometry().copy(baseGeometry);
			instancedGeometry.maxInstancedCount = instanceCount;

			// Instance Buffer Attributes
			const aPosition = [];
			const aRotationAngle = [];
			const aRotationAxis = [];
			for (let i = 0; i < instanceCount; i++) {
				aPosition.push(
					2 * (Math.random() - 0.5),
					2 * (Math.random() - 0.5),
					2 * (Math.random() - 0.5)
				);

				aRotationAxis.push(
					2 * (Math.random() - 0.5),
					2 * (Math.random() - 0.5),
					2 * (Math.random() - 0.5)
				);

				aRotationAngle.push(Math.random());
			}

			const aPositionFloat32 = new Float32Array(aPosition);
			const aRotationAngleFloat32 = new Float32Array(aRotationAngle);
			const aRotationAxisFloat32 = new Float32Array(aRotationAxis);

			instancedGeometry.setAttribute(
				'aPosition',
				new THREE.InstancedBufferAttribute(aPositionFloat32, 3, false)
			);
			instancedGeometry.setAttribute(
				'aRotationAxis',
				new THREE.InstancedBufferAttribute(aRotationAxisFloat32, 3, false)
			);
			instancedGeometry.setAttribute(
				'aRotationAngle',
				new THREE.InstancedBufferAttribute(aRotationAngleFloat32, 1, false)
			);

			// Mesh
			const mesh = new THREE.Mesh(instancedGeometry, this.material);
			this.scene.add(mesh);
		},
	},
};
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
