export const colors = ['#4FDAB1', '#8B73CF', '#F88429'];

export const getRandomColor = () => {
	const c = Math.floor(Math.random() * colors.length);
	return colors[c];
};
