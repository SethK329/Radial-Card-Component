export function controlsStartup() {
  //inject controls css
  const cssRef = document.createElement("link")
  cssRef.rel = "stylesheet"
  cssRef.href = "./controls.css"
  document.head.appendChild(cssRef)

  // Create controls
  createControls()
  // Use the controls
  useControls()
}

function createControls() {
  const docBody = document.body
  const cardComponent = document.getElementById("card-component")
  const header = document.createElement("header")
  //Page Title
  const title = document.createElement("h1")
  title.textContent = "Radial Card Component"
  header.appendChild(title)
  //Nav component
  const nav = document.createElement("nav")
  header.appendChild(nav)
  //Puts the controls above the component
  docBody.insertBefore(header, cardComponent)
  //This just iterates through the controls that we want to use
  //The controls are defined below
  controlsDefinition.forEach((control) => {
    const label = document.createElement("label")
    label.textContent = control.text
    nav.appendChild(label)
    const input = document.createElement("input")
    input.id = control.id
    input.type = control.type
    input.min = control.min
    input.max = control.max
    input.value = control.value
    input.step = control.step
    nav.appendChild(input)
  })
}

//The controls we need are defined here
const controlsDefinition = [
  {
    id: "card-count",
    text: "Number of Cards:",
    type: "range",
    min: "1",
    max: "15",
    value: "7",
    step: "1",
  },
  {
    id: "width",
    text: "Width of Container:",
    type: "range",
    min: "10",
    max: "100",
    value: "100",
    step: "1",
  },
  {
    id: "height",
    text: "Height of Container:",
    type: "range",
    min: "100",
    max: "1000",
    value: "500",
    step: "1",
  },
]

function useControls() {
  // Get input elements
  const cardCountInput = document.getElementById("card-count")
  const widthInput = document.getElementById("width")
  const heightInput = document.getElementById("height")

  // Get the card component container
  const cardComponent = document.getElementById("card-component")

  // Update card count (number of children)
  cardCountInput?.addEventListener("input", (e) => {
    const count = parseInt(e.target.value, 10)
    if (cardComponent) {
      cardComponent.innerHTML = "" // Clear existing children
      for (let i = 0; i < count; i++) {
        const card = document.createElement("div")
        card.className = "card" // Add a class for styling if needed
        cardComponent.appendChild(card)
      }
    }
  })

  // Update width
  widthInput?.addEventListener("input", (e) => {
    cardComponent.style.width = `${e.target.value}vw`
  })

  // Update height
  heightInput?.addEventListener("input", (e) => {
    cardComponent.style.height = `${e.target.value}px`
  })
}
