import { motion } from 'framer-motion';
import { FiDownload, FiMail } from 'react-icons/fi';
const items = ['Home', 'About', 'Skills', 'Projects', 'Coding', 'Education', 'Achievements', 'Contact'];
export function Navbar() {
  return <motion.header className='navbar' initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
    <div className='navbar__brand'>Nitesh Kumar</div>
    <nav className='navbar__links'>{items.map((item) => <a key={item} href={'#' + item.toLowerCase()}>{item}</a>)}</nav>
    <div className='navbar__actions'>
      <a className='nav-btn ghost' href='/resume.pdf'><FiDownload /> Resume</a>
      <a className='nav-btn primary' href='#contact'><FiMail /> Hire Me</a>
    </div>
  </motion.header>;
}