# Estação L — Papelaria Personalizada 🌈

Landing page + catálogo de produtos da **Estação L**, papelaria personalizada do universo sáfico — de fã para fã.

Produtos como photocards, polaroids, chaveiros, botões, canecas, credenciais e kits de fã, com pedido finalizado direto no WhatsApp.

> **Site:** adicione aqui a URL final quando publicar
> **Instagram:** [@estacaol_](https://www.instagram.com/estacaol_/)
> **WhatsApp:** [(11) 92214-9329](https://wa.me/5511922149329)

---

## ✨ O que o site faz

- **Hero + apresentação** da marca Estação L
- **Catálogo de produtos** com preços, categorias e filtros
- **Carrinho de compras** com subtotal, desconto de 20% e barra de progresso
- **Formulário de pedido** que monta a mensagem pronta e abre no WhatsApp
- **Galeria** com fotos reais dos produtos + lightbox
- **Seção "Como Pedir"** explicando o fluxo: escolher → personalizar → enviar → receber
- **Layout responsivo** — mobile, tablet e desktop
- **SEO básico** — meta tags, Open Graph / Twitter Card e dados estruturados (`Store` / Schema.org)
- **Acessibilidade** — link "Pular para o conteúdo", navegação por teclado, `aria-labels` e textos alternativos

## 🛍️ Produtos

Photocards, polaroids, chaveiros (capa de livro, acrílico, etc.), botões / pins, canecas, credenciais, posters, kits de fã e produtos personalizados sob encomenda.

- **Faixa de preço no site:** R$ 3 a R$ 99,90
- **Produção:** 3–5 dias
- **Envio:** para todo o Brasil
- **Pagamento:** Pix, Cartão, Boleto

> O valor final, frete e personalização são combinados no WhatsApp — o total do carrinho é um valor de referência.

## 🛠️ Tecnologias

- **HTML** — estrutura semântica
- **CSS** — `style.css` (layout, responsivo, tema claro)
- **JavaScript** — `script.js` (catálogo, carrinho, formulário, galeria, lightbox, toast)
- **Fontes:** Baloo 2 + Nunito (Google Fonts)
- Sem build, sem framework, sem backend — só abrir o `index.html`

## 📁 Estrutura do projeto

```text
.
├── index.html              # Página principal
├── style.css               # Estilos
├── script.js               # Lógica do catálogo, carrinho e pedido
├── README.md               # Este arquivo
└── assets/
    ├── logo-estacao-l.png  # Logo da Estação L
    ├── foto-01.jpg         # Fotos da galeria / produtos
    ├── foto-02.jpg
    └── ...                 # Demais fotos (.jpg) e vídeos (.mp4)
```

> Os arquivos de mídia ficam em `assets/`. Fotos mantêm a extensão `.jpg` e vídeos mantêm `.mp4`, conforme o padrão do projeto.

## 🚀 Como rodar

### Opção 1 — Abrir direto

1. Baixe / clone este repositório
2. Abra o arquivo `index.html` no navegador

### Opção 2 — Servidor local (recomendado)

```bash
# Com Python
python -m http.server 8000

# Com Node
npx serve .
```

Depois acesse: `http://localhost:8000`

### Opção 3 — Publicar grátis

Pode publicar no **GitHub Pages**, **Netlify** ou **Vercel** — é só subir a pasta do projeto, sem nenhuma configuração de build.

## 🧭 Como pedir pelo site

1. A cliente escolhe os produtos no catálogo
2. Adiciona no carrinho
3. Preenche o formulário de pedido (nome, produto, personalização, referência)
4. Confere o resumo do pedido
5. Clica em **"Enviar no WhatsApp"** — a mensagem já vai pronta
6. Anexa a referência direto no WhatsApp

## 🎨 Identidade visual

- **Fundo:** branco suave (não branco puro)
- **Cor principal:** rosa `#FF65C3`
- **Destaques:** roxo + arco-íris
- **Fontes:** Baloo 2 (títulos) + Nunito (texto)
- **Tom:** leve, afetivo, de fã para fã

## 📝 Como atualizar produtos

1. Abra `script.js`
2. Localize a lista de produtos do catálogo
3. Edite nome, preço, categoria, descrição e foto
4. Para trocar uma foto, substitua o arquivo em `assets/` mantendo o mesmo nome, ou atualize o caminho no produto

Para trocar o WhatsApp, procure por `5511922149329` em `index.html` e `script.js` e substitua pelo novo número.

## 🤝 Créditos

**Desenvolvido por MauricioZavarce**

- GitHub: [@MauricioZavarce](https://github.com/MauricioZavarce)
- Instagram: [@mauriciozavarce.dev](https://www.instagram.com/mauriciozavarce.dev)

**Cliente / marca:** Estação L — Papelaria Personalizada ([@estacaol_](https://www.instagram.com/estacaol_/))

## 📄 Licença

Projeto feito para a Estação L. Uso do código, layout, textos e imagens deve ser autorizado pela marca.

---

Feito com amor, de fã para fã 🌈
