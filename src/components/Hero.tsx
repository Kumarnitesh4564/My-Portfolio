import { Canvas } from '@react-three/fiber';
import { Float, Environment, Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import { FiGithub, FiMail, FiArrowRight } from 'react-icons/fi';
import { useMemo } from 'react';
import * as THREE from 'three';

function LaptopScene() {
  const particles = useMemo(() => Array.from({ length: 100 }, (_, index) => index), []);
  return <group>
    <ambientLight intensity={1.5} />
    <pointLight position={[3, 2, 4]} intensity={50} color={'#00E5FF'} />
    <Float speed={1.3} rotationIntensity={0.7} floatIntensity={1.2}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.8, 0.15, 2.4]} />
        <meshStandardMaterial color={'#111827'} metalness={0.75} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.18, -1.1]} rotation={[-0.35, 0, 0]}>
        <boxGeometry args={[3.8, 2.3, 0.12]} />
        <meshStandardMaterial color={'#0f172a'} metalness={0.8} roughness={0.15} />
      </mesh>
      <mesh position={[0, 1.1, -0.98]} rotation={[-0.35, 0, 0]}>
        <planeGeometry args={[2.7, 1.4]} />
        <meshStandardMaterial color={'#0b1120'} emissive={'#00E5FF'} emissiveIntensity={0.35} />
      </mesh>
    </Float>
    {particles.map((index) => <Float key={index} speed={2 + (index % 4) * 0.2} rotationIntensity={2} floatIntensity={2}>
      <mesh position={[(index % 10) - 4.5, ((index * 13) % 7) - 1.5, -2 - (index % 6) * 0.2]}>
        <octahedronGeometry args={[0.04]} />
        <meshStandardMaterial color={index % 3 === 0 ? '#00E5FF' : '#7C3AED'} emissive={new THREE.Color('#00E5FF')} emissiveIntensity={1.4} />
      </mesh>
    </Float>)}
    <Sparkles count={80} scale={8} size={2} speed={0.6} color={'#00E5FF'} />
    <Environment preset='city' />
  </group>;
}

export function Hero({ profile }: { profile: any }) {
  return <section id='home' className='hero'>
    <div className='hero__copy'>
      <motion.span className='eyebrow' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Hello,</motion.span>
      <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        I'm <span>{profile.name}</span>
      </motion.h1>
      <motion.p className='hero__subtitle' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        {profile.role} · {profile.headline}
      </motion.p>
      <div className='hero__tags'>{profile.tags.map((tag: string) => <span key={tag}>{tag}</span>)}</div>
      <div className='hero__actions'>
        <a className='cta primary' href={profile.resumeUrl}><FiArrowRight /> Download Resume</a>
        <a className='cta secondary' href='#projects'>View Projects</a>
        <a className='cta ghost' href={'mailto:' + profile.email}><FiMail /> Hire Me</a>
        <a className='cta ghost' href='https://github.com/'><FiGithub /> Github</a>
      </div>
    </div>
    <div className='hero__scene'>
      <Canvas camera={{ position: [0, 0.4, 6], fov: 40 }}>
        <LaptopScene />
      </Canvas>
    </div>
  </section>;
}