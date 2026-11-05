import { MOBILE_RIPPLE_TOUCH } from '../config';
import { useEffect, useState } from "react";
import './Mobile.css';

const ROWS = 35;
const COLS = 20;

const emj_list = ['⛓️‍💥','🛠️','🧱','🧸','⛏️','❌','💻','🛩️','⚙️']
const emj_poss = Array.from({ length: ROWS*COLS }).map(() => emj_list[Math.floor(1+Math.random()*emj_list.length * 50)])

function Mobile() {
    useEffect(() => {
        const R = MOBILE_RIPPLE_TOUCH.rad

        const cells = Array.from(document.querySelectorAll('.grid div')) as HTMLDivElement[];

        const invokeCell = (el: HTMLDivElement, delay = 0) => {
            setTimeout(() => {
                el.classList.remove('filler');
                el.classList.add('invoked');

                setTimeout(() => {
                    el.classList.remove('invoked');
                    el.classList.add('filler');
                }, MOBILE_RIPPLE_TOUCH.timings.revert);
            }, delay);
        };

        const createRipple = (centerIndex: number) => {
            const row = Math.floor(centerIndex / COLS);
            const col = centerIndex % COLS;

            for (let y = -R; y <= R; y++) {
                for (let x = -R; x <= R; x++) {
                    const distance = Math.sqrt(x * x + y * y);

                    if (distance > R) continue;

                    const new_r = row + y;
                    const new_c = col + x;

                    if (new_r < 0 || new_r >= ROWS || new_c < 0 || new_c >= COLS) continue;

                    const i = new_r * COLS + new_c;
                    const cell = cells[i];

                    if (!cell) continue;

                    invokeCell(cell, distance * MOBILE_RIPPLE_TOUCH.timings.spread);
                }
            }
        };

        const handleTouch = (e: TouchEvent) => {
            const touch = e.touches[0];
            if (!touch) return;

            const el = document.elementFromPoint(touch.clientX, touch.clientY);

            if (el && el instanceof HTMLDivElement && el.parentElement?.classList.contains('grid')) {
                const index = cells.indexOf(el);
                if (index !== -1) createRipple(index);
            }
        };

        document.addEventListener('touchstart', handleTouch);
        document.documentElement.style.setProperty('--ripple-t', MOBILE_RIPPLE_TOUCH.timings.transition)
    }, []);

    const fullText = `Mobile version is not available yet`;
    const r1 = `⬇️ ⬇️ ⬇️`;
    const r2 = `💻 💻 💻`;
    const [message, setMessage] = useState('');
    const [messageEmj, setMessageEmj] = useState('');

    useEffect(() => {
        let i = 0;

        const i1 = setInterval(() => {
            setMessage(fullText.slice(0, i + 1));
            i++;
            if (i >= fullText.length) {
                i = 0
                const i2 = setInterval(() => {
                    setMessageEmj(r1.slice(0, i + 1));
                    i++;
                    if (i >= r1.length) {
                        i = 0
                        const i3 = setInterval(() => {
                            setMessageEmj(r1 + '\n' + r2.slice(0, i + 1));
                            i++;
                            if (i >= r2.length) {
                                clearInterval(i3);
                            }
                        }, 30);
                        
                        clearInterval(i2);
                    }
                }, 50);

                clearInterval(i1);
            }
        }, 50);
    }, []);

    return (
        <div className='mobile-wrapper'>
            <div className='grid'>
                {Array.from({ length: ROWS*COLS }).map((_, i) => (<div key={i} className='filler'>{emj_poss[i]}</div>))}
            </div>
            <p className="message">
                {message}
            </p>
            <p className="message message-emj">
                {messageEmj}
            </p>
        </div>
    )
}

export default Mobile;