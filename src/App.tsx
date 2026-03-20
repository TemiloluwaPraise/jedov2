/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link, NavLink, useParams } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Mail, Trophy, Footprints, Palette, Car, Target, Layout, Globe, Users, ChevronUp, Menu, X, ImageOff } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

gsap.registerPlugin(ScrollTrigger);

const Logo = ({ className = "h-8 md:h-10" }: { className?: string }) => (
  <Link to="/" className="flex items-center group">
    <svg 
      className={`${className} w-auto h-full transition-transform duration-500 group-hover:scale-105`}
      viewBox="0 0 220 70" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        {/* J */}
        <path d="M10 15H50V45C50 56 41 65 30 65C19 65 10 56 10 45V40" />
        <path d="M20 25H40V45C40 50.5 35.5 55 30 55C24.5 55 20 50.5 20 45" />
        
        {/* E */}
        <path d="M65 15V65H105M65 40H95M65 15H105" />
        <path d="M75 25V55H95M75 40H85M75 25H95" />

        {/* D */}
        <path d="M120 15V65H145C158.8 65 170 53.8 170 40C170 26.2 158.8 15 145 15H120Z" />
        <path d="M130 25V55H145C153.3 55 160 48.3 160 40C160 31.7 153.3 25 145 25H130" />

        {/* O */}
        <circle cx="200" cy="40" r="25" />
        <circle cx="200" cy="40" r="15" />
      </g>
    </svg>
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Work', href: '/work' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <nav className="flex justify-between items-center px-6 md:px-10 py-5 border-b-2 border-black bg-white sticky top-0 z-50">
      <Logo />
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-10 font-sans text-[11px] font-bold uppercase tracking-[0.2em]">
        {navLinks.map((link) => (
          <NavLink 
            key={link.name} 
            to={link.href} 
            className={({ isActive }) => `relative group py-1 ${isActive ? 'text-black' : 'text-black/50 hover:text-black transition-colors duration-500'}`}
          >
            {({ isActive }) => (
              <>
                {link.name}
                <span 
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-black transition-transform duration-500 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                ></span>
              </>
            )}
          </NavLink>
        ))}
        <NavLink 
          to="/gallery" 
          className={({ isActive }) => `relative group py-1 ${isActive ? 'text-jedo-red' : 'text-jedo-red/60 hover:text-jedo-red transition-colors'}`}
        >
          {({ isActive }) => (
            <>
              JEDO Art Gallery
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-jedo-red transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </>
          )}
        </NavLink>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden p-2 z-[60]"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center gap-8 p-10 md:hidden"
          >
            <div className="absolute top-6 left-6">
              <Logo />
            </div>
            <div className="flex flex-col items-center gap-8 font-sans text-xl font-bold uppercase tracking-[0.25em]">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.name} 
                  to={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `${isActive ? 'text-jedo-red' : 'text-black'} transition-colors`}
                >
                  {link.name}
                </NavLink>
              ))}
              <NavLink 
                to="/gallery" 
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `${isActive ? 'text-jedo-red' : 'text-jedo-red/60'} transition-colors`}
              >
                JEDO Art Gallery
              </NavLink>
            </div>
            
            <div className="mt-20 flex gap-8">
              <Instagram className="w-8 h-8" strokeWidth={1} />
              <Mail className="w-8 h-8" strokeWidth={1} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const PUBLIC_PATH = (import.meta as any).env.BASE_URL;

const SectionFrame = ({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <motion.div 
    id={id} 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8 }}
    className={`scroll-mt-24 border-2 border-black m-6 md:m-10 min-h-[85vh] flex flex-col relative overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

const ImageWithFallback = ({ 
  src, 
  alt, 
  className = "", 
  containerClassName = "",
  fallbackTextSize = "text-[8px]",
  ...props 
}: { 
  src: string, 
  alt: string, 
  className?: string, 
  containerClassName?: string,
  fallbackTextSize?: string,
  [key: string]: any 
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fileName = src.split('/').pop();

  if (error) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-500 font-mono uppercase tracking-widest p-4 text-center ${fallbackTextSize} ${containerClassName}`}>
        <div className="flex flex-col items-center gap-2">
          <ImageOff size={fallbackTextSize.includes('sm') ? 24 : 16} strokeWidth={1} className="opacity-40" />
          <span>Image Missing: {fileName}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${containerClassName}`}>
      {loading && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center z-10">
           <span className="font-sans text-[8px] uppercase tracking-widest opacity-30">Loading...</span>
        </div>
      )}
      <motion.img
        src={src}
        alt={alt}
        className={`${className} ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={() => setLoading(false)}
        onError={() => setError(true)}
        referrerPolicy="no-referrer"
        {...props}
      />
    </div>
  );
};

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ 
      duration: 1.2, 
      delay, 
      ease: [0.16, 1, 0.3, 1] 
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const WORK_ITEMS = [
  { id: 'chancellors-cup', icon: Trophy, label: "Chancellors Cup", src: `${PUBLIC_PATH}assets/chancellors-cup.png`, description: "A prestigious football tournament branding and identity project for the elite collegiate sports landscape." },
  { id: 'football-posters', icon: Footprints, label: "Football Posters", src: `${PUBLIC_PATH}assets/football-posters.png`, description: "Dynamic sports poster designs capturing the raw energy and movement of professional football." },
  { id: 'digital-art', icon: Palette, label: "Digital Art", src: `${PUBLIC_PATH}assets/digital-art.png`, description: "Exploring the boundaries of digital expression through avant-garde pieces that merge tech and tradition." },
  { id: 'car-posters', icon: Car, label: "Car Posters", src: `${PUBLIC_PATH}assets/car-posters.png`, description: "Sleek automotive designs celebrating the intersection of high-performance engineering and visual speed." },
  { id: 'ballmania', icon: Target, label: "Ballmania", src: `${PUBLIC_PATH}assets/ballmania.png`, description: "A vibrant sports-themed design series crafted for the modern athlete and digital-first fanbases." },
  { id: 'logos', customLogo: "LOGOS", label: "Logos", src: `${PUBLIC_PATH}assets/logos.png`, description: "Crafting unique, scalable visual identities for forward-thinking brands across the global market." },
  { id: 'web-infrastructure', icon: Globe, label: "Web Infrastructure", src: `${PUBLIC_PATH}assets/web-infrastructure.png`, description: "Building robust, high-performance digital backbones for modern enterprises and creative conglomerates." },
  { id: 'afb-league', icon: Users, label: "AFB League", src: `${PUBLIC_PATH}assets/afb-league.png`, description: "Community-driven sports branding and digital ecosystem for local football leagues in Nigeria." },
];

const WorkItem = React.memo(({ label, src, index, slug }: { label: string, src: string, index: number, slug: string }) => {
  return (
    <Link to={`/work/${slug}`} className="block w-full">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center group cursor-pointer w-full will-change-[transform,opacity] hover:-translate-y-2 transition-transform duration-500"
      >
        <div 
          className="relative w-full aspect-[1.6/1] mt-4 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-shadow duration-500 overflow-hidden rounded-[4px] bg-stone-100"
        >
          <ImageWithFallback 
            src={src} 
            alt={label} 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover will-change-transform"
            initial={{ scale: 1.05, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
        </div>
        <p className="mt-4 font-sans text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-center leading-tight group-hover:text-jedo-red transition-colors duration-300">
          {label}
        </p>
      </motion.div>
    </Link>
  );
});

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-[100] w-14 h-14 bg-black text-white flex items-center justify-center rounded-full shadow-2xl hover:scale-110 transition-transform border-2 border-white/20"
          aria-label="Back to top"
        >
          <ChevronUp size={24} strokeWidth={3} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const HorizontalWork = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (!sectionRef.current || !triggerRef.current) return;
      
      const scrollWidth = sectionRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      
      const pin = gsap.to(sectionRef.current, {
        x: () => -(scrollWidth - windowWidth + 160), // Adjusted for padding
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 2,
          start: "top top",
          end: () => "+=" + scrollWidth,
          snap: {
            snapTo: 1 / (WORK_ITEMS.length - 1),
            duration: { min: 0.3, max: 0.8 },
            delay: 0.1,
            ease: "power2.inOut"
          },
          invalidateOnRefresh: true,
        }
      });
      return () => pin.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <div id="work" className="scroll-mt-24">
      {/* Desktop Horizontal Scroll */}
      <div ref={triggerRef} className="hidden md:block overflow-hidden border-2 border-black m-10 bg-white min-h-screen">
        <div className="pt-24 pb-12 px-10 lg:px-20">
           <Reveal>
             <h2 className="font-serif text-6xl lg:text-8xl uppercase tracking-tightest font-semibold">Our Work</h2>
           </Reveal>
        </div>
        <div ref={sectionRef} className="flex gap-16 lg:gap-24 px-10 lg:px-20 pb-32 w-max items-end will-change-transform">
          {WORK_ITEMS.map((item, i) => (
            <div key={i} className="w-[400px] lg:w-[500px] flex-shrink-0">
              <WorkItem 
                label={item.label} 
                src={item.src} 
                index={i} 
                slug={item.id}
              />
            </div>
          ))}
          {/* Spacer for end of scroll */}
          <div className="w-[20vw] flex-shrink-0"></div>
        </div>
      </div>

      {/* Mobile Vertical Scroll Fallback */}
      <div className="md:hidden py-16 px-6 border-2 border-black m-6">
        <h2 className="font-serif text-5xl uppercase text-center mb-16 tracking-tightest font-semibold">Our Work</h2>
        <div className="grid grid-cols-1 gap-y-16">
          {WORK_ITEMS.map((item, i) => (
            <div key={i}>
              <WorkItem 
                label={item.label} 
                src={item.src} 
                index={i} 
                slug={item.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
};

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.02, y: -10 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.76, 0, 0.24, 1] 
      }}
      onAnimationComplete={() => {
        ScrollTrigger.refresh();
      }}
    >
      {children}
    </motion.div>
  );
};

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormState({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-10 bg-black/95 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="bg-white w-full max-w-3xl border-2 border-black p-8 md:p-16 relative overflow-hidden"
          >
            {/* Decorative Red Accent */}
            <div className="absolute top-0 left-0 w-full h-2 bg-jedo-red"></div>
            
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 text-black hover:text-jedo-red transition-colors z-10"
              aria-label="Close form"
            >
              <X size={32} strokeWidth={2} />
            </button>

            {isSubmitted ? (
              <div className="text-center py-20 flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="w-24 h-24 bg-jedo-red rounded-full flex items-center justify-center mb-10 shadow-2xl"
                >
                  <Trophy className="text-white" size={48} strokeWidth={1.5} />
                </motion.div>
                <h3 className="font-serif text-5xl md:text-6xl uppercase mb-6 font-bold tracking-tightest">Message Received</h3>
                <p className="font-sans text-sm md:text-base uppercase tracking-[0.4em] opacity-60 max-w-md mx-auto leading-relaxed">
                  Our team will review your inquiry and get back to you shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-12">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.5em] text-jedo-red mb-4 block">Inquiry Form</span>
                  <h2 className="font-serif text-5xl md:text-7xl uppercase font-bold tracking-tightest leading-none">
                    Tell Us <br /> Everything
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="YOUR NAME"
                        className="w-full border-b-2 border-black py-4 focus:outline-none focus:border-jedo-red transition-colors font-sans text-lg uppercase tracking-wider placeholder:opacity-20"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="YOUR@EMAIL.COM"
                        className="w-full border-b-2 border-black py-4 focus:outline-none focus:border-jedo-red transition-colors font-sans text-lg uppercase tracking-wider placeholder:opacity-20"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">What do you want to do?</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full border-2 border-black p-6 focus:outline-none focus:border-jedo-red transition-colors font-sans text-lg uppercase tracking-wider resize-none placeholder:opacity-20"
                      placeholder="TELL US ABOUT YOUR PROJECT, ART INQUIRY, OR COLLABORATION..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-black text-white py-8 font-sans font-bold uppercase tracking-[0.5em] hover:bg-jedo-red transition-all duration-700 shadow-xl hover:shadow-jedo-red/20 active:scale-[0.98]"
                  >
                    Send Inquiry
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const HomePage = ({ onContactClick }: { onContactClick: () => void }) => (
  <PageTransition>
    {/* Hero Section */}
    <SectionFrame id="home" className="relative justify-center items-center text-center px-6 py-20 overflow-hidden">
      {/* Background Image Accent */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <ImageWithFallback 
          src={`${PUBLIC_PATH}assets/digital-art.png`} 
          alt="Digital Art Background" 
          className="w-full h-full object-cover grayscale opacity-30"
        />
      </motion.div>

      {/* Animated Background Gradient */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-jedo-red/5 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -40, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-black/5 blur-[100px] rounded-full pointer-events-none"
      />

      <div className="mb-12 relative z-10">
        <Reveal>
          <motion.h1 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-[110px] uppercase tracking-tightest leading-tightest mb-8 font-semibold"
          >
            The Man From Madeira
          </motion.h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="font-sans text-[10px] md:text-[13px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] px-4">
            View More Masterpieces in the <Link to="/gallery" className="relative group cursor-pointer inline-block">
              Art Gallery
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          </p>
        </Reveal>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 font-sans text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em] hover:opacity-100 transition-opacity whitespace-nowrap underline decoration-dotted underline-offset-4 decoration-black/30"
      >
        © 2026 JEDO Group. All rights reserved
      </motion.div>
    </SectionFrame>

    {/* About Section */}
    <SectionFrame id="about" className="justify-center items-center px-6 md:px-32 py-20 md:py-32">
      <div className="max-w-6xl text-center">
        <Reveal className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 md:mb-16">
          <Logo className="h-6 md:h-8" />
          <span className="font-sans font-bold text-lg md:text-2xl uppercase tracking-[0.25em]">Creative Conglomerate</span>
        </Reveal>
        
        <Reveal delay={0.2}>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-[72px] uppercase leading-extra-tight tracking-tightest font-semibold">
            JEDO Group is a leading design conglomerate in Nigeria. Their creations range from brand identity and logos, to fashion design. With the aim of becoming <span className="text-jedo-red italic">Digital Design Giants.</span>
          </h2>
        </Reveal>
      </div>
    </SectionFrame>

    {/* Horizontal Work Section */}
    <HorizontalWork />

    {/* Contact Section */}
    <SectionFrame id="contact" className="justify-center items-center text-center px-6 py-20 md:py-32">
      <div className="max-w-4xl">
        <Reveal>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-[100px] uppercase mb-8 md:mb-12 tracking-tightest font-semibold">
            Where to contact us?
          </h2>
        </Reveal>
        
        <Reveal delay={0.2} className="font-sans text-[9px] sm:text-[10px] md:text-[13px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.35em] space-y-3 mb-12 md:mb-20 leading-relaxed text-center">
          <p>Looking for early access to art pieces?</p>
          <p>Or you want us to make one of your own?</p>
          <p className="opacity-50">You know where to find us.</p>
        </Reveal>

        <div className="flex flex-col sm:flex-row gap-8 md:gap-12 justify-center items-center">
          <Reveal delay={0.3}>
            <a href="#" className="w-40 h-40 md:w-56 md:h-56 bg-black flex items-center justify-center rounded-[4px] hover:scale-[1.05] hover:-translate-y-2 hover:shadow-2xl hover:bg-jedo-red transition-all duration-300">
              <Instagram className="text-white w-16 h-16 md:w-24 md:h-24" strokeWidth={0.5} />
            </a>
          </Reveal>
          <Reveal delay={0.4}>
            <button 
              onClick={onContactClick}
              className="w-40 h-40 md:w-56 md:h-56 bg-black flex items-center justify-center rounded-[4px] hover:scale-[1.05] hover:-translate-y-2 hover:shadow-2xl hover:bg-jedo-red transition-all duration-300 cursor-pointer"
            >
              <Mail className="text-white w-16 h-16 md:w-24 md:h-24" strokeWidth={0.5} />
            </button>
          </Reveal>
        </div>
      </div>
    </SectionFrame>
  </PageTransition>
);

const AboutPage = () => (
  <PageTransition>
    <SectionFrame id="about-page" className="justify-center items-center px-6 md:px-20 lg:px-32 py-20 md:py-32 bg-stone-50">
      <div className="max-w-6xl text-center">
        <Reveal>
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.5em] text-jedo-red mb-6 block">Our Story</span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-[120px] uppercase mb-12 font-semibold tracking-tightest leading-none">
            Pioneering <br /> Digital <br /> Excellence
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 text-left mt-10 lg:mt-20">
          <Reveal delay={0.2}>
            <p className="font-sans text-base md:text-lg lg:text-xl uppercase tracking-widest leading-relaxed opacity-80">
              Founded in Lagos, JEDO Group emerged from a vision to redefine the African creative landscape. We don't just design; we engineer experiences that bridge the gap between heritage and high-tech.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-sans text-base md:text-lg lg:text-xl uppercase tracking-widest leading-relaxed opacity-80">
              Our multidisciplinary approach allows us to navigate seamlessly between brand identity, digital infrastructure, and avant-garde fashion. We are the architects of the new digital age.
            </p>
          </Reveal>
        </div>
      </div>
    </SectionFrame>
  </PageTransition>
);

const GalleryPage = () => {
  const galleryImages = [
    `${PUBLIC_PATH}assets/chancellors-cup.png`,
    `${PUBLIC_PATH}assets/football-posters.png`,
    `${PUBLIC_PATH}assets/digital-art.png`,
    `${PUBLIC_PATH}assets/car-posters.png`,
    `${PUBLIC_PATH}assets/ballmania.png`,
    `${PUBLIC_PATH}assets/logos.png`
  ];

  return (
    <PageTransition>
      <SectionFrame id="gallery-page" className="px-6 md:px-10 lg:px-20 py-20 md:py-32">
        <Reveal className="mb-12 lg:mb-20">
          <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase font-semibold tracking-tightest">Art Gallery</h2>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.4em] mt-4 opacity-60">Curated Masterpieces from Madeira</p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {galleryImages.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.8 }}
              className="aspect-[3/4] bg-black relative overflow-hidden group cursor-crosshair will-change-[transform,opacity]"
            >
              <ImageWithFallback 
                src={src} 
                alt={`Gallery Item ${i}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 will-change-transform"
                style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
              />
              <div 
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center"
                style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
              >
                <span 
                  className="text-white font-sans text-[10px] font-bold uppercase tracking-[0.3em] border border-white/30 px-4 py-2 translate-y-4 group-hover:translate-y-0 transition-all duration-700"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                >View Piece</span>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionFrame>
    </PageTransition>
  );
};

const WorkPage = () => (
  <PageTransition>
    <HorizontalWork />
  </PageTransition>
);

const ContactPage = ({ onContactClick }: { onContactClick: () => void }) => (
  <PageTransition>
    <SectionFrame id="contact-page" className="justify-center items-center text-center px-6 md:px-20 lg:px-32 py-20 md:py-32 bg-black text-white">
      <div className="max-w-4xl">
        <Reveal>
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.5em] text-jedo-red mb-8 block">Connect</span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-[100px] uppercase mb-12 font-semibold tracking-tightest leading-none">
            Let's Build <br /> The Future
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="space-y-6 mb-12 lg:mb-20">
            <p className="font-sans text-lg sm:text-xl md:text-3xl uppercase tracking-[0.2em] font-light">hello@jedogroup.com</p>
            <p className="font-sans text-xs sm:text-sm md:text-lg uppercase tracking-[0.3em] opacity-60">Lagos, Nigeria · London, UK</p>
          </div>
        </Reveal>
        <div className="flex justify-center gap-12">
          <Reveal delay={0.3}>
            <a href="#" className="group flex flex-col items-center gap-4">
              <div className="w-20 h-20 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                <Instagram size={32} strokeWidth={1} />
              </div>
              <span className="font-sans text-[9px] font-bold uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">Instagram</span>
            </a>
          </Reveal>
          <Reveal delay={0.4}>
            <button 
              onClick={onContactClick}
              className="group flex flex-col items-center gap-4 cursor-pointer"
            >
              <div className="w-20 h-20 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                <Mail size={32} strokeWidth={1} />
              </div>
              <span className="font-sans text-[9px] font-bold uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">Email</span>
            </button>
          </Reveal>
        </div>
      </div>
    </SectionFrame>
  </PageTransition>
);

const WorkDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const work = WORK_ITEMS.find(item => item.id === slug);

  if (!work) return (
    <PageTransition>
      <SectionFrame className="justify-center items-center text-center">
        <h2 className="font-serif text-4xl uppercase mb-8">Work Not Found</h2>
        <Link to="/work" className="font-sans text-[11px] font-bold uppercase tracking-[0.4em] border-2 border-black px-8 py-4 hover:bg-black hover:text-white transition-all">Back to Work</Link>
      </SectionFrame>
    </PageTransition>
  );

  return (
    <PageTransition>
      <SectionFrame className="px-6 md:px-20 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          <Link to="/work" className="inline-flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.3em] mb-12 hover:text-jedo-red transition-colors group">
            <X size={16} className="rotate-45 group-hover:rotate-0 transition-transform duration-500" /> Back to Work
          </Link>
          
          <Reveal>
            <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl uppercase font-semibold tracking-tightest mb-12 leading-none">
              {work.label}
            </h1>
          </Reveal>
          
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mt-12">
            <Reveal delay={0.2}>
              <div className="relative aspect-[1.6/1] bg-stone-100 rounded-[4px] flex items-center justify-center overflow-hidden shadow-2xl">
                <ImageWithFallback 
                  src={work.src} 
                  alt={work.label} 
                  decoding="async"
                  fallbackTextSize="text-sm"
                  className="w-full h-full object-cover will-change-[transform,opacity]"
                  initial={{ scale: 1.05, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>
            </Reveal>
            
            <div className="flex flex-col justify-center space-y-12">
              <Reveal delay={0.3}>
                <p className="font-sans text-lg md:text-2xl uppercase tracking-widest leading-relaxed opacity-80">
                  {work.description}
                </p>
              </Reveal>
              
              <Reveal delay={0.4}>
                <div className="pt-12 border-t border-black/10">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.5em] text-jedo-red mb-8 block">Project Specifications</span>
                  <div className="grid grid-cols-2 gap-12">
                    <div>
                      <span className="block font-sans text-[9px] uppercase tracking-[0.3em] opacity-40 mb-2">Timeline</span>
                      <span className="font-sans text-sm md:text-base font-bold uppercase tracking-wider">Q1 2026</span>
                    </div>
                    <div>
                      <span className="block font-sans text-[9px] uppercase tracking-[0.3em] opacity-40 mb-2">Discipline</span>
                      <span className="font-sans text-sm md:text-base font-bold uppercase tracking-wider">Digital Design</span>
                    </div>
                    <div>
                      <span className="block font-sans text-[9px] uppercase tracking-[0.3em] opacity-40 mb-2">Client</span>
                      <span className="font-sans text-sm md:text-base font-bold uppercase tracking-wider">JEDO Global</span>
                    </div>
                    <div>
                      <span className="block font-sans text-[9px] uppercase tracking-[0.3em] opacity-40 mb-2">Status</span>
                      <span className="font-sans text-sm md:text-base font-bold uppercase tracking-wider text-jedo-red">Completed</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </SectionFrame>
    </PageTransition>
  );
};

const AnimatedRoutes = ({ onContactClick }: { onContactClick: () => void }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore - key is a valid React prop but not explicitly in RoutesProps */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage onContactClick={onContactClick} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:slug" element={<WorkDetailPage />} />
        <Route path="/contact" element={<ContactPage onContactClick={onContactClick} />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="max-w-[1600px] mx-auto bg-white">
        <Navbar />
        <AnimatedRoutes onContactClick={() => setIsContactOpen(true)} />
        <BackToTop />
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        <Analytics />
      </div>
    </Router>
  );
}
