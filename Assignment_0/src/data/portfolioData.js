export const personalInfo = {
  name: "Anmol Jangra",
  role: "Software Engineer",
  tagline: "I architect high-performance systems, intelligent AI agents, and robust backend infrastructures.",
  about: "I am a Software Engineer deeply passionate about architecting complex, high-performance systems. My work spans across multiple domains—from building offline, privacy-first AI desktop assistants and multi-agent verification engines, to engineering lightweight OS distributions and secure, multi-tenant command centers. I thrive on solving hard engineering problems, designing robust backend infrastructures, and integrating cutting-edge artificial intelligence into practical, scalable tools.",
  email: "anmolrajotiya@gmail.com",
  socials: {
    github: "https://github.com/Anmo07",
    linkedin: "https://www.linkedin.com/in/anmoljangra"
  }
};

export const skills = [
  { name: "Python", category: "Languages" },
  { name: "Git & GitHub", category: "DevOps & Tools" },
  { name: "Docker & Containers", category: "DevOps & Tools" },
  { name: "Linux / Fedora", category: "Systems" },
  { name: "Multi-Agent AI", category: "AI & ML" },
  { name: "Local LLMs", category: "AI & ML" },
  { name: "System Architecture", category: "Systems" },
  { name: "React & Modern Web", category: "Frontend" },
  { name: "Django & REST APIs", category: "Backend" }
];

export const projects = [
  {
    id: "forgeflow",
    title: "ForgeFlow",
    subtitle: "IT Managed Service Provider Command Center",
    description: "Lightweight, high-performance command center built for IT Managed Service Providers.",
    features: [
      "Multi-tenant isolated client portals",
      "Contract-aware billing & CRM tools"
    ],
    tags: ["Python", "Django", "Multi-Tenant", "PostgreSQL"],
    githubUrl: "https://github.com/Anmo07/ForgeFlow",
    featured: true
  },
  {
    id: "friday",
    title: "Friday",
    subtitle: "Multi-Agent Truth Verification System",
    description: "AI-powered truth verification system using multi-agent intelligence for fake news detection.",
    features: [
      "Verifies news authenticity in real-time",
      "Orchestrates multiple LLM agents for consensus"
    ],
    tags: ["Python", "Agentic AI", "Local LLMs", "Consensus Engine"],
    githubUrl: "https://github.com/Anmo07/Friday",
    featured: true
  },
  {
    id: "ghostcore",
    title: "The-Project (GhostCore)",
    subtitle: "Offline Privacy-First Desktop AI Assistant",
    description: "A high-performance, private, and fully offline AI assistant designed for desktop use.",
    features: [
      "100% offline private execution",
      "Handles local file system context and tasks"
    ],
    tags: ["Python", "Local LLMs", "System Engineering", "IPC"],
    githubUrl: "https://github.com/Anmo07/The-Project",
    featured: true
  },
  {
    id: "vibeos",
    title: "VibeOS",
    subtitle: "Custom Fedora-Based OS Distribution",
    description: "A Fedora-based, macOS-inspired operating system with a modern automated build pipeline.",
    features: [
      "Immutable Fedora base with GNOME tweaks",
      "Fully containerized automated build system"
    ],
    tags: ["Fedora", "Docker", "Shell Scripting", "CI/CD"],
    githubUrl: "https://github.com/Anmo07/VibeOS",
    featured: true
  }
];

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" }
];
