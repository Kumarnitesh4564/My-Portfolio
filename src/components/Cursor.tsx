import { useEffect, useRef } from 'react';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      if (dotRef.current) dotRef.current.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
      if (ringRef.current) ringRef.current.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0) scale(1.2)';
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return <>
    <div className='cursor-ring' ref={ringRef} />
    <div className='cursor-dot' ref={dotRef} />
  </>;
}