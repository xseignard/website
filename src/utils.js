export const colors = ['#49d6a7', '#8B73CF', '#F88429'];

export const getRandomColor = () => {
	const c = Math.floor(Math.random() * colors.length);
	return colors[c];
};

export const throttle = (func, limit) => {
	let inThrottle;
	return () => {
		const args = arguments;
		const context = this;
		if (!inThrottle) {
			func.apply(context, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
};
