import { Fragment, useEffect, useRef } from 'react';
import './landing.css';
import { useNavigate } from 'react-router-dom';
import CursorElement from '../../cursor/cursor-el';

function LandingPage() {
    const navigate = useNavigate();

    const tryBtnRef = useRef<HTMLButtonElement>(null);
    const mainBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mainBox = mainBoxRef.current;
        const tryBtn = tryBtnRef.current;
        if (!mainBox || !tryBtn) return;

        const mainBoxRect = mainBox.getBoundingClientRect();
        const tryBtnRect = tryBtn.getBoundingClientRect();
        const offset = 10;

        tryBtn.style.left = `${mainBoxRect.right - tryBtnRect.width - offset}px`;
        tryBtn.style.top = `${mainBoxRect.bottom - tryBtnRect.height - offset}px`;
    }, [mainBoxRef.current])

    return (
        <Fragment>
            <CursorElement />

            <p className='title'>visual economic modeling</p>

            <div ref={mainBoxRef} className="about-wrapper">
                <svg width={0} height={0}>
                    <clipPath id='cutout' clipPathUnits='objectBoundingBox'>
                        <path d={` M 0 0 H 1
                        V .60
                        Q 1 .77 .93 .77
                        H .623
                        Q .557 .777 .552 .89
                        Q .557 1 .482 1
                        H 0 Z
                        `} />
                    </clipPath>
                </svg>

                <div className='main'>
                    <div style={{'width': '85%', 'margin': 'auto', 'marginTop': '5vh'}}>
                        <p className='subtitle'>Problem Statement</p>
                        <p style={{'fontWeight': 'lighter'}}>In economics, particularly in microeconomics, there are a lot of graphs which the students need to learn by heart and comprehend how the curves shift, change in slopes and how different factors affect those graphs. Many students worldwide struggle to understand all the changes by looking at static graphs and data. The solution is a visual economics tool which emphasizes the graphs and enables the students to experiment and see how the curves and the measures change according to different inputs.</p>
                    </div>
                </div>
            </div>
            
            <button ref={tryBtnRef} className='try-btn' onClick={() => navigate('/vemt')}>
                Explore Model
            </button>
        </Fragment>
    )
}

export default LandingPage;
