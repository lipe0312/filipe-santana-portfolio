# 🏗️ Arquitetura e Modelagem de Entidades do Portfólio

Este documento condensa a estrutura visual, o fluxo de navegação e o modelo de dados (entidades) para a construção do portfólio. O sistema segue uma arquitetura SPA (Single Page Application) focada em conversão, carregamento rápido e navegação linear via scroll, utilizando a estética Bento UI.

---

## 1. Fluxo de UI/UX e Navegação Principal

A aplicação foi desenhada para prender a atenção nos primeiros segundos e guiar o usuário de forma fluida através da narrativa profissional.

### Top Bar (Navegação Fixa)
*   **Esquerda:** "Filipe Santana" (Logotipo em texto minimalista ou Avatar).
*   **Direita:** Links âncora responsivos na ordem: `Experience` | `Projects` | `About` | `Contact` | `Gallery`.

### Hero Section (Primeira Impressão)
*   **Headline:** Frase de efeito forte (Ex: *Building tools for solving complex problems*).
*   **Identidade:** Destaque tipográfico para o nome Filipe Santana.
*   **CTAs (Call to Actions):**
    *   `[ View Experience ]` -> Âncora suave para a seção de Experiências.
    *   `[ How can I help ]` -> Âncora direta para o texto de Diferencial na seção About.

---

## 2. Modelagem de Entidades (Data Structure)

O conteúdo do site será alimentado pelas seguintes estruturas de dados. Essa modelagem garante que a IA ou o banco de dados (JSON/Markdown) saiba exatamente o que renderizar.

### 2.1. Entidade: Experience
*   **Role:** Cargo ou função (Ex: Pesquisador de Graduação, Desenvolvedor de Sistemas).
*   **Company/Institution:** Para quem o projeto foi feito (Ex: UFBA, UNIFACS, Cliente Privado).
*   **Location:** Local ou modalidade (Ex: Salvador, BA / Remoto).
*   **Timeline:** `[Data Início] - [Data Fim / Presente]`.
*   **Brief Summary:** Resumo executivo de 1 a 2 linhas sobre o contexto corporativo/acadêmico.
*   **Key Achievements:** Lista (bullet points) focada em métricas e resultados de impacto, não apenas nas tarefas realizadas.

### 2.2. Entidade: Projects (O Core do Portfólio)
Os projetos seguem um modelo de Bento Box na visualização inicial e expandem para estudos de caso detalhados.

**Visualização na Página Principal (Bento Cards):**
*   **Name:** Título do projeto (Ex: *Neural Pixel*, *Smart Lock BYOD*, *Project ARES*).
*   **One-liner:** Pitch de uma frase resumindo a solução.
*   **Tech Stack:** Quadradinhos/Tags visuais (Ex: `Python`, `ESP32`, `Solana`, `C++`).
*   **Microinteração Hover:** Imagem de alta qualidade ou vídeo mudo em *loop* do projeto funcionando, que aparece no fundo da tela (ou do card) apenas quando o mouse repousa sobre ele.

**Visualização Detalhada (Página Explicativa / Modal Clean):**
*   **Status Atual:** Em desenvolvimento, PoC, Concluído.
*   **Data:** Período de execução.
*   **Hero Media:** Mídia responsiva principal (imagem, GIF ou vídeo).
*   **The Problem:** O desafio real que justificou a criação do software/hardware.
*   **The Solution:** Arquitetura técnica (Ex: Como o backend em Python se comunica com o frontend validando biometria na câmera do navegador do usuário).
*   **External Links:** Botões minimalistas para `GitHub`, `Deploy`, `LinkedIn Post` ou `YouTube`.

### 2.3. Entidade: About Me
Seção estratégica dividida em subcomponentes técnicos e humanos para criar afinidade e vender autoridade.

*   **Executive Summary:** Resumo da trajetória de carreira (focado no 5º semestre de Ciência da Computação, projetos acadêmicos e visão de futuro).
*   **Core Technologies (Skills):** Renderizados como **quadradinhos/tags** (Ex: `React`, `TypeScript`, `Assembly`, `OpenCV`).
*   **Soft Skills:** Renderizados como **quadradinhos/tags**, no mesmo formato visual das tecnologias (Ex: `Liderança Técnica`, `Pensamento Crítico`, `Resolução de Problemas`).
*   **Diferencial (O alvo do "How can I help"):** Um **bloco de texto** curto, narrativo e persuasivo. É aqui que você explica a sua intersecção única de habilidades (Ex: como a sua base matemática para Computação Quântica se une à sua capacidade de construir hardware físico e interfaces web funcionais, algo que poucos fazem).
*   **Beyond Code:** Ponto de conexão humana. (Ex: interesse em aviação/flight sim de alta fidelidade e rotina de hipertrofia).

### 2.4. Entidade: Gallery
Grid de imagens responsivas que humanizam o perfil, mostrando bastidores da jornada.
*   **Mídia:** Imagem ou vídeo (Ex: soldando uma placa, protoboard, apresentando um pitch).
*   **Interação:** Efeito de "zoom on hover" nas fotos.
*   **Caption:** Legenda descritiva que aparece dinamicamente ao passar o mouse.

---

## 3. Diretrizes Técnicas de Construção
*   **Copy-First:** Todo o conteúdo acima será preenchido antes da primeira linha de código ser escrita.
*   **Design System:** Variáveis de cor, tipografia e espaçamento definidas em um `global.css`. O design será construído sem uso de valores "chumbados" (hardcoded).
*   **Modularidade:** A interface será gerada e testada seção por seção (Componente Top Bar -> Hero -> Bento Grid de Projetos -> etc.), garantindo estabilidade no código.