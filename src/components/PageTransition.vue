<template>
	<svg width="100vw" height="100vh" :style="style">
		<rect
			:x="x"
			:y="y"
			:width="width"
			:height="height"
			:fill="fill"
		/>
	</svg>
</template>

<script>
export default {
	name: 'transition',
	props: {
		x: {
			type: [Number, String],
			default: 0,
		},
		y: {
			type: [Number, String],
			default: 0,
		},
		width: {
			type: [Number, String],
			default: '100%',
		},
		height: {
			type: [Number, String],
			default: '0',
		},
		fill: {
			type: String,
			default: '#ff0000',
		},
		visible: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		style: function() {
			return this.visible ? 'visibility: visible' : 'visibility: hidden';
		},
	},
};
</script>

<style scoped>
svg {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
}
</style>
