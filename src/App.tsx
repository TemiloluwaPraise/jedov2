/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link, NavLink } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Mail, Trophy, Footprints, Palette, Car, Target, Layout, Globe, Users, ChevronUp, Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Logo = () => (
  <div className="font-sans font-bold text-2xl tracking-tighter flex items-center leading-none">
    JEDO
    <div className="ml-1.5 w-7 h-7 border-[4px] border-black rounded-full flex items-center justify-center">
      <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
    </div>
  </div>
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

const WorkItem = ({ icon: Icon, label, customLogo, imageUrl, index }: { icon?: any, label: string, customLogo?: string, imageUrl?: string, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    className="flex flex-col items-center group cursor-pointer w-full hover:-translate-y-3 transition-all duration-700"
    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
  >
    <div 
      className="relative w-full aspect-[1.6/1] mt-4 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-700"
      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      {/* Folder Tab */}
      <div className="absolute -top-[10px] left-0 w-[42%] h-[11px] bg-black rounded-t-[2px]"></div>
      {/* Folder Body */}
      <div className="w-full h-full bg-black rounded-b-[2px] rounded-tr-[2px] flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <motion.img 
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src={imageUrl} 
            alt={label} 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
        ) : customLogo ? (
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
            className="text-white font-black text-2xl tracking-tighter italic"
          >
            {customLogo}
          </motion.span>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
          >
            <Icon className="text-white w-14 h-14 md:w-20 md:h-20" strokeWidth={0.75} />
          </motion.div>
        )}
      </div>
    </div>
    <p className="mt-4 font-sans text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-center leading-tight">
      {label}
    </p>
  </motion.div>
);

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

const CreativePillars = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const pillars = [
    {
      title: "Identity",
      description: "Crafting unique brand stories that resonate globally. From Lagos to the world, we define the visual DNA of modern African excellence.",
      image: "https://picsum.photos/seed/jedo-identity/800/1000"
    },
    {
      title: "Digital",
      description: "Engineering the future of web infrastructure. We build digital ecosystems that are as robust as they are beautiful.",
      image: "https://picsum.photos/seed/jedo-digital/800/1000"
    },
    {
      title: "Fashion",
      description: "Where heritage meets haute couture. Our designs are a dialogue between traditional craftsmanship and contemporary silhouettes.",
      image: "https://picsum.photos/seed/jedo-fashion/800/1000"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinning logic
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftRef.current,
        pinSpacing: false,
      });

      // Content change logic
      pillars.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `.pillar-text-${i}`,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative flex flex-col md:flex-row m-6 md:m-10 border-2 border-black overflow-hidden bg-white">
      {/* Left Side - Sticky */}
      <div ref={leftRef} className="hidden md:flex w-1/2 h-screen bg-black items-center justify-center overflow-hidden border-r-2 border-black relative">
            <motion.img
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              src={pillars[activeIndex].image}
              alt={pillars[activeIndex].title}
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-10 left-10">
          <motion.span 
            key={`title-${activeIndex}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-serif text-6xl text-white uppercase tracking-tightest font-bold"
          >
            0{activeIndex + 1}
          </motion.span>
        </div>
      </div>

      {/* Right Side - Scrolling */}
      <div className="w-full md:w-1/2 bg-white">
        {pillars.map((pillar, i) => (
          <div 
            key={i} 
            className={`pillar-text-${i} h-screen flex flex-col justify-center px-10 md:px-20 border-b-2 last:border-b-0 border-black`}
          >
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.4em] text-jedo-red mb-4">
              Pillar 0{i + 1}
            </span>
            <h3 className="font-serif text-5xl md:text-7xl uppercase tracking-tightest leading-tightest mb-8 font-semibold">
              {pillar.title}
            </h3>
            <p className="font-sans text-sm md:text-base uppercase tracking-[0.1em] leading-relaxed opacity-70">
              {pillar.description}
            </p>
            {/* Mobile Image */}
            <div className="mt-10 md:hidden aspect-square bg-black overflow-hidden rounded-[2px]">
              <img 
                src={pillar.image} 
                alt={pillar.title} 
                className="w-full h-full object-cover opacity-80" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HorizontalWork = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const workItems = [
    { icon: Trophy, label: "Chancellors Cup" },
    { icon: Footprints, label: "Football Posters" },
    { icon: Palette, label: "Digital Art" },
    { icon: Car, label: "Car Posters" },
    { icon: Target, label: "Ballmania" },
    { customLogo: "LOGOS", label: "Logos" },
    { icon: Globe, label: "Web Infrastructure" },
    { icon: Users, label: "AFB League" },
  ];

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
            snapTo: 1 / (workItems.length - 1),
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
        <div className="pt-24 pb-12 px-20">
           <Reveal>
             <h2 className="font-serif text-8xl uppercase tracking-tightest font-semibold">Our Work</h2>
           </Reveal>
        </div>
        <div ref={sectionRef} className="flex gap-24 px-20 pb-32 w-max items-end">
          {workItems.map((item, i) => (
            <div key={i} className="w-[500px] flex-shrink-0">
              <WorkItem 
                icon={item.icon} 
                label={item.label} 
                customLogo={item.customLogo} 
                index={i} 
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
          {workItems.map((item, i) => (
            <div key={i}>
              <WorkItem 
                icon={item.icon} 
                label={item.label} 
                customLogo={item.customLogo} 
                index={i} 
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

const HomePage = () => (
  <PageTransition>
    {/* Hero Section */}
    <SectionFrame id="home" className="relative justify-center items-center text-center px-6 py-20 overflow-hidden">
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
            className="font-serif text-5xl sm:text-7xl md:text-[110px] uppercase tracking-tightest leading-tightest mb-8 font-semibold"
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
          <Logo />
          <span className="font-sans font-bold text-lg md:text-2xl uppercase tracking-[0.25em]">Creative Conglomerate</span>
        </Reveal>
        
        <Reveal delay={0.2}>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[72px] uppercase leading-extra-tight tracking-tightest font-semibold">
            JEDO Group is a leading design conglomerate in Nigeria. Their creations range from brand identity and logos, to fashion design. With the aim of becoming <span className="text-jedo-red italic">Digital Design Giants.</span>
          </h2>
        </Reveal>
      </div>
    </SectionFrame>

    {/* Sticky Scroll Section */}
    <CreativePillars />

    {/* Horizontal Work Section */}
    <HorizontalWork />

    {/* Contact Section */}
    <SectionFrame id="contact" className="justify-center items-center text-center px-6 py-20 md:py-32">
      <div className="max-w-4xl">
        <Reveal>
          <h2 className="font-serif text-5xl sm:text-6xl md:text-[100px] uppercase mb-10 md:mb-12 tracking-tightest font-semibold">
            Where to contact us?
          </h2>
        </Reveal>
        
        <Reveal delay={0.2} className="font-sans text-[10px] md:text-[13px] font-bold uppercase tracking-[0.25em] md:tracking-[0.35em] space-y-3 mb-16 md:mb-20 leading-relaxed text-center">
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
            <a href="#" className="w-40 h-40 md:w-56 md:h-56 bg-black flex items-center justify-center rounded-[4px] hover:scale-[1.05] hover:-translate-y-2 hover:shadow-2xl hover:bg-jedo-red transition-all duration-300">
              <Mail className="text-white w-16 h-16 md:w-24 md:h-24" strokeWidth={0.5} />
            </a>
          </Reveal>
        </div>
      </div>
    </SectionFrame>
  </PageTransition>
);

const AboutPage = () => (
  <PageTransition>
    <SectionFrame id="about-page" className="justify-center items-center px-6 md:px-32 py-20 md:py-32 bg-stone-50">
      <div className="max-w-6xl text-center">
        <Reveal>
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.5em] text-jedo-red mb-6 block">Our Story</span>
          <h2 className="font-serif text-5xl md:text-[120px] uppercase mb-12 font-semibold tracking-tightest leading-none">
            Pioneering <br /> Digital <br /> Excellence
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-16 text-left mt-20">
          <Reveal delay={0.2}>
            <p className="font-sans text-lg md:text-xl uppercase tracking-widest leading-relaxed opacity-80">
              Founded in Lagos, JEDO Group emerged from a vision to redefine the African creative landscape. We don't just design; we engineer experiences that bridge the gap between heritage and high-tech.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-sans text-lg md:text-xl uppercase tracking-widest leading-relaxed opacity-80">
              Our multidisciplinary approach allows us to navigate seamlessly between brand identity, digital infrastructure, and avant-garde fashion. We are the architects of the new digital age.
            </p>
          </Reveal>
        </div>
      </div>
    </SectionFrame>
  </PageTransition>
);

const GalleryPage = () => (
  <PageTransition>
    <SectionFrame id="gallery-page" className="px-6 md:px-20 py-20 md:py-32">
      <Reveal className="mb-20">
        <h2 className="font-serif text-6xl md:text-9xl uppercase font-semibold tracking-tightest">Art Gallery</h2>
        <p className="font-sans text-[11px] font-bold uppercase tracking-[0.4em] mt-4 opacity-60">Curated Masterpieces from Madeira</p>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="aspect-[3/4] bg-black relative overflow-hidden group cursor-crosshair"
          >
            <img 
              src={`https://picsum.photos/seed/gallery-${i}/800/1200`} 
              alt={`Gallery Item ${i}`}
              className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
              referrerPolicy="no-referrer"
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

const WorkPage = () => (
  <PageTransition>
    <HorizontalWork />
  </PageTransition>
);

const ContactPage = () => (
  <PageTransition>
    <SectionFrame id="contact-page" className="justify-center items-center text-center px-6 py-20 md:py-32 bg-black text-white">
      <div className="max-w-4xl">
        <Reveal>
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.5em] text-jedo-red mb-8 block">Connect</span>
          <h2 className="font-serif text-5xl md:text-[100px] uppercase mb-12 font-semibold tracking-tightest leading-none">
            Let's Build <br /> The Future
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="space-y-6 mb-20">
            <p className="font-sans text-xl md:text-3xl uppercase tracking-[0.2em] font-light">hello@jedogroup.com</p>
            <p className="font-sans text-sm md:text-lg uppercase tracking-[0.3em] opacity-60">Lagos, Nigeria · London, UK</p>
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
            <a href="#" className="group flex flex-col items-center gap-4">
              <div className="w-20 h-20 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                <Mail size={32} strokeWidth={1} />
              </div>
              <span className="font-sans text-[9px] font-bold uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">Email</span>
            </a>
          </Reveal>
        </div>
      </div>
    </SectionFrame>
  </PageTransition>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} {...({ key: location.pathname } as any)}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
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
        <AnimatedRoutes />
        <BackToTop />
      </div>
    </Router>
  );
}
