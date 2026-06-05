export type ProjectStatus =
  | "Proof of Concept"
  | "Ongoing PoC"
  | "Active Research"
  | "In Development"
  | "Academic"
  | "PoC"
  | "Operational";

export interface ExternalLink {
  label: string;
  url: string;
}

export interface Project {
  name: string;
  oneLiner: string;
  techStack: string[];
  status: ProjectStatus;
  date: string;
  heroMediaPath?: string;
  heroMediaType?: "image" | "video" | "side-by-side";
  heroMediaPaths?: {
    left: string;
    right: string;
  };
  hoverStartTime?: number;
  hoverEndTime?: number;
  theProblem: string;
  theSolution: string;
  externalLinks: ExternalLink[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    name: "PalmPay: Vascular Authentication",
    oneLiner:
      "Touchless vascular edge authentication for flawless high security access and payments",
    techStack: ["PyTorch", "ResNet", "Computer Vision", "Solana", "ArcFace"],
    status: "Proof of Concept",
    date: "2026",
    heroMediaPath: "/videos/palmpay.mp4",
    heroMediaType: "video",
    hoverStartTime: 0,
    hoverEndTime: 4,
    theProblem:
      "Standard physical payment and access systems rely on external tokens like cards or smartphones which are vulnerable to theft loss or battery failure. Standard surface biometrics face severe spoofing vulnerabilities and raise critical privacy concerns regarding stored visual data.",
    theSolution:
      "I engineered a biometric system utilizing near infrared light to map internal vein structures. Deoxygenated hemoglobin absorbs specific wavelengths creating a pattern immune to external spoofing. The architecture features a custom ResNet backbone trained via Deep Metric Learning and ArcFace loss producing a secure mathematical embedding. I applied differential learning rates to adapt the neural network for diverse camera sensors achieving exceptional security margins. Inference executes entirely on local edge hardware ensuring zero latency offline functionality and strict privacy. Raw images are instantly purged from memory while the extracted embedding securely authorizes transactions.",
    externalLinks: [
      { label: "Video Pitch", url: "https://youtu.be/oX49pjpXfts" },
    ],
    featured: true,
  },
  {
    name: "VisoKey/SmartLock",
    oneLiner:
      "Decentralized biometric access control using personal mobile devices for instant authentication.",
    techStack: [
      "React",
      "Python",
      "Flask",
      "Supabase",
      "ESP32",
      "OpenCV",
      "face_recognition",
    ],
    status: "Ongoing PoC",
    date: "2025",
    heroMediaPath: "/videos/visokey-hero.mov",
    heroMediaType: "video",
    hoverStartTime: 23,
    hoverEndTime: 31,
    theProblem:
      "Traditional biometric systems require expensive proprietary hardware at every door. This creates massive capital expenditure barriers for universities and corporate environments. Furthermore, local storage of facial data on edge devices presents severe privacy risks and compliance challenges.",
    theSolution:
      "I inverted the standard physical security paradigm via a Bring Your Own Device approach. The system delegates the camera hardware requirement directly to the user. Facial recognition runs exclusively through the user browser webcam on the frontend via a React application. This frontend captures the media and sends it to a Python Flask backend for deep metric learning extraction using ResNet architecture. To prevent spoofing, we implemented active liveness detection calculating the Eye Aspect Ratio in real time. The backend securely evaluates the embedding against Supabase PostgreSQL and triggers an ESP32 microcontroller over a continuous WebSocket connection. The ESP32 acts solely as a physical relay switch without storing any sensitive biometric data.",
    externalLinks: [
      {
        label: "GitHub Repository",
        url: "https://github.com/lipe0312/ufba-access-cam",
      },
    ],
  },
  {
    name: "Brain Sphere",
    oneLiner:
      "Hybrid quantum edge architecture for federated learning in medical imaging.",
    techStack: [
      "PyTorch",
      "PennyLane QML",
      "Flower (Federated Learning)",
      "U-Net 3D",
    ],
    status: "Active Research",
    date: "2026",
    heroMediaPath: "/images/brainsphere-hero.png",
    heroMediaType: "image",
    theProblem:
      "Medical imaging datasets are severely siloed by strict privacy constraints making centralized data collection illegal. Furthermore classic distributed edge models fail in these environments due to extreme client weight divergence and spatial representation collapse when exposed to highly asymmetrical localized hospital data.",
    theSolution:
      "We architected a decentralized hybrid learning pipeline. A classical spatial extractor feeds dense tensors into a 12 qubit parameterized quantum circuit using amplitude encoding. Operating via a Tree Tensor Network, the quantum layer acts as an extreme information bottleneck that stabilizes macroscopic topological intelligence while compressing network payloads by over 99 percent. To prevent distributed convergence failure, we engineered a custom adaptive proximal algorithm alongside a Byzantine robust median aggregation strategy that specifically routes complex tensor sorting to the CPU to bypass native acceleration hardware bugs.",
    externalLinks: [
      { label: "GitHub Repository", url: "https://github.com/BrainSphereLabs" },
    ],
  },
  {
    name: "Cycle Tracker",
    oneLiner:
      "Full stack financial dashboard featuring interactive data visualization and strategic insights.",
    techStack: ["React", "Tailwind CSS", "Supabase", "Recharts"],
    status: "In Development",
    date: "2025",
    heroMediaPath: "/videos/cycletracker-hero.mov",
    heroMediaType: "video",
    hoverStartTime: 2,
    hoverEndTime: 7,
    theProblem:
      "Personal finance tools often lack clear visual feedback and fail to isolate specific billing cycles. Users struggle to analyze long term trends without feeling overwhelmed by cluttered interfaces and mixed transaction types.",
    theSolution:
      "I built a modern web application utilizing React and Tailwind CSS for the frontend. The data layer relies on Supabase for secure data storage and real time state management via React Query mutations. To solve the visual clutter, I implemented Recharts to build an interactive Financial Intelligence widget featuring animated donut and vertical bar charts. The architecture separates income and expenses into distinct interfaces while maintaining a unified global cycle state context, allowing users to seamlessly transition between monthly snapshots without layout shifts.",
    externalLinks: [
      {
        label: "GitHub Repository",
        url: "https://github.com/lipe0312/cycle-tracker",
      },
    ],
  },
  {
    name: "OS Core Simulator",
    oneLiner:
      "Visualizing complex CPU scheduling and memory paging algorithms interactively.",
    techStack: ["Python", "Streamlit", "Pandas"],
    status: "Academic",
    date: "Early 2026",
    heroMediaPath: "/videos/osscheduler-hero.mov",
    heroMediaType: "video",
    hoverStartTime: 19,
    hoverEndTime: 27,
    theProblem:
      "Understanding operating system fundamentals is crucial for building performant software. Developers who only consume APIs often lack deep intuition regarding process execution or context switching costs. The challenge is that memory paging and CPU scheduling occur invisibly inside the machine, making these vital architectures abstract and difficult to internalize through pure theory alone.",
    theSolution:
      "I engineered a visual simulator to expose these hidden mechanics directly. The core Python engine executes complex scheduling logic like Shortest Job First, Earliest Deadline First, and a Completely Fair Scheduler variant. It calculates precise metrics for turnaround time and throughput while simultaneously tracking page faults through a virtual memory module. The Streamlit interface transforms these raw execution logs into interactive Gantt charts and RAM frame diagrams, allowing users to observe hardware resource management dynamically and bridge the gap between textbook concepts and actual system behavior.",
    externalLinks: [
      {
        label: "GitHub Repository",
        url: "https://github.com/lipe0312/Process-scheduler-OS",
      },
    ],
  },
  {
    name: "Pac-Man Way of the Katana",
    oneLiner: "Teaching a game agent to think with Simulated Annealing.",
    techStack: [
      "Python",
      "Simulated Annealing",
      "Tkinter",
      "Matplotlib",
      "Jupyter",
    ],
    status: "Academic",
    date: "2026",
    heroMediaPath: "/videos/pacman-hero.mov",
    heroMediaType: "video",
    hoverStartTime: 1,
    hoverEndTime: 8,
    theProblem:
      "There is a widespread gap between people who claim to understand Artificial Intelligence and those who can actually implement the mechanics behind it from scratch. Most people interact with AI as a black box. This project was built to close that gap personally: to prove, at the implementation level, that I understand not just what a search algorithm does but why it works, when it breaks, and how to fix it when the environment itself fights back.",
    theSolution:
      "I implemented Simulated Annealing directly inside the Berkeley CS188 Pac-Man framework, a codebase used by one of the most rigorous AI programs in the world. The agent builds candidate paths through a random walk with visited state control to eliminate cycles, evaluates each path via getCostOfActions with a 10000 penalty for non-goal paths, and applies the Metropolis acceptance criterion to probabilistically accept worse solutions at high temperatures, enabling escape from local minima as the system cools following T = T × alpha per iteration.",
    externalLinks: [
      {
        label: "MATA64 — Inteligência Artificial, UFBA",
        url: "https://github.com/lipe0312/Pacman-Way-Of-The-Katana",
      },
    ],
  },
  {
    name: "GestureAuth IoT",
    oneLiner:
      "Edge AI access control bypassing physical inputs via real time computer vision.",
    techStack: ["Python", "OpenCV", "MediaPipe", "MQTT", "ESP32", "C++"],
    status: "PoC",
    date: "2025",
    heroMediaPath: "/videos/gestureauth-hero.mov",
    heroMediaType: "video",
    hoverStartTime: 0,
    hoverEndTime: 6,
    theProblem:
      "Traditional physical access panels face hygiene and mechanical degradation vulnerabilities. Furthermore, relying entirely on cloud processing for computer vision introduces unacceptable network latency for physical access control loops.",
    theSolution:
      "We engineered a hybrid Natural User Interface combining edge AI and local IoT communication. A host client processes webcam streams using MediaPipe for hand landmark detection, translating raised digits into numeric values. After a brief software debounce stabilization window, the integer payload publishes asynchronously to a Mosquitto MQTT broker. An ESP32 microcontroller subscribes to this topic, executing local credential validation against the received sequence and actuating physical GPIO states accordingly. This architecture cleanly separates the heavy tensor operations on the host machine from the lightweight embedded validation logic.",
    externalLinks: [
      {
        label: "GitHub Repository",
        url: "https://github.com/lipe0312/mqtt_iot",
      },
    ],
  },
  {
    name: "UFBER",
    oneLiner:
      "Object oriented Java architecture mapping university ride logistics and polymorphic behavior.",
    techStack: ["Java", "OOP", "Terminal UI"],
    status: "Academic",
    date: "2024",
    heroMediaPath: "/images/ufber-hero.png",
    heroMediaType: "image",
    theProblem:
      "Computer science undergraduates frequently struggle translating abstract object oriented paradigms into tangible business logic. Theoretical instruction alone lacks the structural complexity required to truly grasp encapsulation, inheritance, and interface contracts.",
    theSolution:
      "Engineered a local Java application to model a multitenant transport network. The architecture leverages an abstract core class to establish strict operational contracts for varied transport modalities. Derived classes implement specialized pricing algorithms to demonstrate polymorphic method resolution at runtime. State mutations are strictly governed through encapsulated accessors, ensuring data integrity and domain logic isolation across the system architecture.",
    externalLinks: [
      {
        label: "GitHub Repository",
        url: "https://github.com/lipe0312/ufber-oop-java",
      },
    ],
  },
];
