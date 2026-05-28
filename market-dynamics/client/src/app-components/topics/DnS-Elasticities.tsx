import React from 'react';

export type T_Elast = {
    elastGraphProps: ElastGraphProps,
    setElastGraphProps: React.Dispatch<React.SetStateAction<ElastGraphProps>>,
    fillRangeInput: (input: HTMLInputElement) => void
}

function Elasticities({ elastGraphProps, setElastGraphProps, fillRangeInput }: T_Elast) {
    return (
        <React.Fragment>
            <div className="topics-opt-content">
                <label htmlFor='graph-i-max-price'>max. price</label>
                <div className='input-wrapper'>
                    <input
                        type='number'
                        id='graph-i-max-price'
                        placeholder='Any price'
                        value={elastGraphProps.maxPrice}
                        step={10}
                        onInput={(e) => {setElastGraphProps({...elastGraphProps, maxPrice: Math.abs(parseFloat((e.target as HTMLInputElement).value))})}} />
                    <input
                        type='range'
                        min={50}
                        max={1000}
                        step={1}
                        value={elastGraphProps.maxPrice}
                        onInput={(e) => {
                            setElastGraphProps({...elastGraphProps, maxPrice: Math.abs(parseFloat((e.target as HTMLInputElement).value))})
                            fillRangeInput(e.currentTarget);
                        }} />
                </div>
                <label htmlFor='graph-i-max-quantity'>max. quantity</label>
                <div className='input-wrapper'>
                    <input
                        type='number'
                        id='graph-i-max-quantity'
                        placeholder='Any quantity'
                        value={elastGraphProps.maxQuantity}
                        step={10}
                        onInput={(e) => {setElastGraphProps({...elastGraphProps, maxQuantity: Math.abs(parseFloat((e.target as HTMLInputElement).value))})}} />
                    <input
                        type='range'
                        min={50}
                        max={1000}
                        step={1}
                        value={elastGraphProps.maxQuantity}
                        onInput={(e) => {
                            setElastGraphProps({...elastGraphProps, maxQuantity: Math.abs(parseFloat((e.target as HTMLInputElement).value))})
                            fillRangeInput(e.currentTarget);
                        }} />
                </div>
                <label htmlFor='graph-i-demand-elasticity'>demand elasticity</label>
                <div className='input-wrapper'>
                    <input
                        type='number' 
                        id='graph-i-demand-elasticity'
                        placeholder='PED: i.e. -0.5 or -2'
                        value={elastGraphProps.demandElasticity}
                        step={0.10}
                        onInput={(e) => {setElastGraphProps({...elastGraphProps, demandElasticity: -Math.abs(parseFloat((e.target as HTMLInputElement).value))})}} />
                    <input
                        type='range'
                        min={0.05}
                        max={5}
                        step={0.05}
                        value={Math.abs(elastGraphProps.demandElasticity)}
                        onInput={(e) => {
                            setElastGraphProps({...elastGraphProps, demandElasticity: -parseFloat((e.target as HTMLInputElement).value)});
                            fillRangeInput(e.currentTarget);
                        }} />
                </div>
                <label htmlFor='graph-i-supply-elasticity'>supply elasticity</label>
                <div className='input-wrapper'>
                    <input
                        type='number' 
                        id='graph-i-supply-elasticity'
                        placeholder='PES: i.e. 0.5 or 2'
                        value={elastGraphProps.supplyElasticity}
                        step={0.10}
                        onInput={(e) => {setElastGraphProps({...elastGraphProps, supplyElasticity: Math.abs(parseFloat((e.target as HTMLInputElement).value))})}} />
                    <input
                        type='range'
                        min={0.05}
                        max={5}
                        step={0.05}
                        value={elastGraphProps.supplyElasticity}
                        onInput={(e) => {
                            setElastGraphProps({...elastGraphProps, supplyElasticity: parseFloat((e.target as HTMLInputElement).value)});
                            fillRangeInput(e.currentTarget);
                        }} />
                </div>
                <label htmlFor='graph-i-price-level'>price level ($$$)</label>
                <div className='input-wrapper'>
                    <input
                        type='number' 
                        id='graph-i-price-level'
                        placeholder='Any price'
                        value={elastGraphProps.priceLevel}
                        step={1}
                        onInput={(e) => {setElastGraphProps({...elastGraphProps, priceLevel: Math.abs(parseFloat((e.target as HTMLInputElement).value))})}} />
                    <input
                        type='range'
                        min={0}
                        max={elastGraphProps.maxPrice}
                        step={0.01}
                        value={elastGraphProps.priceLevel}
                        onInput={(e) => {
                            setElastGraphProps({...elastGraphProps, priceLevel: parseFloat((e.target as HTMLInputElement).value)});
                            fillRangeInput(e.currentTarget);
                        }} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Elasticities;
