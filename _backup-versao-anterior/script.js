/* ============================================================
   ESTAÇÃO L — JavaScript
   ============================================================ */

// Base de dados dos produtos
const products = [
  {
    id: 1,
    name: "Pin Arco-íris Sáfico",
    category: "pins",
    price: "R$ 35,00",
    color: "linear-gradient(135deg,#7c3aed,#ec4899)",
    icon: "🌈"
  },
  {
    id: 2,
    name: "Chaveiro Coração Lésbico",
    category: "chaveiros",
    price: "R$ 28,00",
    color: "linear-gradient(135deg,#ec4899,#f97316)",
    icon: "♥"
  },
  {
    id: 3,
    name: "Sticker Pack Amor Sáfico",
    category: "stickers",
    price: "R$ 18,00",
    color: "linear-gradient(135deg,#3b82f6,#22c55e)",
    icon: "✦"
  },
  {
    id: 4,
    name: "Pin Labrys",
    category: "pins",
    price: "R$ 38,00",
    color: "linear-gradient(135deg,#7c3aed,#3b82f6)",
    icon: "⚔"
  },
  {
    id: 5,
    name: "Chaveiro Estação L",
    category: "chaveiros",
    price: "R$ 32,00",
    color: "linear-gradient(135deg,#eab308,#ec4899)",
    icon: "L"
  },
  {
    id: 6,
    name: "Sticker Bandeira",
    category: "stickers",
    price: "R$ 12,00",
    color: "linear-gradient(135deg,#f97316,#ec4899)",
    icon: "🏳"
  },
  {
    id: 7,
    name: "Pin Lua e Estrela",
    category: "pins",
    price: "R$ 32,00",
    color: "linear-gradient(135deg,#7c3aed,#ec4899)",
    icon: "✧"
  },
  {
    id: 8,
    name: "Chaveiro Arco-íris",
    category: "chaveiros",
    price: "R$ 25,00",
    color: "linear-gradient(135deg,#22c55e,#3b82f6)",
    icon: "◐"
  }
];

/**
 * Renderiza os produtos na grid
 * @param {string} filter - Categoria para filtrar ('all' para todos)
 */
function renderProducts(filter = 'all') {
  const grid = document.getElementById('productsGrid');
  const filtered = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);
  
  grid.innerHTML = filtered.map(p => `
    <div class="product-card" data-category="${p.category}">
      <div class="product-image" style="background:${p.color};">
        <span>${p.icon}</span>
      </div>
      <div class="product-info">
        <p class="product-category">${p.category}</p>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-footer">
          <span class="product-price">${p.price}</span>
          <button class="product-add-btn" onclick="addToCart('${p.name}')">
            + Adicionar
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Filtra os produtos por categoria e atualiza o botão ativo
 * @param {string} filter - Categoria selecionada
 * @param {HTMLElement} btn - Botão clicado
 */
function filterProducts(filter, btn) {
  renderProducts(filter);
  
  // Atualiza estado dos botões
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.remove('active');
  });
  btn.classList.add('active');
}

/**
 * Simula adição ao carrinho com notificação
 * @param {string} productName - Nome do produto
 */
function addToCart(productName) {
  showNotification(`${productName} adicionado! 💕`);
}

/**
 * Scroll suave para uma seção
 * @param {string} id - ID da seção alvo
 */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Abre/fecha o menu mobile
 */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

/**
 * Mostra uma notificação toast temporária
 * @param {string} msg - Mensagem para exibir
 */
function showNotification(msg) {
  // Remove notificação existente se houver
  const existing = document.querySelector('.toast-notif');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast-notif';
  toast.textContent = msg;
  document.body.appendChild(toast);
  
  // Anima entrada
  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(0)';
  }, 10);
  
  // Anima saída e remove
  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}

// ============================================================
// INICIALIZAÇÃO
// ============================================================

// Renderiza todos os produtos ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
  renderProducts();
});
