# Bia & Berg Arquitetura — Documentação Técnica e Guia do Desenvolvedor

Esta documentação detalha a arquitetura, o funcionamento, a personalização e a manutenção do site **Bia & Berg Arquitetura**, migrado para o framework estático **Astro**.

---

## Sumário

1. [Visão Geral da Arquitetura](#1-visão-geral-da-arquitetura)
2. [Estrutura de Diretórios](#2-estrutura-de-diretórios)
3. [Design System & Estilos (CSS)](#3-design-system--estilos-css)
4. [Módulos JavaScript (Interações)](#4-módulos-javascript-interações)
5. [Guia Detalhado dos Componentes](#5-guia-detalhado-dos-componentes)
   - [BaseLayout.astro](#baselayoutastro)
   - [SiteHeader.astro](#siteheaderastro)
   - [HeroSection.astro](#herosectionastro)
   - [ProjectsSection.astro](#projectssectionastro)
   - [AboutSection.astro](#aboutsectionastro)
   - [ApproachSection.astro](#approachsectionastro)
   - [ProcessSection.astro](#processsectionastro)
   - [CaseStudiesSection.astro](#casestudiessectionastro)
   - [FAQSection.astro](#faqsectionastro)
   - [ContactSection.astro](#contactsectionastro)
   - [SiteFooter.astro](#sitefooterastro)
6. [Guia Prático de Customização](#6-guia-prático-de-customização)
   - [Como adicionar ou editar um Projeto no Portfólio](#como-adicionar-ou-editar-um-projeto-no-portfólio)
   - [Como substituir a foto de Bia (Beatriz)](#como-substituir-a-foto-de-bia-beatriz)
   - [Como atualizar o WhatsApp, E-mail e Redes Sociais](#como-atualizar-o-whatsapp-e-mail-e-redes-sociais)
   - [Como alterar Paleta de Cores e Tipografia](#como-alterar-paleta-de-cores-e-tipografia)
   - [Como integrar o Formulário de Contato com envio real](#como-integrar-o-formulário-de-contato-com-envio-real)
7. [Comandos do Projeto & Publicação (Deploy)](#7-comandos-do-projeto--publicação-deploy)

---

## 1. Visão Geral da Arquitetura

O projeto utiliza **Astro** como gerador de site estático (SSG). 

### Principais Benefícios:
- **Zero JS por padrão no HTML**: O HTML é gerado no momento do build, garantindo velocidade máxima de carregamento e pontuação máxima no Google PageSpeed/Lighthouse.
- **Isolamento de Estilos (Scoped CSS)**: Os estilos escritos dentro de `<style>` em cada componente afetam **apenas** aquele componente, impedindo que regras vazem ou quebrem outras seções.
- **JavaScript Modular Nativo**: As animações (reveal ao rolar a página, menu móvel, acordeão de perguntas, filtros de projetos e efeito spotlight no mouse) utilizam ES Modules puros, sem bibliotecas pesadas de terceiros.

---

## 2. Estrutura de Diretórios

```
site-final/
├── public/
│   └── assets/                     # Imagens, fotos dos projetos e scripts externos
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro        # Layout mestre (Head, SEO, body, overlay e scripts)
│   ├── components/                 # Seções modulares da página
│   │   ├── SiteHeader.astro
│   │   ├── HeroSection.astro
│   │   ├── ProjectsSection.astro
│   │   ├── AboutSection.astro
│   │   ├── ApproachSection.astro
│   │   ├── ProcessSection.astro
│   │   ├── CaseStudiesSection.astro
│   │   ├── FAQSection.astro
│   │   ├── ContactSection.astro
│   │   └── SiteFooter.astro
│   ├── styles/
│   │   ├── tokens.css              # Variáveis de cores, tipografia, raios e transições
│   │   ├── reset.css               # Reset de estilos e compatibilidade de navegadores
│   │   └── global.css              # Estilos base, botões compartilhados e animações reveal
│   ├── scripts/
│   │   ├── navigation.js           # Menu móvel e atalhos de navegação
│   │   ├── scroll-reveal.js        # Efeito de revelação ao rolar (IntersectionObserver)
│   │   ├── project-filter.js       # Filtro de categorias do portfólio
│   │   ├── stacked-cards.js        # Inicialização dos cards empilhados
│   │   ├── faq.js                  # Acordeão da seção de perguntas frequentes
│   │   ├── spotlight.js            # Efeito lanterna mineral reativo ao mouse
│   │   └── contact-form.js         # Interação de envio do formulário de contato
│   └── pages/
│       └── index.astro             # Página inicial (composição das seções)
├── astro.config.mjs                # Configurações do Astro
├── package.json                    # Dependências e scripts do projeto
└── DOCUMENTACAO.md                 # Este documento
```

---

## 3. Design System & Estilos (CSS)

A arquitetura de CSS é dividida em **Tokens Globais**, **Reset**, **Estilos Globais** e **Estilos de Componente (Escopo)**.

### 3.1 `tokens.css` (`src/styles/tokens.css`)
Centraliza as variáveis de CSS no `:root`:
- **Superfícies Escuras**: `--bg-dark (#12100E)`, `--surface-dark (#1A1714)`, `--surface-dark-2 (#24201B)`.
- **Superfícies Claras (Warm Paper)**: `--paper-bg (#F5F2EB)`, `--paper-surface (#EDE9E0)`, `--paper-card (#FAF8F4)`.
- **Destaques (Accents)**: `--accent-terracotta (#B65D38)`, `--accent-bronze (#C49F73)`.
- **Tipografia**:
  - Títulos: `--font-heading` (`'Inter Tight', sans-serif`).
  - Textos de leitura: `--font-body` (`'Inter', sans-serif`).
  - Metadados e números: `--font-mono` (`'IBM Plex Mono', monospace`).
- **Raios de Borda**: `--radius-sm (8px)`, `--radius-md (16px)`, `--radius-lg (24px)`, `--radius-xl (32px)`, `--radius-pill (9999px)`.

### 3.2 `reset.css` (`src/styles/reset.css`)
Normaliza o modelo de caixas (`box-sizing: border-box`), remove margens padrão de navegadores, habilita rolagem suave (`scroll-behavior: smooth`) e compensação de âncoras (`scroll-margin-top: 110px`).

### 3.3 `global.css` (`src/styles/global.css`)
Contém:
- `@import` das fontes do Google Fonts (`IBM Plex Mono`, `Inter Tight`, `Inter`).
- `.grain-overlay`: Textura de grão mineral estática via SVG fractal transparente fixo na tela.
- Classes dos botões globais: `.btn-primary` e `.btn-secondary`.
- Sistema de reveal: `.reveal-trigger`, `.reveal-fade`, `.reveal-para`, `.reveal-img`.

---

## 4. Módulos JavaScript (Interações)

Todos os scripts ficam em `src/scripts/` e são escritos em **ES Modules** nativos, exportando funções `init...()`.

| Arquivo | Função Exportada | O que faz |
| :--- | :--- | :--- |
| `navigation.js` | `initMobileMenu()` | Alterna a classe `.is-open` na gaveta móvel, bloqueia o scroll do `body` e fecha no botão, no link ou na tecla `Escape`. |
| `scroll-reveal.js` | `initRevealEngine()` | Observa elementos com classes de reveal usando `IntersectionObserver` e aplica `.is-revealed` com suporte a delay em cascata (`data-reveal-stagger`). |
| `project-filter.js` | `initProjectFilters()` | Filtra os itens do portfólio por `data-category` ao clicar nos botões `.filter-btn`. |
| `spotlight.js` | `initSpotlight()` | Em telas desktop (>1024px), monitora o movimento do mouse sobre cards com `data-spotlight` e atualiza as variáveis `--mouse-x` e `--mouse-y`. |
| `faq.js` | `initFaqAccordion()` | Alterna o item clicado com `.is-active` e fecha os demais itens automaticamente. |
| `contact-form.js` | `initContactForm()` | Bloqueia o reload da página (`e.preventDefault()`), simula estado de envio e exibe cartão de confirmação. |
| `stacked-cards.js` | `initStackedCards()` | Valida e indexa os cards com efeito de empilhamento sticky da seção monográfica. |

---

## 5. Guia Detalhado dos Componentes

### `BaseLayout.astro`
- **Arquivo**: `src/layouts/BaseLayout.astro`
- **Responsabilidade**: Renderiza a estrutura básica HTML (`<html>`, `<head>`, `<body>`), tags Open Graph para redes sociais, carrega o arquivo de ícones `/assets/iconify-icon.js` e inclui o script que inicializa os módulos JS.
- **Como alterar títulos e metadados**:
  Você pode passar propriedades personalizadas para o layout no topo de `index.astro`:
  ```astro
  <BaseLayout 
    title="Bia & Berg — Arquitetura Autoral"
    description="Projetos residenciais contemporâneos fundamentados em luz, matéria e intenção."
  >
  ```

---

### `SiteHeader.astro`
- **Arquivo**: `src/components/SiteHeader.astro`
- **Responsabilidade**: Barra de navegação flutuante com efeito vidro (backdrop-filter) e menu drawer responsivo para smartphones.
- **Elementos principais**:
  - Logo e Monograma: `<span class="brand-mark">RS</span>` e títulos Ribeiro & Sá.
  - Links de âncora: `#projetos`, `#sobre`, `#abordagem`, `#processo`, `#casos`, `#faq`.
  - Botão CTA: "Fale Conosco" apontando para `#contato`.
  - Gaveta móvel: `#mobile-nav` com links e e-mail de contato.

---

### `HeroSection.astro`
- **Arquivo**: `src/components/HeroSection.astro`
- **Responsabilidade**: Primeira impressão visual do site com imagem de impacto e painel inferior explicativo.
- **Elementos principais**:
  - Imagem de fundo: `/assets/hero-monolith.png` (carregada com `loading="eager"` e `fetchpriority="high"`).
  - Eyebrow badge: `Bia & Berg · Arquitetura Autoral`.
  - Título H1: `Espaços moldados por luz, matéria e intenção.`
  - Painel Warm Paper: Seção de transição bege com resumo da prática e dois mini-cards interativos de foco (`Residencial Autoral` e `Rigor Construtivo`).

---

### `ProjectsSection.astro`
- **Arquivo**: `src/components/ProjectsSection.astro`
- **Responsabilidade**: Galeria assimétrica de projetos selecionados com botões de filtro.
- **Estrutura de cada projeto**:
  ```html
  <article class="project-item" data-category="residencial">
    <div class="project-media-wrap">
      <span class="project-overlay-badge">01 · Residencial</span>
      <img src="/assets/project-monolithic.png" alt="..." class="project-media-img" loading="lazy" />
    </div>
    <div class="project-info-row">
      <h3 class="project-title">Casa Monólito</h3>
      <span class="project-meta-mono">2024 · Litoral Norte, SP</span>
    </div>
    <p class="project-desc-short">Descrição...</p>
    <a href="#casos" class="project-link-action">Ver Estudo de Caso ...</a>
  </article>
  ```

---

### `AboutSection.astro`
- **Arquivo**: `src/components/AboutSection.astro`
- **Responsabilidade**: Apresentação dos arquitetos sócios fundadores (Beatriz e Berg), manifesto do estúdio e declaração da metodologia compartilhada.
- **Cards dos Arquitetos**:
  - **Beatriz (Bia)**: Contém o quadro reservado `.photo-placeholder-box` com instruções para inserção da foto real.
  - **Berg**: Contém a foto real em `/assets/portrait-architect.jpg`.

---

### `ApproachSection.astro`
- **Arquivo**: `src/components/ApproachSection.astro`
- **Responsabilidade**: 4 pilares de concepção arquitetônica do estúdio.
  1. `01 / Escuta`: Compreender a Rotina Real
  2. `02 / Contexto`: Topografia & Clima
  3. `03 / Matéria`: Verdade dos Materiais
  4. `04 / Rigor`: Precisão do Detalhe

---

### `ProcessSection.astro`
- **Arquivo**: `src/components/ProcessSection.astro`
- **Responsabilidade**: Linha do tempo com as 6 etapas completas de desenvolvimento de um projeto, do briefing ao acompanhamento da obra:
  - 01: Conversa & Briefing (`Programa de Necessidades`)
  - 02: Levantamento & Análise (`Diagnóstico Técnico`)
  - 03: Conceito & Estudo Preliminar (`Caderno de Conceito`)
  - 04: Anteprojeto & Compatibilização (`Modelo 3D & Plantas Técnicas`)
  - 05: Detalhamento & Executivo (`Caderno Executivo de Obra`)
  - 06: Acompanhamento Técnico (`Conformidade com o Projeto`)

---

### `CaseStudiesSection.astro`
- **Arquivo**: `src/components/CaseStudiesSection.astro`
- **Responsabilidade**: Apresentação em profundidade com **Cards Empilhados Sticky (Sticky Stacking Scroll)**.
- **Como funciona o efeito**:
  Cada card possui `position: sticky; top: 12vh; min-height: 75vh; margin-bottom: 8vh;`. Conforme o usuário rola a página, o card atual fixa no topo e o próximo sobe por cima dele, criando o efeito de baralho ou dossiê de projetos.
- **Casos atuais**:
  1. Casa Monólito (São Sebastião, SP) — `/assets/case-void-house.webp`
  2. Pavilhão da Mata (Gonçalves, MG) — `/assets/case-moss-bunker.webp`
  3. Residência Horizonte (Brasília, DF) — `/assets/case-sky-cliff.webp`

---

### `FAQSection.astro`
- **Arquivo**: `src/components/FAQSection.astro`
- **Responsabilidade**: 4 perguntas frequentes sobre início de projeto, atuação nacional, tipos de entregáveis e engenharia integrada.
- **Funcionamento**: Apenas uma pergunta fica aberta por vez; o primeiro item já inicia com a classe `.is-active`.

---

### `ContactSection.astro`
- **Arquivo**: `src/components/ContactSection.astro`
- **Responsabilidade**: Chamada convidativa para início de projeto com canais diretos (WhatsApp, e-mail, Instagram) e formulário com campos essenciais.

---

### `SiteFooter.astro`
- **Arquivo**: `src/components/SiteFooter.astro`
- **Responsabilidade**: Rodapé autoral com monograma `RB`, colunas de navegação, contatos, links para publicações (ArchDaily, LinkedIn, Instagram) e linha de copyright.

---

## 6. Guia Prático de Customização

### Como adicionar ou editar um Projeto no Portfólio
1. Coloque a imagem do novo projeto na pasta `public/assets/` (ex: `meu-projeto.jpg`).
2. Abra `src/components/ProjectsSection.astro`.
3. Duplique um bloco `<article class="project-item">` existente:
   ```html
   <article class="project-item" data-category="residencial">
     <div class="project-media-wrap">
       <span class="project-overlay-badge">07 · Residencial</span>
       <img 
         src="/assets/meu-projeto.jpg" 
         alt="Nome do Projeto — Descrição da foto" 
         class="project-media-img" 
         loading="lazy" 
       />
     </div>
     <div class="project-info-row">
       <h3 class="project-title">Nome do Projeto</h3>
       <span class="project-meta-mono">2026 · Cidade, UF</span>
     </div>
     <p class="project-desc-short">
       Breve resumo conceitual do projeto e seus diferenciais.
     </p>
     <a href="#contato" class="project-link-action">
       Consultar Tipologia <iconify-icon icon="solar:arrow-right-linear"></iconify-icon>
     </a>
   </article>
   ```
4. Para a categoria, defina no atributo `data-category`:
   - `residencial` para Residencial.
   - `comercial` para Espaços Criativos / Comercial.
   *(Se quiser criar uma nova categoria, crie um novo botão `<button>` em `.filter-tabs` com `data-filter="sua-categoria"`)*.

---

### Como substituir a foto de Bia (Beatriz)
1. Salve a foto no formato quadrado 1:1 na pasta `public/assets/` com o nome `portrait-beatriz.jpg`.
2. Abra `src/components/AboutSection.astro`.
3. No Card de Beatriz (linhas 34 a 42), substitua o bloco `.photo-placeholder-box` por uma tag `<img>` padrão, idêntica à do Berg:
   ```html
   <!-- ANTES: -->
   <div class="architect-photo-frame">
     <div class="photo-placeholder-box">...</div>
   </div>

   <!-- DEPOIS: -->
   <div class="architect-photo-frame">
     <img 
       src="/assets/portrait-beatriz.jpg" 
       alt="Beatriz (Bia) — Arquiteta sócia fundadora" 
       class="architect-photo"
       loading="lazy"
     />
   </div>
   ```

---

### Como atualizar o WhatsApp, E-mail e Redes Sociais
Abra `src/components/ContactSection.astro` e procure por `.contact-direct-channels`:
- **WhatsApp**:
  Substitua o número `5511999999999` pelo número real (com DDI e DDD):
  ```html
  <a href="https://wa.me/5511988887777?text=Olá%20Bia%20e%20Berg..." target="_blank" rel="noopener noreferrer">
  ```
- **E-mail**:
  ```html
  <a href="mailto:seu-email@dominio.com.br">
  ```
- **Instagram**:
  Substitua `https://instagram.com/` pelo link completo do perfil oficial:
  ```html
  <a href="https://instagram.com/seu.perfil" target="_blank" rel="noopener noreferrer">
  ```
*(Lembre-se de atualizar os mesmos links no rodapé em `src/components/SiteFooter.astro` e no menu móvel em `src/components/SiteHeader.astro`)*.

---

### Como alterar Paleta de Cores e Tipografia
Todas as cores e fontes estão concentradas em `src/styles/tokens.css`.

- **Para alterar o tom de bronze/dourado**:
  Edite a variável `--accent-bronze`:
  ```css
  --accent-bronze: #C49F73; /* Altere para o seu código HEX */
  ```
- **Para alterar o tom terracota**:
  Edite a variável `--accent-terracotta`:
  ```css
  --accent-terracotta: #B65D38;
  ```
- **Para alterar as fontes**:
  Troque a URL do Google Fonts em `src/styles/global.css` e atualize os nomes das variáveis em `src/styles/tokens.css` (`--font-heading`, `--font-body`, `--font-mono`).

---

### Como integrar o Formulário de Contato com envio real
Atualmente, o formulário (`src/scripts/contact-form.js`) simula o envio com uma animação elegante de sucesso.

Para receber as mensagens por e-mail no mundo real sem precisar de servidor back-end, você pode usar um serviço gratuito como **Formspree** ou **Web3Forms**:

1. Crie uma conta gratuita no [Formspree.io](https://formspree.io) e crie um novo formulário.
2. Em `src/components/ContactSection.astro`, adicione o atributo `action` e `method="POST"` no `<form>`:
   ```html
   <form 
     class="contact-form" 
     id="contact-form" 
     action="https://formspree.io/f/SEU_CODIGO_AQUI" 
     method="POST"
   >
   ```
3. Garanta que cada `<input>`, `<select>` e `<textarea>` tenha o atributo `name` correspondente (ex: `name="nome"`, `name="telefone"`, `name="mensagem"`).

---

## 7. Comandos do Projeto & Publicação (Deploy)

### 7.1 Executar localmente (Modo Desenvolvimento)
```powershell
npm.cmd run dev
```
O Astro abrirá o servidor local em `http://localhost:4321/` com atualização automática ao salvar arquivos.

### 7.2 Compilar para produção (Build)
```powershell
npm.cmd run build
```
Gera a pasta otimizada `dist/`.

### 7.3 Publicação / Hospedagem (Deploy)
Como o projeto gera HTML estático de alto desempenho, ele pode ser hospedado gratuitamente e com 1 clique em qualquer plataforma moderna:

- **Vercel**: Conecte o repositório Git. A Vercel detecta automaticamente o Astro e publica o site.
- **Netlify**: Conecte o repositório Git, comando de build: `npm run build`, diretório de publicação: `dist`.
- **Cloudflare Pages**: Conecte o repositório, selecione o preset "Astro" e clique em Deploy.
- **Hospedagem Tradicional (cPanel / Hostinger / Locaweb)**: Basta rodar `npm.cmd run build` e enviar o conteúdo interno da pasta `dist/` para a pasta `public_html/` do seu servidor FTP.
