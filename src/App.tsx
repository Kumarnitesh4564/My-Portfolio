import { motion } from 'framer-motion';
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

export default function App() {
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
      <motion.div className='page-flash' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} />
    </Loader>
  );
}