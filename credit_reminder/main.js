const form = document.getElementById('cardForm');
const cardsContainer = document.getElementById('cardsContainer');
const bgColorInput = document.getElementById('bgColor');
const textColorInput = document.getElementById('textColor');
const verTarjetasBtn = document.getElementById('verTarjetas');

// Contraste automático
function getContrastColor(hex) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#FFFFFF';
}

function updateColorInput(input) {
  const color = input.value;
  const contrast = getContrastColor(color);
  input.style.backgroundColor = color;
  input.style.color = contrast;
}

bgColorInput.addEventListener('input', () => updateColorInput(bgColorInput));
textColorInput.addEventListener('input', () => updateColorInput(textColorInput));

// Cargar tarjetas
function loadCards() {
  const cards = JSON.parse(localStorage.getItem('creditCards')) || [];
  cardsContainer.innerHTML = '';

  cards.forEach((card, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.style.backgroundColor = card.bgColor;
    cardDiv.style.color = getContrastColor(card.bgColor);
    cardDiv.innerHTML = `
      <button onclick="deleteCard(${index})">Eliminar</button>
      <strong>${card.bank}</strong> •••• ${card.digits}<br>
      Vence: ${card.expiry}<br>
      Corte: Día ${card.cut} | Pago: Día ${card.pay}<br>
      Recordar ${card.reminder} días antes<br>
      Notificar a: ${card.email}
    `;
    cardsContainer.appendChild(cardDiv); // ← esta es la línea corregida
  });
}