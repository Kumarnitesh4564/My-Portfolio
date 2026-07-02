import { motion } from 'framer-motion';
export function About({ profile }: { profile: { about: string[] } }) {
  return <section id='about' className='section about'>
    <div className='section__heading'><span>About</span><h2>About Me</h2></div>
    <div className='about__grid'>
      <motion.div className='glass card' initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        {profile.about.map((item) => <p key={item}>{item}</p>)}
      </motion.div>
      <motion.div className='glass timeline' initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className='timeline__item'><span>2023</span><strong>Entered engineering</strong><p>PDEA's College of Engineering, Pune</p></div>
        <div className='timeline__item'><span>2024</span><strong>Built product-grade projects</strong><p>Focused on full stack systems and DSA.</p></div>
        <div className='timeline__item'><span>Now</span><strong>Internship ready</strong><p>Seeking full stack or software roles.</p></div>
      </motion.div>
    </div>
  </section>;
}