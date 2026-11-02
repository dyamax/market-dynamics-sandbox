import React from "react";
import Trigger from "../../components/button";
import { toPercent } from "../../apps/tool-main/App";
import ExtsGraph from "../../components/chart/exts-suited";

type IVM = 'numeric' | 'percentage'

type T_EMC = {
    extsGraphProps: ExtsGraphProps,
    setExtsGraphProps: React.Dispatch<React.SetStateAction<ExtsGraphProps>>,
    visIndicators: ExtsVisIndicatorsProps,
    setVisIndicators: React.Dispatch<React.SetStateAction<ExtsVisIndicatorsProps>>, 
    indicatorsViewMode: IVM,
    setIndicatorsViewMode: React.Dispatch<React.SetStateAction<IVM>>,
}

function ExtsMainContent({
    extsGraphProps, setExtsGraphProps,
    visIndicators, setVisIndicators, 
    indicatorsViewMode, setIndicatorsViewMode,
}: T_EMC) {
    const EIR = extsGraphProps.extval / visIndicators.equilibriumPrice!;

    return (
        <React.Fragment>
            <h2>Externalities</h2>

            <ExtsGraph
                title=''
                className=''
                extGP={extsGraphProps}
                setExtGP={setExtsGraphProps}
                setVisIndicators={setVisIndicators} />
            
            <div className="view-modes">
                <p className='silkscreen'>view mode</p>
                <Trigger
                    variant='flat'
                    size='small'
                    className={`view-mode-switch ${indicatorsViewMode == 'numeric' ? 'view-mode-selected' : ''}`}
                    onClick={() => setIndicatorsViewMode('numeric')}
                    >$</Trigger>
                <Trigger
                    variant='flat'
                    size='small'
                    className={`view-mode-switch ${indicatorsViewMode == 'percentage' ? 'view-mode-selected' : ''}`}
                    onClick={() => setIndicatorsViewMode('percentage')}
                    >%</Trigger>
            </div>
            <div className="indicators-visualizer">
                <div className="card-style indicator-card">
                    <h3>overview</h3>
                    <div className="overview-item"
                        style={{'backgroundColor': `${extsGraphProps.type === 'positive' 
                            ? 'var(--theme-positive-muted-weak-color)' 
                            : 'var(--theme-negative-muted-weak-color)'}`
                        }}
                    >
                        {extsGraphProps.type}
                    </div>
                    <div className="overview-item" style={{'backgroundColor': 'var(--theme-color-4)'}}>{extsGraphProps.eside}</div>
                    <div className="overview-item">{extsGraphProps.extval}</div>
                </div>
                
                <div className={`card-style indicator-card ic-with-type 
                    ${Number(toPercent((visIndicators.equilibriumQuantity! - 50) / 50)) >= 0 ? 'ict-positive' : 'ict-negative'}`}
                >
                    <h3>equil. quantity</h3>
                    <div>
                        {indicatorsViewMode == 'numeric' ? (<>
                            <p>{Math.round(visIndicators.equilibriumQuantity!)}</p>
                            <span>{toPercent((visIndicators.equilibriumQuantity! - 50) / 50)}%</span>
                        </>) : (<>
                            <p>{toPercent((visIndicators.equilibriumQuantity! - 50) / 50)}%</p>
                            <span>{Math.round(visIndicators.equilibriumQuantity!)}</span>
                        </>)}
                    </div>
                </div>
                <div className={`card-style indicator-card ic-with-type 
                    ${Number(toPercent((visIndicators.equilibriumPrice! - 50) / 50)) >= 0 ? 'ict-positive' : 'ict-negative'}`}
                >
                    <h3>equil. price</h3>
                    <div>
                        {indicatorsViewMode == 'numeric' ? (<>
                            <p>{Math.round(visIndicators.equilibriumPrice!)}</p>
                            <span>{toPercent((visIndicators.equilibriumPrice! - 50) / 50)}%</span>
                        </>) : (<>
                            <p>{toPercent((visIndicators.equilibriumPrice! - 50) / 50)}%</p>
                            <span>{Math.round(visIndicators.equilibriumPrice!)}</span>
                        </>)}
                    </div>
                </div>
                <div className={`card-style indicator-card`}>
                    <h3>dead weight loss</h3>
                    <div>
                        {indicatorsViewMode == 'numeric' ? (<>
                            <p>{(visIndicators.dwl)?.toFixed(2)}</p>
                            <span>{toPercent(visIndicators.dwl! / (50*50))}%</span>
                        </>) : (<>
                            <p>{toPercent(visIndicators.dwl! / (50*50))}%</p>
                            <span>{(visIndicators.dwl)?.toFixed(2)}</span>
                        </>)}
                    </div>
                </div>
                {/* <div className={`card-style indicator-card`}>
                    <h3>ext. intensity ratio</h3>
                    <div>
                        {indicatorsViewMode == 'numeric' ? (<>
                            <p>{(EIR <= .1) ? '<0.1' : (EIR > .1 && EIR <=0.5 ? '0.1-0.5' : (EIR > .5 ? '>0.5' : ''))}</p>
                            <span>{(EIR).toFixed(3)}</span>
                        </>) : (<>
                            <p>{(EIR).toFixed(3)}</p>
                            <span>{(EIR <= .1) ? '<0.1' : (EIR > .1 && EIR <=0.5 ? '0.1-0.5' : (EIR > .5 ? '>0.5' : ''))}</span>
                        </>)}
                    </div>
                </div> */}
                <div className={`card-style indicator-card`}></div>
                <div className={`card-style indicator-card`}></div>
            </div>
        </React.Fragment>
    )
}

export default ExtsMainContent;