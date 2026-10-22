// ─── Skills — with react-icons/si tech icons on chips ─────────────────────────
//
// WHY: Plain text chips look amateur. Adding recognisable brand icons
//      (React logo, Node.js logo, etc.) makes the section scannable at a glance
//      and signals to recruiters that these are real tools, not just keywords.
//
// HOW:
//   ICONS map — skill name string → icon element.
//   For any skill not in the map, the chip renders text-only (graceful fallback).
//   Icons come from `react-icons/si` (Simple Icons — the same set used by
//   shields.io badges). Already available as a sub-export of react-icons.

import { motion } from 'framer-motion';
import type { ReactElement } from 'react';
import {
  SiCplusplus, SiJavascript, SiHtml5, SiCss, SiMysql,
  SiReact, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb,
  SiGit, SiGithub, SiPostman, SiTypescript,
} from 'react-icons/si';

const groups = ['languages', 'frontend', 'backend', 'database', 'dsa', 'tools', 'core'] as const;

const ICONS: Record<string, ReactElement> = {
  'C++':          <SiCplusplus />,
  'JavaScript':   <SiJavascript />,
  'SQL':          <SiMysql />,
  'HTML':         <SiHtml5 />,
  'CSS':          <SiCss />,
  'React.js':     <SiReact />,
  'HTML5':        <SiHtml5 />,
  'CSS3':         <SiCss />,
  'Tailwind CSS': <SiTailwindcss />,
  'Node.js':      <SiNodedotjs />,
  'Express.js':   <SiExpress />,
  'MongoDB':      <SiMongodb />,
  'Git':          <SiGit />,
  'GitHub':       <SiGithub />,
  'Postman':      <SiPostman />,
  'TypeScript':   <SiTypescript />,
};

// Capitalise the group name for the card heading
const LABEL: Record<typeof groups[number], string> = {
  languages: 'Languages',
  frontend:  'Frontend',
  backend:   'Backend',
  database:  'Database',
  dsa:       'DSA',
  tools:     'Tools',
  core:      'Core Concepts',
};

export function Skills({ skills }: { skills: Record<string, string[]> }) {
  return (
    <section id='skills' className='section'>
      <div className='section__heading'>
        <span>Capabilities</span>
        <h2>Skills</h2>
      </div>

      <div className='skills-grid'>
        {groups.map((group) => (
          <motion.div
            className='glass skill-card'
            key={group}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, scale: 1.01 }}
          >
            <h3>{LABEL[group]}</h3>
            <div className='chip-list'>
              {skills[group].map((skill) => (
                // Each chip shows an icon (if mapped) + the skill label
                <span key={skill} className='chip'>
                  {ICONS[skill] != null && (
                    <i className='chip__icon' aria-hidden='true'>
                      {ICONS[skill]}
                    </i>
                  )}
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
