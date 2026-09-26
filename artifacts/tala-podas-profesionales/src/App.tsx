import { useEffect, useState, type ReactNode } from 'react';
import { Route, Switch, Link, useLocation, Router as WouterRouter } from 'wouter';
import {
  ArrowUpRight, Check, ChevronRight, ExternalLink, HardHat, Leaf, Menu, MessageCircle,
  LockKeyhole, Phone, Plus, Quote, ShieldCheck, Star,
  TreePine, X, Wrench, Trash2, Save, ImagePlus
} from 'lucide-react';
import alturaImg from '@assets/generated_images/tala-altura.jpg';
import fellingImg from '@assets/generated_images/tala-controlada.jpg';
import { ErrorBoundary } from '@/components/error-boundary';
import logoImg from '@assets/7032_1790454238277.jpg';
import contactGraphicImg from '@assets/7070_1790454243233.jpg';

const LOGO = logoImg;
const CONTACT_GRAPHIC = contactGraphicImg;
const WHATSAPP = '584143697204';
const STORAGE_KEY = 'tala-podas-site-v1';

type Testimonial = { id: string; name: string; area: string; quote: string };
type GalleryItem = { id: string; title: string; type: string; image: string; alt: string; mediaType?: 'image' | 'video' };
type SiteData = {
  heroTitle: string;
  heroText: string;
  locality: string;
  testimonials: Testimonial[];
  gallery: GalleryItem[];
};

const defaultData: SiteData = {
  heroTitle: 'Árboles altos. Trabajo preciso.',
  heroText: 'Poda, tala controlada y trabajo en altura para hogares, comercios y comunidades que necesitan resolver con seguridad.',
  locality: 'Servicio local · Atención directa',
  testimonials: [
    { id: 't1', name: 'María González', area: 'El Hatillo', quote: 'Llegaron puntuales, aislaron el área y dejaron todo impecable. Se nota que saben trabajar en altura.' },
    { id: 't2', name: 'Carlos Rivas', area: 'La Trinidad', quote: 'Nos explicaron cada paso de la tala y retiraron todas las ramas el mismo día. Muy responsables.' },
    { id: 't3', name: 'Conjunto Los Naranjos', area: 'Baruta', quote: 'El equipo trabajó ordenado y con los implementos completos. La atención por WhatsApp fue inmediata.' },
  ],
  gallery: [
    { id: 'g1', title: 'Poda en altura', type: 'Trabajo con cuerdas', image: alturaImg, alt: 'Trabajador realizando poda en altura con arnés', mediaType: 'image' },
    { id: 'g2', title: 'Tala controlada', type: 'Descenso por secciones', image: fellingImg, alt: 'Equipo realizando tala controlada con cuerdas', mediaType: 'image' },
    { id: 'g3', title: 'Limpieza y retiro', type: 'Entrega limpia', image: alturaImg, alt: 'Equipo profesional retirando ramas', mediaType: 'image' },
  ],
};

function loadData(): SiteData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultData;
    const parsed = JSON.parse(saved) as Partial<SiteData>;
    return { ...defaultData, ...parsed, testimonials: parsed.testimonials ?? defaultData.testimonials, gallery: parsed.gallery ?? defaultData.gallery };
  } catch { return defaultData; }
}

function waLink(message = 'Hola, quisiera solicitar una consulta para un trabajo de árboles.') {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

function WhatsAppButton({ compact = false, label = 'Hablar por WhatsApp' }: { compact?: boolean; label?: string }) {
  return (
    <a data-testid="link-whatsapp" className={`focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-[hsl(var(--secondary))] px-5 py-3 text-sm font-bold text-[hsl(var(--secondary-foreground))] shadow-[0_5px_0_hsl(32_82%_40%)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_7px_0_hsl(32_82%_40%)] active:translate-y-0 active:shadow-[0_3px_0_hsl(32_82%_40%)] ${compact ? 'px-3 py-2 text-xs' : ''}`} href={waLink()} target="_blank" rel="noreferrer">
      <MessageCircle size={compact ? 15 : 18} strokeWidth={2.5} /> {label}
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const nav = [['Servicios', '#servicios'], ['Cómo trabajamos', '#proceso'], ['Trabajos', '#trabajos'], ['Opiniones', '#opiniones']];
  return (
    <header className="absolute left-0 right-0 top-0 z-30 border-b border-white/15 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a data-testid="link-logo" href="#inicio" className="focus-ring flex items-center gap-3">
          <img src={LOGO} alt="Tala y Podas Profesionales" className="h-11 w-auto max-w-[190px] object-contain object-left" />
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map(([name, href]) => <a data-testid={`link-nav-${name}`} key={href} href={href} className="text-[12px] font-bold uppercase tracking-[.14em] text-white/75 transition-colors hover:text-white">{name}</a>)}
          <WhatsAppButton compact label="Consulta sin compromiso" />
        </nav>
        <button data-testid="button-mobile-menu" aria-label="Abrir menú" onClick={() => setOpen(!open)} className="focus-ring rounded-md p-2 lg:hidden">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="border-t border-white/15 bg-[hsl(155_38%_16%/.97)] px-5 py-5 lg:hidden">
        <div className="flex flex-col gap-5">
          {nav.map(([name, href]) => <a data-testid={`link-mobile-${name}`} onClick={() => setOpen(false)} key={href} href={href} className="text-sm font-bold uppercase tracking-[.12em] text-white/80">{name}</a>)}
          <WhatsAppButton label="Hablar con un profesional" />
        </div>
      </div>}
    </header>
  );
}

function Hero({ data }: { data: SiteData }) {
  return (
    <section id="inicio" className="relative min-h-[690px] overflow-hidden bg-[#17382b] text-white">
      <img src={alturaImg} alt="Arborista trabajando en altura entre árboles" className="absolute inset-0 h-full w-full object-cover object-center opacity-80" />
      <div className="hero-photo absolute inset-0" />
      <div className="relative mx-auto flex min-h-[690px] max-w-7xl items-end px-5 pb-16 pt-36 lg:px-8 lg:pb-24">
        <div className="max-w-3xl">
          <div className="reveal mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.22em] text-[#ffc048]"><span className="h-px w-10 bg-[#ffc048]" /> {data.locality}</div>
          <h1 data-testid="text-hero-title" className="reveal reveal-delay-1 max-w-4xl font-display text-[clamp(4rem,10vw,8.7rem)] font-extrabold uppercase leading-[.83] tracking-[-.035em] text-balance">{data.heroTitle}</h1>
          <p data-testid="text-hero-description" className="reveal reveal-delay-2 mt-7 max-w-xl text-lg leading-relaxed text-white/78">{data.heroText}</p>
          <div className="reveal reveal-delay-3 mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <WhatsAppButton label="Solicitar evaluación" />
            <a data-testid="link-hero-services" href="#servicios" className="focus-ring inline-flex items-center gap-2 px-1 py-3 text-sm font-bold text-white/85 transition-colors hover:text-[#ffb53f]">Ver servicios <ArrowUpRight size={17} /></a>
          </div>
          <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/20 pt-5 text-[11px] font-bold uppercase tracking-[.12em] text-white/55">
            <span className="flex items-center gap-2"><ShieldCheck size={15} className="text-[#ffb53f]" /> Equipo certificado</span>
            <span className="flex items-center gap-2"><HardHat size={15} className="text-[#ffb53f]" /> Seguridad primero</span>
            <span className="flex items-center gap-2"><Leaf size={15} className="text-[#ffb53f]" /> Trabajo responsable</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 hidden w-[34%] max-w-[420px] border-l border-t border-white/15 bg-[#17382b]/70 p-7 backdrop-blur-sm lg:block">
        <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[.13em] text-white/55">Atendemos emergencias, mantenimientos programados y proyectos especiales.</p>
        <a href={`tel:+${WHATSAPP}`} className="mt-4 flex items-center gap-3 font-display text-3xl font-bold tracking-wide"><Phone size={20} className="text-[#ffb53f]" /> 0414 369 7204</a>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, copy, light = false }: { eyebrow: string; title: ReactNode; copy?: string; light?: boolean }) {
  return <div className={`max-w-2xl ${light ? 'text-white' : ''}`}>
    <div className={`mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.2em] ${light ? 'text-[#ffb53f]' : 'text-[#e2752d]'}`}><span className="h-px w-9 bg-current" /> {eyebrow}</div>
    <h2 className="font-display text-5xl font-extrabold uppercase leading-[.9] tracking-[-.02em] sm:text-6xl">{title}</h2>
    {copy && <p className={`mt-5 max-w-xl text-base leading-relaxed ${light ? 'text-white/65' : 'text-[#536158]'}`}>{copy}</p>}
  </div>;
}

function Services() {
  const services = [
    { n: '01', icon: TreePine, title: 'Poda profesional', text: 'Formación, mantenimiento y despeje de ramas con cortes limpios que cuidan la estructura del árbol.' },
    { n: '02', icon: Wrench, title: 'Tala controlada', text: 'Desmontaje por secciones en espacios reducidos, con cuerdas, planificación y perímetro seguro.' },
    { n: '03', icon: HardHat, title: 'Trabajo en altura', text: 'Acceso técnico para árboles difíciles, fachadas, techos y líneas donde la precisión importa.' },
    { n: '04', icon: Leaf, title: 'Limpieza y retiro', text: 'Troceado, retiro de ramas y recolección de residuos orgánicos. El lugar queda listo para usar.' },
  ];
  return <section id="servicios" className="bg-[hsl(var(--background))] px-5 py-24 lg:px-8 lg:py-32">
    <div className="mx-auto max-w-7xl">
      <SectionHeading eyebrow="Lo que resolvemos" title={<>Un equipo para cada<br /><span className="text-[#e2752d]">riesgo del árbol.</span></>} copy="No improvisamos con altura, peso ni espacio. Evaluamos antes de cortar y ejecutamos con el equipo adecuado." />
      <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {services.map(({ n, icon: Icon, title, text }) => <article key={n} className="service-card group border border-[#d6d3c8] bg-[#f0eee5] p-6">
          <div className="flex items-start justify-between"><span className="font-mono text-xs text-[#8a928b]">{n}</span><Icon size={25} strokeWidth={1.5} className="text-[#e2752d] transition-transform group-hover:rotate-[-8deg]" /></div>
          <h3 className="mt-16 font-display text-3xl font-bold uppercase leading-none">{title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-[#59645d]">{text}</p>
          <div className="mt-6 h-1 w-8 bg-[#ffb53f] transition-all group-hover:w-16" />
        </article>)}
      </div>
    </div>
  </section>;
}

function Process() {
  const steps = [['01', 'Cuéntanos el problema', 'Escríbenos por WhatsApp y envíanos fotos o ubicación.'], ['02', 'Revisamos el sitio', 'Evaluamos altura, accesos, entorno y el estado del árbol.'], ['03', 'Acordamos el plan', 'Te presentamos alcance, fecha y condiciones de trabajo.'], ['04', 'Trabajamos seguros', 'Aislamos el área, ejecutamos y entregamos limpio.']];
  return <section id="proceso" className="line-grid bg-[#e8e8df] px-5 py-24 lg:px-8 lg:py-28">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><SectionHeading eyebrow="Así trabajamos" title={<>Orden antes<br />que velocidad.</>} copy="Cada servicio tiene un plan. La confianza se construye dejando claras las decisiones antes de subir." /><WhatsAppButton label="Agendar evaluación" /></div>
      <div className="mt-16 grid gap-px bg-[#c2c8bc] md:grid-cols-4">{steps.map(([num, title, text]) => <div key={num} className="bg-[#e8e8df] p-6 md:min-h-[200px]"><span className="font-mono text-xs text-[#e2752d]">{num}</span><h3 className="mt-12 font-display text-2xl font-bold uppercase leading-none">{title}</h3><p className="mt-3 text-sm leading-relaxed text-[#59645d]">{text}</p></div>)}</div>
    </div>
  </section>;
}

function SafetyBand() {
  return <section className="overflow-hidden bg-[#17382b] py-4 text-[#ffb53f]"><div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap"><span className="font-display text-xl font-bold uppercase tracking-[.08em]">Seguridad visible · trabajo limpio · respuesta directa</span><span className="text-2xl">—</span><span className="font-display text-xl font-bold uppercase tracking-[.08em]">Seguridad visible · trabajo limpio · respuesta directa</span><span className="text-2xl">—</span><span className="font-display text-xl font-bold uppercase tracking-[.08em]">Seguridad visible · trabajo limpio · respuesta directa</span></div></section>;
}

function Gallery({ data }: { data: SiteData }) {
  return <section id="trabajos" className="bg-[#17382b] px-5 py-24 text-white lg:px-8 lg:py-32">
    <div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><SectionHeading light eyebrow="Trabajo real" title={<>Manos firmes.<br /><span className="text-[#ffb53f]">Cero improvisación.</span></>} copy="Una muestra del tipo de trabajo que hacemos y del equipo con el que salimos a cada servicio." /><a data-testid="link-gallery-whatsapp" href={waLink('Hola, vi sus trabajos y quisiera cotizar un servicio.')} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 text-sm font-bold text-white/75 hover:text-[#ffb53f]">Solicitar cotización <ArrowUpRight size={18} /></a></div>
       <div className="mt-14 grid gap-4 md:grid-cols-12">{data.gallery.map((item, i) => <article data-testid={`card-gallery-${item.id}`} key={item.id} className={`gallery-card group relative overflow-hidden ${i === 0 ? 'md:col-span-7 md:row-span-2' : 'md:col-span-5'} ${i === 2 ? 'md:min-h-[260px]' : 'min-h-[280px]'}`}>{item.mediaType === 'video' ? <video src={item.image} aria-label={item.alt} className="absolute inset-0 h-full w-full object-cover" controls playsInline /> : <img src={item.image} alt={item.alt} className="absolute inset-0 h-full w-full object-cover" />}<div className="absolute inset-0 bg-gradient-to-t from-[#081c14]/90 via-[#081c14]/10 to-transparent" /><div className="absolute bottom-0 left-0 p-6"><div className="mb-2 font-mono text-[10px] uppercase tracking-[.15em] text-[#ffb53f]">{item.type}</div><h3 className="font-display text-3xl font-bold uppercase">{item.title}</h3></div></article>)}</div>
    </div>
  </section>;
}

function Testimonials({ items }: { items: Testimonial[] }) {
  return <section id="opiniones" className="bg-[hsl(var(--background))] px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"><SectionHeading eyebrow="Lo dicen nuestros clientes" title={<>Cuando el trabajo<br /><span className="text-[#e2752d]">queda bien hecho.</span></>} /><div className="flex gap-1 text-[#e2752d]">{[1, 2, 3, 4, 5].map((n) => <Star aria-hidden key={n} size={17} fill="currentColor" />)}<span className="ml-2 self-center font-mono text-[10px] uppercase tracking-wider text-[#758078]">Opiniones verificadas</span></div></div><div className="mt-14 grid gap-4 md:grid-cols-3">{items.map((t) => <article data-testid={`card-testimonial-${t.id}`} key={t.id} className="flex min-h-[270px] flex-col justify-between border border-[#d6d3c8] bg-[#f0eee5] p-6"><Quote size={27} className="text-[#ffb53f]" fill="currentColor" /><p className="mt-8 text-lg leading-relaxed text-[#31453a]">“{t.quote}”</p><div className="mt-8 flex items-end justify-between border-t border-[#d6d3c8] pt-4"><div><div className="font-bold">{t.name}</div><div className="font-mono text-[10px] uppercase tracking-wider text-[#788078]">{t.area}</div></div><Check size={18} className="text-[#e2752d]" /></div></article>)}</div></div></section>;
}

function PermitNotice() {
  return <section className="bg-[#ffb53f] px-5 py-8 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between"><div className="flex gap-4"><ShieldCheck className="mt-1 shrink-0 text-[#17382b]" size={25} /><div><h3 className="font-display text-2xl font-bold uppercase text-[#17382b]">Trabajo responsable y con permiso</h3><p className="mt-1 max-w-3xl text-sm leading-relaxed text-[#36452c]">Trabajamos bajo permiso ambiental del municipio y del Ministerio de Ambiente. El cliente debe tramitar y presentar dichos permisos; nosotros no realizamos ese trámite.</p></div></div><a data-testid="link-permit-contact" href={waLink('Hola, quisiera consultar los requisitos para mi trabajo.')} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#17382b] underline underline-offset-4">Consultar requisitos <ChevronRight size={16} /></a></div></section>;
}

function Contact() {
  return <section id="contacto" className="relative overflow-hidden bg-[#e8e8df] px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_430px] lg:items-center"><div><SectionHeading eyebrow="¿Tienes un árbol complicado?" title={<>Mándanos una foto.<br /><span className="text-[#e2752d]">Te decimos qué sigue.</span></>} copy="La primera conversación es directa y sin compromiso. Cuéntanos dónde está el árbol, qué necesitas y cuándo te gustaría resolverlo." /><div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"><WhatsAppButton label="Escribir ahora" /><a data-testid="link-phone" href={`tel:+${WHATSAPP}`} className="flex items-center gap-2 text-sm font-bold text-[#315442] hover:text-[#e2752d]"><Phone size={17} /> 0414 369 7204</a></div></div><img src={CONTACT_GRAPHIC} alt="Consulta sin compromiso: 0414 369 7204" className="w-full rounded-sm border border-[#c2c8bc] bg-[#17382b] object-cover shadow-[12px_12px_0_#ffb53f]" /></div></section>;
}

function Footer() {
  return <footer className="bg-[#17382b] px-5 py-12 text-white lg:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-end md:justify-between"><div><img src={LOGO} alt="Tala y Podas Profesionales" className="h-14 w-auto max-w-[250px] object-contain object-left" /><p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">Poda, tala y trabajo en altura con seguridad visible y atención local.</p></div><div className="flex flex-col gap-3 text-sm text-white/70 md:items-end"><a data-testid="link-footer-whatsapp" href={waLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-bold text-[#ffb53f]"><MessageCircle size={17} /> 0414 369 7204</a><span>Atención por WhatsApp · Consulta sin compromiso</span></div></div><div className="mx-auto mt-12 flex max-w-7xl items-center justify-between border-t border-white/15 pt-5"><span className="font-mono text-[10px] uppercase tracking-[.13em] text-white/35">© {new Date().getFullYear()} Tala y Podas Profesionales · Servicio con criterio</span><Link data-testid="link-admin" href="/admin" aria-label="Panel privado" title="Panel privado" className="rounded-full p-2 text-white/15 transition-colors hover:bg-white/10 hover:text-white/65"><LockKeyhole size={13} strokeWidth={1.7} /></Link></div></footer>;
}

function PublicPage() {
  const [data, setData] = useState<SiteData>(loadData);
  useEffect(() => { const onStorage = () => setData(loadData()); window.addEventListener('storage', onStorage); return () => window.removeEventListener('storage', onStorage); }, []);
  return <div className="page-grain min-h-[100dvh]"><Header /><main><Hero data={data} /><Services /><Process /><SafetyBand /><Gallery data={data} /><Testimonials items={data.testimonials} /><PermitNotice /><Contact /></main><Footer /><a data-testid="link-floating-whatsapp" href={waLink()} target="_blank" rel="noreferrer" aria-label="Escribir por WhatsApp" className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,0,0,.28)] transition-transform hover:-translate-y-1 hover:bg-[#1fbd59]"><MessageCircle size={20} /> <span className="hidden sm:inline">WhatsApp</span></a></div>;
}

function AdminPage() {
  const [, setLocation] = useLocation();
  const [data, setData] = useState<SiteData>(loadData);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<'copy' | 'testimonials' | 'gallery'>('copy');
  const [newTestimonial, setNewTestimonial] = useState({ name: '', area: '', quote: '' });
  const [newGallery, setNewGallery] = useState<{ title: string; type: string; image: string; alt: string; mediaType: 'image' | 'video' }>({ title: '', type: '', image: '', alt: '', mediaType: 'image' });
  const save = () => { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); setSaved(true); window.setTimeout(() => setSaved(false), 1800); };
  const update = (key: 'heroTitle' | 'heroText' | 'locality', value: string) => setData((d) => ({ ...d, [key]: value }));
  const addTestimonial = () => { if (!newTestimonial.name || !newTestimonial.quote) return; setData((d) => ({ ...d, testimonials: [...d.testimonials, { ...newTestimonial, id: `t-${Date.now()}` }] })); setNewTestimonial({ name: '', area: '', quote: '' }); };
  const addGallery = () => { if (!newGallery.title || !newGallery.image) return; setData((d) => ({ ...d, gallery: [...d.gallery, { ...newGallery, id: `g-${Date.now()}` }] })); setNewGallery({ title: '', type: '', image: '', alt: '', mediaType: 'image' }); };
  const handleMediaFile = (file?: File) => { if (!file) return; const reader = new FileReader(); reader.onload = () => setNewGallery((g) => ({ ...g, image: String(reader.result), mediaType: file.type.startsWith('video/') ? 'video' : 'image' })); reader.readAsDataURL(file); };
  return <div className="min-h-[100dvh] bg-[#e8e8df] text-[#17382b]"><header className="bg-[#17382b] px-5 py-4 text-white"><div className="mx-auto flex max-w-6xl items-center justify-between"><Link data-testid="link-admin-logo" href="/" className="flex items-center gap-3"><img src={LOGO} alt="Tala y Podas Profesionales" className="h-10 w-auto max-w-[190px]" /></Link><button data-testid="button-back-public" onClick={() => setLocation('/')} className="flex items-center gap-2 text-sm text-white/70 hover:text-white"><ExternalLink size={15} /> Ver sitio público</button></div></header><main className="mx-auto max-w-6xl px-5 py-10 lg:px-8"><div className="flex flex-col justify-between gap-5 border-b border-[#c4c9c1] pb-8 sm:flex-row sm:items-end"><div><div className="font-mono text-[10px] uppercase tracking-[.18em] text-[#e2752d]">Panel local · navegador</div><h1 className="mt-2 font-display text-5xl font-extrabold uppercase leading-none">Contenido del sitio</h1><p className="mt-3 text-sm text-[#5c685f]">Edita la información que aparece en la página pública. Los cambios se guardan en este navegador.</p></div><button data-testid="button-save-content" onClick={save} className="inline-flex items-center justify-center gap-2 rounded-md bg-[#e2752d] px-5 py-3 text-sm font-bold text-white shadow-[0_4px_0_#ae4d1e] transition-transform hover:-translate-y-0.5 active:translate-y-0"><Save size={17} /> {saved ? 'Guardado' : 'Guardar cambios'}</button></div><div className="mt-8 flex gap-1 overflow-x-auto border-b border-[#c4c9c1]">{[['copy', 'Portada'], ['testimonials', 'Testimonios'], ['gallery', 'Galería']].map(([value, label]) => <button data-testid={`button-tab-${value}`} key={value} onClick={() => setTab(value as typeof tab)} className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-bold ${tab === value ? 'border-[#e2752d] text-[#e2752d]' : 'border-transparent text-[#718078]'}`}>{label}</button>)}</div><div className="mt-8 max-w-4xl">{tab === 'copy' && <div className="grid gap-5"><label className="grid gap-2 text-sm font-bold">Titular principal<input data-testid="input-hero-title" value={data.heroTitle} onChange={(e) => update('heroTitle', e.target.value)} className="rounded-md border border-[#c4c9c1] bg-[#f5f4ee] px-4 py-3 font-normal outline-none focus:border-[#e2752d]" /></label><label className="grid gap-2 text-sm font-bold">Texto de portada<textarea data-testid="input-hero-text" value={data.heroText} onChange={(e) => update('heroText', e.target.value)} rows={4} className="rounded-md border border-[#c4c9c1] bg-[#f5f4ee] px-4 py-3 font-normal outline-none focus:border-[#e2752d]" /></label><label className="grid gap-2 text-sm font-bold">Línea de ubicación<input data-testid="input-locality" value={data.locality} onChange={(e) => update('locality', e.target.value)} className="rounded-md border border-[#c4c9c1] bg-[#f5f4ee] px-4 py-3 font-normal outline-none focus:border-[#e2752d]" /></label><div className="rounded-md border border-[#c4c9c1] bg-[#f5f4ee] p-5 text-sm text-[#5c685f]"><div className="flex items-center gap-2 font-bold text-[#17382b]"><Phone size={16} /> WhatsApp configurado</div><p className="mt-2 font-mono text-xs">+58 414 369 7204</p></div></div>}{tab === 'testimonials' && <div><div className="grid gap-3">{data.testimonials.map((item) => <div key={item.id} className="flex gap-4 rounded-md border border-[#c4c9c1] bg-[#f5f4ee] p-4"><div className="flex-1"><input aria-label={`Nombre ${item.id}`} value={item.name} onChange={(e) => setData((d) => ({ ...d, testimonials: d.testimonials.map((t) => t.id === item.id ? { ...t, name: e.target.value } : t) }))} className="w-full border-b border-[#c4c9c1] bg-transparent py-1 font-bold outline-none" /><input aria-label={`Zona ${item.id}`} value={item.area} onChange={(e) => setData((d) => ({ ...d, testimonials: d.testimonials.map((t) => t.id === item.id ? { ...t, area: e.target.value } : t) }))} className="mt-1 w-full bg-transparent py-1 font-mono text-[10px] uppercase outline-none" /><textarea aria-label={`Testimonio ${item.id}`} value={item.quote} onChange={(e) => setData((d) => ({ ...d, testimonials: d.testimonials.map((t) => t.id === item.id ? { ...t, quote: e.target.value } : t) }))} className="mt-3 w-full resize-none bg-transparent text-sm leading-relaxed outline-none" rows={2} /></div><button data-testid={`button-delete-testimonial-${item.id}`} aria-label="Eliminar testimonio" onClick={() => setData((d) => ({ ...d, testimonials: d.testimonials.filter((t) => t.id !== item.id) }))} className="self-start rounded p-2 text-[#a85335] hover:bg-[#f1ddd5]"><Trash2 size={16} /></button></div>)}</div><div className="mt-6 rounded-md border border-dashed border-[#aeb8ae] bg-[#f1f1e9] p-5"><h2 className="font-display text-2xl font-bold uppercase">Añadir opinión</h2><div className="mt-4 grid gap-3 sm:grid-cols-2"><input data-testid="input-new-testimonial-name" placeholder="Nombre" value={newTestimonial.name} onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })} className="rounded border border-[#c4c9c1] bg-[#f5f4ee] px-3 py-2 text-sm" /><input data-testid="input-new-testimonial-area" placeholder="Zona" value={newTestimonial.area} onChange={(e) => setNewTestimonial({ ...newTestimonial, area: e.target.value })} className="rounded border border-[#c4c9c1] bg-[#f5f4ee] px-3 py-2 text-sm" /><textarea data-testid="input-new-testimonial-quote" placeholder="Comentario del cliente" value={newTestimonial.quote} onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })} className="rounded border border-[#c4c9c1] bg-[#f5f4ee] px-3 py-2 text-sm sm:col-span-2" rows={3} /></div><button data-testid="button-add-testimonial" onClick={addTestimonial} className="mt-4 inline-flex items-center gap-2 rounded bg-[#17382b] px-4 py-2 text-sm font-bold text-white"><Plus size={16} /> Añadir testimonio</button></div></div>}{tab === 'gallery' && <div><div className="grid gap-3">{data.gallery.map((item) => <div key={item.id} className="flex gap-4 rounded-md border border-[#c4c9c1] bg-[#f5f4ee] p-4">{item.mediaType === 'video' ? <video src={item.image} aria-label={item.alt} className="h-20 w-28 shrink-0 object-cover" controls /> : <img src={item.image} alt="" className="h-20 w-28 shrink-0 object-cover" />}<div className="flex-1"><input aria-label={`Título ${item.id}`} value={item.title} onChange={(e) => setData((d) => ({ ...d, gallery: d.gallery.map((g) => g.id === item.id ? { ...g, title: e.target.value } : g) }))} className="w-full border-b border-[#c4c9c1] bg-transparent py-1 font-bold outline-none" /><input aria-label={`Tipo ${item.id}`} value={item.type} onChange={(e) => setData((d) => ({ ...d, gallery: d.gallery.map((g) => g.id === item.id ? { ...g, type: e.target.value } : g) }))} className="mt-1 w-full bg-transparent font-mono text-[10px] uppercase outline-none" /></div><button data-testid={`button-delete-gallery-${item.id}`} aria-label="Eliminar imagen" onClick={() => setData((d) => ({ ...d, gallery: d.gallery.filter((g) => g.id !== item.id) }))} className="self-start rounded p-2 text-[#a85335] hover:bg-[#f1ddd5]"><Trash2 size={16} /></button></div>)}</div><div className="mt-6 rounded-md border border-dashed border-[#aeb8ae] bg-[#f1f1e9] p-5"><h2 className="font-display text-2xl font-bold uppercase">Añadir trabajo</h2><div className="mt-4 grid gap-3 sm:grid-cols-2"><input data-testid="input-new-gallery-title" placeholder="Título" value={newGallery.title} onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })} className="rounded border border-[#c4c9c1] bg-[#f5f4ee] px-3 py-2 text-sm" /><input data-testid="input-new-gallery-type" placeholder="Tipo de trabajo" value={newGallery.type} onChange={(e) => setNewGallery({ ...newGallery, type: e.target.value })} className="rounded border border-[#c4c9c1] bg-[#f5f4ee] px-3 py-2 text-sm" /><input data-testid="input-new-gallery-image" placeholder="URL de imagen" value={newGallery.image} onChange={(e) => setNewGallery({ ...newGallery, image: e.target.value })} className="rounded border border-[#c4c9c1] bg-[#f5f4ee] px-3 py-2 text-sm sm:col-span-2" /><input data-testid="input-new-gallery-file" type="file" accept="image/*,video/*" onChange={(e) => handleMediaFile(e.target.files?.[0])} className="rounded border border-dashed border-[#c4c9c1] bg-[#f5f4ee] px-3 py-2 text-sm sm:col-span-2" /><input data-testid="input-new-gallery-alt" placeholder="Descripción accesible" value={newGallery.alt} onChange={(e) => setNewGallery({ ...newGallery, alt: e.target.value })} className="rounded border border-[#c4c9c1] bg-[#f5f4ee] px-3 py-2 text-sm sm:col-span-2" /></div><p className="mt-2 text-xs text-[#5c685f]">Puedes pegar una URL o subir una foto/video desde tu equipo. El contenido se guarda en este navegador.</p><button data-testid="button-add-gallery" onClick={addGallery} className="mt-4 inline-flex items-center gap-2 rounded bg-[#17382b] px-4 py-2 text-sm font-bold text-white"><ImagePlus size={16} /> Añadir trabajo</button></div></div>}</div></main></div>;
}

function Router() {
  return <ErrorBoundary resetKey={location.pathname}><Switch><Route path="/" component={PublicPage} /><Route path="/admin" component={AdminPage} /><Route component={() => <div className="p-12 font-display text-4xl">Página no encontrada</div>} /></Switch></ErrorBoundary>;
}

function App() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter>;
}

export default App;