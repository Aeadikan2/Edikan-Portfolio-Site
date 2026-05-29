import React, { useEffect, useState, useMemo } from 'react'

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CustomCursor from './components/common/CustomCursor';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Portfolio from './components/sections/Portfolio';
// import Awards from './components/sections/Awards';
// import Testimonial from './components/sections/Testimonial';
// import Clients from './components/sections/Clients';
import Contact from './components/sections/Contact';

import './index.css'
import './cursor.css'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Generate star positions once per session
  const generateStars = (count) => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 2 + 1; // 1 - 3px
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = 12 + Math.random() * 18; // 12 - 30s
      const delay = Math.random() * -20; // negative delays to stagger
      arr.push({ size, left, top, duration, delay, id: `s-${i}-${Math.random().toString(36).slice(2,7)}` });
    }
    return arr;
  };

  const layerA = useMemo(() => generateStars(60), []);
  const layerB = useMemo(() => generateStars(40), []);
  const layerC = useMemo(() => generateStars(20), []);

  useEffect(() => {
    const handleLoad = () => setIsLoading(false);
    if (document.readyState === 'complete') {
      handleLoad();
      return;
    }
    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-modal glass-card p-4 rounded-4 text-center">
            <div className="loading-spinner" aria-hidden="true"></div>
            <p className="mt-3 mb-0 text-white">Loading portfolio experience...</p>
          </div>
        </div>
      )}
      {/* Star layers (fixed, behind content) */}
      <div className="stars-layer layer-a" aria-hidden="true">
        {layerA.map((s) => (
          <span key={s.id} className="star" style={{ left: `${s.left}%`, top: `${s.top}%`, width: `${s.size}px`, height: `${s.size}px`, animationDuration: `${s.duration}s`, animationDelay: `${s.delay}s` }} />
        ))}
      </div>
      <div className="stars-layer layer-b" aria-hidden="true">
        {layerB.map((s) => (
          <span key={s.id} className="star small" style={{ left: `${s.left}%`, top: `${s.top}%`, width: `${s.size * 0.8}px`, height: `${s.size * 0.8}px`, animationDuration: `${s.duration * 1.1}s`, animationDelay: `${s.delay}s` }} />
        ))}
      </div>
      <div className="stars-layer layer-c" aria-hidden="true">
        {layerC.map((s) => (
          <span key={s.id} className="star tiny" style={{ left: `${s.left}%`, top: `${s.top}%`, width: `${s.size * 0.6}px`, height: `${s.size * 0.6}px`, animationDuration: `${s.duration * 1.6}s`, animationDelay: `${s.delay}s` }} />
        ))}
      </div>
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        {/* <Awards /> */}
        {/* <Testimonial /> */}
        {/* <Clients /> */}
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
