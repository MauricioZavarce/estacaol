/* ============================================================
   ESTAÇÃO L — Papelaria Personalizada
   Catálogo, carrinho, formulário e integração com WhatsApp
   ============================================================ */

const WHATSAPP_NUMERO = "5511922149329";
const CHAVE_CARRINHO = "estacaoL.carrinho.v1";
const LIMITE_DESCONTO = 5; // acima de 5 unidades = 20% OFF

const categorias = {
  papelaria: "Papelaria",
  chaveiros: "Chaveiros",
  botoes: "Botões & ímãs",
  presentes: "Presentes",
  kits: "Kits"
};

/* Preços em centavos para evitar arredondamentos errados.
   Itens com faixa de preço usam o valor base no carrinho. */
const products = [
  {
    id: "photocard",
    nome: "Photocard",
    categoria: "papelaria",
    preco: 400,
    precoLabel: "R$ 4 a R$ 8",
    aPartir: true,
    foto: "produto-photocard.jpg",
    emoji: "🌈",
    desc: "Sua foto favorita em um photocard personalizado, do jeitinho que você ama."
  },
  {
    id: "polaroid",
    nome: "Polaroid",
    categoria: "papelaria",
    preco: 500,
    precoLabel: "R$ 5 a R$ 8",
    aPartir: true,
    foto: "produto-polaroid.jpg",
    emoji: "📷",
    desc: "Polaroid personalizada para colecionar, presentear ou decorar."
  },
  {
    id: "photobooth",
    nome: "Photobooth / Tira",
    categoria: "papelaria",
    preco: 1200,
    precoLabel: "R$ 12",
    aPartir: false,
    foto: "produto-photobooth.jpg",
    emoji: "🎞️",
    desc: "Tira photobooth personalizada com aquele charme de cabine de fotos."
  },
  {
    id: "botao",
    nome: "Botão / Button",
    categoria: "botoes",
    preco: 300,
    precoLabel: "R$ 3 a R$ 8",
    aPartir: true,
    foto: "produto-botao.jpg",
    emoji: "📌",
    desc: "Botão personalizado com sua arte, casal ou personagem favorito."
  },
  {
    id: "chaveiro-botao",
    nome: "Chaveiro botão",
    categoria: "chaveiros",
    preco: 800,
    precoLabel: "R$ 8",
    aPartir: false,
    foto: "produto-chaveiro.jpg",
    emoji: "🔑",
    desc: "Chaveiro estilo botão, pequeno e cheio de personalidade."
  },
  {
    id: "chaveiro-acrilico",
    nome: "Chaveiro acrílico",
    categoria: "chaveiros",
    preco: 1000,
    precoLabel: "R$ 10",
    aPartir: false,
    foto: "produto-chaveiro.jpg",
    emoji: "🔑",
    desc: "Chaveiro em acrílico com a personalização que você escolher."
  },
  {
    id: "chaveiro-photobooth",
    nome: "Chaveiro photobooth",
    categoria: "chaveiros",
    preco: 1200,
    precoLabel: "R$ 12",
    aPartir: false,
    foto: "produto-chaveiro.jpg",
    emoji: "🔑",
    desc: "Sua tira photobooth favorita em formato de chaveiro."
  },
  {
    id: "chaveiro-livro",
    nome: "Chaveiro capa de livro miniatura",
    categoria: "chaveiros",
    preco: 1200,
    precoLabel: "A partir de R$ 12",
    aPartir: true,
    foto: "produto-chaveiro.jpg",
    emoji: "📚",
    desc: "Miniatura de capa de livro em chaveiro — GAP, The Secret of Us, Delilah Green e mais."
  },
  {
    id: "ima",
    nome: "Ímã de geladeira / Polaroid ímã",
    categoria: "botoes",
    preco: 600,
    precoLabel: "R$ 6 a R$ 16",
    aPartir: true,
    foto: "produto-ima.jpg",
    emoji: "🧲",
    desc: "Ímã de geladeira personalizado, com opção polaroid ímã."
  },
  {
    id: "caneca",
    nome: "Caneca",
    categoria: "presentes",
    preco: 3500,
    precoLabel: "A partir de R$ 35",
    aPartir: true,
    foto: "produto-caneca.jpg",
    emoji: "☕",
    desc: "Caneca personalizada para deixar o café (ou o chá) mais fofo."
  },
  {
    id: "marcapagina",
    nome: "Marca-página",
    categoria: "papelaria",
    preco: 800,
    precoLabel: "R$ 8 a R$ 12",
    aPartir: true,
    foto: "produto-marcapagina.jpg",
    emoji: "🔖",
    desc: "Marca-página personalizado para acompanhar suas leituras."
  },
  {
    id: "ecobag",
    nome: "Ecobag 30x25cm",
    categoria: "presentes",
    preco: 3500,
    precoLabel: "R$ 35",
    aPartir: false,
    foto: "produto-ecobag.jpg",
    emoji: "👜",
    desc: "Ecobag 30x25 cm personalizada, prática e cheia de estilo."
  },
  {
    id: "credencial",
    nome: "Credencial de fã",
    categoria: "presentes",
    preco: 2500,
    precoLabel: "R$ 25 a R$ 30",
    aPartir: true,
    foto: "produto-credencial.jpg",
    emoji: "🎫",
    desc: "Credencial de fã frente e verso, com cordão."
  },
  {
    id: "kit-lite",
    nome: "Kit Lite",
    categoria: "kits",
    preco: 2990,
    precoLabel: "R$ 29,90",
    aPartir: false,
    foto: "produto-kit.jpg",
    emoji: "🎁",
    desc: 'Uma seleção fofa para começar a coleção. Composição: <span class="preencher">[PREENCHER]</span>.'
  },
  {
    id: "kit-plus",
    nome: "Kit Plus",
    categoria: "kits",
    preco: 3990,
    precoLabel: "R$ 39,90",
    aPartir: false,
    foto: "produto-kit.jpg",
    emoji: "🎁",
    desc: 'Mais itens para presentear ou ampliar a coleção. Composição: <span class="preencher">[PREENCHER]</span>.'
  },
  {
    id: "kit-premium",
    nome: "Kit Premium",
    categoria: "kits",
    preco: 5590,
    precoLabel: "R$ 55,90",
    aPartir: false,
    foto: "produto-kit.jpg",
    emoji: "🎁",
    desc: 'Um kit caprichado para fãs de carteirinha. Composição: <span class="preencher">[PREENCHER]</span>.'
  },
  {
    id: "kit-vip",
    nome: "Kit VIP",
    categoria: "kits",
    preco: 9990,
    precoLabel: "R$ 99,90",
    aPartir: false,
    foto: "produto-kit.jpg",
    emoji: "🎁",
    desc: 'A experiência completa da Estação L. Composição: <span class="preencher">[PREENCHER]</span>.'
  }
];

const produtosPorId = Object.fromEntries(products.map((p) => [p.id, p]));
const precoBRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const money = (centavos) => precoBRL.format(centavos / 100);

const ICONE_WHATSAPP = '<svg class="icone" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

/* ---------- Utilidades ---------- */
function waLink(mensagem) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

function escaparHTML(valor) {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function abrirDialogo(dialog) {
  if (!dialog) return;
  if (typeof dialog.showModal === "function" && !dialog.open) {
    dialog.showModal();
  } else if (!dialog.open) {
    dialog.setAttribute("open", "");
  }
  document.body.classList.add("sem-scroll");
}

function fecharDialogo(dialog) {
  if (!dialog) return;
  if (typeof dialog.close === "function" && dialog.open) {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
  }
  if (!document.querySelector("dialog[open]")) {
    document.body.classList.remove("sem-scroll");
  }
}

function mostrarToast(mensagem) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = mensagem;
  toast.classList.add("visivel");
  window.clearTimeout(mostrarToast.timer);
  mostrarToast.timer = window.setTimeout(() => {
    toast.classList.remove("visivel");
  }, 2900);
}

/* ---------- Catálogo ---------- */
let filtroAtual = "todos";

function cardProdutoHTML(produto) {
  const label = categorias[produto.categoria] || produto.categoria;
  const alt = `${produto.nome} personalizado pela Estação L`;
  const mensagem = produto.categoria === "kits"
    ? `Oi, Estação L! 🌈 Quero saber mais sobre o ${produto.nome} (${produto.precoLabel}). Pode me contar a composição? 💕`
    : `Oi, Estação L! 🌈 Quero pedir: ${produto.nome} (${produto.precoLabel}). Pode me ajudar com a personalização? 💕`;

  return `
    <article class="produto-card">
      <div class="produto-midia">
        <div class="midia-wrap">
          <img src="assets/fotos/${produto.foto}" alt="${escaparHTML(alt)}" loading="lazy" decoding="async"
               onerror="var w=this.closest('.midia-wrap');if(w){w.classList.add('is-missing')}">
          <div class="midia-fallback">
            <span class="fallback-emoji" aria-hidden="true">${produto.emoji}</span>
            <span class="fallback-titulo">${escaparHTML(produto.nome)}</span>
            <span class="fallback-caminho">/assets/fotos/${produto.foto}</span>
            <span class="fallback-sub">Adicione sua foto aqui</span>
          </div>
        </div>
        ${produto.aPartir ? '<span class="tag-a-partir">a partir de</span>' : ""}
      </div>
      <div class="produto-corpo">
        <span class="produto-categoria">${escaparHTML(label)}</span>
        <h3 class="produto-nome">${escaparHTML(produto.nome)}</h3>
        <p class="produto-desc">${produto.desc}</p>
        <p class="produto-preco">${produto.precoLabel}</p>
        <div class="produto-acoes">
          <button type="button" class="btn-add" data-add="${produto.id}" aria-label="Adicionar ${escaparHTML(produto.nome)} ao carrinho">Adicionar</button>
          <a class="btn-wa-mini" href="${waLink(mensagem)}" target="_blank" rel="noopener noreferrer" aria-label="Pedir ${escaparHTML(produto.nome)} no WhatsApp">
            ${ICONE_WHATSAPP}<span>Pedir esse no WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  `;
}

function renderProdutos() {
  const grade = document.getElementById("gradeProdutos");
  const contagem = document.getElementById("catalogoContagem");
  if (!grade) return;

  const filtrados = filtroAtual === "todos"
    ? products
    : products.filter((p) => p.categoria === filtroAtual);

  grade.innerHTML = filtrados.map(cardProdutoHTML).join("");
  if (contagem) {
    contagem.textContent = `${filtrados.length} ${filtrados.length === 1 ? "item" : "itens"}`;
  }
}

function configurarFiltros() {
  const botoes = document.querySelectorAll("[data-filtro]");
  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      filtroAtual = botao.dataset.filtro;
      botoes.forEach((b) => {
        const ativo = b === botao;
        b.classList.toggle("ativo", ativo);
        b.setAttribute("aria-pressed", String(ativo));
      });
      renderProdutos();
    });
  });
}

/* ---------- Carrinho ---------- */
const carrinho = new Map();
const dialogCarrinho = document.getElementById("dialogCarrinho");
const dialogResumo = document.getElementById("dialogResumo");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxLegenda = document.getElementById("lightboxLegenda");
let ultimoPedido = null;

function carregarCarrinho() {
  try {
    const bruto = window.localStorage.getItem(CHAVE_CARRINHO);
    if (!bruto) return;
    const dados = JSON.parse(bruto);
    Object.entries(dados || {}).forEach(([id, qtd]) => {
      const quantidade = Number(qtd);
      if (produtosPorId[id] && Number.isInteger(quantidade) && quantidade > 0) {
        carrinho.set(id, Math.min(quantidade, 999));
      }
    });
  } catch (erro) {
    // localStorage indisponível (modo privado / file://): segue sem persistir
  }
}

function salvarCarrinho() {
  try {
    window.localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(Object.fromEntries(carrinho)));
  } catch (erro) {
    // silencioso de propósito
  }
}

function adicionarAoCarrinho(id) {
  const produto = produtosPorId[id];
  if (!produto) return;

  const atual = carrinho.get(id) || 0;
  if (atual >= 999) {
    mostrarToast("Limite de 999 unidades por item 💕");
    return;
  }

  carrinho.set(id, atual + 1);
  salvarCarrinho();
  renderCarrinho();
  mostrarToast(`${produto.nome} adicionado ao carrinho 💕`);

  const flutuante = document.querySelector(".carrinho-flutuante");
  if (flutuante) {
    flutuante.classList.remove("pulso");
    void flutuante.offsetWidth;
    flutuante.classList.add("pulso");
  }
}

function alterarQuantidade(id, delta) {
  if (!carrinho.has(id)) return;
  const nova = (carrinho.get(id) || 0) + delta;
  if (nova <= 0) {
    carrinho.delete(id);
  } else {
    carrinho.set(id, Math.min(nova, 999));
  }
  salvarCarrinho();
  renderCarrinho();
}

function removerDoCarrinho(id) {
  const produto = produtosPorId[id];
  carrinho.delete(id);
  salvarCarrinho();
  renderCarrinho();
  if (produto) mostrarToast(`${produto.nome} removido do carrinho.`);
}

function renderCarrinho() {
  const itensEl = document.getElementById("cartItens");
  const vazioEl = document.getElementById("cartVazio");
  const rodapeEl = document.getElementById("cartRodape");
  const subtotalEl = document.getElementById("cartSubtotal");
  const descontoEl = document.getElementById("cartDesconto");
  const linhaDesconto = document.getElementById("cartLinhaDesconto");
  const totalEl = document.getElementById("cartTotal");
  const progressoEl = document.getElementById("cartProgresso");
  const checkoutEl = document.getElementById("cartCheckout");
  if (!itensEl) return;

  const itens = [...carrinho.entries()]
    .map(([id, qtd]) => ({ produto: produtosPorId[id], qtd }))
    .filter((item) => item.produto);

  const totalUnidades = itens.reduce((soma, item) => soma + item.qtd, 0);
  atualizarContadores(totalUnidades, 0);

  if (itens.length === 0) {
    itensEl.innerHTML = "";
    if (vazioEl) vazioEl.hidden = false;
    if (rodapeEl) rodapeEl.hidden = true;
    if (subtotalEl) subtotalEl.textContent = money(0);
    if (totalEl) totalEl.textContent = money(0);
    if (checkoutEl) {
      checkoutEl.href = "#";
      checkoutEl.setAttribute("aria-disabled", "true");
    }
    return;
  }

  if (vazioEl) vazioEl.hidden = true;
  if (rodapeEl) rodapeEl.hidden = false;

  itensEl.innerHTML = itens.map(({ produto, qtd }) => `
    <article class="cart-item">
      <span class="cart-item-emoji" aria-hidden="true">${produto.emoji}</span>
      <div class="cart-item-info">
        <strong>${escaparHTML(produto.nome)}</strong>
        <small>${produto.aPartir ? "a partir de " : ""}${money(produto.preco)} cada</small>
        <div class="cart-qtd">
          <button type="button" data-acao="menos" data-id="${produto.id}" aria-label="Diminuir quantidade de ${escaparHTML(produto.nome)}">−</button>
          <span aria-label="Quantidade de ${escaparHTML(produto.nome)}">${qtd}</span>
          <button type="button" data-acao="mais" data-id="${produto.id}" aria-label="Aumentar quantidade de ${escaparHTML(produto.nome)}">+</button>
        </div>
      </div>
      <span class="cart-item-total">${money(produto.preco * qtd)}</span>
      <button type="button" class="cart-remover" data-acao="remover" data-id="${produto.id}" aria-label="Remover ${escaparHTML(produto.nome)} do carrinho">Remover</button>
    </article>
  `).join("");

  const subtotal = itens.reduce((soma, item) => soma + item.produto.preco * item.qtd, 0);
  const temDesconto = totalUnidades > LIMITE_DESCONTO;
  const desconto = temDesconto ? Math.round(subtotal * 0.2) : 0;
  const total = subtotal - desconto;

  if (subtotalEl) subtotalEl.textContent = money(subtotal);
  if (linhaDesconto) linhaDesconto.hidden = !temDesconto;
  if (descontoEl) descontoEl.textContent = `− ${money(desconto)}`;
  if (totalEl) totalEl.textContent = money(total);

  if (progressoEl) {
    if (temDesconto) {
      progressoEl.textContent = "Você garantiu 20% OFF nesta sacolinha! 🌈";
    } else {
      const faltam = LIMITE_DESCONTO + 1 - totalUnidades;
      progressoEl.textContent = `Faltam ${faltam} ${faltam === 1 ? "unidade" : "unidades"} para ganhar 20% OFF ✨`;
    }
  }

  const linhas = itens.map(({ produto, qtd }) => {
    const base = `${produto.aPartir ? "a partir de " : ""}${money(produto.preco)}`;
    return `• ${qtd}x ${produto.nome} — ${base}`;
  }).join("\n");

  let mensagem = `Oi, Estação L! 🌈 Quero finalizar meu pedido:\n${linhas}\n\nSubtotal: ${money(subtotal)}`;
  if (temDesconto) mensagem += `\nDesconto (20%): − ${money(desconto)}`;
  mensagem += `\nTotal: ${money(total)}\n\nPode confirmar disponibilidade, personalização e frete? 💕`;

  atualizarContadores(totalUnidades, total);

  if (checkoutEl) {
    checkoutEl.href = waLink(mensagem);
    checkoutEl.removeAttribute("aria-disabled");
  }

  if (totalEl) totalEl.dataset.total = String(total);
}

function atualizarContadores(totalUnidades, total) {
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = String(totalUnidades);
    el.hidden = totalUnidades === 0;
  });

  document.querySelectorAll("[data-cart-total]").forEach((el) => {
    el.textContent = total > 0 ? money(total) : "R$ 0,00";
  });

  const flutuante = document.querySelector(".carrinho-flutuante");
  if (flutuante) flutuante.hidden = totalUnidades === 0;
}

function configurarCarrinho() {
  const grade = document.getElementById("gradeProdutos");
  if (grade) {
    grade.addEventListener("click", (evento) => {
      const botao = evento.target.closest("[data-add]");
      if (botao) adicionarAoCarrinho(botao.dataset.add);
    });
  }

  const itensEl = document.getElementById("cartItens");
  if (itensEl) {
    itensEl.addEventListener("click", (evento) => {
      const botao = evento.target.closest("button[data-acao]");
      if (!botao) return;
      const id = botao.dataset.id;
      const acao = botao.dataset.acao;
      if (acao === "mais") alterarQuantidade(id, 1);
      if (acao === "menos") alterarQuantidade(id, -1);
      if (acao === "remover") removerDoCarrinho(id);
    });
  }

  document.querySelectorAll("[data-abrir-carrinho]").forEach((botao) => {
    botao.addEventListener("click", () => {
      renderCarrinho();
      abrirDialogo(dialogCarrinho);
    });
  });

  document.querySelectorAll("[data-fechar-carrinho]").forEach((botao) => {
    botao.addEventListener("click", () => {
      const eraVazio = Boolean(botao.closest("#cartVazio"));
      fecharDialogo(dialogCarrinho);
      if (eraVazio) {
        window.setTimeout(() => {
          document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 120);
      }
    });
  });

  if (dialogCarrinho) {
    dialogCarrinho.addEventListener("click", (evento) => {
      if (evento.target === dialogCarrinho) fecharDialogo(dialogCarrinho);
    });
  }
}

/* ---------- Formulário ---------- */
function preencherSelectProdutos() {
  const select = document.getElementById("produto");
  if (!select) return;

  Object.entries(categorias).forEach(([categoria, label]) => {
    const itens = products.filter((p) => p.categoria === categoria);
    if (!itens.length) return;
    const grupo = document.createElement("optgroup");
    grupo.label = label;
    itens.forEach((produto) => {
      const opcao = document.createElement("option");
      opcao.value = produto.id;
      opcao.textContent = `${produto.nome} — ${produto.precoLabel}`;
      grupo.appendChild(opcao);
    });
    select.appendChild(grupo);
  });
}

function arquivoSelecionado() {
  const input = document.getElementById("arquivo");
  return input && input.files && input.files.length ? input.files[0] : null;
}

function atualizarResumo() {
  const selectProduto = document.getElementById("produto");
  const campoQtd = document.getElementById("quantidade");
  const selectPagamento = document.getElementById("pagamento");
  const entregaMarcada = document.querySelector('input[name="entrega"]:checked');
  if (!selectProduto) return;

  const produto = produtosPorId[selectProduto.value] || null;
  const qtd = Math.max(1, Number.parseInt(campoQtd?.value, 10) || 1);
  const pagamento = selectPagamento?.value || "—";
  const entrega = entregaMarcada?.value || "Envio";
  const arquivo = arquivoSelecionado();

  const set = (id, texto) => {
    const el = document.getElementById(id);
    if (el) el.textContent = texto;
  };

  set("resumoProduto", produto ? `${produto.nome} — ${produto.precoLabel}` : "—");
  set("resumoQuantidade", String(qtd));
  set("resumoPagamento", pagamento);
  set("resumoEntrega", entrega);
  set("resumoArquivo", arquivo ? arquivo.name : "Nenhum arquivo");

  const subtotal = produto ? produto.preco * qtd : 0;
  const temDesconto = Boolean(produto) && qtd > LIMITE_DESCONTO;
  const desconto = temDesconto ? Math.round(subtotal * 0.2) : 0;
  const total = subtotal - desconto;

  const linhaDesconto = document.getElementById("resumoDescontoLinha");
  if (linhaDesconto) linhaDesconto.hidden = !temDesconto;
  set("resumoDesconto", `− ${money(desconto)}`);
  set("resumoTotal", money(total));
}

function configurarArquivo() {
  const input = document.getElementById("arquivo");
  const preview = document.getElementById("uploadPreview");
  const previewImg = document.getElementById("previewImg");
  const previewNome = document.getElementById("previewNome");
  const remover = document.getElementById("removerArquivo");
  if (!input || !preview) return;

  let urlPreview = null;

  const limparPreview = () => {
    if (urlPreview) {
      URL.revokeObjectURL(urlPreview);
      urlPreview = null;
    }
    preview.hidden = true;
    preview.classList.remove("tem-imagem");
    if (previewImg) {
      previewImg.removeAttribute("src");
      previewImg.alt = "Prévia da foto de referência escolhida";
    }
    if (previewNome) previewNome.textContent = "";
  };

  input.addEventListener("change", () => {
    const arquivo = input.files && input.files[0];
    limparPreview();
    if (!arquivo) {
      atualizarResumo();
      return;
    }

    if (previewNome) previewNome.textContent = arquivo.name;

    if (arquivo.type.startsWith("image/") && previewImg) {
      urlPreview = URL.createObjectURL(arquivo);
      previewImg.src = urlPreview;
      previewImg.alt = `Prévia da referência ${arquivo.name}`;
      preview.classList.add("tem-imagem");
    }

    preview.hidden = false;
    atualizarResumo();
  });

  if (remover) {
    remover.addEventListener("click", () => {
      input.value = "";
      limparPreview();
      atualizarResumo();
      input.focus();
    });
  }
}

function renderResumoFinal(pedido) {
  const container = document.getElementById("resumoFinal");
  if (!container) return;

  const linhas = [
    ["Produto", `${pedido.produto.nome} (${pedido.produto.precoLabel})`],
    ["Quantidade", String(pedido.qtd)],
    ["Nome", pedido.nome],
    ["WhatsApp", pedido.telefone],
    ["Pagamento", pedido.pagamento],
    ["Entrega", pedido.entrega],
    ["Referência", pedido.arquivo || "Nenhum arquivo"],
    ["Observações", pedido.observacoes || "—"]
  ];

  const linhasHTML = linhas.map(([rotulo, valor]) => `
    <div><span>${escaparHTML(rotulo)}</span><strong>${escaparHTML(valor)}</strong></div>
  `).join("");

  const descontoHTML = pedido.desconto > 0
    ? `<div><span>Desconto (20%)</span><strong>− ${money(pedido.desconto)}</strong></div>`
    : "";

  container.innerHTML = `
    <div class="confirm-linhas">
      ${linhasHTML}
      ${descontoHTML}
      <div class="confirm-total"><span>Total de referência</span><strong>${money(pedido.total)}</strong></div>
    </div>
    <p class="confirm-nota">*O valor final é confirmado no WhatsApp. Itens com faixa de preço usam o valor base no cálculo.</p>
  `;
}

function configurarFormulario() {
  const form = document.getElementById("formPedido");
  if (!form) return;

  atualizarResumo();
  form.addEventListener("input", atualizarResumo);
  form.addEventListener("change", atualizarResumo);

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const dados = new FormData(form);
    const produto = produtosPorId[String(dados.get("produto") || "")];
    if (!produto) {
      document.getElementById("produto")?.focus();
      return;
    }

    const qtd = Math.max(1, Number.parseInt(String(dados.get("quantidade") || "1"), 10) || 1);
    const nome = String(dados.get("nome") || "").trim();
    const telefone = String(dados.get("whatsapp") || "").trim();
    const pagamento = String(dados.get("pagamento") || "");
    const entrega = String(dados.get("entrega") || "Envio");
    const observacoes = String(dados.get("observacoes") || "").trim();
    const arquivo = arquivoSelecionado();

    const subtotal = produto.preco * qtd;
    const temDesconto = qtd > LIMITE_DESCONTO;
    const desconto = temDesconto ? Math.round(subtotal * 0.2) : 0;
    const total = subtotal - desconto;

    let mensagem = `Oi, Estação L! 🌈 Quero pedir: ${produto.nome} x ${qtd} — Nome: ${nome} — WhatsApp: ${telefone} — Pagamento: ${pagamento} — Entrega: ${entrega} — Obs: ${observacoes || "sem observações"}`;
    if (arquivo) mensagem += ` — Referência: ${arquivo.name} (vou anexar nesta conversa)`;

    ultimoPedido = {
      url: waLink(mensagem),
      produto,
      qtd,
      nome,
      telefone,
      pagamento,
      entrega,
      observacoes,
      arquivo: arquivo ? arquivo.name : "",
      desconto,
      total
    };

    renderResumoFinal(ultimoPedido);
    abrirDialogo(dialogResumo);
  });
}

function configurarEnvioPedido() {
  const botao = document.getElementById("btnEnviarPedido");
  if (!botao) return;

  botao.addEventListener("click", () => {
    if (!ultimoPedido) return;
    window.open(ultimoPedido.url, "_blank", "noopener,noreferrer");
    fecharDialogo(dialogResumo);
    mostrarToast("Abrindo o WhatsApp com seu pedido 💕");
  });
}

/* ---------- Menu, navegação e animações ---------- */
function configurarMenu() {
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menuMobile");
  const header = document.getElementById("header");
  if (!toggle || !menu) return;

  let aberto = false;

  const definirMenu = (estado) => {
    aberto = estado;
    menu.hidden = !aberto;
    toggle.setAttribute("aria-expanded", String(aberto));
    toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  };

  toggle.addEventListener("click", () => definirMenu(!aberto));

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => definirMenu(false));
  });

  document.addEventListener("click", (evento) => {
    if (aberto && header && !evento.target.closest(".site-header")) {
      definirMenu(false);
    }
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && aberto) {
      definirMenu(false);
      toggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (aberto && window.innerWidth > 960) definirMenu(false);
  });
}

function atualizarHeaderENav() {
  const header = document.getElementById("header");
  if (header) header.classList.toggle("rolou", window.scrollY > 8);

  const links = [...document.querySelectorAll(".nav-desktop .nav-link")];
  if (!links.length) return;

  const secoes = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const posicao = window.scrollY + 130;
  let atual = secoes[0] || null;

  secoes.forEach((secao) => {
    if (secao.offsetTop <= posicao) atual = secao;
  });

  links.forEach((link) => {
    link.classList.toggle("ativo", Boolean(atual) && link.getAttribute("href") === `#${atual.id}`);
  });
}

function configurarNav() {
  atualizarHeaderENav();
  let agendado = false;
  window.addEventListener("scroll", () => {
    if (agendado) return;
    agendado = true;
    window.requestAnimationFrame(() => {
      atualizarHeaderENav();
      agendado = false;
    });
  }, { passive: true });
}

function configurarReveal() {
  const elementos = document.querySelectorAll(".reveal");
  if (!elementos.length) return;

  const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || reduzMovimento) {
    elementos.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("is-visible");
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -36px 0px" });

  elementos.forEach((el) => observador.observe(el));
}

/* ---------- Galeria / vídeos ---------- */
function configurarGaleria() {
  const grade = document.getElementById("galeriaGrade");
  if (grade) {
    grade.addEventListener("click", (evento) => {
      const item = evento.target.closest(".galeria-item");
      if (!item || item.classList.contains("is-missing")) return;

      const caminho = item.dataset.full;
      if (!caminho || !lightbox || !lightboxImg) return;

      const imagem = item.querySelector("img");
      lightboxImg.hidden = false;
      lightboxImg.src = caminho;
      lightboxImg.alt = imagem ? imagem.alt : (item.dataset.legenda || "Foto da galeria");
      if (lightboxLegenda) lightboxLegenda.textContent = item.dataset.legenda || "";

      abrirDialogo(lightbox);
    });
  }

  if (lightboxImg) {
    lightboxImg.addEventListener("error", () => {
      lightboxImg.hidden = true;
      if (lightboxLegenda) {
        const caminho = lightboxImg.getAttribute("src") || "";
        lightboxLegenda.textContent = `Não encontramos esta imagem. Adicione o arquivo em ${caminho.replace(/^assets/, "/assets")}`;
      }
    });
  }

  document.querySelectorAll("[data-fechar-lightbox]").forEach((botao) => {
    botao.addEventListener("click", () => fecharDialogo(lightbox));
  });

  if (lightbox) {
    lightbox.addEventListener("click", (evento) => {
      if (evento.target === lightbox) fecharDialogo(lightbox);
    });
  }
}

function configurarVideos() {
  document.querySelectorAll(".video-wrap").forEach((wrap) => {
    const video = wrap.querySelector("video");
    if (!video) return;

    const falhar = () => wrap.classList.add("is-missing");
    video.addEventListener("error", falhar);
    video.querySelectorAll("source").forEach((source) => {
      source.addEventListener("error", falhar);
    });

    window.setTimeout(() => {
      if (video.networkState === 3) falhar();
    }, 2000);
  });
}

/* ---------- Diálogos: fechamento e limpeza ---------- */
function configurarDialogos() {
  document.querySelectorAll("[data-fechar-resumo]").forEach((botao) => {
    botao.addEventListener("click", () => fecharDialogo(dialogResumo));
  });

  if (dialogResumo) {
    dialogResumo.addEventListener("click", (evento) => {
      if (evento.target === dialogResumo) fecharDialogo(dialogResumo);
    });
  }

  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("close", () => {
      if (!document.querySelector("dialog[open]")) {
        document.body.classList.remove("sem-scroll");
      }
    });
  });
}

/* ---------- Inicialização ---------- */
function iniciar() {
  renderProdutos();
  configurarFiltros();
  carregarCarrinho();
  renderCarrinho();
  preencherSelectProdutos();
  atualizarResumo();
  configurarCarrinho();
  configurarArquivo();
  configurarFormulario();
  configurarEnvioPedido();
  configurarMenu();
  configurarNav();
  configurarReveal();
  configurarGaleria();
  configurarVideos();
  configurarDialogos();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar);
} else {
  iniciar();
}
