import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from './hooks/useLenis'
import { useReducedMotion, useWebGLSupport } from './hooks/useReducedMotion'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const OceanScene = lazy(() => import('./components/three/ImmersiveOcean').then((module) => ({ default: module.OceanScene })))

const photos = {
  reef: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1400&q=85',
  turtle: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=1000&q=85',
  ray: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1000&q=85',
  reefTwo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=85',
  blue: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=1000&q=85',
  kelp: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1000&q=85',
  diver: 'https://images.unsplash.com/photo-1544551763-ced9c31a4d39?auto=format&fit=crop&w=1800&q=85',
}

const navItems = [
  ['Discover', '#exploration'],
  ['Marine life', '#marine-life'],
  ['Ecosystems', '#ecosystems'],
  ['Our mission', '#conservation'],
]

const species = [
  { name: 'Manta ray', latin: 'Mobula birostris', image: photos.ray, tag: 'OPEN OCEAN', color: '#b6e5ed', detail: 'A gentle giant with a wingspan that can reach seven metres.' },
  { name: 'Green sea turtle', latin: 'Chelonia mydas', image: photos.turtle, tag: 'TROPICAL SEAS', color: '#a8d1b3', detail: 'Ancient navigators travelling thousands of miles between feeding grounds.' },
  { name: 'Coral gardens', latin: 'Reef ecosystems', image: photos.reefTwo, tag: 'CORAL REEFS', color: '#f0b4a1', detail: 'Remarkable underwater cities, alive with colour, movement, and connection.' },
]

const ecosystems = [
  { number: '01', title: 'The living reef', text: 'A universe of colour and interdependence, where a quarter of marine life finds shelter.', image: photos.reef, label: 'CORAL REEF' },
  { number: '02', title: 'Blue wilderness', text: 'An open-water world shaped by currents, migration, and extraordinary journeys.', image: photos.blue, label: 'OPEN OCEAN' },
  { number: '03', title: 'Beneath the canopy', text: 'Kelp forests rise from the seafloor, creating a sanctuary in the swell.', image: photos.kelp, label: 'KELP FOREST' },
]

const gallery = [
  { image: photos.reef, title: 'A world in bloom', place: 'Raja Ampat, Indonesia' },
  { image: photos.ray, title: 'Into the blue', place: 'Maldives, Indian Ocean' },
  { image: photos.turtle, title: 'A slower rhythm', place: 'Hawaiian Islands' },
  { image: photos.kelp, title: 'The green cathedral', place: 'Pacific Coast' },
  { image: photos.reefTwo, title: 'Life finds a way', place: 'Coral Triangle' },
]

const testimonials = [
  { quote: 'The ocean is not a distant frontier. It is the living system that makes every breath possible.', name: 'Dr. Sylvia Earle', role: 'Oceanographer & Explorer' },
  { quote: 'When we protect the ocean, we protect the possibility of a thriving future for all of us.', name: 'Dr. Enric Sala', role: 'Marine Ecologist' },
  { quote: 'There is still so much to discover. Wonder is the beginning of caring, and caring is the beginning of change.', name: 'Asha de Vos', role: 'Marine Biologist' },
]

function ArrowIcon({ diagonal = false }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      {diagonal
        ? <path d="M5 15 15 5M6 5h9v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        : <path d="M3 10h13m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  )
}

function Brand({ onClick }) {
  return (
    <a className="brand" href="#hero" onClick={onClick} aria-label="Aquavista home">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
      <span>AQUAVISTA<span className="brand-period">.</span></span>
    </a>
  )
}

function Navbar({ lenis }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigate = (event, target) => {
    event.preventDefault()
    setMenuOpen(false)
    if (lenis.current) lenis.current.scrollTo(target, { duration: 1.3, offset: -76 })
    else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner">
        <Brand onClick={(event) => navigate(event, '#hero')} />
        <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {navItems.map(([label, target]) => (
            <a key={target} href={target} onClick={(event) => navigate(event, target)}>{label}</a>
          ))}
          <a className="nav-mobile-cta" href="#conservation" onClick={(event) => navigate(event, '#conservation')}>Join the mission <ArrowIcon /></a>
        </nav>
        <a className="nav-cta" href="#conservation" onClick={(event) => navigate(event, '#conservation')}>Join the mission <ArrowIcon /></a>
        <button className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
          <span /><span />
        </button>
      </div>
    </header>
  )
}

function Eyebrow({ children }) {
  return <div className="eyebrow"><span className="eyebrow-dot" />{children}</div>
}

function SectionHeading({ eyebrow, title, copy, light = false }) {
  return (
    <div className={`section-heading reveal ${light ? 'heading-light' : ''}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}

function HeroSection({ lenis }) {
  const goExplore = () => lenis.current?.scrollTo('#exploration', { duration: 1.4, offset: -70 })

  return (
    <section className="hero-section" id="hero">
      <div className="hero-vignette" />
      <div className="hero-content">
        <div className="hero-kicker reveal"><span className="live-dot" />A FIELD GUIDE TO OUR BLUE PLANET</div>
        <h1 className="hero-title reveal">The ocean is<br /><em>another world.</em></h1>
        <p className="hero-copy reveal">A little closer to the wild heart of our planet. Meet the life, the places, and the people working to keep it thriving.</p>
        <div className="hero-actions reveal">
          <button type="button" className="button button-light" onClick={goExplore}>Begin exploring <ArrowIcon /></button>
          <a href="#marine-life" className="text-link">Meet the residents <ArrowIcon diagonal /></a>
        </div>
      </div>
      <div className="hero-aside"><span>01 / 09</span><span className="aside-line" /><span>THE OPEN OCEAN</span></div>
      <button type="button" className="scroll-cue" onClick={goExplore}><span>SCROLL TO DESCEND</span><i /></button>
      <div className="hero-caption"><span>01° 17′ S&nbsp; 36° 49′ E</span><span>WHALE SHARK · UPLOADED 2D IMAGE</span></div>
    </section>
  )
}

function ExplorationSection() {
  return (
    <section className="exploration-section section-pad" id="exploration">
      <div className="exploration-photo" style={{ backgroundImage: `url("${photos.diver}")` }} />
      <div className="exploration-shade" />
      <div className="exploration-content">
        <div className="exploration-copy reveal">
          <Eyebrow>THE GREAT BLUE</Eyebrow>
          <h2>More ocean<br />than we can <em>imagine.</em></h2>
          <p>Covering more than two-thirds of our planet, the ocean is a source of wonder and a world still waiting to be understood. This is your invitation to look closer.</p>
          <a className="text-link" href="#ecosystems">Discover the deep <ArrowIcon /></a>
        </div>
        <div className="exploration-note reveal"><span className="note-number">70%</span><p>of Earth is covered<br />by the ocean</p><span className="note-rule" /><small>ONE CONNECTED BLUE PLANET</small></div>
      </div>
      <div className="photo-credit">A MOMENT OF STILLNESS · PACIFIC OCEAN</div>
    </section>
  )
}

function MarineLifeSection() {
  return (
    <section className="marine-section section-pad" id="marine-life">
      <div className="section-topline reveal"><Eyebrow>MEET THE LOCALS</Eyebrow><span>SMALL PLANET, BIG PERSONALITIES</span></div>
      <SectionHeading eyebrow="LIFE BELOW THE SURFACE" title={<>Every creature has<br />a <em>story to tell.</em></>} copy="From drifting giants to the architects of the reef, get to know a few of the extraordinary lives that make the ocean home." />
      <div className="species-grid">
        {species.map((item, index) => (
          <article className={`species-card reveal species-${index + 1}`} key={item.name}>
            <div className="species-image-wrap"><img src={item.image} alt={item.name} loading="lazy" /><span className="species-index">0{index + 1}</span><span className="species-arrow"><ArrowIcon diagonal /></span></div>
            <div className="species-info"><div className="species-tag"><i style={{ backgroundColor: item.color }} />{item.tag}</div><h3>{item.name}</h3><span className="species-latin">{item.latin}</span><p>{item.detail}</p></div>
          </article>
        ))}
      </div>
      <a className="section-link" href="#ecosystems">Explore the ecosystems <ArrowIcon /></a>
    </section>
  )
}

function EcosystemsSection() {
  return (
    <section className="ecosystems-section section-pad" id="ecosystems">
      <SectionHeading eyebrow="A WORLD OF WORLDS" title={<>Different depths.<br /><em>Endless life.</em></>} copy="The ocean isn't one place. It's a mosaic of living worlds, each with its own rhythm, residents, and remarkable role." />
      <div className="ecosystem-grid">
        {ecosystems.map((item) => (
          <article className="ecosystem-card reveal" key={item.number} style={{ backgroundImage: `url("${item.image}")` }}>
            <span className="ecosystem-number">{item.number}</span>
            <div className="ecosystem-info"><span>{item.label}</span><h3>{item.title}</h3><p>{item.text}</p><a href="#gallery" aria-label={`View ${item.title} gallery`}><ArrowIcon diagonal /></a></div>
          </article>
        ))}
      </div>
      <div className="ecosystem-footnote"><span>01 — 03</span><span>THREE OF A MILLION STORIES</span></div>
    </section>
  )
}

function GallerySection() {
  const entries = [...gallery, ...gallery]
  return (
    <section className="gallery-section section-pad" id="gallery">
      <div className="gallery-heading">
        <SectionHeading eyebrow="POSTCARDS FROM BELOW" title={<>A glimpse into<br /><em>the extraordinary.</em></>} copy="A few moments from a world that never stops surprising us." />
        <div className="gallery-controls"><span>KEEP WANDERING</span><span className="gallery-controls-line" /><ArrowIcon /></div>
      </div>
      <div className="gallery-viewport">
        <div className="gallery-track">
          {entries.map((item, index) => (
            <article className="gallery-card" key={`${item.title}-${index}`}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="gallery-card-shade" />
              <span className="gallery-card-index">0{(index % gallery.length) + 1}</span>
              <div className="gallery-card-caption"><span>{item.place}</span><h3>{item.title}</h3></div>
            </article>
          ))}
        </div>
      </div>
      <div className="gallery-foot"><span>DRAG YOUR CURIOSITY ALONG</span><span>◀ &nbsp; AUTO-EXPLORING &nbsp; ▶</span></div>
    </section>
  )
}

function StatisticsSection() {
  const sectionRef = useRef(null)
  const values = [
    { value: 71, suffix: '%', label: 'of our planet is ocean' },
    { value: 240, suffix: 'k+', label: 'known marine species' },
    { value: 3, suffix: 'bn', label: 'people depend on the sea' },
    { value: 1, suffix: ' ocean', label: 'that connects us all' },
  ]

  useEffect(() => {
    const counters = sectionRef.current?.querySelectorAll('[data-count]')
    if (!counters?.length) return undefined
    const ctx = gsap.context(() => {
      counters.forEach((element) => {
        const target = Number(element.dataset.count)
        const count = { value: 0 }
        gsap.to(count, {
          value: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
          onUpdate: () => { element.textContent = Math.round(count.value).toString() },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="stats-section section-pad" ref={sectionRef}>
      <div className="stats-intro reveal"><Eyebrow>A BLUE PLANET</Eyebrow><h2>Big enough to amaze.<br /><em>Precious enough to protect.</em></h2></div>
      <div className="stats-grid">
        {values.map((item) => <div className="stat-item reveal" key={item.label}><div className="stat-value"><span data-count={item.value}>0</span><b>{item.suffix}</b></div><p>{item.label}</p></div>)}
      </div>
      <div className="stats-bottom"><span>THE NUMBERS ARE ONLY THE BEGINNING</span><span>SCROLL TO KEEP DISCOVERING&nbsp; ↓</span></div>
    </section>
  )
}

function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const select = (direction) => setActive((current) => (current + direction + testimonials.length) % testimonials.length)

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % testimonials.length), 7000)
    return () => window.clearInterval(timer)
  }, [])

  const quote = testimonials[active]
  return (
    <section className="testimonial-section section-pad" aria-label="Ocean voices">
      <div className="testimonial-inner reveal">
        <Eyebrow>VOICES FOR THE BLUE</Eyebrow>
        <span className="quote-mark" aria-hidden="true">“</span>
        <blockquote key={quote.name}>{quote.quote}</blockquote>
        <div className="quote-attribution"><span className="quote-avatar">{quote.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span><span><b>{quote.name}</b><small>{quote.role}</small></span></div>
        <div className="quote-controls"><button type="button" onClick={() => select(-1)} aria-label="Previous quote">←</button><span>0{active + 1}<i />0{testimonials.length}</span><button type="button" onClick={() => select(1)} aria-label="Next quote">→</button></div>
      </div>
      <span className="testimonial-orbit orbit-one" /><span className="testimonial-orbit orbit-two" />
    </section>
  )
}

function ConservationSection() {
  return (
    <section className="conservation-section section-pad" id="conservation">
      <div className="conservation-image" style={{ backgroundImage: `url("${photos.reefTwo}")` }} />
      <div className="conservation-gradient" />
      <div className="conservation-content reveal">
        <Eyebrow>THE NEXT CHAPTER IS OURS</Eyebrow>
        <h2>Wonder is where<br />protection <em>begins.</em></h2>
        <p>Healthy oceans sustain life everywhere. Learn how small, meaningful choices can help protect the blue heart we all share.</p>
        <a className="button button-light" href="https://oceanconservancy.org/" target="_blank" rel="noreferrer">Discover how to help <ArrowIcon diagonal /></a>
      </div>
      <span className="conservation-side-note">A LIVING PLANET, HELD IN COMMON</span>
    </section>
  )
}

function CTASection({ lenis }) {
  return (
    <section className="final-cta section-pad">
      <div className="cta-orb" />
      <div className="final-cta-content reveal"><Eyebrow>YOUR JOURNEY STARTS HERE</Eyebrow><h2>Stay curious.<br /><em>Stay connected.</em></h2><p>The ocean is closer than you think. Take one more step into the blue.</p><button className="button button-light" type="button" onClick={() => lenis.current?.scrollTo('#hero', { duration: 1.8 })}>Take another look <ArrowIcon /></button></div>
      <span className="cta-coordinate">0° 00′ 00″ &nbsp; THE BLUE, EVERYWHERE</span>
    </section>
  )
}

function Footer({ lenis }) {
  const navigate = (event, target) => {
    event.preventDefault()
    if (lenis.current) lenis.current.scrollTo(target, { duration: 1.2, offset: -70 })
  }
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand"><Brand onClick={(event) => navigate(event, '#hero')} /><p>Closer to the ocean.<br />Closer to what matters.</p></div>
        <div className="footer-links"><span>EXPLORE</span>{navItems.map(([label, target]) => <a key={target} href={target} onClick={(event) => navigate(event, target)}>{label}</a>)}</div>
        <div className="footer-note"><span>MADE FOR THE BLUE</span><p>A small reminder that this planet is mostly ocean — and every bit of it is worth protecting.</p><a href="https://oceanconservancy.org/" target="_blank" rel="noreferrer">Learn more about ocean conservation <ArrowIcon diagonal /></a></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} AQUAVISTA. FOR THE LOVE OF THE OCEAN.</span><a href="#hero" onClick={(event) => navigate(event, '#hero')}>BACK TO THE SURFACE ↑</a><span>MADE OF WATER & WONDER</span></div>
    </footer>
  )
}

function App() {
  const lenis = useLenis()
  const reducedMotion = useReducedMotion()
  const webglSupported = useWebGLSupport()
  const scrollProgress = useRef(0)

  useEffect(() => {
    const scrollTrack = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: (self) => { scrollProgress.current = self.progress },
      onRefresh: (self) => { scrollProgress.current = self.progress },
    })
    return () => scrollTrack.kill()
  }, [])

  useEffect(() => {
    if (reducedMotion) return undefined
    const context = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((element) => {
        gsap.fromTo(element, { y: 28, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 91%', once: true },
        })
      })
    })
    return () => context.revert()
  }, [reducedMotion])

  return (
    <div className="aquavista-app">
      {webglSupported && <Suspense fallback={null}><OceanScene progress={scrollProgress} reducedMotion={reducedMotion} /></Suspense>}
      <Navbar lenis={lenis} />
      <main>
        <HeroSection lenis={lenis} />
        <ExplorationSection />
        <MarineLifeSection />
        <EcosystemsSection />
        <GallerySection />
        <StatisticsSection />
        <TestimonialsSection />
        <ConservationSection />
        <CTASection lenis={lenis} />
      </main>
      <Footer lenis={lenis} />
    </div>
  )
}

export default App
