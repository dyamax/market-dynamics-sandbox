import React from "react";
import Trigger from "../../components/button";
import { toPercent } from "../../apps/tool-main/App";
import ElastGraph from "../../components/chart/elast-suited";

type IVM = 'numeric' | 'percentage'

type T_EMC = {
    elastGraphProps: ElastGraphProps,
    setElastGraphProps: React.Dispatch<React.SetStateAction<ElastGraphProps>>,
    visIndicators: ElastVisIndicatorsProps,
    setVisIndicators: React.Dispatch<React.SetStateAction<ElastVisIndicatorsProps>>, 
    indicatorsViewMode: IVM,
    setIndicatorsViewMode: React.Dispatch<React.SetStateAction<IVM>>,
}

function ElastMainContent({
    elastGraphProps, setElastGraphProps,
    visIndicators, setVisIndicators, 
    indicatorsViewMode, setIndicatorsViewMode,
}: T_EMC) {
    return (
        <React.Fragment>
            <h2>Elasticity</h2>

            <ElastGraph
                title=''
                className=''
                extGP={elastGraphProps}
                setExtGP={setElastGraphProps}
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
                <div className={`card-style indicator-card`}>
                    <h3>price deviation</h3>
                    <div>
                        {indicatorsViewMode == 'numeric' ? (<>
                            <p>{visIndicators.priceDeviation! >= 0 ? `$${visIndicators.priceDeviation}` : `-$${Math.abs(visIndicators.priceDeviation!)}`}</p>
                            <span>{toPercent(visIndicators.priceDeviation! / visIndicators.equilibriumPrice!)}%</span>
                        </>) : (<>
                            <p>{toPercent(visIndicators.priceDeviation! / visIndicators.equilibriumPrice!)}%</p>
                            <span>{visIndicators.priceDeviation! >= 0 ? `$${visIndicators.priceDeviation}` : `-$${Math.abs(visIndicators.priceDeviation!)}`}</span>
                        </>)}
                    </div>
                </div>
                <div className={`card-style indicator-card ic-with-type ${Number(toPercent(visIndicators.quantityDemandedDeviation!)) >= 0 ? 'ict-positive' : 'ict-negative'}`}>
                    <h3>q. demanded</h3>
                    <div>
                        {indicatorsViewMode == 'numeric' ? (<>
                            <p>${visIndicators.quantityDemanded}</p>
                            <span>{toPercent(visIndicators.quantityDemandedDeviation!)}%</span>
                        </>) : (<>
                            <p>{toPercent(visIndicators.quantityDemandedDeviation!)}%</p>
                            <span>${visIndicators.quantityDemanded}</span>
                        </>)}
                    </div>
                </div>
                <div className={`card-style indicator-card ic-with-type ${Number(toPercent(visIndicators.quantitySuppliedDeviation!)) >= 0 ? 'ict-positive' : 'ict-negative'}`}>
                    <h3>q. supplied</h3>
                    <div>
                        {indicatorsViewMode == 'numeric' ? (<>
                            <p>${visIndicators.quantitySupplied}</p>
                            <span>{toPercent(visIndicators.quantityDemandedDeviation!)}%</span>
                        </>) : (<>
                            <p>{toPercent(visIndicators.quantitySuppliedDeviation!)}%</p>
                            <span>${visIndicators.quantitySupplied}</span>
                        </>)}
                    </div>
                </div>
                <div className={`card-style indicator-card ic-with-type ${visIndicators.marketImbalance! >= 0 ? 'MIR-surplus' : 'MIR-shortage'}`}>
                    <h3>
                        {visIndicators.marketImbalance! >= 0 ? ('surplus') : ('shortage')}
                    </h3>
                    <div>
                        <p>{Math.abs(visIndicators.marketImbalance!)} units</p>
                    </div>
                </div>
                <div className={`card-style indicator-card`}></div>
                <div className={`card-style indicator-card`}></div>
            </div>
        </React.Fragment>
    )
}

export default ElastMainContent;