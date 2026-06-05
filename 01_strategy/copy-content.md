# ✍️ Copywriter Master File: Portfólio Filipe Santana

> **INSTRUÇÕES DE PREENCHIMENTO:** 
> Substitua todo o texto entre colchetes `[ ... ]` com o conteúdo final. Este arquivo será a única fonte da verdade para a IA na hora de gerar o código do site. Siga a ordem exata de rolagem da tela (de cima para baixo).

---

## 1. TOP BAR (Navegação Fixa)
*   **Logo/Nome:** Filipe Santana (desenvolver identidade visual)
*   **Links:** Experience | Projects | About | Contact | Gallery

---

## 2. HERO SECTION (A Primeira Impressão)
*   **Headline Principal:** Building systems that think: from the edge device to the interface.
*   **Nome em Destaque:** Filipe Santana
*   **Sub-headline (Opcional):** Computer Science Researcher & Software Engineer based in Salvador, BA. 
*   **Call to Actions (Botões):**
    *   **CTA 1:** View Projects `(Âncora para #Projects)`
    *   **CTA 2:** How can I help `(Âncora para #diferencial na seção About)`
*   **Hero Inspiration:** [![Hero Image](<../02_design_assets/inspirations/Screenshot 2026-06-02 at 19.52.33.png>)]

---

## 3. PROJECTS (O Core do Portfólio - Bento UI)
> *Esta seção possui duas camadas: A visualização do Card (Bento Grid) e a visualização Detalhada (Modal/Página).*

### Projeto: PalmVein Vascular Authentication
**[ VISÃO CARD (Página Principal) ]**
* **Name:** PalmPay: Vascular Authentication
* **One Liner:** Touchless vascular edge authentication for flawless high security access and payments
* **Tech Stack (Quadradinhos):** `PyTorch` `ResNet` `Computer Vision` `Solana` `ArcFace`
* **Microinteração (Hover):** Youtube video thumbnail 

**[ VISÃO DETALHADA (Ao Clicar) ]**
* **Status Atual:** Proof of Concept
* **Data:** 2026
* **The Problem:** Standard physical payment and access systems rely on external tokens like cards or smartphones which are vulnerable to theft loss or battery failure Standard surface biometrics face severe spoofing vulnerabilities and raise critical privacy concerns regarding stored visual data
* **The Solution:** I engineered a biometric system utilizing near infrared light to map internal vein structures Deoxygenated hemoglobin absorbs specific wavelengths creating a pattern immune to external spoofing The architecture features a custom ResNet backbone trained via Deep Metric Learning and ArcFace loss producing a secure mathematical embedding I applied differential learning rates to adapt the neural network for diverse camera sensors achieving exceptional security margins Inference executes entirely on local edge hardware ensuring zero latency offline functionality and strict privacy Raw images are instantly purged from memory while the extracted embedding securely authorizes transactions
* **Images** Palm images to illustrate.
* **External Links:** Video Pitch https://youtu.be/oX49pjpXfts

### Projeto: VisoKey SmartLock
**[ VISÃO CARD (Página Principal) ]**
*   **Name:** VisoKey/SmartLock
*   **One liner:** Decentralized biometric access control using personal mobile devices for instant authentication.
*   **Tech Stack (Quadradinhos):** `React`, `Python`, `Flask`, `Supabase`, `ESP32`, `OpenCV`, `face_recognition`
*   **Microinteração (Hover):** A looping video demonstrating the seamless transition from the browser interface capturing a face to the ESP32 triggering a physical relay.

**[ VISÃO DETALHADA (Ao Clicar) ]**
*   **Status Atual:** Ongoing PoC
*   **Data:** 2025
*   **The Problem:** Traditional biometric systems require expensive proprietary hardware at every door. This creates massive capital expenditure barriers for universities and corporate environments. Furthermore, local storage of facial data on edge devices presents severe privacy risks and compliance challenges.
*   **The Solution:** I inverted the standard physical security paradigm via a Bring Your Own Device approach. The system delegates the camera hardware requirement directly to the user. Facial recognition runs exclusively through the user browser webcam on the frontend via a React application. This frontend captures the media and sends it to a Python Flask backend for deep metric learning extraction using ResNet architecture. To prevent spoofing, we implemented active liveness detection calculating the Eye Aspect Ratio in real time. The backend securely evaluates the embedding against Supabase PostgreSQL and triggers an ESP32 microcontroller over a continuous WebSocket connection. The ESP32 acts solely as a physical relay switch without storing any sensitive biometric data.
*   **External Links:** `GitHub Repository`, `Architecture Pitch` https://github.com/lipe0312/ufba-access-cam
*   **Video** Real video of me testing the system.

### Projeto: Brain Sphere
**[ VISÃO CARD (Página Principal) ]**
* **Name:** Brain Sphere
* **One liner:** Hybrid quantum edge architecture for federated learning in medical imaging.
* **Tech Stack (Quadradinhos):** `PyTorch`, `PennyLane QML`, `Flower(Federated Learning)`, `U Net 3D`
* **Microinteração (Hover):** Logo of the project.

**[ VISÃO DETALHADA (Ao Clicar) ]**
* **Status Atual:** Active Research
* **Data:** 2026
* **The Problem:** Medical imaging datasets are severely siloed by strict privacy constraints making centralized data collection illegal. Furthermore classic distributed edge models fail in these environments due to extreme client weight divergence and spatial representation collapse when exposed to highly asymmetrical localized hospital data.
* **The Solution:** We architected a decentralized hybrid learning pipeline. A classical spatial extractor feeds dense tensors into a 12 qubit parameterized quantum circuit using amplitude encoding. Operating via a Tree Tensor Network, the quantum layer acts as an extreme information bottleneck that stabilizes macroscopic topological intelligence while compressing network payloads by over 99 percent. To prevent distributed convergence failure, we engineered a custom adaptive proximal algorithm alongside a Byzantine robust median aggregation strategy that specifically routes complex tensor sorting to the CPU to bypass native acceleration hardware bugs.
* **External Links:** Repository available at https://github.com/BrainSphereLabs

### Projeto: Cycle Tracker
**[ VISÃO CARD (Página Principal) ]**
*   **Name:** Cycle Tracker
*   **One liner:** Full stack financial dashboard featuring interactive data visualization and strategic insights.
*   **Tech Stack (Quadradinhos):** `React`, `Tailwind CSS`, `Supabase`, `Recharts`
*   **Microinteração (Hover):** Looping preview showcasing Recharts animations and smooth monthly cycle transitions.

**[ VISÃO DETALHADA (Ao Clicar) ]**
*   **Status Atual:** In Development
*   **Data:** 2025
*   **The Problem:** Personal finance tools often lack clear visual feedback and fail to isolate specific billing cycles. Users struggle to analyze long term trends without feeling overwhelmed by cluttered interfaces and mixed transaction types.
*   **The Solution:** I built a modern web application utilizing React and Tailwind CSS for the frontend. The data layer relies on Supabase for secure data storage and real time state management via React Query mutations. To solve the visual clutter, I implemented Recharts to build an interactive Financial Intelligence widget featuring animated donut and vertical bar charts. The architecture separates income and expenses into distinct interfaces while maintaining a unified global cycle state context, allowing users to seamlessly transition between monthly snapshots without layout shifts.
*   **External Links:** [GitHub Repository, Live Demo](https://github.com/lipe0312/cycle-tracker)
---

### Projeto: OS Scheduler Simulator
**[ VISÃO CARD (Página Principal) ]**
* **Name:** OS Core Simulator
* **One Liner:** Visualizing complex CPU scheduling and memory paging algorithms interactively.
* **Tech Stack (Quadradinhos):** `Python`, `Streamlit`, `Pandas`
* **Microinteração (Hover):** Auto playing video showing the Gantt chart rendering dynamically alongside RAM frame allocations.

**[ VISÃO DETALHADA (Ao Clicar) ]**
* **Status Atual:** Academic 
* **Data:** Early 2026
* **The Problem:** Understanding operating system fundamentals is crucial for building performant software. Developers who only consume APIs often lack deep intuition regarding process execution or context switching costs. The challenge is that memory paging and CPU scheduling occur invisibly inside the machine, making these vital architectures abstract and difficult to internalize through pure theory alone.
* **The Solution:** I engineered a visual simulator to expose these hidden mechanics directly. The core Python engine executes complex scheduling logic like Shortest Job First, Earliest Deadline First, and a Completely Fair Scheduler variant. It calculates precise metrics for turnaround time and throughput while simultaneously tracking page faults through a virtual memory module. The Streamlit interface transforms these raw execution logs into interactive Gantt charts and RAM frame diagrams, allowing users to observe hardware resource management dynamically and bridge the gap between textbook concepts and actual system behavior.
* **External Links:** Source code available at https://github.com/lipe0312/Process-scheduler-OS

### Projeto: Pac-Man Way of the Katana
**[ VISÃO CARD (Página Principal) ]**
*   **Name:** Pac-Man Way of the Katana
*   **One-liner:** Teaching a game agent to think with Simulated Annealing.
*   **Tech Stack (Quadradinhos):** `Python`, `Simulated Annealing`, `Tkinter`, `Matplotlib`, `Jupyter`
*   **Microinteração (Hover):** Loop of the Pac-Man agent navigating mediumMaze autonomously in real time
**[ VISÃO DETALHADA (Ao Clicar) ]**
*   **Status Atual:** Academic
*   **Data:** 2026
*   **The Problem:** There is a widespread gap between people who claim to understand Artificial Intelligence and those who can actually implement the mechanics behind it from scratch. Most people interact with AI as a black box. This project was built to close that gap personally: to prove, at the implementation level, that I understand not just what a search algorithm does but why it works, when it breaks, and how to fix it when the environment itself fights back.
*   **The Solution:** I implemented Simulated Annealing directly inside the Berkeley CS188 Pac-Man framework, a codebase used by one of the most rigorous AI programs in the world. The agent builds candidate paths through a random walk with visited state control to eliminate cycles, evaluates each path via getCostOfActions with a 10000 penalty for non-goal paths, and applies the Metropolis acceptance criterion to probabilistically accept worse solutions at high temperatures, enabling escape from local minima as the system cools following T = T × alpha per iteration.
*   **External Links:** Academic submission, [MATA64 — Inteligência Artificial, UFBA](https://github.com/lipe0312/Pacman-Way-Of-The-Katana)

### Projeto: GestureAuth IoT
**[ VISÃO CARD (Página Principal) ]**
* **Name:** GestureAuth IoT
* **One liner:** Edge AI access control bypassing physical inputs via real time computer vision.
* **Tech Stack (Quadradinhos):** `Python` `OpenCV` `MediaPipe` `MQTT` `ESP32` `C++`
* **Microinteração (Hover):** Short video loop of a user raising fingers to input a credential, instantly actuating a green LED on a breadboard circuit.

**[ VISÃO DETALHADA (Ao Clicar) ]**
* **Status Atual:** PoC
* **Data:** 2025
* **The Problem:** Traditional physical access panels face hygiene and mechanical degradation vulnerabilities. Furthermore, relying entirely on cloud processing for computer vision introduces unacceptable network latency for physical access control loops.
* **The Solution:** We engineered a hybrid Natural User Interface combining edge AI and local IoT communication. A host client processes webcam streams using MediaPipe for hand landmark detection, translating raised digits into numeric values. After a brief software debounce stabilization window, the integer payload publishes asynchronously to a Mosquitto MQTT broker. An ESP32 microcontroller subscribes to this topic, executing local credential validation against the received sequence and actuating physical GPIO states accordingly. This architecture cleanly separates the heavy tensor operations on the host machine from the lightweight embedded validation logic.
* **External Links:** GitHub Repository, Demonstration Video https://github.com/lipe0312/mqtt_iot

### Projeto: UFBER
**[ VISÃO CARD (Página Principal) ]**
* **Name:** UFBER 
* **One liner:** Object oriented Java architecture mapping university ride logistics and polymorphic behavior.
* **Tech Stack (Quadradinhos):** `Java`, `OOP`, `Terminal UI`
* **Microinteração (Hover):** Terminal execution recording displaying dynamic class instantiation and polymorphic pricing calculations.

**[ VISÃO DETALHADA (Ao Clicar) ]**
* **Status Atual:** Academic 
* **Data:** 2024
* **The Problem:** Computer science undergraduates frequently struggle translating abstract object oriented paradigms into tangible business logic. Theoretical instruction alone lacks the structural complexity required to truly grasp encapsulation, inheritance, and interface contracts.
* **The Solution:** Engineered a local Java application to model a multitenant transport network. The architecture leverages an abstract core class to establish strict operational contracts for varied transport modalities. Derived classes implement specialized pricing algorithms to demonstrate polymorphic method resolution at runtime. State mutations are strictly governed through encapsulated accessors, ensuring data integrity and domain logic isolation across the system architecture.
* **External Links:** https://github.com/lipe0312/ufber-oop-java

## 4. EXPERIENCE (Experiência Profissional e Acadêmica)

### Experiência 1
*   **Role (Cargo):** Undergraduate Research Fellow — Embedded Systems & IoT
*   **Company/Institution:** Federal University of Bahia (UFBA)
*   **Location:** Salvador, BA
*   **Timeline:** 2025 — Present
*   **Brief Summary:** Conducting applied research at the intersection of embedded hardware and intelligent automation, designing systems that integrate microcontrollers, sensors, and computer vision into cohesive, production-grade solutions.
*   **Key Achievements:**
    *   Engineered hardware-software integration pipelines using ESP32 and industrial communication protocols, enabling real-time data capture and automated decision-making at the edge.
    *   Applied computer vision systems to automate visual inspection and environmental monitoring tasks, reducing the need for manual intervention in controlled environments.

---

### Experiência 2
*   **Role (Cargo):** Academic Teaching Assistant — Computer Networks & Assembly
*   **Company/Institution:** Federal University of Bahia (UFBA)
*   **Location:** Salvador, BA
*   **Timeline:** 2025 — 2026
*   **Brief Summary:** Selected to support undergraduate instruction across two technically demanding disciplines, bridging the gap between low-level architecture and modern networking concepts for a undergraduate cohort.
*   **Key Achievements:**
    *   Led practical sessions in Assembly programming, guiding students through memory management, register operations, and CPU-level logic with measurable improvements in class performance.
    *   Delivered support in Computer Networks, reinforcing protocol architecture, infrastructure design, and hands-on packet analysis for a cohort of 40+ students.

---

### Experiência 3
*   **Role (Cargo):** Systems Developer — Smart Lock Project
*   **Company/Institution:** Innovative Solutions Laboratory (UNIFACS)
*   **Location:** Salvador, BA
*   **Timeline:** 2025
*   **Brief Summary:** Leading the full technical development of an enterprise-grade physical access control system, architecting a dual-validation security pipeline that merges NFC hardware with real-time computer vision.
*   **Key Achievements:**
    *   Architected a two-factor authentication system combining mobile NFC reading and facial recognition via OpenCV, delivering a security standard comparable to commercial access control products.
    *   Implemented real-time MQTT communication between the management software and ESP32 microcontrollers over Wi-Fi, achieving sub-second lock actuation response times.
    *   Owned the full development lifecycle — from circuit design and firmware to the backend management interface — as the sole technical lead on the project.

---

### Experiência 4
*   **Role (Cargo):** Full Stack Developer — Freelance
*   **Company/Institution:** Independent Clients
*   **Location:** Remote
*   **Timeline:** 2024 — Present
*   **Brief Summary:** Designing and delivering high-performance web products for clients, with a focus on conversion-optimized interfaces and reliable data infrastructure.
*   **Key Achievements:**
    *   Built and shipped production web applications using React and Vite, achieving fast load times and fully responsive layouts across devices.
    *   Integrated MySQL database layers into client projects, ensuring structured, scalable data management for business-critical operations.

---


## 5. ABOUT ME (Conexão e Venda)

*   **Executive Summary:**
    *   I am a Computer Science researcher and software engineer driven by a single obsession: solving problems that sit at the edge of what is currently possible. My work does not live in one layer of the stack. I build firmware for microcontrollers, train computer vision models that run on edge hardware, and ship the full-stack web interfaces that make those systems actionable. That range is not accidental, it is the result of deliberately choosing the hardest problems across embedded systems, applied AI, and modern web development, and seeing each one through to a working solution.
    
    At UFBA, I conduct research in IoT and embedded systems as an undergraduate research fellow, while also serving as a teaching assistant in Computer Networks and Assembly. Beyond the academia, I lead the development of production-grade projects spanning biometric security, autonomous drones, and AI-powered SaaS platforms.

    I'm not looking to fit into a predefined role. I'm driven by the opportunity to build technology that creates meaningful impact.

*   **Core Technologies (Quadradinhos/Tags):**
    *   `Python` `C` `C++` `JavaScript` `Java` `React` `TypeScript` `Flask` `OpenCV` `YOLO` `ESP32`  `MQTT`  `Git` `Linux` `SQL` `Assembly` `TensorFlow` 

*   **Soft Skills (Quadradinhos/Tags):**
    *   `Technical Leadership` `Academic Research` `Strategic Thinking` `Sales` `Complex Problem Solving` `Hardware-Software Integration` `Cross-layer Systems Thinking` `Adaptability` 

### Diferencial `(ID: #diferencial - Destino do botão "How can I help")`
*   **Texto (Bloco Narrativo):**
    *   Here is what I actually bring to a team. I learn fast. When a project demands a framework I have never touched or a domain I have never worked in, I do not stall and I do not make excuses. I absorb it, apply it, and start delivering. That adaptability is what lets me move across layers most engineers never cross, from embedded firmware to applied AI to the web interface that ties it all together.
    *   But raw technical range means nothing if you cannot communicate it. I can stand in front of a room and translate a dense technical architecture into language a business leader, an investor, or a teammate actually understands. I have spent time teaching, presenting, and explaining complex systems to people who do not live in code, and I know how to bridge the gap between what is technically true and what a decision maker needs to hear.
    *   What truly defines how I work is simpler than any skill on a list. I do not quit. Hand me a problem that looks impossible and I will keep pushing until it is solved, no matter what it takes. I carry a relentless drive to grow and improve, but I carry it with humility and integrity. I am confident in what I can build, honest about what I am still learning, and reliable when it matters most.
    *   If you need someone who will own a hard problem from the first circuit to the final deployment and refuse to walk away until it works, that is exactly who I am.

### Beyond Code (Lado Humano)
*   **Texto:**
    *   When I step away from the screen, you will most likely find me close to the ocean. There is something about the coastline that genuinely recharges me, and living in Salvador means I would never trade that. I am an extrovert at heart. I love meeting new people and connecting easily, even if I might seem a little reserved at first. My favorite moments are simple ones: good food at a great restaurant, traveling somewhere new, and spending time with family.
    *   Sports are a big part of who I am. I am a proud and devoted Esporte Clube Bahia supporter, the kind who shows up to games and is fully convinced he brings luck. I balance watching basketball (a lifelong Steph Curry fan) and following the NFL for the sheer intensity of it, with actually playing: soccer and gym keep me disciplined and grounded, even if a good meal occasionally wins the negotiation.
    *   At the end of the day, I am someone who collects experiences more than things. New places, new people, new problems worth solving — that is what drives me both inside and outside the code.
---

## 6. CONTACT (Call to Action Final)
*   **Headline:** Let's build something that matters.
*   **Sub-headline:** Open to collaborations, engineering challenges, and opportunities where the problem is genuinely interesting. 
*   **Links Diretos:**
    *   [filipe.santana.0312@gmail.com]
    *   [https://www.linkedin.com/in/filipe-santana-home/]
    *   [https://github.com/lipe0312]

---

## 7. GALLERY (Estilo de Vida e Bastidores)
> *Inspirado na referência visual enviada (Screenshot 2026-06-02 at 20.06.16.jpg) - Scroll horizontal ou grid dinâmico com frases de impacto fluindo com as imagens.*

*   **Section Intro Text:** [PREENCHER AQUI: Frase curta e estilosa que acompanha as fotos. Ex: "— with a sharp eye for logic, a passion for deep tech, and an active life offline."]

**Imagens & Legendas (Captions on hover):**
*   **Imagem 1:** 
    *   **Caption:** [Ex: "Prototipando o Smart Lock BYOD tarde da noite."]
*   **Imagem 2:** 
    *   **Caption:** [Ex: "Apresentando a fundação da Liga de Computação Quântica."]
*   **Imagem 3:** 
    *   **Caption:** [Ex: "Onde a mágica acontece. Setup atualizado e pronto para treinar modelos."]
*   **Imagem 4:** 
    *   **Caption:** [Legenda correspondente]