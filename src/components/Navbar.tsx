// ─── Navbar — with active section tracking + mobile hamburger ─────────────────
//
// TWO NEW FEATURES:
//
// 1. ACTIVE SECTION HIGHLIGHT
//    Uses the browser's IntersectionObserver API — a performant way to detect
//    which <section id="..."> is currently in the viewport without scroll events.
//
//    Flow:
//      • useEffect runs once on mount, creates an IntersectionObserver
//      • It watches every <section id="..."> element on the page
//      • When a section enters the viewport (threshold: 0.25 = 25% visible),
//        we update `active` state to that section's id
//      • The matching <a> in the nav gets class "nav-active" → glows cyan
//      • Observer is disconnected on component unmount (cleanup)
//
// 2. MOBILE HAMBURGER MENU
//    • The desktop nav links are hidden on <1080px (CSS: display:none on mobile)
//    • A hamburger icon button (FiMenu / FiX toggle) is shown instead
//    • Clicking it opens an AnimatePresence slide-down drawer (.navbar__mobile)
//    • Clicking any link in the drawer closes it and navigates to the section
//    • On desktop the hamburger button is hidden via .hamburger CSS class

import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiMail, FiMenu, FiX } from 'react-icons/fi';
import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  'Home', 'About', 'Skills', 'Projects',
  'Coding', 'Education', 'Achievements', 'Contact',
];

export function Navbar() {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Watch all sections that have an id attribute
    const sections = document.querySelectorAll<HTMLElement>('section[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry (topmost on page)
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;

        const topmost = intersecting.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActive(topmost.target.id);
      },
      {
        // rootMargin: shrinks the detection zone — section must be in the
        // "middle band" of the viewport (top 15% and bottom 40% are ignored)
        rootMargin: '-15% 0px -40% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      className='navbar'
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Brand / logo */}
      <div className='navbar__brand'>Nitesh Kumar</div>

      {/* Desktop navigation links — hidden on mobile via CSS */}
      <nav className='navbar__links'>
        {NAV_ITEMS.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className={active === item.toLowerCase() ? 'nav-active' : ''}
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Action buttons */}
      <div className='navbar__actions'>
        <a className='nav-btn ghost' href='/resume.pdf' download>
          <FiDownload /> Resume
        </a>
        <a className='nav-btn primary' href='#contact'>
          <FiMail /> Hire Me
        </a>

        {/* Hamburger — only visible on mobile (CSS: .hamburger) */}
        <button
          className='nav-btn ghost hamburger'
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile drawer — AnimatePresence handles mount/unmount animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className='navbar__mobile'
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={active === item.toLowerCase() ? 'nav-active' : ''}
                onClick={() => setMenuOpen(false)} // close drawer on click
              >
                {item}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
