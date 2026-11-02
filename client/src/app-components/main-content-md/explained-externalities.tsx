import React, { useRef } from "react";
import styles from './explanation.module.css'
import RemoveOverlayBtn from "./remove-overlay-btn";

type T_EE = {
    extsGraphProps: ExtsGraphProps
}
function ExternalitiesExplained({
    extsGraphProps
}: T_EE) {
    const selfRef = useRef<HTMLDivElement | null>(null);

    return (
        <React.Fragment>
            <h2>explanations</h2>

            <RemoveOverlayBtn target={selfRef} />
            <div ref={selfRef} className={styles.scrollable_container}>
                <h3>abstract</h3>
                <p>Externality is a market failure which creates either external cost (negative externality) or benefit (positive externality) to an uninvolved third party (in AP Microeconomics class it is mostly regarded as society) who is being affected by an economic activity.</p>
                <h4>spillover effect</h4>
                <i>
                    <p>In economics, a spillover effect describes how an an event, action in a particular sector, or market affects uninvolved third parties.</p>
                </i>

                <h3>types</h3>
                <p>Externalities can be either positive or negative and either in consumption or in production meaning consumption/production of the product creates unintended spillover effect.</p>
                <br />
                <p>In total there are 4 types:</p>
                <ul className={styles.numbered_list}>
                    {extsGraphProps.type === 'positive' ? (
                        extsGraphProps.eside === 'consumption' ? (
                            <li><p><h4>positive in consumption</h4> — occurs when <span className={styles.component}>the consumption of the good benefits third parties</span> (e.g. educational systems, where socialtal benefits are: informed society, socil cohision, etc.). Resulting in MSB curve to deflect from MPB <span className={styles.component}>to the right</span>. Since market equilibrium quantity is less than the socially optimal, <span className={styles.component}>market is underproducing</span>.</p></li>
                        ) : (
                            <li><p><h4>positive in production</h4> — occurs when <span className={styles.component}>the production of the good benefits third parties</span> (e.g. transportation companies reducing traffic). Resulting in MSC curve to deflect from MPC <span className={styles.component}>to the left</span>. Since the market equilibrium quantity is less than the socially optimal, <span className={styles.component}>market is overproducing</span>.</p></li>
                        )
                    ) : (
                        extsGraphProps.eside === 'consumption' ? (
                            <li><p><h4>negative in comsumption</h4> — occurs when <span className={styles.component}>the consumption of the good harms third parties</span> (e.g loud music disturbs others). Resulting in MSB curve to deflect from MPB <span className={styles.component}>to the left</span>. Since the market equilibrium quantity is more than the socially optimal, <span className={styles.component}>market is overproducing</span>.</p></li>
                        ) : (
                            <li><p><h4>negative in production</h4> — occurs when <span className={styles.component}>the consumption of the good harms third parties</span> (e.g. air/water (river) pollution). Resulting in MSC curve to deflect from MPC <span className={styles.component}>to the left</span>. Since the market equilibrium quantity is more than the socially optimal, <span className={styles.component}>market is underproducing</span>.</p></li>
                        )
                    )}
                </ul>
                <p></p>
            </div>

        </React.Fragment>
    )
}

export default ExternalitiesExplained;