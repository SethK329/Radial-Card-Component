//Kicks off the debug controls / scripts
export function debugStartup() {
  //inject debug css
  const cssRef = document.createElement("link")
  cssRef.rel = "stylesheet"
  cssRef.href = "./debug.css"
  document.head.appendChild(cssRef)

  // Create controls
  createControls()
  // Use the controls
  useControls()

  updateCardData()
  setupObserver()
}

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
    value: "50",
    step: "1",
  },
  {
    id: "height",
    text: "Height of Container:",
    type: "range",
    min: "150",
    max: "400",
    value: "500",
    step: "1",
  },
]

function updateCardData() {
  const cardComponent = document.getElementById("card-component")
  const cards = cardComponent.children
  const offSetAngle = getArcSpread() / getCardCount()
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i]
    let cardData = card.querySelector(".card-data")
    if (!cardData) {
      cardData = document.createElement("div")
      cardData.className = "card-data"
      card.appendChild(cardData)
    } else {
      cardData.innerHTML = ""
    }
    //Card Index
    const siblingIndex = i + 1
    const totalCards = cards.length + 1
    const cardIndex = document.createElement("p")
    cardIndex.textContent = `${siblingIndex}: Card Index`
    cardData.appendChild(cardIndex)
    //From Center
    const fromCenterEl = document.createElement("p")
    const fromCenterData = siblingIndex - totalCards / 2
    const fromCenterText = `${fromCenterData}: From Center`
    fromCenterEl.textContent = fromCenterText
    cardData.appendChild(fromCenterEl)
    //Card Height
    const cardHeightEl = document.createElement("p")
    const cardHeightData = getComputedStyle(card)
      .getPropertyValue("height")
      .replace("px", "")
    const cardHeightText = `${cardHeightData}: Card Height`
    cardHeightEl.textContent = cardHeightText
    cardData.appendChild(cardHeightEl)
    //Card Width
    const cardWidthEl = document.createElement("p")
    const cardWidthData = getComputedStyle(card).getPropertyValue("width")
    const cardWidthValueString = cardWidthData.replace("px", "")
    const cardWidthValue = parseFloat(cardWidthValueString).toFixed(2)
    const cardWidthText = `${cardWidthData}: Card Width`
    cardWidthEl.textContent = cardWidthText
    cardData.appendChild(cardWidthEl)
    //Card Angle
    const cardAngleEl = document.createElement("p")
    const cardAngleData = fromCenterData * offSetAngle
    const cardAngleText = `${cardAngleData.toFixed(2)} + 270deg: Card Angle`
    cardAngleEl.textContent = cardAngleText
    cardData.appendChild(cardAngleEl)
    //Card Depth
    const cardDepthEl = document.createElement("p")
    const cardDepthData =
      getComputedStyle(card).getPropertyValue("--card-depth")
    const cardDepthValue = parseFloat(cardDepthData) / 100
    // const cardDepthText = `${cardDepthValue.toFixed(2)}: Card Depth`
    // cardDepthEl.textContent = cardDepthText
    // cardData.appendChild(cardDepthEl)
    //Scale from Center
    const scaleFromCenterEl = document.createElement("p")
    const scaleFromCenterData =
      cardHeightData - Math.abs(fromCenterData) * cardDepthValue
    const scaleFromCenterText = `${scaleFromCenterData.toFixed(2)}: Scale / Center `
    scaleFromCenterEl.textContent = scaleFromCenterText
    cardData.appendChild(scaleFromCenterEl)
  }
}

function setupObserver() {
  const cardComponent = document.getElementById("card-component")
  const observer = new MutationObserver((mutations) => {
    let shouldUpdate = false
    for (const mutation of mutations) {
      if (mutation.target === cardComponent) {
        shouldUpdate = true
      }
    }
    if (shouldUpdate) updateCardData()
  })
  observer.observe(cardComponent, {
    childList: true,
    attributes: true,
    attributeFilter: ["style"],
  })
}

function getCardCount() {
  const cardContainer = document.getElementById("card-component")
  return cardContainer.children.length
}
function getArcSpread() {
  const component = document.getElementById("card-component")
  const currentSpread = getComputedStyle(
    component.children[0],
  ).getPropertyValue("--arc-spread")
  return currentSpread.replace("deg", "")
}
