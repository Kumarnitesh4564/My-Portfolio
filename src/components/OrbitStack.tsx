// ─── OrbitStack — Orbiting tech pill ring ──────────────────────────────────────
//
// HOW IT WORKS (the rotation problem explained):
//
// OLD approach (broken):
//   Each pill had its own `animate={{ rotate: [0, 360] }}` at different durations
//   (24s, 25s, 26s…). Framer Motion's rotate conflicted with the CSS
//   `transform: rotate(angle) translateY(-250px) rotate(-angle)` counter-rotation,
//   making pills wobble at different speeds and text unreadable.
//
// NEW approach (correct):
//   ONE parent div (.orbit-ring) rotates +360° in 35s.
//   EACH pill counter-rotates -360° in the SAME 35s → net pill orientation = 0
//   → text always stays upright while pills orbit the center.
//
//   Pill positions are calculated with basic trig (cos/sin) as % coordinates
//   rather than CSS transform chains — clean, deterministic, no conflicts.
//
//   Math:
//     angle = (index / total) * 2π - π/2   → start from the top (12 o'clock)
//     cx = 50 + 44 * cos(angle)             → x% from left (44% = ~280px on 640px shell)
//     cy = 50 + 44 * sin(angle)             → y% from top

import { motion } from 'framer-motion';
// CSSProperties import removed — x/y centering is now handled by Framer Motion style

const ORBIT_DURATION = 35; // seconds for one full revolution

export function OrbitStack({ orbit }: { orbit: string[] }) {
  return (
    <section className='section orbit-section'>
      <div className='section__heading'>
        <span>Stack</span>
        <h2>Tech Orbit</h2>
      </div>

      <div className='orbit-shell'>
        {/* Core label — stays fixed at center */}
        <div className='orbit-core'>Full Stack</div>

        {/* Rotating ring: spins the whole orbit */}
        <motion.div
          className='orbit-ring'
          animate={{ rotate: 360 }}
          transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: 'linear' }}
        >
          {orbit.map((item, index) => {
            // Calculate pill position on the circle
            const angle = ((index / orbit.length) * 360 - 90) * (Math.PI / 180);
            const cx = 50 + 44 * Math.cos(angle); // % from left
            const cy = 50 + 44 * Math.sin(angle); // % from top

            return (
              <motion.span
                key={item}
                className='orbit-pill'
                style={{
                  // left/top: position the anchor point on the orbit circle
                  left: `${cx}%`,
                  top:  `${cy}%`,
                  // x/y in Framer Motion style = translate.
                  // These are COMPOSED with the rotate animation below —
                  // unlike CSS `transform`, they do NOT get overwritten by it.
                  // This correctly centers the pill on its anchor point at every angle.
                  x: '-50%',
                  y: '-50%',
                }}
                // Counter-rotate at the same speed as the parent ring (35s) → text stays upright
                animate={{ rotate: -360 }}
                transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: 'linear' }}
              >
                {item}
              </motion.span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
