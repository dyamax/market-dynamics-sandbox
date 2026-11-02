import { useRef, type RefObject } from "react";
import styles from './explanation.module.css';
import bs from '../../components/button/Buttons.module.css'

type T_ROB = {
    target: RefObject<HTMLDivElement | null>
}

function RemoveOverlayBtn ({
    target
}: T_ROB) {
    const self = useRef<HTMLButtonElement | null>(null);

    return (
        <button 
            ref={self}
            className={`${styles.overlay_btn} ${bs.flat}`}
            onClick={() => {
                const el = target.current!;
                el.style.borderRadius = '0';
                el.style.overflow = 'scroll';
                el.style.filter = 'none';

                self.current?.remove();
            }}
        >show</button>
    )
}

export default RemoveOverlayBtn;