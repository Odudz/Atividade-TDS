var db = {user: 0,acc: []}

// Saving and loading functions
function saveDb(){
  localStorage.setItem('db',JSON.stringify(db))
}
function loadDb(){

  var data = JSON.parse(localStorage.getItem('db'))
  if(localStorage.getItem('db') !== null){
      db = data
  }
}

window.onload = loadDb()
setInterval(saveDb,1000) 

// Ensure db.acc[db.user] exists
function ensureUserAccount() {
  if (!db.acc[db.user]) {
    db.acc[db.user] = [];
  }
}

function renderCart() {
  console.log("Hi")
    const cartDiv = document.getElementById("cart");
    const items = db.acc[db.user][2];
    cartDiv.innerHTML = "";

    if (items.length === 0) {
      cartDiv.innerHTML = "<p style='color:white; font-size:1.2em;'>Your cart is empty.</p>";
      return;
    }

    items.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "item-card";

      itemDiv.innerHTML = `
        <img class="item-image" src="${item.imagem}" alt="${item.descricao}" />
        <h3 class="item-description">${item.descricao}</h3>
        <p class="item-price">Preço: R$ ${item.preco.toFixed(2)}</p>
        <div class="item-actions">
          <button class="add-button" onclick="removeItem(${item.id})">Remove</button>
        </div>
      `;

      cartDiv.appendChild(itemDiv);
    });
  }

  function removeItem(id) {
    const cart = db.acc[db.user][2];
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
      cart.splice(index, 1);
      renderCart();
    }
  }

renderCart()