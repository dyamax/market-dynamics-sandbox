import React, { type Dispatch, type SetStateAction } from 'react';
import Elasticities, { type T_Elast } from '../topics/DnS-Elasticities';
import Externalities, { type T_Exts } from '../topics/PnN-Externalities';

type T_Component = Omit<T_Elast, 'fillRangeInput'> & Omit<T_Exts, 'fillRangeInput'>;
type T_Topics =  T_Component & {
    openTopic: 'elasticities' | 'externalities'
    setOpenTopic: Dispatch<SetStateAction<"elasticities" | "externalities">>
    fillRangeInput: (input: HTMLInputElement) => void
};

function Topics({ elastGraphProps, setElastGraphProps, extsGraphProps, setExtsGraphProps, openTopic, setOpenTopic, fillRangeInput }: T_Topics) {
    return (
        <React.Fragment>
            <div className='form topics-manual'>
                <details 
                    open={openTopic === 'elasticities'}
                    onToggle={(e) => {
                        if ((e.target as HTMLDetailsElement).open) setOpenTopic('elasticities');
                    }}>
                    <summary onClick={() => setOpenTopic('externalities')}>elasticities</summary>
                    {openTopic === 'elasticities' && Elasticities({ elastGraphProps, setElastGraphProps, fillRangeInput })}
                </details>
                <details
                    open={openTopic === 'externalities'}
                    onToggle={(e) => {
                        if ((e.target as HTMLDetailsElement).open) setOpenTopic('externalities');
                    }}>
                    <summary>Externalities</summary>
                    {Externalities({extsGraphProps, setExtsGraphProps, fillRangeInput})}
                </details>
            </div>
        </React.Fragment>
    )
}

export default Topics;
