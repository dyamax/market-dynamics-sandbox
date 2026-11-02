'use client';

import React, { useEffect, useRef } from 'react';

interface CursorOptions {
  element?: HTMLElement;
  zIndex?: number;
}

const Cursor: React.FC<CursorOptions> = ({ element, zIndex }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<any[]>([]);
  const canvImages = useRef<HTMLCanvasElement[]>([]);
  const animationFrame = useRef<number | null>(null);
  const possibleEmoji =  ['💥'];
  const prefersReducedMotion = useRef<MediaQueryList | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)');

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    const targetElement = element || document.body;

    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = zIndex ? zIndex.toString() : '';

    targetElement.appendChild(canvas);
    canvasRef.current = canvas;

    const setCanvasSize = () => {
      canvas.width = element ? targetElement.clientWidth : window.innerWidth;
      canvas.height = element ? targetElement.clientHeight : window.innerHeight;
    };

    const createEmojiImages = () => {
      possibleEmoji.forEach((emoji) => {
        const measurements = context.measureText(emoji);
        const bgCanvas = document.createElement('canvas');
        const bgContext = bgCanvas.getContext('2d');
        if (!bgContext) return;

        bgCanvas.width = measurements.width;
        bgCanvas.height = measurements.actualBoundingBoxAscent * 2;

        bgContext.textAlign = 'center';
        bgContext.font = '12px serif';
        bgContext.textBaseline = 'middle';
        bgContext.fillText(
          emoji,
          bgCanvas.width / 2,
          measurements.actualBoundingBoxAscent
        );

        canvImages.current.push(bgCanvas);
      });
    };

    const addParticle = (x: number, y: number) => {
        const image = canvImages.current[ Math.floor(Math.random() * canvImages.current.length) ];
        
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 0.5;
        
        particles.current.push(new Particle(x, y, image, Math.cos(angle) * speed, Math.sin(angle) * speed));
    };

    const onMouseMove = (e: MouseEvent) => {
        const x = element
            ? e.clientX - targetElement.getBoundingClientRect().left
            : e.clientX;
        const y = element
            ? e.clientY - targetElement.getBoundingClientRect().top
            : e.clientY;

        addParticle(x, y);
    };

    const updateParticles = () => {
      if (!context || !canvas) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((particle, index) => {
        particle.update(context);
        if (particle.lifeSpan < 0) {
          particles.current.splice(index, 1);
        }
      });
    };

    const animationLoop = () => {
      updateParticles();
      animationFrame.current = requestAnimationFrame(animationLoop);
    };

    const init = () => {
      if (prefersReducedMotion.current?.matches) return;

      setCanvasSize();
      createEmojiImages();

      targetElement.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', setCanvasSize);

      animationLoop();
    };

    const destroy = () => {
      if (canvasRef.current) {
        canvasRef.current.remove();
      }
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      targetElement.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', setCanvasSize);
    };

    prefersReducedMotion.current.onchange = () => {
      if (prefersReducedMotion.current?.matches) {
        destroy();
      } else {
        init();
      }
    };

    init();
    return () => destroy();
  }, [element]);

  return null;
};

class Particle {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  lifeSpan: number;
  initialLifeSpan: number;
  canv: HTMLCanvasElement;
  rotation: number;
    rotSpeed: number;

  constructor(
    x: number,
    y: number,
    canvasItem: HTMLCanvasElement,
    vx: number,
    vy: number
  ) {
    this.position = { x: x+15, y: y+15 };
    this.velocity = { x: vx, y: vy };
    this.canv = canvasItem;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.2;
    this.lifeSpan = Math.floor(Math.random() * 60 + 80);
    this.initialLifeSpan = this.lifeSpan;
  }

  update(context: CanvasRenderingContext2D) {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.rotation += this.rotSpeed;

    // reducers
    this.velocity.x *= 0.99;
    this.velocity.y *= 0.99;
    this.rotSpeed *= 0.99;
    this.lifeSpan--;

    const scale = Math.max(this.lifeSpan / this.initialLifeSpan, 0);

    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation);
    context.scale(scale, scale);
    context.drawImage(
      this.canv,
      -this.canv.width / 2,
      -this.canv.height / 2
    );
    context.restore();
  }
}

export default Cursor;
