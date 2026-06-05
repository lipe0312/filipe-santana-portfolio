# 🚀 Master Plan: Portfólio Clean e Moderno

Este documento define a arquitetura, estratégia de conteúdo e fluxo de trabalho técnico para a construção de um portfólio de alto nível. O objetivo é criar uma vitrine profissional que não apenas liste habilidades, mas venda capacidade técnica e visão de futuro, utilizando as melhores práticas de desenvolvimento guiado por IA.

---

## 1. Filosofia de Design e Estrutura Visual

A estética do portfólio será guiada pelo minimalismo funcional e pela eficiência. O design não deve competir com a complexidade técnica dos projetos.

*   **Estética Bento Box (Bento UI):** Utilização de um layout em grade de blocos. Isso permite organizar informações muito densas e distintas (como um projeto de Machine Learning ao lado de um projeto de IoT) de maneira visualmente harmônica e fácil de implementar com CSS Grid.
*   **Regra dos 30 Segundos:** A navegação será instantânea, sem animações pesadas (como parallax excessivo) que atrasem o carregamento. O recrutador ou parceiro de negócios deve entender o seu valor na primeira rolagem de tela.
*   **Design System Consistente:** Definição prévia de um arquivo `global.css` com as variáveis de cor (ex: `--primary`, `--background`) e tipografia (Dark Mode preferencial com alto contraste). 

---

## 2. Estratégia de Conteúdo e Técnicas de Venda

O portfólio é uma isca para as oportunidades que você deseja atrair. Ele deve refletir liderança técnica e capacidade de resolver problemas complexos.

### O Posicionamento Estratégico
Em vez de se apresentar como um desenvolvedor genérico, o foco deve ser em engenharia de software avançada, pesquisa aplicada e inovação. A narrativa deve entrelaçar seu domínio em desenvolvimento de sistemas (Full-stack, C++, Python) com áreas de fronteira.

### A Regra de Ouro: Copy Primeiro, Design Depois
Conforme a premissa de estruturação, toda a escrita (copy) será definida antes de qualquer linha de código ou design de interface. Os textos serão armazenados em um arquivo `.md` futuro, servindo como o "esqueleto" da narrativa.

*   **A Headline (Acima da Dobra):** Uma frase de impacto que defina quem você é o que resolve. Precisa prender a atenção em menos de 5 segundos.
*   **A Seção "Sobre" (Conexão Humana):** Onde a personalidade entra. Mostrar a trajetória no bacharelado em Ciência da Computação, o papel como pesquisador, tutor e fundador de iniciativas (como a liga de Computação Quântica), gerando autoridade e afinidade.

### Qualidade > Quantidade: Os Estudos de Caso (Case Studies)
Abandone a simples lista de repositórios do GitHub. Os 4 a 6 melhores trabalhos devem ser apresentados como **Estudos de Caso** executivos.

**Estrutura de um Estudo de Caso de Alto Nível:**
1.  **O Desafio:** Qual era o problema real?
2.  **A Solução Técnica:** Qual arquitetura e tecnologias foram usadas?
3.  **Resultados/Status:** É um produto no ar? Um PoC para um Ideathon?


---

## 3. O Fluxo de Trabalho (Linha de Montagem com IA)

O uso de IA (como Claude, Cursor ou Copilot) deve ser cirúrgico. Você será o Diretor de Arte e Engenharia, não um mero digitador de código.

1.  **Regra Anti-Espaguete (`.cursorrules` / `.claudemd`):** A IA será instruída estritamente a **nunca "chumbar" (hardcode)** cores ou tamanhos absolutos. Tudo deve referenciar o `global.css`.
2.  **Construção Modular:** O código será gerado componente por componente. 
    *   *Comando 1:* "Crie o componente de Header usando Tailwind e as variáveis de cor do global CSS." -> Teste -> Aprove.
    *   *Comando 2:* "Agora, construa a seção Bento Grid para os cases." -> Teste -> Aprove.
3.  **Especificidade Matemática:** Os prompts devem ser absolutos. Ex: *"Ajuste o padding superior e inferior da grid em 32px e alinhe os títulos à esquerda, usando a fonte Lora."*

---

## 4. Estrutura de Pastas Local Recomendada

Para manter o fluxo organizado antes mesmo de abrir a IDE para o frontend, crie um diretório de "Workspace" no seu computador com a seguinte árvore:

```text
📁 portfolio-workspace/
│
├── 📁 01_strategy/
│   ├── portfolio-master-plan.md      # Este documento
│   └── copy-content.md               # O futuro doc com todos os textos e cases
│
├── 📁 02_design_assets/
│   ├── 📁 inspiration/               # Prints de sites (Godly, Lapa Ninja) e moodboards
│   ├── 📁 brand_system/              # Paleta de cores, tipografia e logo
│   ├── 📁 mockups_and_images/        # Imagens tratadas, recortes, mockups de telas/hardware
│   └── wireframe-bento.fig           # Arquivo do Figma com a estruturação visual
│
└── 📁 03_source_code/                #Passivel a mudança Repositório real da aplicação (Next.js/Vite/React)
    ├── 📁 public/                    # Assets exportados prontos para uso
    ├── 📁 src/                       # Código fonte gerado progressivamente
    ├── global.css                    # Variáveis de sistema ditando as regras de UI
    └── .cursorrules                  # Regras de comportamento para a IA
```
## 5. Referências e Inspirações Visuais

A curadoria de referências dita o nível de polimento e a identidade do projeto. Os links abaixo servem como o "Norte" para a estrutura, uso de espaços e apresentação narrativa do portfólio:

### Inspirações Principais (Estrutura e Estética Geral)
*   **[Matheus Scatolin](https://matheus-scatolin.vercel.app/):** 
    *   **O que abstrair:** Estrutura técnica e direta. Excelente referência de como um desenvolvedor moderno organiza seu ecossistema (tecnologias, contatos, projetos). Traz a estética de alta performance e objetividade que atrai recrutadores técnicos.
*   **[Marc Kuiper](https://www.marckuiper.com/?ref=minimal.gallery):** 
    *   **O que abstrair:** A excelência do minimalismo (chancelado pela *Minimal Gallery*). O maior aprendizado aqui é a coragem de usar o espaço em branco (*whitespace*). Não há ruído visual, caixas desnecessárias ou cores conflitantes. A tipografia forte e o contraste ditam o ritmo, provando que um design invisível é o mais sofisticado.

### Inspirações Secundárias (Estudos de Caso e Storytelling)
*   **[Tony Yan Chen - Uniball](https://tonyyanchen.com/uniball):** 
    *   **O que abstrair:** O padrão ouro para detalhar um projeto. Observe como a página conta uma história: apresenta a ideia (o produto), o contexto, imagens de altíssima qualidade integradas organicamente ao fundo, e a arquitetura da solução. É exatamente este nível de aprofundamento (e não apenas um botão para o GitHub) que deverá ser aplicado aos seus projetos de impacto, como o *Neural Pixel* ou o *Project ARES*.