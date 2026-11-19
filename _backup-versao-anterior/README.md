# Estação L — Papelaria Personalizada 🌈

Landing page da **Estação L**, feita em HTML, CSS e JavaScript puros (sem build, sem dependências).
Basta abrir o `index.html` no navegador — funciona também por `file://`.

---

## Estrutura

```
estacaoL/
├─ index.html                  Página completa
├─ style.css                   Estilos (responsivo, paleta da logo)
├─ script.js                   Catálogo, carrinho, formulário e WhatsApp
├─ assets/
│  ├─ logo-estacao-l.png       Logo oficial (usada no header, hero e footer)
│  ├─ pattern-papel.svg        Textura de papel do fundo
│  ├─ fotos/                   Fotos da galeria e dos produtos
│  └─ videos/                  Vídeos da galeria
├─ images/logo.jpeg            Logo original (fonte)
└─ _backup-versao-anterior/    Rascunho antigo preservado
```

O site abre direto pelo `index.html`. Para servir localmente:

```bash
python -m http.server 4173
# http://127.0.0.1:4173/
```

---

## 1. Fotos da galeria — `assets/fotos/`

Salve as fotos com **exatamente** estes nomes (JPG, de preferência 1200 px no lado maior, até ~400 KB cada):

| Arquivo | Tema / legenda |
|---|---|
| `foto-01.jpg` | Photocards da FreenBecky (destaque grande) |
| `foto-02.jpg` | Chaveiro capa de livro — GAP |
| `foto-03.jpg` | Chaveiro capa de livro — The Secret of Us |
| `foto-04.jpg` | Chaveiro capa de livro — Delilah Green |
| `foto-05.jpg` | Coleção Velvet Dream |
| `foto-06.jpg` | Kits MilkLove (destaque grande) |
| `foto-07.jpg` | Photobooth personalizado |
| `foto-08.jpg` | Photocards personalizados |
| `foto-09.jpg` | Chaveiros acrílicos |
| `foto-10.jpg` | Botões e ímãs |
| `foto-11.jpg` | Credenciais de fã |
| `foto-12.jpg` | Pedidos com carinho |

Enquanto um arquivo não existir, o card mostra um **placeholder bonito** com o caminho exato
(`/assets/fotos/foto-XX.jpg`) e o layout continua intacto.

## 2. Fotos dos produtos — `assets/fotos/`

| Arquivo | Produto |
|---|---|
| `produto-photocard.jpg` | Photocard |
| `produto-polaroid.jpg` | Polaroid |
| `produto-photobooth.jpg` | Photobooth / Tira |
| `produto-botao.jpg` | Botão / Button |
| `produto-chaveiro.jpg` | Chaveiros (botão, acrílico, photobooth e capa de livro) |
| `produto-ima.jpg` | Ímã de geladeira / Polaroid ímã |
| `produto-caneca.jpg` | Caneca |
| `produto-marcapagina.jpg` | Marca-página |
| `produto-ecobag.jpg` | Ecobag 30x25 cm |
| `produto-credencial.jpg` | Credencial de fã |
| `produto-kit.jpg` | Kits Lite, Plus, Premium e VIP |

Proporção ideal: **4:3** (ex.: 800×600). As imagens são recortadas com `object-fit: cover`.

## 3. Vídeos — `assets/videos/`

| Arquivo | Legenda |
|---|---|
| `video-01.mp4` | Bastidores |
| `video-02.mp4` | Detalhes dos chaveiros |
| `video-03.mp4` | Novidades |

Formato **MP4 (H.264 + AAC)**, proporção vertical **4:5** (ex.: 720×900), até ~8 MB cada.
O `poster` de cada vídeo usa `foto-01.jpg`, `foto-02.jpg` e `foto-03.jpg`.
Se o vídeo não existir, o card mostra o placeholder com o caminho correto.

Vídeos do WhatsApp/Instagram costumam vir em `.mp4`; se estiver em outro formato, converta antes.

---

## Como atualizar o conteúdo

### Preços e produtos
Tudo fica em `script.js`, no array `products` (topo do arquivo):

- `preco`: valor em **centavos** usado no carrinho e no resumo (ex.: `400` = R$ 4,00).
- `precoLabel`: texto exibido no card (ex.: `"R$ 4 a R$ 8"`).
- `aPartir`: mostra a etiqueta "a partir de" e o aviso no carrinho.
- Itens com faixa de preço usam o **valor base** no cálculo; o valor final é confirmado no WhatsApp.

Para adicionar um produto, copie um objeto do array e informe `id`, `nome`, `categoria`
(`papelaria`, `chaveiros`, `botoes`, `presentes`, `kits`), `preco`, `precoLabel`, `foto`, `emoji` e `desc`.
O card, o filtro e o `<select>` do formulário são gerados automaticamente.

### Dados que faltam
Os pontos marcados com **[PREENCHER]** no site (composição dos kits, prazo de envio, frete)
devem ser substituídos pelos dados reais. Procure por `PREENCHER` em `index.html` e `script.js`.

### Desconto
O desconto de **20%** é aplicado automaticamente quando o total de unidades passa de 5
(ou seja, **6 ou mais**). A regra está em `LIMITE_DESCONTO` no `script.js`.

### WhatsApp e Instagram
- WhatsApp: `5511922149329` (constante `WHATSAPP_NUMERO` no `script.js` e links no `index.html`).
- Instagram: <https://www.instagram.com/estacaol_/>

### SEO / compartilhamento
Ao publicar:

- troque `og:image` e `twitter:image` por uma **URL absoluta**
  (ex.: `https://seudominio.com/assets/logo-estacao-l.png`), porque redes sociais não resolvem caminhos relativos;
- descomente e preencha a tag `<link rel="canonical">` no `<head>` com a URL final do site.

O restante (`title`, `description`, `og:title`, `og:description`, `theme-color` e o JSON-LD)
já está configurado.

---

## Como o pedido funciona

1. O cliente monta a sacolinha no catálogo (ou usa o formulário).
2. No formulário, preenche nome, WhatsApp, produto, quantidade, pagamento, entrega e observações.
3. O site mostra um **resumo na tela** antes de enviar.
4. Ao confirmar, abre o WhatsApp com a mensagem já formatada:

   > Oi, Estação L! 🌈 Quero pedir: [produto] x [qtd] — Nome: [nome] — Pagamento: [pagamento] — Entrega: [entrega] — Obs: [obs]

5. A foto de referência **não é enviada pelo site** (navegadores não permitem). O nome do arquivo
   vai na mensagem e o cliente anexa a imagem na conversa do WhatsApp.

O carrinho fica salvo no `localStorage` do navegador.

---

## Checklist rápido antes de publicar

- [ ] Fotos `foto-01.jpg` … `foto-12.jpg` adicionadas
- [ ] Fotos `produto-*.jpg` adicionadas
- [ ] Vídeos `video-01.mp4` … `video-03.mp4` adicionados
- [ ] Todos os `[PREENCHER]` substituídos
- [ ] Número de WhatsApp e link do Instagram conferidos
- [ ] `og:image` com URL absoluta e `<link rel="canonical">` preenchido
- [ ] Teste no celular: menu, carrinho, formulário e botões de WhatsApp
