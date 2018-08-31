export default class Agent {
	constructor(p) {
		this.p5 = p;
		this.vector = this.p5.createVector(
			this.p5.random(this.p5.width),
			this.p5.random(this.p5.height)
		);
		this.vectorOld = this.vector.copy();
		this.stepSize = this.p5.random(1, 5);
		this.isOutside = false;
		this.angle;
	}

	update(strokeWidth) {
		this.vector.x += this.p5.cos(this.angle) * this.stepSize;
		this.vector.y += this.p5.sin(this.angle) * this.stepSize;
		this.isOutside =
			this.vector.x < 0 ||
			this.vector.x > this.p5.width ||
			this.vector.y < 0 ||
			this.vector.y > this.p5.height;
		if (this.isOutside) {
			this.vector.set(this.p5.random(this.p5.width), this.p5.random(this.p5.height));
			this.vectorOld = this.vector.copy();
		}
		this.p5.strokeWeight(strokeWidth * this.stepSize);
		this.p5.line(this.vectorOld.x, this.vectorOld.y, this.vector.x, this.vector.y);
		this.vectorOld = this.vector.copy();
		this.isOutside = false;
	}

	update1(noiseScale, noiseStrength, strokeWidth) {
		this.angle =
			this.p5.noise(this.vector.x / noiseScale, this.vector.y / noiseScale) * noiseStrength;
		this.update(strokeWidth);
	}

	update2(noiseScale, noiseStrength, strokeWidth) {
		this.angle = this.p5.noise(this.vector.x / noiseScale, this.vector.y / noiseScale) * 24;
		this.angle = (this.angle - this.p5.floor(this.angle)) * noiseStrength;
		this.update(strokeWidth);
	}
}
