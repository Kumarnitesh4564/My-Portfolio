import { motion } from 'framer-motion';
const groups = ['languages', 'frontend', 'backend', 'database', 'dsa', 'tools', 'core'] as const;
export function Skills({ skills }: { skills: Record<string, string[]> }) {
  return <section id='skills' className='section'><div className='section__heading'><span>Capabilities</span><h2>Skills</h2></div><div className='skills-grid'>{groups.map((group) => <motion.div className='glass skill-card' key={group} whileHover={{ y: -6, scale: 1.01 }}><h3>{group}</h3><div className='chip-list'>{skills[group].map((skill) => <span key={skill}>{skill}</span>)}</div></motion.div>)}</div></section>;
}