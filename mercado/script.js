var db = { user: 0, acc: [] };

// Saving and loading functions
function saveDb() {
  localStorage.setItem('db', JSON.stringify(db));
}

function loadDb() {
  const data = JSON.parse(localStorage.getItem('db'));
  if (data !== null) {
    db = data;
  }
}

window.onload = loadDb;
setInterval(saveDb, 1000);

// Ensure db.acc[db.user] exists
function ensureUserAccount() {
  if (!db.acc[db.user]) {
    db.acc[db.user] = [];
  }
  if (!Array.isArray(db.acc[db.user][2])) {
    db.acc[db.user][2] = [];
  }
}

// Toast function
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Create item cards
const container = document.getElementById('cardContainer');

fetch('/dados/dados.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao carregar produtos.json');
    }
    return response.json();
  })
  .then(items => {
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'item-card';

      card.innerHTML = `
        <img src="${item.imagem}" alt="${item.descricao}" class="item-image">
        <div class="item-info">
          <p class="item-description">${item.descricao}</p>
          <p class="item-price">R$ ${item.preco.toFixed(2)}</p>
        </div>
        <div class="item-actions">
          <button class="add-button">Adicionar</button>
        </div>
      `;

      container.appendChild(card);

      const addButton = card.querySelector('.add-button');
      addButton.addEventListener('click', () => {
        ensureUserAccount();
        db.acc[db.user][2].push(item); // Add to cart
        showToast(`'${item.descricao}' foi adicionado ao carrinho`);
        console.log(`Item adicionado: ${item.descricao}`);
      });
    });
  })
  .catch(error => {
    console.error('Erro ao carregar os dados:', error);
  });
