import { useEffect, useRef, useState } from "react";
import { profile, links, cv, projects, stack, studyingSince } from "./data";
import Portrait from "./Portrait";
import { useLang } from "./LanguageContext";

const navLinks = [
  ["about", "#sobre-mi"],
  ["projects", "#proyectos"],
  ["stack", "#tecnologias"],
  ["contact", "#contacto"],
];

/* ───────────── Íconos (SVG inline) ───────────── */
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

function Icon({ name, className = "h-4 w-4" }) {
  const common = { viewBox: "0 0 24 24", className, "aria-hidden": true };
  switch (name) {
    case "download":
      return (
        <svg {...common} {...stroke}>
          <path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common} {...stroke}>
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common} {...stroke}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} {...stroke}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
        </svg>
      );
    case "github":
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common} fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "up":
      return (
        <svg {...common} {...stroke}>
          <path d="M12 19V5m0 0-6 6m6-6 6 6" />
        </svg>
      );
    default:
      return null;
  }
}

/* ───────────── Utilidades de animación ───────────── */

/* Aparece suavemente cuando entra en pantalla */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${shown ? "in" : ""} ${className}`}>
      {children}
    </div>
  );
}

/* Efecto de máquina de escribir con varias frases */
function useTypewriter(words) {
  const reduced = typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [text, setText] = useState(reduced ? words[0] : "");
  useEffect(() => {
    if (reduced) {
      setText(words[0]);
      return;
    }
    let i = 0;
    let j = 0;
    let deleting = false;
    let timer;
    const tick = () => {
      const word = words[i];
      if (!deleting) {
        j += 1;
        setText(word.slice(0, j));
        if (j === word.length) {
          deleting = true;
          timer = setTimeout(tick, 1700);
          return;
        }
        timer = setTimeout(tick, 65);
      } else {
        j -= 1;
        setText(word.slice(0, j));
        if (j === 0) {
          deleting = false;
          i = (i + 1) % words.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 30);
      }
    };
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [words, reduced]);
  return text;
}

/* Barra de progreso de scroll */
function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      if (ref.current) ref.current.style.width = `${max > 0 ? (el.scrollTop / max) * 100 : 0}%`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed left-0 top-0 z-50 h-0.5 w-0 bg-gradient-to-r from-violet via-glow to-fuchsia-400"
    />
  );
}

/* Halo violeta que sigue al cursor (se oculta con reduced motion) */
function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (ref.current) ref.current.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
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

/* ───────────── Piezas reutilizables ───────────── */

function CvButton({ className = "", children, variant = "solid" }) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition";
  const styles =
    variant === "solid"
      ? "bg-violet text-white shadow-[0_0_30px_-8px] shadow-violet hover:bg-glow hover:text-ink"
      : "border border-line text-lilac hover:border-violet";
  return (
    <a href={cv.href} download={cv.filename} className={`${base} ${styles} ${className}`}>
      <Icon name="download" className="h-4 w-4 transition group-hover:translate-y-0.5" />
      {children}
    </a>
  );
}

function TechIcon({ item, size = "h-5 w-5" }) {
  const [failed, setFailed] = useState(false);
  if (!item.icon || failed) {
    return (
      <span className={`${size} grid place-items-center rounded bg-violet/20 font-mono text-[9px] font-bold text-glow`}>
        {item.name.slice(0, 2)}
      </span>
    );
  }
  return (
    <img
      src={item.icon}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${size} ${item.invert ? "invert" : ""}`}
    />
  );
}

function LangToggle() {
  const { lang, setLang, t } = useLang();
  return (
    <div role="group" aria-label={t.langLabel} className="flex items-center overflow-hidden rounded-md border border-line font-mono text-xs">
      {["es", "en"].map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2.5 py-1.5 uppercase transition-colors ${lang === l ? "bg-violet text-white" : "text-mute hover:text-lilac"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-ink/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#inicio" className="font-mono text-sm text-glow">
          &lt;mateo /&gt;
        </a>
        <div className="flex items-center gap-4 sm:gap-7">
          <nav className="hidden gap-7 text-sm text-mute md:flex">
            {navLinks.map(([key, href]) => (
              <a key={href} href={href} className="transition-colors hover:text-lilac">
                {t.nav[key]}
              </a>
            ))}
          </nav>
          <a
            href={cv.href}
            download={cv.filename}
            className="hidden items-center gap-1.5 rounded-md border border-violet/60 px-3 py-1.5 text-xs font-semibold text-lilac transition hover:bg-violet hover:text-white sm:inline-flex"
          >
            <Icon name="download" className="h-3.5 w-3.5" />
            {t.cvShort}
          </a>
          <LangToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? t.menuClose : t.menuOpen}
            className="-mr-2 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className={`h-0.5 w-5 bg-lilac transition ${open ? "translate-y-1 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-lilac transition ${open ? "-translate-y-1 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <nav id="menu-movil" className="border-t border-line/70 px-6 py-3 md:hidden">
          <ul>
            {navLinks.map(([key, href]) => (
              <li key={href}>
                <a href={href} onClick={() => setOpen(false)} className="block py-3 text-mute transition-colors hover:text-lilac">
                  {t.nav[key]}
                </a>
              </li>
            ))}
            <li>
              <a href={cv.href} download={cv.filename} className="block py-3 font-semibold text-glow">
                {t.downloadCv}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

/* Ventana de editor flotante sobre la foto */
function CodeCard() {
  const { t } = useLang();
  return (
    <div className="float w-60 rounded-xl border border-line bg-panel/90 shadow-[0_0_50px_-12px] shadow-violet/60 backdrop-blur sm:w-64">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-violet" />
        <span className="ml-2 font-mono text-[10px] text-mute">Mateo.jsx</span>
      </div>
      <pre className="overflow-hidden px-3 py-3 font-mono text-[11px] leading-5">
        <code>
          <span className="text-violet">const</span> <span className="text-lilac">mateo</span> = {"{"}
          {"\n"}  {t.codeRole}: <span className="text-glow">"Full Stack"</span>,
          {"\n"}  stack: [<span className="text-glow">"React"</span>, <span className="text-glow">"Django"</span>],
          {"\n"}  {t.codeLearning}: <span className="text-violet">true</span>,
          {"\n"}{"}"};<span className="blink ml-1 inline-block h-3.5 w-1.5 translate-y-0.5 bg-glow" />
        </code>
      </pre>
    </div>
  );
}

function FloatChip({ children, className = "", slow = false }) {
  return (
    <span
      aria-hidden="true"
      className={`${slow ? "float-slow" : "float"} absolute hidden items-center rounded-full border border-line bg-panel/90 px-3 py-1.5 font-mono text-xs text-glow shadow-lg shadow-violet/20 backdrop-blur sm:inline-flex ${className}`}
    >
      {children}
    </span>
  );
}

function Hero() {
  const { t } = useLang();
  const typed = useTypewriter(t.roles);
  return (
    <section id="inicio" className="mx-auto grid max-w-6xl items-center gap-16 px-6 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:pt-24">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <p className="rounded-md border border-line bg-panel px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-glow">{t.school}</p>
          <p className="inline-flex items-center gap-2 text-xs text-mute">
            <span className="relative flex h-2 w-2">
              <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {t.openToWork}
          </p>
        </div>
        <h1 className="mt-7 text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {t.hello}{" "}
          <span className="bg-gradient-to-r from-violet via-glow to-fuchsia-400 bg-clip-text text-transparent">{profile.short}</span>.
        </h1>
        <p className="mt-6 min-h-8 font-mono text-lg text-lilac sm:text-xl" aria-live="off">
          <span className="text-violet">&gt; </span>
          {typed}
          <span className="blink ml-0.5 inline-block h-5 w-2.5 translate-y-1 bg-glow" aria-hidden="true" />
        </p>
        <p className="mt-6 max-w-xl leading-relaxed text-mute">{t.intro}</p>
        <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
          <CvButton>{t.downloadCv}</CvButton>
          <a href="#proyectos" className="inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3 text-sm text-lilac transition hover:border-violet">
            {t.seeProjects}
            <Icon name="arrow" />
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            aria-label={t.myGithub}
            className="grid h-11 w-11 place-items-center rounded-lg border border-line text-lilac transition hover:border-violet hover:text-glow"
          >
            <Icon name="github" className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="relative">
        <Portrait />
        <div className="absolute -bottom-8 -left-2 z-10 sm:-left-10">
          <CodeCard />
        </div>
        <FloatChip className="-right-3 top-10">React</FloatChip>
        <FloatChip slow className="-left-6 top-24">Python</FloatChip>
        <FloatChip className="-right-6 top-[46%]">Next.js</FloatChip>
      </div>
    </section>
  );
}

/* Franja con carrusel infinito de tecnologías */
function Marquee() {
  const { t } = useLang();
  const items = [...stack.frontend, ...stack.backend, ...stack.tools].filter((i) => i.icon);
  const loop = [...items, ...items];
  return (
    <div className="mt-10 border-y border-line/70 bg-panel/40 py-5 sm:mt-14">
      <p className="mb-4 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-mute">{t.techWith}</p>
      <div
        className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
        aria-hidden="true"
      >
        <div className="marquee-track gap-10 pr-10">
          {loop.map((item, i) => (
            <span key={i} className="flex shrink-0 items-center gap-2.5 text-sm text-mute">
              <TechIcon item={item} size="h-6 w-6" />
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stats() {
  const { t } = useLang();
  const techCount = new Set(Object.values(stack).flat().map((i) => i.name)).size;
  const items = [
    [projects.length, t.stats.projects],
    [techCount, t.stats.tech],
    [studyingSince, t.stats.since],
  ];
  return (
    <section aria-label="stats" className="mx-auto max-w-6xl px-6 pt-14 sm:pt-20">
      <Reveal>
        <dl className="grid grid-cols-3 divide-x divide-line overflow-hidden rounded-2xl border border-line bg-panel/60">
          {items.map(([value, label]) => (
            <div key={label} className="px-3 py-6 text-center sm:py-8">
              <dd className="bg-gradient-to-b from-white to-glow bg-clip-text text-3xl font-semibold text-transparent sm:text-5xl">
                {typeof value === "number" && value !== studyingSince ? `${value}+` : value}
              </dd>
              <dt className="mt-2 text-xs text-mute sm:text-sm">{label}</dt>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

function Section({ id, index, title, intro, children }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <Reveal>
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm text-violet">{index}</span>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
          <span aria-hidden="true" className="hidden h-px flex-1 bg-gradient-to-r from-line to-transparent sm:block" />
        </div>
        {intro && <p className="mt-3 max-w-xl text-sm text-mute">{intro}</p>}
      </Reveal>
      <div className="mt-10 sm:mt-12">{children}</div>
    </section>
  );
}

function About() {
  const { t } = useLang();
  return (
    <Section id="sobre-mi" index="01" title={t.about.title}>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal>
          <div className="space-y-5 leading-relaxed text-mute">
            {t.about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="mt-8 grid gap-6 border-t border-line pt-8 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-mute">{t.about.location}</dt>
              <dd className="mt-1 text-lilac">{profile.location}</dd>
            </div>
            <div>
              <dt className="text-mute">{t.about.languages}</dt>
              <dd className="mt-1 text-lilac">{t.about.languagesValue}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-mute">{t.about.interests}</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {t.about.interestsValue.map((i) => (
                  <span key={i} className="rounded-full border border-violet/40 bg-violet/10 px-3 py-1 text-xs text-lilac">
                    {i}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={120}>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-glow">{t.about.educationTitle}</h3>
          <ol className="relative mt-6 space-y-8 border-l border-line pl-7">
            {t.about.timeline.map((item, i) => (
              <li key={item.title} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[2.15rem] top-1.5 h-3 w-3 rounded-full border-2 ${
                    i === 0 ? "border-violet bg-violet shadow-[0_0_14px] shadow-violet" : "border-line bg-ink"
                  }`}
                />
                <p className="font-mono text-xs text-mute">{item.period}</p>
                <p className="mt-1 font-semibold text-white">{item.title}</p>
                <p className="mt-0.5 text-sm text-mute">{item.place}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  );
}

const covers = [
  "from-violet/50 via-fuchsia-500/20",
  "from-indigo-500/40 via-violet/25",
  "from-fuchsia-500/35 via-violet/20",
  "from-violet/40 via-sky-500/20",
];

function hostOf(url) {
  try {
    const u = new URL(url);
    return `${u.host}${u.pathname === "/" ? "" : u.pathname}`;
  } catch {
    return url;
  }
}

function ProjectCard({ p, index }) {
  const { t, lang } = useLang();
  const num = String(index + 1).padStart(2, "0");
  const showSite = p.web && p.web !== p.repo;
  const linkCls =
    "inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-xs text-lilac transition hover:border-violet hover:text-glow";
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel transition duration-300 hover:-translate-y-1 hover:border-violet hover:shadow-[0_20px_60px_-25px] hover:shadow-violet/60 ${
        p.featured ? "md:col-span-2 md:flex-row" : ""
      }`}
    >
      <div className={`relative h-32 shrink-0 overflow-hidden bg-gradient-to-br ${covers[index % covers.length]} to-transparent ${p.featured ? "md:h-auto md:w-2/5" : ""}`}>
        <div className="absolute left-4 top-3 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
        </div>
        <span className="absolute left-4 top-8 max-w-[85%] truncate font-mono text-[11px] text-white/50">{hostOf(p.web || p.repo)}</span>
        <span className="absolute -bottom-3 right-3 font-mono text-7xl font-bold leading-none text-white/10 transition group-hover:text-white/20">{num}</span>
        {p.featured && (
          <span className="absolute bottom-4 left-4 rounded-full bg-ink/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-glow backdrop-blur">
            {t.featured}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <h3 className={`font-semibold text-white ${p.featured ? "text-2xl" : "text-lg"}`}>{p.title[lang]}</h3>
        <p className={`mt-3 flex-1 text-sm leading-relaxed text-mute ${p.featured ? "" : "line-clamp-5"}`}>{p.description[lang]}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((tag) => (
            <li key={tag} className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-glow">
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <a href={p.repo} target="_blank" rel="noreferrer" className={linkCls}>
            <Icon name="github" className="h-3.5 w-3.5" />
            {p.repoLabel ? p.repoLabel[lang] : t.viewCode}
          </a>
          {p.extra?.map((e) => (
            <a key={e.href} href={e.href} target="_blank" rel="noreferrer" className={linkCls}>
              <Icon name="github" className="h-3.5 w-3.5" />
              {e.label[lang]}
            </a>
          ))}
          {showSite && (
            <a href={p.web} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-violet px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-glow hover:text-ink">
              {t.viewSite}
              <Icon name="arrow" className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const { t } = useLang();
  return (
    <Section id="proyectos" index="02" title={t.projectsTitle} intro={t.projectsIntro}>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.repo} delay={(i % 2) * 90} className={p.featured ? "md:col-span-2" : ""}>
            <ProjectCard p={p} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Stack() {
  const { t } = useLang();
  return (
    <Section id="tecnologias" index="03" title={t.stackTitle}>
      <div className="grid gap-5 md:grid-cols-3">
        {Object.entries(stack).map(([group, items], gi) => (
          <Reveal key={group} delay={gi * 90}>
            <div className="h-full rounded-2xl border border-line bg-panel p-6 transition hover:border-violet/70">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-glow">{t.stackGroups[group]}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {items.map((i) => (
                  <li
                    key={i.name}
                    className="flex items-center gap-2 rounded-lg border border-line bg-ink/60 px-3 py-1.5 text-sm text-lilac transition hover:border-violet hover:bg-violet/10"
                  >
                    <TechIcon item={i} />
                    {i.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={120}>
        <div className="mt-5 flex flex-col gap-2 rounded-2xl border border-dashed border-violet/40 bg-violet/5 p-6 sm:flex-row sm:items-center sm:gap-8">
          <p className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-glow">{t.exploring}</p>
          <p className="text-sm text-mute">{t.exploringText}</p>
        </div>
      </Reveal>
    </Section>
  );
}

function Contact() {
  const { t } = useLang();
  const social = [
    ["LinkedIn", links.linkedin, "linkedin"],
    ["GitHub", links.github, "github"],
    ["Instagram", links.instagram, "instagram"],
  ];
  return (
    <Section id="contacto" index="04" title={t.contactTitle}>
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-violet/40 bg-gradient-to-br from-violet/20 via-panel to-panel p-8 sm:p-12">
          <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet/30 blur-[90px]" />
          <div className="relative">
            <h3 className="max-w-lg text-3xl font-semibold leading-tight text-white sm:text-4xl">{t.contactHeading}</h3>
            <p className="mt-4 max-w-lg text-mute">{t.contactText}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CvButton>{t.downloadCv}</CvButton>
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3 text-sm text-lilac transition hover:border-violet"
                >
                  <Icon name="mail" />
                  {t.sendEmail}
                </a>
              )}
              {social.map(([label, href, icon]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-ink/40 px-5 py-3 text-sm text-lilac transition hover:border-violet hover:text-glow"
                >
                  <Icon name={icon} className="h-4 w-4" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export default function App() {
  const { t } = useLang();
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Marquee />
          <Stats />
          <About />
          <Projects />
          <Stack />
          <Contact />
        </main>
        <footer className="border-t border-line py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-mute sm:flex-row">
            <p>
              © {new Date().getFullYear()} {profile.name}. {t.footer}
            </p>
            <a href="#inicio" className="inline-flex items-center gap-1.5 transition hover:text-lilac">
              <Icon name="up" className="h-3.5 w-3.5" />
              {t.backToTop}
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}