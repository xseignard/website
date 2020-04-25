export const colors = ['#49d6a7', '#8B73CF', '#F88429']

export const getRandomColor = () => {
  const c = Math.floor(Math.random() * colors.length)
  return colors[c]
}

// custom event tied to RAF
const throttle = (type, name, obj) => {
  obj = obj || window
  let running = false
  obj.addEventListener(type, () => {
    if (running) return
    running = true
    requestAnimationFrame(() => {
      obj.dispatchEvent(new CustomEvent(name))
      running = false
    })
  })
}

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
const vh = window.innerHeight * 0.01
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`)
// tie resize event on repaints
throttle('resize', 'optimizedResize')
// custom resize event
window.addEventListener('optimizedResize', function() {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
})
