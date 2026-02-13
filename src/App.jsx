import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useLenis } from './hooks/useLenis';
import Navbar from './components/Header/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Technology from './components/Technology';
import Team from './components/Team';
import Footer from './components/Footer';

// Register once at the module level — never inside a component.
gsap.registerPlugin(ScrollTrigger);

function App() {
  // Smart Lenis: enabled on desktop, skipped on touch devices.
  useLenis();

  return (
    <>
      {/*
        Aurora layer — its own GPU compositing layer via will-change.
        Fixed + translateZ(0) keeps it off the main thread paint.
        z-index: 0 so it never bleeds above content.
      */}
      <div className="aurora-background" aria-hidden="true" />

      {/*
        Content wrapper.
        z-index: 1 clears the aurora layer.
        isolation: isolate creates a new stacking context so no child
        z-index can accidentally escape and sit behind the aurora.
      */}
      <div className="relative" style={{ zIndex: 1, isolation: 'isolate' }}>
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Technology />
          <Team />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
