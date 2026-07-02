import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';

export function OrbitStack({ orbit }: { orbit: string[] }) {
  return <section className='section orbit-section'><div className='section__heading'><span>Stack</span><h2>Tech Orbit</h2></div><div className='orbit-shell'><div className='orbit-core'>Full Stack</div>{orbit.map((item, index) => <motion.span key={item} className='orbit-pill' style={{ '--angle': String((index / orbit.length) * 360) + 'deg' } as CSSProperties} animate={{ rotate: [0, 360] }} transition={{ duration: 24 + index, repeat: Infinity, ease: 'linear' }}>{item}</motion.span>)}</div></section>;
}