// ─── Projects — macOS-window style card thumbnails ────────────────────────────
//
// WHY: The original card image area was a plain gradient with a text overlay at
//      the bottom — a common "placeholder" look. Professional dev portfolios use
//      a recognisable UI motif for the thumbnail. The macOS window chrome
//      (red/yellow/green traffic-light dots + monospace "code" text inside) is
//      immediately legible as a "developer" aesthetic and makes each card feel
//      hand-crafted rather than templated.
//
// HOW:
//   • projects.json now has a `gradient: [color1, color2]` field.
//   • The card image div uses those as CSS custom properties (--g1, --g2).
//   • Inside: a "window" panel with traffic-light dots + the project.image text
//     rendered in JetBrains Mono (looks like a code snippet or terminal line).
//   • project.image text is now authored as a short multi-line "comment block"
//     in projects.json so it reads like actual code in the thumbnail.

import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { FiGithub, FiGlobe, FiBookOpen } from 'react-icons/fi';

export function Projects({ projects }: { projects: Array<any> }) {
  return (
    <section id='projects' className='section'>
      <div className='section__heading'>
        <span>Builds</span>
        <h2>Projects</h2>
      </div>

      <div className='project-grid'>
        {projects.map((project, index) => (
          <motion.article
            className='glass project-card'
            key={project.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -6 }}
          >
            {/* ── Thumbnail — macOS-style window ── */}
            <div
              className='project-card__image'
              style={{
                '--g1': project.gradient[0],
                '--g2': project.gradient[1],
              } as CSSProperties}
            >
              {/* Window chrome */}
              <div className='project-card__window'>
                <div className='project-card__dots'>
                  <span className='dot dot--red' />
                  <span className='dot dot--yellow' />
                  <span className='dot dot--green' />
                </div>
                {/* project.image is written as a short "comment" in projects.json */}
                <pre className='project-card__code'>{project.image}</pre>
              </div>
            </div>

            {/* ── Card body ── */}
            <div className='project-card__content'>
              <div className='card__kicker'>{project.type}</div>
              <h3>{project.name}</h3>

              <div className='chip-list'>
                {project.tech.map((tech: string) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>

              <ul>
                {project.features.map((feature: string) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div className='project-actions'>
                <a href={project.github} target='_blank' rel='noreferrer'>
                  <FiGithub /> GitHub
                </a>
                <a href={project.live} target='_blank' rel='noreferrer'>
                  <FiGlobe /> Live Demo
                </a>
                <a href={project.caseStudy}>
                  <FiBookOpen /> Case Study
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
