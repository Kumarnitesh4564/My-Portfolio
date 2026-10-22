// ─── Lenis smooth scroll ──────────────────────────────────────────────────────
// Lenis was installed (package.json) but never initialised — so it was doing
// nothing. We import it here and start it inside useEffect so it runs once
// after the component mounts. `autoRaf: true` means Lenis manages its own
// requestAnimationFrame loop internally; no manual raf setup needed.
// The cleanup `lenis.destroy()` removes all event listeners on unmount.
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import profile from './data/profile.json';
import projects from './data/projects.json';
import skills from './data/skills.json';
import socials from './data/socials.json';
import { Cursor } from './components/Cursor';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { OrbitStack } from './components/OrbitStack';
import { Projects } from './components/Projects';
import { CodingProfiles } from './components/CodingProfiles';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Education } from './components/Education';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  useEffect(() => {
    // duration: 1.2s scroll animation, easing: exponential decay (feels natural)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <Loader>
      <Cursor />
      <Navbar />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Education />
        <Skills skills={skills} />
        <OrbitStack orbit={skills.orbit} />
        <Projects projects={projects} />
        <CodingProfiles socials={socials} />
        <Achievements />
        <Contact socials={socials} profile={profile} />
      </main>
      <Footer profile={profile} />
      <ScrollToTop />
      <motion.div className='page-flash' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} />
    </Loader>
  );
}