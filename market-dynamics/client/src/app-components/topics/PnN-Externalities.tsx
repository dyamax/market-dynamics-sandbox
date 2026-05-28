import React from 'react';

export type T_Exts = {
    extsGraphProps: ExtsGraphProps,
    setExtsGraphProps: React.Dispatch<React.SetStateAction<ExtsGraphProps>>,
    fillRangeInput: (input: HTMLInputElement) => void
}

function Externalities({ extsGraphProps, setExtsGraphProps, fillRangeInput }: T_Exts) {
    return (
        <React.Fragment>
            <div className="topics-opt-content">
                <p>externality type:</p>
                <div style={{'display': 'flex', 'flexDirection': 'row', 'gap': '2vw'}}>
                    <div>
                        <label htmlFor='graph-p-ext'>positive</label>
                        <div className='input-wrapper'>
                            <input
                                type='checkbox'
                                id='graph-p-ext'
                                checked={extsGraphProps.type === 'positive'}
                                onChange={() => { setExtsGraphProps({ ...extsGraphProps, type: 'positive'}) }} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor='graph-n-ext'>negative</label>
                        <div className='input-wrapper'>
                            <input
                                type='checkbox'
                                id='graph-n-ext'
                                checked={extsGraphProps.type === 'negative'} 
                                onChange={() => { setExtsGraphProps({ ...extsGraphProps, type: 'negative'}) }} />
                        </div>
                    </div>
                </div>
                <div style={{'display': 'flex', 'flexDirection': 'row', 'gap': '2vw'}}>
                    <div>
                        <label htmlFor='graph-prod-ext'>production</label>
                        <div className='input-wrapper'>
                            <input
                                type='checkbox'
                                id='graph-prod-ext'
                                checked={extsGraphProps.eside === 'production'} 
                                onChange={() => { setExtsGraphProps({ ...extsGraphProps, eside: 'production'}) }} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor='graph-cons-ext'>consumption</label>
                        <div className='input-wrapper'>
                            <input
                                type='checkbox'
                                id='graph-cons-ext'
                                checked={extsGraphProps.eside === 'consumption'} 
                                onChange={() => { setExtsGraphProps({ ...extsGraphProps, eside: 'consumption'}) }} />
                        </div>
                    </div>
                </div>
                <label htmlFor='graph-external-c-b'>marginal external  {extsGraphProps.type === 'positive' ?  'benefit' : 'cost'}</label>
                <div className='input-wrapper'>
                    <input
                        type='number' 
                        id='graph-external-c-b'
                        placeholder='Any dollar value'
                        value={extsGraphProps.extval}
                        step={1}
                        onInput={(e) => {
                            setExtsGraphProps({ ...extsGraphProps, extval: Number((e.target as HTMLInputElement).value)})
                            fillRangeInput(e.currentTarget) }} />
                    <input
                        type='range'
                        min={0}
                        max={100}
                        step={0.01}
                        value={extsGraphProps.extval}
                        onInput={(e) => {
                            setExtsGraphProps({ ...extsGraphProps, extval: Number((e.target as HTMLInputElement).value)})
                            fillRangeInput(e.currentTarget)}} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Externalities;
