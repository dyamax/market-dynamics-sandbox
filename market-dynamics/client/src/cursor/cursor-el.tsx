import { useEffect, useRef } from 'react';
import Cursor from './cursor';
import './index.css';

function CursorElement() {
    const cursorRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const cursorEl = cursorRef.current;
        if (!cursorEl) return;
        
        
        document.addEventListener('mousemove', (e: MouseEvent) => {
            const x = e.clientX - 3;
            const y = e.clientY - 3;
            
            cursorRef.current!.style.transform = `translate(${x}px, ${y}px)`;
        });
    }, [cursorRef]);
    
    Cursor({ element: cursorRef.current!, zIndex: 999 });

    return <div ref={cursorRef} className="cursor"></div>;
}

export default CursorElement;
