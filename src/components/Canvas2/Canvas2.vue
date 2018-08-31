<template>
	<div id="p5-container" class="canvas--container"></div>
</template>
<script>
import { getRandomColor } from '@/utils';
import Agent from './agent';

export default {
	mounted() {
		const sketch = p => {
			const agents = [];
			const agentCount = 50;
			const noiseScale = 300;
			const noiseStrength = 10;
			const overlayAlpha = 0.4;
			const agentAlpha = 50;
			const strokeWidth = 0.1;
			const drawMode = Math.random() > 0.5 ? 1 : 2;
			let W = this.$el.clientWidth;
			let H = this.$el.clientHeight;

			p.setup = () => {
				const canvas = p.createCanvas(W, H);
				for (let i = 0; i < agentCount; i++) {
					agents[i] = new Agent(p);
				}
			};
			p.draw = () => {
				p.fill(36, 0, 59, overlayAlpha);
				p.noStroke();
				p.rect(0, 0, p.width, p.height);
				p.stroke(139, 115, 207, agentAlpha);
				for (let i = 0; i < agentCount; i++) {
					if (drawMode == 1) agents[i].update1(noiseScale, noiseStrength, strokeWidth);
					else agents[i].update2(noiseScale, noiseStrength, strokeWidth);
				}
			};
			p.windowResized = () => {
				W = this.$el.clientWidth;
				H = this.$el.clientHeight;
				p.resizeCanvas(W, H);
			};
		};
		const P5 = require('p5');
		this.sk = new P5(sketch, 'p5-container');
	},
	destroyed() {
		this.sk.remove();
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
