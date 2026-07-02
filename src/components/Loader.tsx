import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';

export function Loader({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 1700);
    return () => window.clearTimeout(timer);
  }, []);

  return <>
    <AnimatePresence>
      {!ready && <motion.div className='loader' initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
        <motion.div className='loader__logo' animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}>NK</motion.div>
        <div className='loader__bar'><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.6, ease: 'easeInOut' }} /></div>
      </motion.div>}
    </AnimatePresence>
    {ready && children}
  </>;
}