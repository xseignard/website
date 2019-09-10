<template>
	<div ref="canvas" class="canvas--container">
	</div>
</template>
<script>
import anime from 'animejs';
import {
	Clock,
	Color,
	DoubleSide,
	Geometry,
	Mesh,
	PerspectiveCamera,
	Scene,
	SplineCurve,
	Vector3,
	WebGLRenderer,
} from 'three';
import { MeshLine, MeshLineMaterial } from 'three.meshline';
import { getRandomColor, throttle } from '@/utils';

export default {
	data: () => ({ lines: [] }),
	mounted() {
		this.initThree();

		this.createLines();

		const draw = () => {
			this.raf = window.requestAnimationFrame(draw);
			const delta = this.clock.getDelta();
			this.lines.forEach(l => {
				l.material.uniforms.dashOffset.value -= l.userData.offset;
			});
			this.renderer.render(this.scene, this.camera);
		};
		draw();
		window.addEventListener('resize', () => {
			this.initThree();
			this.lines = [];
			this.createLines();
		});
		this.$refs.canvas.addEventListener('mousemove', e => {
			const x = (e.clientX / this.W) * 2 - 1;
			const y = -((e.clientY / this.H) * 2 - 1);
			anime({
				targets: this.mousePos,
				x: x * 0.75,
				y: y * 0.75,
				update: () => this.camera.lookAt(this.mousePos),
			});
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

			this.clock = new Clock();

			this.scene = new Scene();
			this.camera = new PerspectiveCamera(50, this.W / this.H, 1, 1000);
			this.camera.position.set(0, 0, 10);
			this.mousePos = new Vector3();
			this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
			const devicePixelRatio = window.devicePixelRatio
				? Math.min(1.6, window.devicePixelRatio)
				: 1;
			this.renderer.setPixelRatio(devicePixelRatio);
			this.renderer.setSize(this.W, this.H);
			this.renderer.setClearColor(new Color('#24003b'));
			if (canvas.firstChild) canvas.firstChild.remove();
			canvas.appendChild(this.renderer.domElement);
		},
		createLine() {
			const points = [];
			const turbulence = 1;
			for (let i = 0; i < 10; i++) {
				points.push(
					new Vector3(
						i * 1.2,
						Math.random() * (turbulence * 2) - turbulence,
						Math.random() * (turbulence * 2) - turbulence
					)
				);
			}
			const spline = new SplineCurve(points);
			const linePoints = new Geometry().setFromPoints(spline.getPoints(100));
			const line = new MeshLine();
			line.setGeometry(linePoints, p => 1 - p);
			const material = new MeshLineMaterial({
				color: new Color(getRandomColor()),
				lineWidth: 0.1,
				dashArray: 0.6,
				dashOffset: 0,
				dashRatio: 0.5,
				depthWrite: false,
				transparent: true,
				opacity: 0.5,
			});

			const m = new Mesh(line.geometry, material);
			this.lines.push(m);
			const min = -6;
			const max = -5;
			m.position.x = Math.floor(Math.random() * (max - min + 1) + min);
			m.position.y = -4 + Math.random() * 8;
			m.position.z = Math.random() * 5;
			m.userData.offset = 0.001 + Math.random() * 0.004;
			return m;
		},
		createLines() {
			for (let i = 0; i < 10; i++) {
				const l = this.createLine();
				this.scene.add(l);
			}
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
