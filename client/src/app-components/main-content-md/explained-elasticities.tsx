import React, { useRef } from "react";
import styles from './explanation.module.css';
import RemoveOverlayBtn from "./remove-overlay-btn";

function ElasticitiesExplained() {
    const selfRef = useRef<HTMLDivElement | null>(null);

    return (
        <React.Fragment>
            <h2>explanations</h2>

            <RemoveOverlayBtn target={selfRef} />
            <div ref={selfRef} className={styles.scrollable_container}>
                <h3>abstract</h3>
                <p>
                    Price Elasticity is a coefficient describing how strongly quantity reacts to price changes. In other words, it measures the <span className={styles.component}>responsiveness</span> of consumers/producers as a reaction to the change in price.
                    In theory, elasticity values range from <span className={styles.component}>0</span> to <span className={styles.component}>♾️</span>.</p>
                <p>For demand, elasticity is often represented as a negative value because price and quantity demanded move in opposite directions. <br /> However, in most economic analysis, the <span className={styles.component}>absolute value</span> is used when classifying elasticity.</p>
                <br />
                <p>Mathematically, elasticity could be represented by</p>
                <ul>
                    <li>rate of change</li>
                    <li>slope of the curve (m)</li>
                    <li>rise over run</li>
                </ul>
                <p>and more.</p>

                <h3>formula:</h3>
                <img className={styles.image_item} src="/ped.png" alt="price elasticity of demand: equation"/>
                <p className={styles.image_description}>PEd = Price Elasticity of Demand</p>
                <p>Formula is identical for both PEs (PE supply) and PEd, meaning <span className={styles.component}>%change in quantity</span> (supplied or demanded) over <span className={styles.component}>%change in price</span> will produce Price Elasticity in terms of selected quantity.</p>

                <h3>Denotation</h3>
                <ul className={styles.informative_list}>
                    <li>
                        Elastic
                        <br />
                        <span className={styles.component}>%𝛥 in Price</span> {'<'} <span className={styles.component}>%𝛥 in Qty</span> then value is <span className={styles.component}>{'>=1'}</span> 
                    </li>
                    <li>
                        Inelastic
                        <br />
                        <span className={styles.component}>%𝛥 in Price</span> {'>'} <span className={styles.component}>%𝛥 in Qty</span> then value is <span className={styles.component}>{'<1'}</span> 
                    </li>
                    <li>
                        Unit Elastic
                        <br />
                        <span className={styles.component}>%𝛥 in Price</span> = <span className={styles.component}>%𝛥 in Qty</span> then value is <span className={styles.component}>1</span> 
                    </li>
                    <li>
                        Perfectly Elastic
                        <br />
                        <span className={styles.component}>%𝛥 in Price</span> {'>'} <span className={styles.component}>%𝛥 in Qty</span> then value is <span className={styles.component}>♾️</span> 
                    </li>
                    <li>
                        Perfectly Inelastic
                        <br />
                        <span className={styles.component}>%𝛥 in Price</span> {'>'} <span className={styles.component}>%𝛥 in Qty</span> then value is <span className={styles.component}>0</span> 
                    </li>
                </ul>
            </div>

        </React.Fragment>
    )
}

export default ElasticitiesExplained;