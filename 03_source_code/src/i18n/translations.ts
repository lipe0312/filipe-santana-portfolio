export type TranslationKey =
  // NAV
  | "nav.projects"
  | "nav.experience"
  | "nav.about"
  | "nav.gallery"
  | "nav.contact"
  // HERO
  | "hero.headline"
  | "hero.subtitle.role"
  | "hero.cta.projects"
  | "hero.cta.help"
  // PROJECTS section labels
  | "projects.label"
  | "projects.heading"
  // MODAL labels
  | "modal.problem"
  | "modal.solution"
  | "modal.links"
  // STATUS translations
  | "status.poc"
  | "status.ongoingPoc"
  | "status.activeResearch"
  | "status.inDevelopment"
  | "status.academic"
  | "status.pocsimple"
  | "status.operational"
  // PROJECT data
  | "projects.palmpay.oneLiner"
  | "projects.palmpay.problem"
  | "projects.palmpay.solution"
  | "projects.visokey.oneLiner"
  | "projects.visokey.problem"
  | "projects.visokey.solution"
  | "projects.brainsphere.oneLiner"
  | "projects.brainsphere.problem"
  | "projects.brainsphere.solution"
  | "projects.cycletracker.oneLiner"
  | "projects.cycletracker.problem"
  | "projects.cycletracker.solution"
  | "projects.oscore.oneLiner"
  | "projects.oscore.problem"
  | "projects.oscore.solution"
  | "projects.pacman.oneLiner"
  | "projects.pacman.problem"
  | "projects.pacman.solution"
  | "projects.gestureauth.oneLiner"
  | "projects.gestureauth.problem"
  | "projects.gestureauth.solution"
  | "projects.ufber.oneLiner"
  | "projects.ufber.problem"
  | "projects.ufber.solution"
  // EXPERIENCE
  | "experience.heading"
  | "experience.role1.role"
  | "experience.role1.company"
  | "experience.role1.location"
  | "experience.role1.timeline"
  | "experience.role1.summary"
  | "experience.role1.a1"
  | "experience.role1.a2"
  | "experience.role2.role"
  | "experience.role2.company"
  | "experience.role2.location"
  | "experience.role2.timeline"
  | "experience.role2.summary"
  | "experience.role2.a1"
  | "experience.role2.a2"
  | "experience.role3.role"
  | "experience.role3.company"
  | "experience.role3.location"
  | "experience.role3.timeline"
  | "experience.role3.summary"
  | "experience.role3.a1"
  | "experience.role3.a2"
  | "experience.role3.a3"
  | "experience.role4.role"
  | "experience.role4.company"
  | "experience.role4.location"
  | "experience.role4.timeline"
  | "experience.role4.summary"
  | "experience.role4.a1"
  | "experience.role4.a2"
  // ABOUT
  | "about.label"
  | "about.heading"
  | "about.counter.projects"
  | "about.counter.technologies"
  | "about.counter.roles"
  | "about.summary.p1"
  | "about.summary.p2"
  | "about.tech.heading"
  | "about.skills.heading"
  | "about.skill.leadership"
  | "about.skill.research"
  | "about.skill.strategic"
  | "about.skill.sales"
  | "about.skill.problemSolving"
  | "about.skill.hwsw"
  | "about.skill.crossLayer"
  | "about.skill.adaptability"
  | "about.diferencial.heading"
  | "about.diferencial.p1.a"
  | "about.diferencial.p1.b"
  | "about.diferencial.p1.c"
  | "about.diferencial.p1.d"
  | "about.diferencial.p1.e"
  | "about.diferencial.p1.f"
  | "about.diferencial.p1.g"
  | "about.diferencial.p2.a"
  | "about.diferencial.p2.b"
  | "about.diferencial.p2.c"
  | "about.diferencial.p2.d"
  | "about.diferencial.p3.a"
  | "about.diferencial.p3.b"
  | "about.diferencial.p3.c"
  | "about.diferencial.p3.d"
  | "about.diferencial.p3.e"
  | "about.diferencial.p3.f"
  | "about.diferencial.p4.a"
  | "about.diferencial.p4.b"
  | "about.diferencial.p4.c"
  | "about.diferencial.p4.d"
  | "about.diferencial.p4.e"
  | "about.beyond.heading"
  | "about.beyond.p1"
  | "about.beyond.p2"
  | "about.beyond.p3"
  // CONTACT
  | "contact.heading"
  | "contact.subheading";

const dict: Record<string, Record<TranslationKey, string>> = {
  en: {
    // NAV
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.about": "About",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",
    // HERO
    "hero.headline": "Building systems that think: from the edge device to the interface.",
    "hero.subtitle.role": "Computer Science Researcher & Software Engineer based in Salvador, BA.",
    "hero.cta.projects": "View Projects",
    "hero.cta.help": "How can I help",
    // PROJECTS section labels
    "projects.label": "Selected Work",
    "projects.heading": "Projects",
    // MODAL labels
    "modal.problem": "The Problem",
    "modal.solution": "The Solution",
    "modal.links": "Links",
    // STATUS
    "status.poc": "Proof of Concept",
    "status.ongoingPoc": "Ongoing PoC",
    "status.activeResearch": "Active Research",
    "status.inDevelopment": "In Development",
    "status.academic": "Academic",
    "status.pocsimple": "PoC",
    "status.operational": "Operational",
    // PROJECT data
    "projects.palmpay.oneLiner": "Touchless vascular edge authentication for flawless high security access and payments",
    "projects.palmpay.problem": "Standard physical payment and access systems rely on external tokens like cards or smartphones which are vulnerable to theft loss or battery failure. Standard surface biometrics face severe spoofing vulnerabilities and raise critical privacy concerns regarding stored visual data.",
    "projects.palmpay.solution": "I engineered a biometric system utilizing near infrared light to map internal vein structures. Deoxygenated hemoglobin absorbs specific wavelengths creating a pattern immune to external spoofing. The architecture features a custom ResNet backbone trained via Deep Metric Learning and ArcFace loss producing a secure mathematical embedding. I applied differential learning rates to adapt the neural network for diverse camera sensors achieving exceptional security margins. Inference executes entirely on local edge hardware ensuring zero latency offline functionality and strict privacy. Raw images are instantly purged from memory while the extracted embedding securely authorizes transactions.",
    "projects.visokey.oneLiner": "Decentralized biometric access control using personal mobile devices for instant authentication.",
    "projects.visokey.problem": "Traditional biometric systems require expensive proprietary hardware at every door. This creates massive capital expenditure barriers for universities and corporate environments. Furthermore, local storage of facial data on edge devices presents severe privacy risks and compliance challenges.",
    "projects.visokey.solution": "I inverted the standard physical security paradigm via a Bring Your Own Device approach. The system delegates the camera hardware requirement directly to the user. Facial recognition runs exclusively through the user browser webcam on the frontend via a React application. This frontend captures the media and sends it to a Python Flask backend for deep metric learning extraction using ResNet architecture. To prevent spoofing, we implemented active liveness detection calculating the Eye Aspect Ratio in real time. The backend securely evaluates the embedding against Supabase PostgreSQL and triggers an ESP32 microcontroller over a continuous WebSocket connection. The ESP32 acts solely as a physical relay switch without storing any sensitive biometric data.",
    "projects.brainsphere.oneLiner": "Hybrid quantum edge architecture for federated learning in medical imaging.",
    "projects.brainsphere.problem": "Medical imaging datasets are severely siloed by strict privacy constraints making centralized data collection illegal. Furthermore classic distributed edge models fail in these environments due to extreme client weight divergence and spatial representation collapse when exposed to highly asymmetrical localized hospital data.",
    "projects.brainsphere.solution": "We architected a decentralized hybrid learning pipeline. A classical spatial extractor feeds dense tensors into a 12 qubit parameterized quantum circuit using amplitude encoding. Operating via a Tree Tensor Network, the quantum layer acts as an extreme information bottleneck that stabilizes macroscopic topological intelligence while compressing network payloads by over 99 percent. To prevent distributed convergence failure, we engineered a custom adaptive proximal algorithm alongside a Byzantine robust median aggregation strategy that specifically routes complex tensor sorting to the CPU to bypass native acceleration hardware bugs.",
    "projects.cycletracker.oneLiner": "Full stack financial dashboard featuring interactive data visualization and strategic insights.",
    "projects.cycletracker.problem": "Personal finance tools often lack clear visual feedback and fail to isolate specific billing cycles. Users struggle to analyze long term trends without feeling overwhelmed by cluttered interfaces and mixed transaction types.",
    "projects.cycletracker.solution": "I built a modern web application utilizing React and Tailwind CSS for the frontend. The data layer relies on Supabase for secure data storage and real time state management via React Query mutations. To solve the visual clutter, I implemented Recharts to build an interactive Financial Intelligence widget featuring animated donut and vertical bar charts. The architecture separates income and expenses into distinct interfaces while maintaining a unified global cycle state context, allowing users to seamlessly transition between monthly snapshots without layout shifts.",
    "projects.oscore.oneLiner": "Visualizing complex CPU scheduling and memory paging algorithms interactively.",
    "projects.oscore.problem": "Understanding operating system fundamentals is crucial for building performant software. Developers who only consume APIs often lack deep intuition regarding process execution or context switching costs. The challenge is that memory paging and CPU scheduling occur invisibly inside the machine, making these vital architectures abstract and difficult to internalize through pure theory alone.",
    "projects.oscore.solution": "I engineered a visual simulator to expose these hidden mechanics directly. The core Python engine executes complex scheduling logic like Shortest Job First, Earliest Deadline First, and a Completely Fair Scheduler variant. It calculates precise metrics for turnaround time and throughput while simultaneously tracking page faults through a virtual memory module. The Streamlit interface transforms these raw execution logs into interactive Gantt charts and RAM frame diagrams, allowing users to observe hardware resource management dynamically and bridge the gap between textbook concepts and actual system behavior.",
    "projects.pacman.oneLiner": "Teaching a game agent to think with Simulated Annealing.",
    "projects.pacman.problem": "There is a widespread gap between people who claim to understand Artificial Intelligence and those who can actually implement the mechanics behind it from scratch. Most people interact with AI as a black box. This project was built to close that gap personally: to prove, at the implementation level, that I understand not just what a search algorithm does but why it works, when it breaks, and how to fix it when the environment itself fights back.",
    "projects.pacman.solution": "I implemented Simulated Annealing directly inside the Berkeley CS188 Pac-Man framework, a codebase used by one of the most rigorous AI programs in the world. The agent builds candidate paths through a random walk with visited state control to eliminate cycles, evaluates each path via getCostOfActions with a 10000 penalty for non-goal paths, and applies the Metropolis acceptance criterion to probabilistically accept worse solutions at high temperatures, enabling escape from local minima as the system cools following T = T × alpha per iteration.",
    "projects.gestureauth.oneLiner": "Edge AI access control bypassing physical inputs via real time computer vision.",
    "projects.gestureauth.problem": "Traditional physical access panels face hygiene and mechanical degradation vulnerabilities. Furthermore, relying entirely on cloud processing for computer vision introduces unacceptable network latency for physical access control loops.",
    "projects.gestureauth.solution": "We engineered a hybrid Natural User Interface combining edge AI and local IoT communication. A host client processes webcam streams using MediaPipe for hand landmark detection, translating raised digits into numeric values. After a brief software debounce stabilization window, the integer payload publishes asynchronously to a Mosquitto MQTT broker. An ESP32 microcontroller subscribes to this topic, executing local credential validation against the received sequence and actuating physical GPIO states accordingly. This architecture cleanly separates the heavy tensor operations on the host machine from the lightweight embedded validation logic.",
    "projects.ufber.oneLiner": "Object oriented Java architecture mapping university ride logistics and polymorphic behavior.",
    "projects.ufber.problem": "Computer science undergraduates frequently struggle translating abstract object oriented paradigms into tangible business logic. Theoretical instruction alone lacks the structural complexity required to truly grasp encapsulation, inheritance, and interface contracts.",
    "projects.ufber.solution": "Engineered a local Java application to model a multitenant transport network. The architecture leverages an abstract core class to establish strict operational contracts for varied transport modalities. Derived classes implement specialized pricing algorithms to demonstrate polymorphic method resolution at runtime. State mutations are strictly governed through encapsulated accessors, ensuring data integrity and domain logic isolation across the system architecture.",
    // EXPERIENCE
    "experience.heading": "Experience",
    "experience.role1.role": "Undergraduate Research Fellow — Embedded Systems & IoT",
    "experience.role1.company": "Federal University of Bahia (UFBA)",
    "experience.role1.location": "Salvador, BA",
    "experience.role1.timeline": "2025 — Present",
    "experience.role1.summary": "Conducting applied research at the intersection of embedded hardware and intelligent automation, designing systems that integrate microcontrollers, sensors, and computer vision into cohesive, production-grade solutions.",
    "experience.role1.a1": "Engineered hardware-software integration pipelines using ESP32 and industrial communication protocols, enabling real-time data capture and automated decision-making at the edge.",
    "experience.role1.a2": "Applied computer vision systems to automate visual inspection and environmental monitoring tasks, reducing the need for manual intervention in controlled environments.",
    "experience.role2.role": "Academic Teaching Assistant — Computer Networks & Assembly",
    "experience.role2.company": "Federal University of Bahia (UFBA)",
    "experience.role2.location": "Salvador, BA",
    "experience.role2.timeline": "2025 — 2026",
    "experience.role2.summary": "Selected to support undergraduate instruction across two technically demanding disciplines, bridging the gap between low-level architecture and modern networking concepts for a undergraduate cohort.",
    "experience.role2.a1": "Led practical sessions in Assembly programming, guiding students through memory management, register operations, and CPU-level logic with measurable improvements in class performance.",
    "experience.role2.a2": "Delivered support in Computer Networks, reinforcing protocol architecture, infrastructure design, and hands-on packet analysis for a cohort of 40+ students.",
    "experience.role3.role": "Systems Developer — Smart Lock Project",
    "experience.role3.company": "Innovative Solutions Laboratory (UNIFACS)",
    "experience.role3.location": "Salvador, BA",
    "experience.role3.timeline": "2025",
    "experience.role3.summary": "Leading the full technical development of an enterprise-grade physical access control system, architecting a dual-validation security pipeline that merges NFC hardware with real-time computer vision.",
    "experience.role3.a1": "Architected a two-factor authentication system combining mobile NFC reading and facial recognition via OpenCV, delivering a security standard comparable to commercial access control products.",
    "experience.role3.a2": "Implemented real-time MQTT communication between the management software and ESP32 microcontrollers over Wi-Fi, achieving sub-second lock actuation response times.",
    "experience.role3.a3": "Owned the full development lifecycle — from circuit design and firmware to the backend management interface — as the sole technical lead on the project.",
    "experience.role4.role": "Full Stack Developer — Freelance",
    "experience.role4.company": "Independent Clients",
    "experience.role4.location": "Remote",
    "experience.role4.timeline": "2024 — Present",
    "experience.role4.summary": "Designing and delivering high-performance web products for clients, with a focus on conversion-optimized interfaces and reliable data infrastructure.",
    "experience.role4.a1": "Built and shipped production web applications using React and Vite, achieving fast load times and fully responsive layouts across devices.",
    "experience.role4.a2": "Integrated MySQL database layers into client projects, ensuring structured, scalable data management for business-critical operations.",
    // ABOUT
    "about.label": "About",
    "about.heading": "The Engineer Behind the Work",
    "about.counter.projects": "Projects Built",
    "about.counter.technologies": "Technologies",
    "about.counter.roles": "Professional Roles",
    "about.summary.p1": "I am a Computer Science researcher and software engineer driven by a single obsession: solving problems that sit at the edge of what is currently possible. My work does not live in one layer of the stack. I build firmware for microcontrollers, train computer vision models that run on edge hardware, and ship the full-stack web interfaces that make those systems actionable. That range is not accidental, it is the result of deliberately choosing the hardest problems across embedded systems, applied AI, and modern web development, and seeing each one through to a working solution.",
    "about.summary.p2": "At UFBA, I conduct research in IoT and embedded systems as an undergraduate research fellow, while also serving as a teaching assistant in Computer Networks and Assembly. Beyond the academia, I lead the development of production-grade projects spanning biometric security, autonomous drones, and AI-powered SaaS platforms. I’m not looking to fit into a predefined role. I’m driven by the opportunity to build technology that creates meaningful impact.",
    "about.tech.heading": "Core Technologies",
    "about.skills.heading": "Soft Skills",
    "about.skill.leadership": "Technical Leadership",
    "about.skill.research": "Academic Research",
    "about.skill.strategic": "Strategic Thinking",
    "about.skill.sales": "Sales",
    "about.skill.problemSolving": "Complex Problem Solving",
    "about.skill.hwsw": "Hardware-Software Integration",
    "about.skill.crossLayer": "Cross-layer Systems Thinking",
    "about.skill.adaptability": "Adaptability",
    "about.diferencial.heading": "What I Actually Bring",
    "about.diferencial.p1.a": "Here is what I actually bring to a team.",
    "about.diferencial.p1.b": "I learn fast.",
    "about.diferencial.p1.c": "When a project demands a framework I have never touched or a domain I have never worked in,",
    "about.diferencial.p1.d": "I do not stall and I do not make excuses.",
    "about.diferencial.p1.e": "I absorb it, apply it, and start delivering. That adaptability is what lets me move across layers most engineers never cross, from",
    "about.diferencial.p1.f": "embedded firmware to applied AI to the web interface",
    "about.diferencial.p1.g": "that ties it all together.",
    "about.diferencial.p2.a": "But",
    "about.diferencial.p2.b": "raw technical range",
    "about.diferencial.p2.c": "means nothing if you cannot communicate it. I can stand in front of a room and translate a dense technical architecture into language a business leader, an investor, or a teammate actually understands. I have spent time teaching, presenting, and explaining complex systems to people who do not live in code, and I know how to",
    "about.diferencial.p2.d": "bridge the gap between what is technically true and what a decision maker needs to hear.",
    "about.diferencial.p3.a": "What truly defines how I work is simpler than any skill on a list.",
    "about.diferencial.p3.b": "I do not quit.",
    "about.diferencial.p3.c": "Hand me a problem that looks impossible and I will keep pushing until it is solved, no matter what it takes. I carry a",
    "about.diferencial.p3.d": "relentless drive to grow and improve",
    "about.diferencial.p3.e": ", but I carry it with humility and integrity. I am confident in what I can build, honest about what I am still learning, and",
    "about.diferencial.p3.f": "reliable when it matters most.",
    "about.diferencial.p4.a": "If you need someone who will",
    "about.diferencial.p4.b": "own a hard problem from the first circuit to the final deployment",
    "about.diferencial.p4.c": "and",
    "about.diferencial.p4.d": "refuse to walk away until it works",
    "about.diferencial.p4.e": ", that is exactly who I am.",
    "about.beyond.heading": "Beyond Code",
    "about.beyond.p1": "When I step away from the screen, you will most likely find me close to the ocean. There is something about the coastline that genuinely recharges me, and living in Salvador means I would never trade that. I am an extrovert at heart. I love meeting new people and connecting easily, even if I might seem a little reserved at first. My favorite moments are simple ones: good food at a great restaurant, traveling somewhere new, and spending time with family.",
    "about.beyond.p2": "Sports are a big part of who I am. I am a proud and devoted Esporte Clube Bahia supporter, the kind who shows up to games and is fully convinced he brings luck. I balance watching basketball (a lifelong Steph Curry fan) and following the NFL for the sheer intensity of it, with actually playing: soccer and gym keep me disciplined and grounded, even if a good meal occasionally wins the negotiation.",
    "about.beyond.p3": "At the end of the day, I am someone who collects experiences more than things. New places, new people, new problems worth solving: that is what drives me both inside and outside the code.",
    // CONTACT
    "contact.heading": "Let’s build something that matters.",
    "contact.subheading": "Open to collaborations, engineering challenges, and opportunities where the problem is genuinely interesting.",
  },

  pt: {
    // NAV
    "nav.projects": "Projetos",
    "nav.experience": "Experiência",
    "nav.about": "Sobre",
    "nav.gallery": "Galeria",
    "nav.contact": "Contato",
    // HERO
    "hero.headline": "Construindo sistemas que pensam: do dispositivo edge à interface.",
    "hero.subtitle.role": "Pesquisador em Ciência da Computação & Engenheiro de Software em Salvador, BA.",
    "hero.cta.projects": "Ver Projetos",
    "hero.cta.help": "Como posso ajudar",
    // PROJECTS section labels
    "projects.label": "Trabalho Selecionado",
    "projects.heading": "Projetos",
    // MODAL labels
    "modal.problem": "O Problema",
    "modal.solution": "A Solução",
    "modal.links": "Links",
    // STATUS
    "status.poc": "Prova de Conceito",
    "status.ongoingPoc": "PoC em Andamento",
    "status.activeResearch": "Pesquisa Ativa",
    "status.inDevelopment": "Em Desenvolvimento",
    "status.academic": "Acadêmico",
    "status.pocsimple": "PoC",
    "status.operational": "Operacional",
    // PROJECT data
    "projects.palmpay.oneLiner": "Autenticação vascular edge sem toque para acesso de alta segurança e pagamentos impecáveis.",
    "projects.palmpay.problem": "Sistemas padrão de pagamento e acesso físico dependem de tokens externos como cartões ou smartphones, que são vulneráveis a roubos, perdas ou falhas de bateria. A biometria de superfície padrão enfrenta vulnerabilidades severas de falsificação (spoofing) e levanta preocupações críticas de privacidade em relação aos dados visuais armazenados.",
    "projects.palmpay.solution": "Projetei um sistema biométrico utilizando luz infravermelha próxima (near-infrared) para mapear as estruturas internas das veias. A hemoglobina desoxigenada absorve comprimentos de onda específicos, criando um padrão imune a falsificações externas. A arquitetura apresenta um backbone ResNet customizado e treinado via Deep Metric Learning e função de perda ArcFace, produzindo um embedding matemático seguro. Apliquei taxas de aprendizado diferenciais para adaptar a rede neural a diversos sensores de câmera, alcançando margens de segurança excepcionais. A inferência é executada inteiramente em hardware edge local, garantindo latência zero, funcionalidade offline e privacidade rigorosa. Imagens brutas são eliminadas da memória instantaneamente, enquanto o embedding extraído autoriza as transações de forma segura.",
    "projects.visokey.oneLiner": "Controle de acesso biométrico descentralizado utilizando dispositivos móveis pessoais para autenticação instantânea.",
    "projects.visokey.problem": "Sistemas biométricos tradicionais exigem hardware proprietário caro em cada porta. Isso cria barreiras massivas de despesas de capital para universidades e ambientes corporativos. Além disso, o armazenamento local de dados faciais em dispositivos edge apresenta riscos graves de privacidade e desafios de conformidade.",
    "projects.visokey.solution": "Inverti o paradigma padrão de segurança física através de uma abordagem Bring Your Own Device (Traga Seu Próprio Dispositivo). O sistema delega a necessidade do hardware da câmera diretamente para o usuário. O reconhecimento facial é executado exclusivamente através da webcam do navegador do usuário no frontend via uma aplicação React. Este frontend captura a mídia e a envia para um backend Python Flask para extração via deep metric learning usando a arquitetura ResNet. Para prevenir falsificações, implementamos a detecção de vivacidade (liveness) ativa calculando a Proporção de Aspecto Ocular (Eye Aspect Ratio) em tempo real. O backend avalia o embedding de forma segura contra o Supabase PostgreSQL e aciona um microcontrolador ESP32 através de uma conexão WebSocket contínua. O ESP32 atua unicamente como um interruptor de relé físico, sem armazenar nenhum dado biométrico sensível.",
    "projects.brainsphere.oneLiner": "Arquitetura edge quântica híbrida para aprendizado federado em imagens médicas.",
    "projects.brainsphere.problem": "Datasets de imagens médicas são severamente isolados por restrições rigorosas de privacidade, tornando a coleta de dados centralizada ilegal. Além disso, modelos distribuídos edge clássicos falham nesses ambientes devido à extrema divergência de peso do cliente e ao colapso da representação espacial quando expostos a dados hospitalares localizados altamente assimétricos.",
    "projects.brainsphere.solution": "Arquitetamos um pipeline de aprendizado híbrido descentralizado. Um extrator espacial clássico alimenta tensores densos em um circuito quântico parametrizado de 12 qubits usando codificação de amplitude (amplitude encoding). Operando via uma Rede de Tensores em Árvore (Tree Tensor Network), a camada quântica atua como um gargalo de informação extremo que estabiliza a inteligência topológica macroscópica enquanto comprime os payloads da rede em mais de 99 por cento. Para prevenir falhas de convergência distribuída, desenvolvemos um algoritmo proximal adaptativo personalizado junto a uma estratégia de agregação de mediana robusta Bizantina que direciona especificamente a ordenação de tensores complexos para a CPU, contornando bugs nativos de hardware de aceleração.",
    "projects.cycletracker.oneLiner": "Dashboard financeiro full stack apresentando visualização interativa de dados e insights estratégicos.",
    "projects.cycletracker.problem": "Ferramentas de finanças pessoais frequentemente carecem de feedback visual claro e não conseguem isolar ciclos de faturamento específicos. Usuários têm dificuldade em analisar tendências de longo prazo sem se sentirem sobrecarregados por interfaces poluídas e tipos mistos de transações.",
    "projects.cycletracker.solution": "Construí uma aplicação web moderna utilizando React e Tailwind CSS para o frontend. A camada de dados depende do Supabase para armazenamento seguro e gerenciamento de estado em tempo real via mutations do React Query. Para resolver a poluição visual, implementei o Recharts para construir um widget interativo de Inteligência Financeira, com gráficos de rosca e de barras verticais animados. A arquitetura separa receitas e despesas em interfaces distintas enquanto mantém um contexto de estado de ciclo global unificado, permitindo aos usuários transitar suavemente entre capturas mensais sem mudanças bruscas no layout (layout shifts).",
    "projects.oscore.oneLiner": "Visualizando de forma interativa algoritmos complexos de escalonamento de CPU e paginação de memória.",
    "projects.oscore.problem": "Entender os fundamentos dos sistemas operacionais é crucial para construir softwares de alta performance. Desenvolvedores que apenas consomem APIs frequentemente não têm uma intuição profunda sobre a execução de processos ou sobre os custos de troca de contexto. O desafio é que a paginação de memória e o escalonamento da CPU ocorrem de forma invisível dentro da máquina, tornando essas arquiteturas vitais abstratas e difíceis de internalizar apenas através de teoria.",
    "projects.oscore.solution": "Projetei um simulador visual para expor essas mecânicas ocultas diretamente. A engine central em Python executa lógicas complexas de escalonamento como Shortest Job First, Earliest Deadline First, e uma variante do Completely Fair Scheduler. Ele calcula métricas precisas para tempo de retorno (turnaround time) e taxa de transferência (throughput) enquanto rastreia simultaneamente falhas de página (page faults) por meio de um módulo de memória virtual. A interface em Streamlit transforma esses logs de execução brutos em gráficos interativos de Gantt e diagramas de frames de RAM, permitindo aos usuários observar o gerenciamento de recursos de hardware de forma dinâmica e preencher a lacuna entre os conceitos teóricos e o comportamento real do sistema.",
    "projects.pacman.oneLiner": "Ensinando um agente de jogo a pensar com Simulated Annealing (Têmpera Simulada).",
    "projects.pacman.problem": "Existe uma grande lacuna entre as pessoas que dizem entender Inteligência Artificial e aquelas que realmente conseguem implementar as mecânicas por trás dela do zero. A maioria das pessoas interage com a IA como se fosse uma caixa preta. Este projeto foi construído para fechar essa lacuna pessoalmente: para provar, no nível da implementação, que eu entendo não apenas o que um algoritmo de busca faz, mas por que ele funciona, quando ele quebra, e como consertá-lo quando o próprio ambiente resiste.",
    "projects.pacman.solution": "Implementei o algoritmo de Simulated Annealing diretamente dentro do framework Pac-Man de CS188 de Berkeley, um código base usado por um dos programas de IA mais rigorosos do mundo. O agente constrói caminhos candidatos através de um passeio aleatório (random walk) com controle de estados visitados para eliminar ciclos, avalia cada caminho via getCostOfActions com uma penalidade de 10000 para caminhos que não chegam ao objetivo, e aplica o critério de aceitação de Metropolis para aceitar de forma probabilística soluções piores em altas temperaturas, permitindo a fuga de mínimos locais à medida que o sistema esfria seguindo T = T × alpha por iteração.",
    "projects.gestureauth.oneLiner": "Controle de acesso via Edge AI contornando inputs físicos através de visão computacional em tempo real.",
    "projects.gestureauth.problem": "Painéis de acesso físico tradicionais enfrentam vulnerabilidades de higiene e degradação mecânica. Além disso, depender inteiramente do processamento em nuvem para visão computacional introduz uma latência de rede inaceitável para loops de controle de acesso físico.",
    "projects.gestureauth.solution": "Projetamos uma Interface de Usuário Natural híbrida combinando Edge AI e comunicação IoT local. Um cliente host processa streams de webcam usando MediaPipe para detecção de marcações da mão (hand landmark detection), traduzindo os dedos levantados em valores numéricos. Após uma breve janela de estabilização (debounce) no software, o payload de número inteiro é publicado de forma assíncrona em um broker MQTT Mosquitto. Um microcontrolador ESP32 se inscreve neste tópico, executando uma validação local da credencial contra a sequência recebida e atuando nos estados físicos dos pinos GPIO de acordo. Essa arquitetura separa de maneira limpa as operações pesadas de tensores na máquina host da lógica leve de validação embarcada.",
    "projects.ufber.oneLiner": "Arquitetura Java orientada a objetos mapeando a logística de caronas universitárias e comportamento polimórfico.",
    "projects.ufber.problem": "Estudantes de graduação em ciência da computação frequentemente lutam para traduzir paradigmas abstratos de orientação a objetos em lógica de negócios tangível. A instrução teórica por si só carece da complexidade estrutural necessária para realmente compreender o encapsulamento, a herança e os contratos de interface.",
    "projects.ufber.solution": "Projetei um aplicativo Java local para modelar uma rede de transporte multilocatária (multitenant). A arquitetura utiliza uma classe central abstrata para estabelecer contratos operacionais rígidos para modalidades de transporte variadas. Classes derivadas implementam algoritmos de precificação especializados para demonstrar a resolução de métodos polimórficos em tempo de execução. As mutações de estado são estritamente governadas por meio de assessores encapsulados, garantindo a integridade dos dados e o isolamento da lógica de domínio em toda a arquitetura do sistema.",
    // EXPERIENCE
    "experience.heading": "Experiência",
    "experience.role1.role": "Bolsista de Iniciação Científica — Sistemas Embarcados & IoT",
    "experience.role1.company": "Universidade Federal da Bahia (UFBA)",
    "experience.role1.location": "Salvador, BA",
    "experience.role1.timeline": "2025 — Presente",
    "experience.role1.summary": "Conduzindo pesquisa aplicada na interseção de hardware embarcado e automação inteligente, projetando sistemas que integram microcontroladores, sensores e visão computacional em soluções coesas e de nível de produção.",
    "experience.role1.a1": "Projetei pipelines de integração hardware-software usando ESP32 e protocolos de comunicação industrial, permitindo a captura de dados em tempo real e tomadas de decisão automatizadas na ponta (edge).",
    "experience.role1.a2": "Apliquei sistemas de visão computacional para automatizar tarefas de inspeção visual e monitoramento ambiental, reduzindo a necessidade de intervenção manual em ambientes controlados.",
    "experience.role2.role": "Monitor Acadêmico — Redes de Computadores & Assembly",
    "experience.role2.company": "Universidade Federal da Bahia (UFBA)",
    "experience.role2.location": "Salvador, BA",
    "experience.role2.timeline": "2025 — 2026",
    "experience.role2.summary": "Selecionado para dar suporte ao ensino de graduação em duas disciplinas tecnicamente desafiadoras, preenchendo a lacuna entre a arquitetura de baixo nível e os conceitos modernos de redes para uma turma de universitários.",
    "experience.role2.a1": "Liderei aulas práticas em programação Assembly, orientando os alunos no gerenciamento de memória, operações de registradores e lógica de nível de CPU, com melhorias mensuráveis no desempenho da turma.",
    "experience.role2.a2": "Forneci suporte em Redes de Computadores, reforçando a arquitetura de protocolos, design de infraestrutura e análise prática de pacotes para uma turma de mais de 40 alunos.",
    "experience.role3.role": "Desenvolvedor de Sistemas — Projeto Smart Lock",
    "experience.role3.company": "Laboratório de Soluções Inovadoras (UNIFACS)",
    "experience.role3.location": "Salvador, BA",
    "experience.role3.timeline": "2025",
    "experience.role3.summary": "Liderando todo o desenvolvimento técnico de um sistema de controle de acesso físico de nível corporativo, arquitetando um pipeline de segurança de dupla validação que une hardware NFC a visão computacional em tempo real.",
    "experience.role3.a1": "Arquitetei um sistema de autenticação de dois fatores (2FA) combinando leitura NFC mobile e reconhecimento facial via OpenCV, entregando um padrão de segurança comparável aos produtos comerciais de controle de acesso.",
    "experience.role3.a2": "Implementei comunicação MQTT em tempo real entre o software de gestão e microcontroladores ESP32 via Wi-Fi, alcançando tempos de resposta no acionamento da fechadura na casa dos sub-segundos.",
    "experience.role3.a3": "Assumi a propriedade de todo o ciclo de vida do desenvolvimento — desde o design do circuito e firmware até a interface de gestão no backend — atuando como líder técnico único do projeto.",
    "experience.role4.role": "Desenvolvedor Full Stack — Freelance",
    "experience.role4.company": "Clientes Independentes",
    "experience.role4.location": "Remoto",
    "experience.role4.timeline": "2024 — Presente",
    "experience.role4.summary": "Projetando e entregando produtos web de alta performance para clientes, com foco em interfaces otimizadas para conversão e infraestrutura de dados confiável.",
    "experience.role4.a1": "Construí e lancei aplicações web em produção utilizando React e Vite, alcançando tempos rápidos de carregamento e layouts totalmente responsivos em diversos dispositivos.",
    "experience.role4.a2": "Integrei camadas de banco de dados MySQL em projetos de clientes, garantindo uma gestão de dados estruturada e escalável para operações essenciais de negócio.",
    // ABOUT
    "about.label": "Sobre",
    "about.heading": "O Engenheiro Por Trás do Trabalho",
    "about.counter.projects": "Projetos Construídos",
    "about.counter.technologies": "Tecnologias",
    "about.counter.roles": "Cargos Profissionais",
    "about.summary.p1": "Sou um pesquisador de Ciência da Computação e engenheiro de software movido por uma única obsessão: resolver problemas que estão no limite do que é possível hoje. Meu trabalho não se resume a apenas uma camada da stack. Eu construo firmwares para microcontroladores, treino modelos de visão computacional que rodam em hardware edge, e entrego as interfaces web full-stack que tornam esses sistemas acionáveis. Essa abrangência não é um acidente, é o resultado de escolher deliberadamente os problemas mais difíceis envolvendo sistemas embarcados, IA aplicada e desenvolvimento web moderno, garantindo que cada um deles se torne uma solução funcional.",
    "about.summary.p2": "Na UFBA, conduzo pesquisas em IoT e sistemas embarcados como bolsista de iniciação científica, enquanto atuo simultaneamente como monitor nas disciplinas de Redes de Computadores e Assembly. Fora do ambiente acadêmico, lidero o desenvolvimento de projetos de nível de produção que abrangem segurança biométrica, drones autônomos e plataformas SaaS baseadas em IA. Não estou procurando me encaixar em um papel predefinido. Sou movido pela oportunidade de construir tecnologia que crie impacto significativo.",
    "about.tech.heading": "Tecnologias Principais",
    "about.skills.heading": "Soft Skills",
    "about.skill.leadership": "Liderança Técnica",
    "about.skill.research": "Pesquisa Acadêmica",
    "about.skill.strategic": "Pensamento Estratégico",
    "about.skill.sales": "Vendas",
    "about.skill.problemSolving": "Resolução de Problemas Complexos",
    "about.skill.hwsw": "Integração Hardware-Software",
    "about.skill.crossLayer": "Pensamento Sistêmico Cross-layer",
    "about.skill.adaptability": "Adaptabilidade",
    "about.diferencial.heading": "O Que Eu Realmente Trago",
    "about.diferencial.p1.a": "Aqui está o que eu realmente trago para uma equipe:",
    "about.diferencial.p1.b": "Eu aprendo rápido.",
    "about.diferencial.p1.c": "Quando um projeto exige um framework que eu nunca toquei ou um domínio onde nunca trabalhei,",
    "about.diferencial.p1.d": "eu não travo e não dou desculpas.",
    "about.diferencial.p1.e": "Eu absorvo, aplico e começo a entregar. Essa adaptabilidade é o que me permite transitar por camadas que a maioria dos engenheiros raramente cruza, do",
    "about.diferencial.p1.f": "firmware embarcado à IA aplicada, até a interface web que conecta tudo isso",
    "about.diferencial.p1.g": ".",
    "about.diferencial.p2.a": "Mas ter um",
    "about.diferencial.p2.b": "alcance técnico puro",
    "about.diferencial.p2.c": "não significa nada se você não consegue comunicá-lo. Eu consigo me levantar na frente de uma sala e traduzir uma arquitetura técnica complexa para uma linguagem que um líder de negócios, um investidor ou um colega de equipe realmente entenda. Gastei muito tempo ensinando, apresentando e explicando sistemas complexos para pessoas que não vivem de código, e eu sei como",
    "about.diferencial.p2.d": "construir a ponte entre o que é tecnicamente real e o que um tomador de decisão precisa escutar.",
    "about.diferencial.p3.a": "O que realmente define a minha forma de trabalhar é algo muito mais simples do que qualquer habilidade listada.",
    "about.diferencial.p3.b": "Eu não desisto.",
    "about.diferencial.p3.c": "Me dê um problema que parece impossível e eu continuarei trabalhando nele até que seja resolvido, não importa o que seja preciso. Carrego uma",
    "about.diferencial.p3.d": "motivação incansável de crescer e melhorar",
    "about.diferencial.p3.e": ", mas a levo com humildade e integridade. Sou confiante no que posso construir, honesto sobre o que ainda estou aprendendo e",
    "about.diferencial.p3.f": "confiável quando isso mais importa.",
    "about.diferencial.p4.a": "Se você precisa de alguém que vai",
    "about.diferencial.p4.b": "abraçar um problema difícil desde o primeiro circuito até o deploy final",
    "about.diferencial.p4.c": "e",
    "about.diferencial.p4.d": "se recusar a sair até que funcione",
    "about.diferencial.p4.e": ", é exatamente isso que eu sou.",
    "about.beyond.heading": "Além do Código",
    "about.beyond.p1": "Quando eu me afasto da tela, as chances são grandes de que você me encontre perto da praia. Há algo no litoral que genuinamente recarrega as minhas baterias, e viver em Salvador significa que eu jamais trocaria isso. Sou um extrovertido de coração. Amo conhecer novas pessoas e me conecto com facilidade, mesmo que eu possa parecer um pouco reservado no início. Meus momentos preferidos são os mais simples: boa comida em um ótimo restaurante, viajar para um lugar novo e passar um tempo com a família.",
    "about.beyond.p2": "Os esportes são uma grande parte de quem eu sou. Sou torcedor orgulhoso e fanático do Esporte Clube Bahia, o tipo que vai aos jogos e tem certeza absoluta de que traz sorte. Equilíbrio meu tempo assistindo basquete (fã de carteirinha do Steph Curry) e acompanhando a NFL pela pura intensidade do jogo, com a prática física: o futebol e a academia me mantêm disciplinado e focado, mesmo que uma boa refeição acabe vencendo a negociação de vez em quando.",
    "about.beyond.p3": "No fim das contas, eu sou alguém que coleciona muito mais experiências do que coisas. Novos lugares, novas pessoas, novos problemas que valem a pena resolver — é isso que me motiva tanto dentro quanto fora dos códigos.",
    // CONTACT
    "contact.heading": "Vamos construir algo que importa.",
    "contact.subheading": "Aberto a colaborações, desafios e oportunidades onde o problema é genuinamente interessante.",
  },
};

export function getTranslations(lang: string): Record<TranslationKey, string> {
  return dict[lang] ?? dict.en;
}