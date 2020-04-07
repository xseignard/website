export const colors = ['#49d6a7', '#8B73CF', '#F88429']

export const getRandomColor = () => {
  const c = Math.floor(Math.random() * colors.length)
  return colors[c]
}
