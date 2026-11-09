export const profile = {
  name: "Mateo Nicolás González",
  short: "Mateo",
  location: "Río Cuarto, Córdoba, Argentina",
  // email: "tu-email@ejemplo.com", // si lo descomentás, aparece el botón "Enviar email"
};

export const links = {
  github: "https://github.com/MateeGonzaa",
  linkedin: "https://www.linkedin.com/in/mateo-nicolas-gonzalez-094b11388/",
  instagram: "https://www.instagram.com/mategonzaleez",
};

// CV para descargar (archivo en /public)
export const cv = {
  href: "/CV-Mateo-Nicolas-Gonzalez.pdf",
  filename: "CV-Mateo-Nicolas-Gonzalez.pdf",
};

export const studyingSince = 2024;

export const projects = [
  {
    title: { es: "DOPARTI", en: "DOPARTI" },
    featured: true,
    description: {
      es: "Proyecto personal, Aplicacion Web/Mobile - DOPARTI - Una app para organizar partidos de distintos deportes entre comunidades formadas por tus amigos y conocidos",
      en: "Personal project, Web/Mobile Application - DOPARTI - An application for organizing matches in various sports within communities made up of your friends and acquaintances.",
    },
    tags: ["React + Vite", "JavaScript", "HTML", "Tailwind", "PostgreSQL"],
    web: "https://doparti-app.vercel.app/",
    repo: "https://github.com/MateeGonzaa/DOPARTI-APP",
  },
  {
    title: { es: "Tienda de Suplementos Deportivos", en: "Sports Supplements Store" },
    featured: true,
    description: {
      es: "Proyecto en equipo, un Sistema web e-commerce ficticio de ventas de productos de suplementacion deportiva",
      en: "Team project: a fictional e-commerce web system for selling sports supplements.",
    },
    tags: ["JavaScript", "HTML", "UnoCSS"],
    web: "https://myl-suplementos-deportivos.vercel.app/",
    repo: "https://github.com/MateeGonzaa/MyL-Suplementos-Deportivos",
  },
  {
    title: { es: "Rocket Pizza (Frontend)", en: "Rocket Pizza (Frontend)" },
    description: {
      es: "Proyecto en equipo, Rocket Pizza es una aplicación web ficticio desarrollada con Next.js que simula el sitio web de una pizzería. La aplicación permite navegar entre distintas secciones, visualizar productos, realizar pedidos y gestionar un carrito utilizando estado global y persistencia de datos, Además, integra una API externa para mostrar información obtenida dinámicamente desde internet.",
      en: "Team project. Rocket Pizza is a fictional web application built with Next.js that simulates a pizzeria's website. It lets users browse sections, view products, place orders and manage a shopping cart using global state and data persistence. It also integrates an external API to display information fetched dynamically from the internet.",
    },
    tags: ["NextJS", "React", "Tailwind"],
    repo: "https://github.com/AleQuiroga26/Rocket-Pizza",
  },
  {
    title: { es: "Sistema de Gestión de Cine (Backend)", en: "Cinema Management System (Backend)" },
    description: {
      es: "Un sistema web desarrollado con Django que permite administrar la cartelera de un cine, gestionar funciones y realizar la reserva de asientos de manera sencilla e intuitiva.",
      en: "A web system built with Django to manage a cinema's listings, schedule showtimes and reserve seats in a simple and intuitive way.",
    },
    tags: ["Django", "Python", "MySQL", "HTML/CSS"],
    repo: "https://github.com/MateeGonzaa/tp-cine-django",
  },
  {
    title: { es: "MiniBlog", en: "MiniBlog" },
    description: {
      es: "El proyecto está dividido en un Frontend (JavaScript/React) y un Backend (API REST con Flask/Python).",
      en: "The project is split into a Frontend (JavaScript/React) and a Backend (REST API with Flask/Python).",
    },
    tags: ["React + Vite", "CSS", "Python", "Flask"],
    repo: "https://github.com/MateeGonzaa/efiJavaScript",
    extra: [{ label: { es: "Backend (Flask)", en: "Backend (Flask)" }, href: "https://github.com/MateeGonzaa/efiPython" }],
  },
  {
    title: { es: "Biblioteca Personal", en: "Personal Library" },
    description: {
      es: "Sistema web para gestionar una biblioteca personal de forma digital: registrar libros, ordenarlos, filtrarlos, editarlos, eliminarlos y ver estadísticas generales.",
      en: "Web system to manage a personal library digitally: add books, sort, filter, edit and delete them, and see general statistics.",
    },
    tags: ["JavaScript", "HTML", "CSS"],
    repo: "https://github.com/MateeGonzaa/practico_evaluativoJS",
  },
  {
    title: { es: "Reto: Bootstrap vs UnoCSS", en: "Challenge: Bootstrap vs UnoCSS" },
    description: {
      es: "Reto grupal para trabajar con frameworks CSS: Bootstrap y UnoCSS. Hecho junto a Lucas Aruza.",
      en: "Group challenge working with CSS frameworks: Bootstrap and UnoCSS. Built together with Lucas Aruza.",
    },
    tags: ["HTML", "Bootstrap", "UnoCSS"],
    repo: "https://github.com/MateeGonzaa/reto04prog2",
  },
  {
    title: { es: "Automatización con GitHub Actions", en: "Automation with GitHub Actions" },
    description: {
      es: "Trabajo de DevOps donde configuré flujos de integración continua con GitHub Actions.",
      en: "DevOps assignment where I set up continuous integration workflows with GitHub Actions.",
    },
    tags: ["JavaScript", "GitHub Actions"],
    repo: "https://github.com/MateeGonzaa/efiDevops",
  },
];

// Íconos desde devicon (CDN). `invert: true` = ícono oscuro que se invierte para verse en fondo negro.
const di = (name, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;

export const stack = {
  frontend: [
    { name: "React", icon: di("react") },
    { name: "Next.js", icon: di("nextjs"), invert: true },
    { name: "TypeScript", icon: di("typescript") },
    { name: "JavaScript", icon: di("javascript") },
    { name: "HTML5", icon: di("html5") },
    { name: "CSS3", icon: di("css3") },
    { name: "Tailwind CSS", icon: di("tailwindcss") },
    { name: "Bootstrap", icon: di("bootstrap") },
    { name: "UnoCSS" },
  ],
  backend: [
    { name: "Python", icon: di("python") },
    { name: "Django", icon: di("django"), invert: true },
    { name: "Flask", icon: di("flask"), invert: true },
    { name: "Node.js", icon: di("nodejs") },
    { name: "MySQL", icon: di("mysql") },
    { name: "PostgreSQL", icon: di("postgresql") },
    { name: "Supabase", icon: di("supabase") },
  ],
  tools: [
    { name: "Git", icon: di("git") },
    { name: "GitHub", icon: di("github"), invert: true },
    { name: "Docker", icon: di("docker") },
    { name: "Figma", icon: di("figma") },
    { name: "Vercel", icon: di("vercel"), invert: true },
    { name: "Render" },
    { name: "Thunder Client" },
    { name: "npm", icon: di("npm") },
    { name: "Linux", icon: di("linux") },
    { name: "Arduino", icon: di("arduino") },
  ],
};