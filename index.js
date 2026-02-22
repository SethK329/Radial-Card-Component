// Get input elements
const cardCountInput = document.getElementById('card-count');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');

// Get the card component container
const cardComponent = document.getElementById('card-component');

// Update card count (number of children)
cardCountInput?.addEventListener('input', (e) => {
    const count = parseInt(e.target.value, 10);
    if (cardComponent) {
        cardComponent.innerHTML = ''; // Clear existing children
        for (let i = 0; i < count; i++) {
            const card = document.createElement('div');
            card.className = 'card'; // Add a class for styling if needed
            cardComponent.appendChild(card);
        }
    }
});

// Update width
widthInput?.addEventListener('input', (e) => {
    cardComponent.style.width = `${e.target.value}vw`;
});

// Update height
heightInput?.addEventListener('input', (e) => {
    cardComponent.style.height = `${e.target.value}px`;
});