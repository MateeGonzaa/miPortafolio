import { useEffect, useRef, useState } from "react";
import { profile, links, projects, stack } from "./data";
import Portrait from "./Portrait";

const nav = [
  ["Sobre mí", "#sobre-mi"],
  ["Proyectos", "#proyectos"],
  ["Tecnologías", "#tecnologias"],
  ["Contacto", "#contacto"],
];

/* Halo violeta que sigue al cursor (se oculta con reduced motion) */
function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (ref.current)
        ref.current.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[500px] w-[500px] rounded-full bg-violet/20 blur-[120px] motion-reduce:hidden [@media(hover:none)]:hidden"
    />
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-ink/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#inicio" className="font-mono text-sm text-glow">
          &lt;mateo /&gt;
        </a>
        <nav className="hidden gap-8 text-sm text-mute sm:flex">
          {nav.map(([label, href]) => (
            <a key={href} href={href} className="transition-colors hover:text-lilac">
              {label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="-mr-2 flex h-10 w-10 flex-col items-center justify-center gap-1.5 sm:hidden"
        >
          <span className={`h-0.5 w-5 bg-lilac transition ${open ? "translate-y-1 rotate-45" : ""}`} />
          <span className={`h-0.5 w-5 bg-lilac transition ${open ? "-translate-y-1 -rotate-45" : ""}`} />
        </button>
      </div>
      {open && (
        <nav id="menu-movil" className="border-t border-line/70 px-6 py-3 sm:hidden">
          <ul>
            {nav.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-mute transition-colors hover:text-lilac"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

/* Ventana de editor: lo más característico de un dev frontend */
function CodeCard() {
  return (
    <div className="w-full max-w-md rounded-xl border border-line bg-panel shadow-[0_0_60px_-15px] shadow-violet/50">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-line" />
        <span className="h-3 w-3 rounded-full bg-line" />
        <span className="h-3 w-3 rounded-full bg-violet" />
        <span className="ml-3 font-mono text-xs text-mute">Mateo.jsx</span>
      </div>
      <pre className="overflow-hidden whitespace-pre px-3 py-4 font-mono text-[10px] leading-6 min-[380px]:text-[11px] sm:p-5 sm:text-[13px] sm:leading-7">
        <code>
          <span className="text-violet">const</span> <span className="text-lilac">mateo</span> = {"{"}
          {"\n"}  rol: <span className="text-glow">"Software Developer"</span>,
          {"\n"}  stack: [<span className="text-glow">"React"</span>, <span className="text-glow">"Tailwind"</span>, <span className="text-glow">"NextJS"</span>],
          {"\n"}  base: <span className="text-glow">"Argentina"</span>,
          {"\n"}  aprendiendo: <span className="text-violet">true</span>,
          {"\n"}{"}"};<span className="blink ml-1 inline-block h-4 w-2 translate-y-0.5 bg-glow" />
        </code>
      </pre>
    </div>
  );
}

function Hero() {
  return (
    <section id="inicio" className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-12 sm:pb-24 sm:pt-20 lg:grid-cols-[1.2fr_1fr] lg:gap-14 lg:pt-32">
      <div>
        <p className="font-mono text-sm text-mute">{profile.school}</p>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Hola, soy {profile.short}.
          <span className="block bg-gradient-to-r from-violet to-glow bg-clip-text text-transparent">
            Diseño y Programo Aplicaciones y Paginas Web.
          </span>
        </h1>
        <p className="mt-7 max-w-xl leading-relaxed text-mute">{profile.intro}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#proyectos" className="rounded-lg bg-violet px-6 py-3 text-sm font-semibold text-white transition hover:bg-glow hover:text-ink">
            Ver proyectos
          </a>
          <a href={links.github} target="_blank" rel="noreferrer" className="rounded-lg border border-line px-6 py-3 text-sm text-lilac transition hover:border-violet">
            Mi GitHub
          </a>
        </div>
      </div>
      <div className="flex justify-start lg:justify-end">
        <CodeCard />
      </div>
    </section>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
      <h2 className="text-3xl font-semibold tracking-tight text-white">{title}</h2>
      <div className="mt-8 sm:mt-10">{children}</div>
    </section>
  );
}

function About() {
  return (
    <Section id="sobre-mi" title="Sobre mí">
      <div className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-10 lg:grid-cols-[auto_1.4fr_1fr]">
        <Portrait />
        <div className="max-w-xl space-y-5 leading-relaxed text-mute">
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <dl className="space-y-5 border-t border-line pt-8 text-sm md:col-span-2 lg:col-span-1 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div>
            <dt className="text-mute">Ubicación</dt>
            <dd className="mt-1 text-lilac">{profile.location}</dd>
          </div>
          <div>
            <dt className="text-mute">Formación</dt>
            <dd className="mt-1 text-lilac">Desarrollo de Software</dd>
            <dd className="mt-1 text-lilac">Tecnico en Reparacion de PC</dd>
          </div>
          <div>
            <dt className="text-mute">Foco</dt>
            <dd className="mt-1 text-lilac">Frontend Developer</dd>
          </div>
        </dl>
      </div>
    </Section>
  );
}

function ProjectCard({ p }) {
  return (
    <article
      className={`group flex flex-col rounded-xl border border-line bg-panel p-5 transition-colors sm:p-7 hover:border-violet ${
        p.featured ? "md:col-span-2" : ""
      }`}
    >
      <h3 className={`font-semibold text-white ${p.featured ? "text-2xl" : "text-lg"}`}>{p.title}</h3>
      <p className="mt-3 max-w-2xl flex-1 text-sm leading-relaxed text-mute">{p.description}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <li key={t} className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-glow">
            {t}
          </li>
        ))}
      </ul>
      <a href={p.repo} target="_blank" rel="noreferrer" className="mt-6 text-sm text-lilac underline-offset-4 hover:text-glow hover:underline">
        Ver código en GitHub
      </a>
    </article>
  );
}

function Projects() {
  return (
    <Section id="proyectos" title="Proyectos">
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
    </Section>
  );
}

function Stack() {
  return (
    <Section id="tecnologias" title="Tecnologías">
      <div className="grid gap-10 md:grid-cols-3">
        {Object.entries(stack).map(([group, items]) => (
          <div key={group}>
            <h3 className="text-sm text-mute">{group}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {items.map((i) => (
                <li key={i} className="rounded-md border border-line bg-panel px-3 py-1.5 text-sm text-lilac">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const items = [
    ["LinkedIn", links.linkedin],
    ["GitHub", links.github],
    ["Instagram", links.instagram],
  ];
  return (
    <Section id="contacto" title="Contacto">
      <p className="max-w-lg text-mute">¿Tenés un proyecto o querés charlar? Escribime por cualquiera de estos medios.</p>
      <div className="mt-8 flex flex-wrap gap-4">
        {profile.email && (
          <a href={`mailto:${profile.email}`} className="rounded-lg bg-violet px-6 py-3 text-sm font-semibold text-white hover:bg-glow hover:text-ink">
            Enviar email
          </a>
        )}
        {items.map(([label, href]) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" className="rounded-lg border border-line px-6 py-3 text-sm text-lilac transition hover:border-violet">
            {label}
          </a>
        ))}
      </div>
    </Section>
  );
}

export default function App() {
  return (
    <>
      <CursorGlow />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Stack />
          <Contact />
        </main>
        <footer className="border-t border-line py-8 text-center text-sm text-mute">
          © {new Date().getFullYear()} {profile.name}. Portafolio Hecho con React + Vite y Tailwind.
        </footer>
      </div>
    </>
  );
}
