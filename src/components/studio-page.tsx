import { useEffect, useRef, useState, type ReactNode, type FormEvent } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, MapPin, CalendarDays, Clock, Phone, Instagram, Facebook, MessageCircle, Menu, X, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import hero from '@/assets/figma/a-refined-warmly-lit-beauty-salon-interior.png';
import bride1 from '@/assets/figma/rectangle-6.png';
import bride2 from '@/assets/figma/rectangle-7.png';
import bride3 from '@/assets/figma/rectangle-8.png';
import hair from '@/assets/figma/hair-styling-in-a-refined-salon.png';
import makeup from '@/assets/figma/makeup-artist-finishing-an-elegant-makeover.png';
import skin from '@/assets/figma/relaxing-skincare-treatment.png';
import nails from '@/assets/figma/burgundy-manicure-in-a-premium-salon.png';
import bridal from '@/assets/figma/kerala-bridal-styling.png';
import closing from '@/assets/figma/bridal-burgundy-widejpg.png';
import logo from '@/assets/LaBlushLg.png';
import satoshiRegular from '@/assets/figma/satoshi-400.woff2';
import satoshiMedium from '@/assets/figma/satoshi-500.woff2';
import gekaFont from '@/assets/figma/geka-webfont.woff2';

const maps = 'https://www.google.com/maps/search/?api=1&query=LA+BLUSH+MAKEOVER+STUDIO+Pathanamthitta';
const instagram = 'https://www.instagram.com/lablushmakeoversaloon';
const services = [
 ['Hair', hair, 'Hair styling in the LA BLUSH salon'], ['Makeup', makeup, 'Makeup artist finishing an elegant eye look'],
 ['Skin', skin, 'Relaxing skincare treatment'], ['Nails & Grooming', nails, 'Burgundy manicure in the salon'],
] as const;
type Category = 'Hair' | 'Makeup' | 'Skin' | 'Nails & Grooming';
const menus: Record<Category, { intro: string; items: [string, string][] }> = {
 Hair: { intro: 'Precision, repair and finish, designed around your texture, routine and personal style.', items: [
  ['Haircut & Restyle', "Precision cuts, layers, fringes, trims and children’s cuts."],
  ['Blow-dry & Styling', 'Smooth blowouts, soft waves, curls and occasion finishes.'],
  ['Hair Spa', 'Deep-conditioning rituals for dry, dull or stressed hair.'],
  ['Keratin & Smoothening', 'Frizz control and lasting shine with keratin, smoothening or nanoplastia.'],
  ['Hair Botox', 'Intensive repair for damaged strands, softness and shine.'],
  ['Colour & Highlights', 'Root touch-up, global colour, highlights and balayage.'],
  ['Bridal & Occasion Hair', 'Buns, braids, jasmine settings and reception updos.']] },
 Makeup: { intro: 'Artistry for every occasion, from soft day glow to full Kerala bridal finish.', items: [
  ['Signature Bridal Makeup', 'Waterproof HD or airbrush looks tailored to your traditions.'],
  ['Engagement & Reception Glam', 'Radiant contours, custom lashes and soft shimmer lids.'],
  ['Party & Family Makeover', 'Refined makeup and styling for celebrations.'],
  ['Saree Draping', 'Neat pleating, silk draping and secure pin-setting.'],
  ['Jasmine & Floral Settings', 'Traditional hair adornment with fresh flowers.']] },
 Skin: { intro: 'Calm, results-led skin rituals that prepare you to glow.', items: [
  ['Hydra-Glow Facial', 'Deep cleansing, gentle exfoliation and lasting hydration.'],
  ['Bridal Radiance Facial', 'Targeted brightening for wedding-day luminosity.'],
  ['De-pigmentation Care', 'Even-tone therapy for sun spots and dullness.'],
  ['Acne Clarifying Therapy', 'Soothing peel and calming care for breakout-prone skin.'],
  ['Body Polish & De-tan', 'Gentle buffing and nourishing body wrap.']] },
 'Nails & Grooming': { intro: 'Finishing details, perfected — hands, feet and grooming.', items: [
  ['Gel Extensions & Overlay', 'Custom length, sculpting and durable gel overlays.'],
  ['Bridal Nail Art', 'French tips, gold foil, pearls and chrome finishes.'],
  ['Spa Manicure', 'Careful cuticle care, exfoliation and nourishing oils.'],
  ['Deluxe Pedicure', 'Aromatic soak, smoothing, massage and polish.'],
  ['Threading & Waxing', 'Face contour threading and smooth waxing.']] },
};
const allTreatments = Object.values(menus).flatMap(m => m.items.map(([n]) => n));
function TypewriterLogo() {
 const text = 'La Blush';
 const [n, setN] = useState(text.length);
 const [done, setDone] = useState(true);
 useEffect(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  setN(0); setDone(false); let i = 0; let t: ReturnType<typeof setTimeout>;
  const id = setInterval(() => { i++; setN(i); if (i >= text.length) { clearInterval(id); t = setTimeout(() => setDone(true), 1400); } }, 150);
  return () => { clearInterval(id); clearTimeout(t); };
 }, []);
 return <a href="#top" className="wordmark type-logo" aria-label="La Blush home"><span aria-hidden="true">{text.slice(0, n)}</span><span className={`type-caret ${done ? 'done' : ''}`} aria-hidden="true" /></a>;
}
const bridalSteps = [
 ['Look consultation', 'Makeup, hair and drape planned around your outfit and jewellery.'],
 ['Pre-bridal care', 'Facials, hair spa and grooming thoughtfully scheduled.'],
 ['Makeup & hair', 'HD or airbrush artistry with modern or traditional styling.'],
 ['Finishing details', 'Draping, nails and touch-ups so every detail feels complete.'],
];
function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
 const ref = useRef<HTMLDivElement>(null);
 const [visible, setVisible] = useState(true);
 useEffect(() => {
  const el = ref.current;
  if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  setVisible(false);
  const observer = new IntersectionObserver(([entry]) => {
   if (entry?.isIntersecting) { setVisible(true); observer.disconnect(); }
  }, { threshold: .08 });
  observer.observe(el); return () => observer.disconnect();
 }, []);
 return <div ref={ref} className={`reveal ${className}`} data-visible={visible}>{children}</div>;
}
function Eyebrow({ children }: { children: ReactNode }) { return <p className="eyebrow">{children}</p>; }
export function StudioPage() {
 const [dialog, setDialog] = useState<'booking' | 'group' | 'social' | 'academy' | null>(null);
 const [request, setRequest] = useState('');
 const [copied, setCopied] = useState(false);
 const [mobileNav, setMobileNav] = useState(false);
 const carousel = useRef<HTMLDivElement>(null);
 const [active, setActive] = useState<Category>('Hair');
 const [scrolled, setScrolled] = useState(false);
 useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
 }, []);
 const pick = (c: Category, scroll = true) => { setActive(c); if (scroll) requestAnimationFrame(() => document.getElementById('treatments-menu')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })); };
 const book = (service = '') => { setRequest(service ? `Service: ${service}` : ''); setCopied(false); setDialog('booking'); };
 const submitRequest = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault(); const data = new FormData(event.currentTarget);
  setRequest(['name', 'phone', 'service', 'date', 'time', 'message'].map(key => `${key === 'name' ? 'Name' : key.charAt(0).toUpperCase() + key.slice(1)}: ${data.get(key) || '—'}`).join('\n'));
  setCopied(false); setDialog('booking');
 };
 const nav = [['Studio', '#about'], ['Services', '#services'], ['Offers', '#offers'], ['Gallery', '#gallery'], ['Contact', '#appointments']];
 return <>
  <style>{`@font-face{font-family:Geka;src:url('${gekaFont}') format('woff2');font-weight:400;font-display:swap}@font-face{font-family:Satoshi;src:url('${satoshiRegular}') format('woff2');font-weight:400;font-display:swap}@font-face{font-family:Satoshi;src:url('${satoshiMedium}') format('woff2');font-weight:500;font-display:swap}`}</style>
  <main id="top">
   <section className="hero" aria-labelledby="hero-title">
    <img className="hero-photo" src={hero} alt="Makeup artist in yellow applying makeup to a client at LA BLUSH" fetchPriority="high" />
    <header className="studio-header">
     <a href="#top" className="wordmark" aria-label="LA BLUSH Makeover Studio home">
      <img src={logo} alt="LA BLUSH Makeover Studio" className="header-logo" />
     </a>
     <nav className={`glass-nav${scrolled ? ' scrolled' : ''} ${mobileNav ? 'is-open' : ''}`} aria-label="Main navigation">{nav.map(([text, href]) => <Button variant="ghost" asChild key={text}><a href={href} onClick={() => setMobileNav(false)}>{text}</a></Button>)}</nav>
      <div className="header-socials">
       <Button variant="ghost" className="social-circle" asChild title="Instagram"><a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a></Button>
       <Button variant="ghost" className="social-circle" onClick={() => setDialog('social')} aria-label="Facebook" title="Facebook"><Facebook /></Button>
       <Button variant="ghost" className="social-circle" onClick={() => setDialog('social')} aria-label="Studio social links" title="Studio social links"><span>S</span></Button>
       <Button variant="ghost" className="social-circle" asChild title="Call the studio"><a href="tel:+919544980895" aria-label="Call the studio"><Phone /></a></Button>
       <Button variant="ghost" className="social-circle" onClick={() => setDialog('group')} aria-label="WhatsApp" title="WhatsApp"><MessageCircle /></Button>
      </div>
      <Button variant="ghost" className="mobile-menu" onClick={() => setMobileNav(!mobileNav)} aria-expanded={mobileNav} aria-label={mobileNav ? 'Close navigation' : 'Open navigation'}>{mobileNav ? <X /> : <Menu />}</Button>
     </header>
    <div className="hero-content page-inset">
     <div className="stagger"><Eyebrow>LA BLUSH · PATHANAMTHITTA</Eyebrow></div>
     <h1 id="hero-title"><span className="intro stagger delay-1">Your Go-To Destination for</span><span className="display stagger delay-2">Beauty &amp;<br />Makeovers.</span></h1>
     <div className="hero-actions stagger delay-3"><Button variant="studioHero" onClick={() => book()}>Book an appointment <ArrowUpRight /></Button><Button variant="studioOutline" asChild><a href="#services">Explore services <ArrowUpRight /></a></Button></div>
    </div>
    <a href="#about" className="scroll-cue">Scroll to discover <ArrowDown aria-hidden="true" /></a>
   </section>
   <section className="about page-inset" id="about" aria-labelledby="about-title">
    <Reveal><Eyebrow>About us</Eyebrow><h2 id="about-title">Redefining the<br />Beauty Experience</h2></Reveal>
    <div className="about-composition" id="gallery">
     <Reveal className="about-copy"><p>At LA BLUSH MAKEOVER STUDIO, we believe beauty is more than how you look - it’s how you feel. Our studio is a space where your individuality is celebrated, your style is understood, and every detail is thoughtfully considered.</p><div className="bride-row"><span>01</span><span>Our beautiful<br />Brides</span></div></Reveal>
     <Reveal className="editorial-photo photo-tall"><img src={bride1} alt="Kerala bride in a red silk saree with jasmine flowers in her hair" loading="lazy" /></Reveal>
     <Reveal className="editorial-photo photo-medium"><img src={bride2} alt="Smiling bride in a burgundy veil and golden jewellery" loading="lazy" /></Reveal>
     <Reveal className="editorial-photo photo-short"><img src={bride3} alt="Bride in a dark saree with a graceful traditional hairstyle" loading="lazy" /></Reveal>
     <div className="about-cta"><Button variant="studioBrand" onClick={() => book()}>Book an Appointment <ArrowUpRight /></Button></div>
    </div>
   </section>
   <section className="services-section" id="services" aria-labelledby="services-title">
    <Reveal className="section-container services-heading"><div><Eyebrow>Our services</Eyebrow><h2 id="services-title">Everything you need.</h2></div><div className="carousel-controls"><Button variant="outline" size="icon" aria-label="Previous services" onClick={() => carousel.current?.scrollBy({ left: -460, behavior: 'smooth' })}><ArrowLeft /></Button><Button variant="outline" size="icon" aria-label="Next services" onClick={() => carousel.current?.scrollBy({ left: 460, behavior: 'smooth' })}><ArrowRight /></Button></div></Reveal>
    <div className="service-carousel" ref={carousel}>{services.map(([name, image, alt]) => <article className={`service-card ${active === name ? 'featured active' : ''}`} key={name}><img src={image} alt={alt} loading="lazy" /><Button variant="ghost" className="service-link" aria-pressed={active === name} onClick={() => pick(name)}><span>{name}</span><span className="service-helper">View treatments <ArrowUpRight /></span></Button></article>)}</div>
    <div className="section-container hair-menu" id="treatments-menu"><Reveal className="hair-intro"><Eyebrow>{active} menu</Eyebrow><div className="service-tabs" role="tablist" aria-label="Service categories">{services.map(([name]) => <button type="button" role="tab" className="service-tab" key={name} aria-selected={active === name} onClick={() => pick(name, false)}>{name}</button>)}</div><h3 key={active} className="menu-panel">{menus[active].intro}</h3><Button variant="studioBrand" onClick={() => book(active)}>Book {active} <ArrowUpRight /></Button></Reveal><div className="hair-list menu-panel" key={active} role="tabpanel" aria-label={`${active} treatments`}>{menus[active].items.map(([name, description], i) => <Button variant="ghost" className="hair-row" style={{ animationDelay: `${i * 60}ms` }} key={name} onClick={() => book(name)}><span className="row-number">{String(i + 1).padStart(2, '0')}</span><span className="row-text"><strong>{name}</strong><small>{description}</small></span><ArrowUpRight /></Button>)}</div></div>
   </section>
   <section className="bridal-section" id="bridal" aria-labelledby="bridal-title"><div className="section-container bridal-layout"><Reveal className="bridal-photo editorial-photo"><img src={bridal} alt="Bride wearing a burgundy veil and gold bridal jewellery" loading="lazy" /></Reveal><Reveal className="bridal-copy"><Eyebrow>Signature bridal</Eyebrow><h2 id="bridal-title">For the day<br />you’ll remember forever</h2><p>From your first consultation to the final jasmine pin — a calm, unhurried bridal experience built around you.</p><div className="bridal-steps">{bridalSteps.map(([name, description], i) => <div className="bridal-step" key={name}><span>{String(i + 1).padStart(2, '0')}</span><div><h3>{name}</h3><p>{description}</p></div></div>)}</div><Button variant="studioHero" onClick={() => book('Bridal makeover')}>Plan your bridal look <ArrowUpRight /></Button></Reveal></div></section>
   <section className="offers-section" id="offers" aria-label="Latest updates and exclusive offers"><div className="vip-banner"><img src={hero} alt="" loading="lazy" /><div className="vip-content"><Eyebrow>VIP community</Eyebrow><h2>Join the LA BLUSH<br />Private Circle</h2><p>Get the latest updates, special offers, early bridal calendar openings and exclusive event invitations.</p><div className="vip-actions"><Button variant="studioHero" onClick={() => setDialog('group')}>Join WhatsApp Group <ArrowUpRight /></Button><Button variant="studioOutline" asChild><a href="https://wa.me/919544980895" target="_blank" rel="noopener noreferrer">Chat on WhatsApp <MessageCircle /></a></Button></div></div></div></section>
   <section className="appointments-section" id="appointments" aria-labelledby="appointment-title"><div className="section-container appointment-layout"><Reveal className="appointment-copy"><h2 id="appointment-title">Reserve<br />your Moment</h2><div className="contact-details"><a href={maps} target="_blank" rel="noopener noreferrer"><MapPin /><span>Mallika Thattayil P.O., Pathanamthitta,<br />Kerala – 691525</span></a><p><Clock /> Visits by appointment</p><a href="tel:+919544980895"><Phone />9544980895</a><a href={instagram} target="_blank" rel="noopener noreferrer"><Instagram />@lablushmakeoversaloon</a></div></Reveal><form className="appointment-form" onSubmit={submitRequest}><label>Full name<input name="name" autoComplete="name" required /></label><label>Phone<input name="phone" type="tel" autoComplete="tel" required /></label><label className="full-field">Service<select name="service" required defaultValue=""><option value="" disabled>Select a service</option>{services.map(([name]) => <option key={name}>{name}</option>)}<option>Bridal makeover</option>{allTreatments.map(name => <option key={name}>{name}</option>)}</select></label><label>Preferred date<input name="date" type="date" required /></label><label>Preferred time<select name="time" required defaultValue=""><option value="" disabled>Select</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label><label className="full-field">Message (optional)<textarea name="message" rows={3} /></label><div className="full-field"><Button type="submit" className="request-button">Request appointment <ArrowUpRight /></Button></div></form></div></section>
   <section className="closing-section" aria-labelledby="closing-title"><img src={closing} alt="Burgundy bridal portrait framed by flowers" loading="lazy" /><div className="closing-content"><Eyebrow>Your moment starts here</Eyebrow><h2 id="closing-title">Beautifully<br />yourself Everytime.</h2><Button variant="studioHero" onClick={() => book()}>Book your visit <ArrowUpRight /></Button></div></section>
  </main>
  <footer className="studio-footer"><div className="section-container"><p className="footer-brand">LA BLUSH ✦ MAKEOVER STUDIO</p><div className="footer-grid"><div><img className="footer-logo" src={logo} alt="LA BLUSH Makeover Studio" loading="lazy" /><p>Personal beauty and bridal artistry in<br />Pathanamthitta, Kerala.</p><div className="footer-socials"><Button variant="ghost" className="social-circle" asChild><a href={instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer"><Instagram /></a></Button><Button variant="ghost" className="social-circle" aria-label="Facebook" onClick={() => setDialog('social')}><Facebook /></Button><Button variant="ghost" className="social-circle" aria-label="WhatsApp" onClick={() => setDialog('group')}><MessageCircle /></Button></div></div><div className="footer-links"><h3>Explore</h3>{[['Studio','#about'],['Services','#services'],['Bridal','#bridal'],['Gallery','#gallery'],['Contact','#appointments']].map(([name,href]) => <Button variant="link" asChild key={name}><a href={href}>{name}</a></Button>)}<Button variant="link" onClick={() => setDialog('academy')}>Academy</Button></div><div className="footer-links"><h3>Services</h3>{services.map(([name]) => <Button variant="link" key={name} onClick={() => book(name)}>{name}</Button>)}</div><div className="footer-links"><h3>Visit</h3><a href={maps} target="_blank" rel="noopener noreferrer">Mallika Thattayil P.O.<br />Pathanamthitta, Kerala 691525</a><a href="tel:+919544980895">9544980895</a><Button variant="link" onClick={() => book()}>Request an appointment</Button></div></div><div className="footer-bottom"><span>© 2026 LA BLUSH Makeover Studio</span><span>By appointment · Pathanamthitta</span></div></div></footer>
  <Dialog open={dialog !== null} onOpenChange={open => { if (!open) setDialog(null); }}><DialogContent className="max-w-md"><CalendarDays className="text-primary" size={26} aria-hidden="true" /><DialogTitle>{dialog === 'booking' ? 'Your next beautiful moment.' : dialog === 'group' ? 'Stay in touch with LA BLUSH' : dialog === 'academy' ? 'LA BLUSH Academy' : 'Connect with LA BLUSH'}</DialogTitle><DialogDescription>{dialog === 'booking' ? 'Your appointment is not submitted or confirmed. Contact the studio through its Maps listing to discuss your look and confirm availability.' : dialog === 'group' ? 'A verified WhatsApp group invitation is not available yet. Contact the studio for the invitation.' : dialog === 'academy' ? 'Contact the studio for current academy availability and details.' : 'The Facebook link is not available yet. Follow the studio on Instagram or find its contact details on Maps.'}</DialogDescription>{request && dialog === 'booking' && <><pre className="request-summary">{request}</pre><Button variant="outline" onClick={async () => { try { await navigator.clipboard.writeText(request); setCopied(true); } catch { setCopied(false); } }}><Copy />{copied ? 'Copied' : 'Copy request details'}</Button></>}<Button variant="studioBrand" asChild><a href={maps} target="_blank" rel="noopener noreferrer">Find Studio &amp; Contact on Maps <ArrowUpRight /></a></Button>{dialog === 'social' && <Button variant="outline" asChild><a href={instagram} target="_blank" rel="noopener noreferrer"><Instagram />Instagram</a></Button>}</DialogContent></Dialog>
 </>;
}
