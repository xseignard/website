<template>
	<div class="canvas--container">
		<canvas ref="canvas" />
	</div>
</template>
<script>
export default {
	mounted() {
		const ctx = this.initCanvas();

		const first = {
			amplitude: 150,
			frequency: 2,
			phase: 0,
			delta: 0.0085,
		};
		const second = {
			amplitude: 150,
			frequency: 3,
			phase: (Math.PI * 7) / 16,
			delta: 0,
		};
		const third = {
			amplitude: 150,
			frequency: 3,
			phase: 0,
			delta: 0.065,
		};
		const fourth = {
			amplitude: 150,
			frequency: 2,
			phase: 0,
			delta: 0,
		};

		let t = 0;
		ctx.beginPath();
		const draw = () => {
			ctx.save();
			ctx.translate(window.innerWidth / 2, (window.innerHeight * 0.83) / 2);
			const x =
				first.amplitude *
					Math.sin(first.frequency * t + Math.PI * first.phase) *
					Math.exp(-first.delta * t) +
				second.amplitude *
					Math.sin(second.frequency * t + Math.PI * second.phase) *
					Math.exp(-second.delta * t);
			const y =
				third.amplitude *
					Math.sin(third.frequency * t + Math.PI * third.phase) *
					Math.exp(-third.delta * t) +
				fourth.amplitude *
					Math.sin(fourth.frequency * t + Math.PI * fourth.phase) *
					Math.exp(-fourth.delta * t);
			ctx.lineTo(x, y);
			ctx.stroke();
			ctx.restore();
			t += 0.02;
			this.raf = window.requestAnimationFrame(draw);
		};
		draw();
		window.addEventListener('resize', this.initCanvas);
	},
	destroyed() {
		window.cancelAnimationFrame(this.raf);
		window.removeEventListener('resize', this.initCanvas);
	},
	methods: {
		initCanvas() {
			const canvas = this.$refs.canvas;
			canvas.width = canvas.parentElement.clientWidth;
			canvas.height = canvas.parentElement.clientHeight;
			const ctx = canvas.getContext('2d');
			ctx.lineWidth = 0.01;
			ctx.fillStyle = '#000';
			ctx.strokeStyle = '#fff';
			return ctx;
		},
	},
};
</script>

<style scoped lang="scss">
.canvas--container {
	position: absolute;
	top: 0px;
	z-index: -1;
	min-height: 83vh;
	width: 100vw;
	@media (max-width: 768px) {
		min-height: 75vh;
	}
}
</style>
