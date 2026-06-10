import type { TranslationKey } from "@/i18n/translations";

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
  oneLinerKey: TranslationKey;
  techStack: string[];
  statusKey: TranslationKey;
  date: string;
  heroMediaPath?: string;
  heroMediaType?: "image" | "video" | "side-by-side";
  heroMediaPaths?: {
    left: string;
    right: string;
  };
  hoverStartTime?: number;
  hoverEndTime?: number;
  problemKey: TranslationKey;
  solutionKey: TranslationKey;
  externalLinks: ExternalLink[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    name: "PalmPay: Vascular Authentication",
    oneLinerKey: "projects.palmpay.oneLiner",
    techStack: ["PyTorch", "ResNet", "Computer Vision", "Solana", "ArcFace"],
    statusKey: "status.poc",
    date: "2026",
    heroMediaPath: "/videos/palmpay.webm",
    heroMediaType: "video",
    hoverStartTime: 0,
    hoverEndTime: 4,
    problemKey: "projects.palmpay.problem",
    solutionKey: "projects.palmpay.solution",
    externalLinks: [
      { label: "Video Pitch", url: "https://youtu.be/oX49pjpXfts" },
    ],
    featured: true,
  },
  {
    name: "VisoKey/SmartLock",
    oneLinerKey: "projects.visokey.oneLiner",
    techStack: [
      "React",
      "Python",
      "Flask",
      "Supabase",
      "ESP32",
      "OpenCV",
      "face_recognition",
    ],
    statusKey: "status.ongoingPoc",
    date: "2025",
    heroMediaPath: "/videos/visokey-hero.webm",
    heroMediaType: "video",
    hoverStartTime: 23,
    hoverEndTime: 31,
    problemKey: "projects.visokey.problem",
    solutionKey: "projects.visokey.solution",
    externalLinks: [
      {
        label: "GitHub Repository",
        url: "https://github.com/lipe0312/ufba-access-cam",
      },
    ],
  },
  {
    name: "Brain Sphere",
    oneLinerKey: "projects.brainsphere.oneLiner",
    techStack: ["PyTorch", "PennyLane QML", "Flower", "U-Net 3D"],
    statusKey: "status.activeResearch",
    date: "2026",
    heroMediaPath: "/images/brainsphere-hero.webp",
    heroMediaType: "image",
    problemKey: "projects.brainsphere.problem",
    solutionKey: "projects.brainsphere.solution",
    externalLinks: [
      { label: "GitHub Repository", url: "https://github.com/BrainSphereLabs" },
    ],
  },
  {
    name: "Cycle Tracker",
    oneLinerKey: "projects.cycletracker.oneLiner",
    techStack: ["React", "Tailwind CSS", "Supabase", "Recharts"],
    statusKey: "status.inDevelopment",
    date: "2025",
    heroMediaPath: "/videos/cycletracker-hero.webm",
    heroMediaType: "video",
    hoverStartTime: 2,
    hoverEndTime: 7,
    problemKey: "projects.cycletracker.problem",
    solutionKey: "projects.cycletracker.solution",
    externalLinks: [
      {
        label: "GitHub Repository",
        url: "https://github.com/lipe0312/cycle-tracker",
      },
    ],
  },
  {
    name: "OS Core Simulator",
    oneLinerKey: "projects.oscore.oneLiner",
    techStack: ["Python", "Streamlit", "Pandas"],
    statusKey: "status.academic",
    date: "2026",
    heroMediaPath: "/videos/osscheduler-hero.webm",
    heroMediaType: "video",
    hoverStartTime: 19,
    hoverEndTime: 27,
    problemKey: "projects.oscore.problem",
    solutionKey: "projects.oscore.solution",
    externalLinks: [
      {
        label: "GitHub Repository",
        url: "https://github.com/lipe0312/Process-scheduler-OS",
      },
    ],
  },
  {
    name: "Pac-Man Way of the Katana",
    oneLinerKey: "projects.pacman.oneLiner",
    techStack: [
      "Python",
      "Simulated Annealing",
      "Tkinter",
      "Matplotlib",
      "Jupyter",
    ],
    statusKey: "status.academic",
    date: "2026",
    heroMediaPath: "/videos/pacman-hero.webm",
    heroMediaType: "video",
    hoverStartTime: 1,
    hoverEndTime: 8,
    problemKey: "projects.pacman.problem",
    solutionKey: "projects.pacman.solution",
    externalLinks: [
      {
        label: "MATA64 — Inteligência Artificial, UFBA",
        url: "https://github.com/lipe0312/Pacman-Way-Of-The-Katana",
      },
    ],
  },
  {
    name: "GestureAuth IoT",
    oneLinerKey: "projects.gestureauth.oneLiner",
    techStack: ["Python", "OpenCV", "MediaPipe", "MQTT", "ESP32", "C++"],
    statusKey: "status.pocsimple",
    date: "2025",
    heroMediaPath: "/videos/gestureauth-hero.webm",
    heroMediaType: "video",
    hoverStartTime: 0,
    hoverEndTime: 6,
    problemKey: "projects.gestureauth.problem",
    solutionKey: "projects.gestureauth.solution",
    externalLinks: [
      {
        label: "GitHub Repository",
        url: "https://github.com/lipe0312/mqtt_iot",
      },
    ],
  },
  {
    name: "UFBER",
    oneLinerKey: "projects.ufber.oneLiner",
    techStack: ["Java", "OOP", "Terminal UI"],
    statusKey: "status.academic",
    date: "2024",
    heroMediaPath: "/images/ufber-hero.webp",
    heroMediaType: "image",
    problemKey: "projects.ufber.problem",
    solutionKey: "projects.ufber.solution",
    externalLinks: [
      {
        label: "GitHub Repository",
        url: "https://github.com/lipe0312/ufber-oop-java",
      },
    ],
  },
];