import React, { type ChangeEvent, type Dispatch, type SetStateAction } from 'react';
import Loader from '../../components/loader/loader';
import Trigger from '../../components/button';

type TRecGen = Record<string, string>
type TRes = { type: string; eside: string; extval: number; }

function ExtReqIntf(
    requestQuery: TRecGen,
    reqOnChange: (e: ChangeEvent<Element, Element>, param: string) => void,
    disabledBtns: Record<string, "disabled" | undefined>,
    autoFill: () => void,
    dispatchRunInference: () => Promise<void>,
    requestQueryCopy: { query: string; market_structure: string; industry: string; },
    isLoading: boolean,
    gptRes: TRes,
) {
    return (
        <React.Fragment>
            <div className='form'>
                <label htmlFor='externalityQuery'>externality</label>
                <div className='input-wrapper'>
                    <input
                        id='externalityQuery'
                        type='text' 
                        placeholder='i.e air pollution' 
                        value={requestQuery.query} 
                        onChange={(e) => {reqOnChange(e, 'query')}} />
                </div>
                <label htmlFor='marketStructureQuery'>market structure</label>
                <div className='input-wrapper'>
                    <input
                        id='marketStructureQuery'
                        type='text' 
                        placeholder='i.e monopoly / perfect competition' 
                        value={requestQuery.market_structure} 
                        onChange={(e) => {reqOnChange(e, 'market_structure')}} />
                </div>
                <label htmlFor='industryQuery'>industry</label>
                <div className='input-wrapper'>
                    <input
                        id='industryQuery'
                        type='text' 
                        placeholder='i.e automotive / energy' 
                        value={requestQuery.industry} 
                        onChange={(e) => {reqOnChange(e, 'industry')}} />
                </div>

                <div className='form-actions'>
                    <Trigger variant='flat' status={disabledBtns.autoFillBtn} onClick={autoFill}>autofill</Trigger>
                    <Trigger variant='primary' status={disabledBtns.sendBtn} onClick={dispatchRunInference}>apply</Trigger>
                </div>
                <div className='direct-req-res'>
                    <div className='direct-req'>
                        <h2>last request</h2>
                        <div>
                            <p>Externality:</p>
                            <p>{requestQueryCopy.query}</p>
                        </div>
                        <div>
                            <p>Market structure:</p>
                            <p>{requestQueryCopy.market_structure}</p>
                        </div>
                        <div>
                            <p>Industry:</p>
                            <p>{requestQueryCopy.industry}</p>
                        </div>
                    </div>

                    <div className='direct-res'>
                        <h2>response</h2>
                        {
                            !isLoading ? (
                                <React.Fragment>
                                    <div>
                                        <p>Externality type:</p>
                                        <p style={{'color': (gptRes.type === 'negative' ? 'var(--theme-negative-color)' : (gptRes.type === 'positive' ? 'var(--theme-positive-color)' : ''))}}>{gptRes.type.replace('_',' ')}</p>
                                    </div>
                                    <div>
                                        <p>Econ. side:</p>
                                        <p style={{'color': 'var(--theme-color-4)'}}>{gptRes.eside.replace('_',' ')}</p>
                                    </div>
                                    <div>
                                        <p>External {gptRes.type === 'positive' ? 'Benefit' : 'Cost'}:</p>
                                        <p style={{'color': (gptRes.type === 'positive' ? 'var(--theme-positive-color)' : 'var(--theme-negative-color)')}}>{gptRes.extval}</p>
                                    </div>
                                </React.Fragment>
                            ) : (<React.Fragment><Loader/></React.Fragment>)
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ExtReqIntf;
