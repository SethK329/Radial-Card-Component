//Kicks off the debug controls / scripts
export function debugStartup() {
  //inject debug css
  const cssRef = document.createElement("link")
  cssRef.rel = "stylesheet"
  cssRef.href = "./debug.css"
  document.head.appendChild(cssRef)

  updateCardData()
  setupObserver()
}



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
