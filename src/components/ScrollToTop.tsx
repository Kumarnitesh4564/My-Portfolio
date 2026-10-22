// ─── ScrollToTop — Fixed floating button ──────────────────────────────────────
//
// WHY: Professional portfolios have a "back to top" affordance because sections
//      are long. Without it, users have to manually scroll all the way up.
//
// HOW:
//   • `window.scrollY > 300` — listens to the native scroll event (lightweight).
//     300px is enough that the button won't flash on initial load.
//   • AnimatePresence mounts/unmounts the button with a slide-up fade.
//   • On click → smooth scroll to {top: 0} (Lenis intercepts this automatically
//     since it patches window.scrollTo, so the scroll itself is smooth).
//   • `whileHover / whileTap` — subtle scale interaction feedback.
//   • `aria-label` — screen-reader accessible.

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className='scroll-top'
          onClick={scrollUp}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.22 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.93 }}
          aria-label='Scroll to top'
        >
          <FiArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
