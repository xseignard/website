export const colors = ['#F88429', '#4FDAB1', '#8B73CF'];

export const getRandomColor = () => {
	const c = Math.floor(Math.random() * colors.length);
	return colors[c];
};
