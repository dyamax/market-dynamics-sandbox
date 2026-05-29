import './App.css';
import React, { useEffect, useState, type ChangeEvent } from 'react';
import { classifyExternality } from '../../API/dispatchRunInference';
import IconButton from '../../components/icon-button';
import Trigger from '../../components/button';
import Mobile from '../../mobile/Mobile';
import Topics from '../../app-components/<none>-ld/Topics-wrapper';
import ExtReqIntf from '../../app-components/<none>-ld/Auto-input_externalities';
import CursorElement from '../../cursor/cursor-el';
import ElastMainContent from '../../app-components/main-content-md/Elasticities-wrap'
import ExtsMainContent from '../../app-components/main-content-md/Externalities-wrap';
import ElasticitiesExplained from '../../app-components/main-content-md/explained-elasticities';
import ExternalitiesExplained from '../../app-components/main-content-md/explained-externalities';
import { INIT_STATE } from '../../initial-state-manager';

type TInputMode = 'auto' | 'manual'
type ColorScheme = 'light' | 'dark';

function setColorScheme(mode: ColorScheme) {
    const root = document.documentElement;

    document.querySelectorAll('.col-scheme-switch').forEach(sw => sw.classList.remove('col-scheme-selected'));

    // inconsistent with other methods
    document.getElementById(`${mode}Mode`)?.classList.add('col-scheme-selected');

    root.setAttribute('data-theme', mode);
    root.style.setProperty('color-scheme', mode);

    localStorage.setItem('color-scheme', mode);
}

export function toPercent(n: number): string {
    return (n * 100).toFixed(2);
}

function App() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < window.innerHeight);

    useEffect(() => {
        const onResize = () => {
            setIsMobile(window.innerWidth < window.innerHeight);
        };

        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, []);

    if (isMobile) return <Mobile />;

    const [requestQuery, SUReq] = useState({
        query: '',
        market_structure: '',
        industry: '',
    })
    const [gptRes, SURes] = useState({
        type: 'no_effect',
        eside: '-',
        extval: 0,
    });

    const [isLoading, setLoader] = useState(false);
    const [disabledBtns, disableBtn] = useState<Record<string, 'disabled' | undefined>>({
        autoFillBtn: undefined,
        sendBtn: undefined,
    });

    const [requestQueryCopy, SUReqCopy] = useState(requestQuery);

    const autoFillQuery = {
        query: 'pandemic',
        market_structure: 'monopolistic competition',
        industry: 'any'
    }

    function reInit() {
        setLoader(false);
        SUReq({query: '', market_structure: '', industry: ''});
        disableBtn({autoFillBtn: undefined, sendBtn: undefined});
    }

    function reqOnChange(e: ChangeEvent, param: string) {
        const newRequestQuery = {...requestQuery, [param]: (e.target as HTMLInputElement).value};
        SUReq(newRequestQuery);
        
        !!Object.values(newRequestQuery).some(i => i.length === 0) ? disableBtn({...disabledBtns, autoFillBtn: undefined}) : ('');
    }
    
    async function dispatchRunInference() {
        if (
            !Object.values(requestQuery).some(val => val.length === 0)
        ) {
            setLoader(true);
            disableBtn({...disabledBtns, sendBtn: 'disabled'});
            SUReqCopy(requestQuery);
            
            const res = await classifyExternality(
                requestQuery.query, 
                requestQuery.market_structure, 
                requestQuery.industry
            );
            const cleaned = res.replace(/```json\s*/i, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleaned);
            
            SURes(parsed);
            setExtsGraphProps(parsed);

            reInit();
        } else {
            alert('Fill in all fields');
        }
    }

    function autoFill() {
        if (
            Object.values(requestQuery).every(val => val.length === 0)
        ) {
            SUReq(autoFillQuery);
        } else {
            let temp = {...requestQuery};
            Object.entries(requestQuery).forEach(([key, val]) => {
                if (val.length === 0) {
                    temp = {...temp, [key]: autoFillQuery[key as keyof typeof autoFillQuery]};
                }
            })
            SUReq(temp);
        }


        disableBtn(prev => ({...prev, autoFillBtn: 'disabled'}))
    }

    function fillRangeInput(input: HTMLInputElement) {
        const val = parseFloat(input.value);
        const frag = val / parseFloat(input.max) * 100;

        input.style.background = `
            linear-gradient(to right,
            var(--theme-color-1) 0%,
            var(--theme-color-4) ${frag}%,
            var(--theme-frame-lighter) ${frag}% ,
            var(--theme-frame-darker)
        `;
    }

    const [islandWtoHRatio, updateIMWTtHR] = useState(1);
    const [islandState, turnIsland] = useState(INIT_STATE.islandState);
    
    useEffect(() => {
        const userColorScheme = localStorage.getItem('color-scheme') as ColorScheme;
        if (userColorScheme) setColorScheme(userColorScheme);

        const islandMenuBox = (document.querySelector('.island-menu') as HTMLDivElement).getBoundingClientRect();
        updateIMWTtHR(islandMenuBox.width / islandMenuBox.height)
    }, [islandState]);
    
    const [inputMode, setInputMode] = useState<TInputMode>(INIT_STATE.inputMode as TInputMode);
    
    type IVM = 'numeric' | 'percentage'
    const [indicatorsViewMode, setIndicatorsViewMode] = useState<IVM>((localStorage.getItem('indicators-view-mode') as IVM) ?? 'percentage');
    useEffect(() => localStorage.setItem('indicators-view-mode', indicatorsViewMode), [indicatorsViewMode]);
    
    // Graphing variables/functions

    const scaleDimension = 200;
    const [elastGraphProps, setElastGraphProps] = useState<ElastGraphProps>({
        maxPrice: scaleDimension,
        maxQuantity: scaleDimension,
        demandElasticity: -1,
        supplyElasticity: 1,
        priceLevel: 100,
    });
    const [extsGraphProps, setExtsGraphProps] = useState<ExtsGraphProps>({
        type: 'positive',
        eside: 'production',
        extval: 0,
    });

    const topicsList = [
        'elasticities',
        'externalities',
    ] as const;
    type Topic = typeof topicsList[number];

    const [openTopic, setOpenTopic] = useState<Topic>(INIT_STATE.openTopic as Topic);
    const [visIndicators, setVisIndicators] = useState<ElastVisIndicatorsProps>({
        priceDeviation: undefined,
        equilibriumPrice: undefined,
        equilibriumQuantity: undefined,
        quantityDemanded: undefined,
        quantityDemandedDeviation: undefined,
        quantitySupplied: undefined,
        quantitySuppliedDeviation: undefined,
        marketImbalance: undefined,
    });
    const [extsVisIndicators, setExtsVisIndicators] = useState<ExtsVisIndicatorsProps>({
        dwl: 0,
        equilibriumQuantity: 50,
        equilibriumPrice: 50,
        extValue: 0
    });
        
    useEffect(() => {
        document.querySelectorAll('input[type="range"]').forEach(input => {
            fillRangeInput(input as HTMLInputElement);
        });
    }, [inputMode, elastGraphProps]);

    return (
        <React.Fragment>
            <CursorElement />

            <header>
                <svg width={0} height={0}>
                    <clipPath id='island-menu' clipPathUnits='objectBoundingBox'>
                        <path d={`
                            M 0 0 
                            Q ${.5 / islandWtoHRatio} 0 ${.5 / islandWtoHRatio} .5
                            Q ${.5 / islandWtoHRatio} 1 ${.5 / islandWtoHRatio * 2.1} 1
                            L ${1 - .5 / islandWtoHRatio * 2.1} 1
                            Q ${1 - .5 / islandWtoHRatio} 1 ${1 - .5 / islandWtoHRatio} .5
                            Q ${1 - .5 / islandWtoHRatio} 0 1 0 
                            Z
                        `} />
                    </clipPath>
                </svg>

                <div className='setting-ui island-menu'>
                    {islandState == 'on' ? (
                        <>
                            <IconButton
                                id='lightMode'
                                className='col-scheme-switch b-b-s'
                                root='/icons/light_mode.svg'
                                onClick={() => setColorScheme('light')} />
                            <IconButton
                                root='/icons/close.svg'
                                onClick={() => turnIsland('off')} />
                            <IconButton
                                id='darkMode'
                                className='col-scheme-switch b-b-s'
                                root='/icons/dark_mode.svg'
                                onClick={() => setColorScheme('dark')} />
                        </>

                    ) : (
                        <IconButton
                            className='b-b-s'
                            root='./icons/settings_color_scheme.svg'
                            onClick={() => turnIsland('on')} />
                    )}
                </div>
            </header>

            <main>
                <div className='widgets-variant-main prompt-widget'>
                    <div className="widgets-variant-main input-mode-switch-wrapper">
                        <Trigger
                            variant='flat'
                            status={openTopic !== 'externalities' ? 'disabled' : undefined}
                            className={`input-mode-switch ${inputMode === 'auto' ? 'input-mode-selected' : ''}`}
                            onClick={() => {setInputMode('auto'); setOpenTopic('externalities')}}>auto</Trigger>
                        <Trigger
                            variant='flat'
                            className={`input-mode-switch ${inputMode === 'manual' ? 'input-mode-selected' : ''}`}
                            onClick={() => setInputMode('manual')}>manual</Trigger>
                    </div>

                    <h3>Topics</h3>
                    {inputMode === 'auto' ? (
                        ExtReqIntf(requestQuery,reqOnChange,disabledBtns,autoFill,dispatchRunInference,requestQueryCopy,isLoading,gptRes)
                    ) : (
                        Topics({
                            elastGraphProps, setElastGraphProps,
                            extsGraphProps, setExtsGraphProps,
                            openTopic, setOpenTopic,
                            fillRangeInput
                        })
                    )}
                </div>

                <div className='graph-output'>
                    { openTopic === 'elasticities' ? (
                        <ElastMainContent
                            elastGraphProps={elastGraphProps}
                            setElastGraphProps={setElastGraphProps}
                            visIndicators={visIndicators}
                            setVisIndicators={setVisIndicators}
                            indicatorsViewMode={indicatorsViewMode}
                            setIndicatorsViewMode={setIndicatorsViewMode} />
                    ) : (
                        <ExtsMainContent
                            extsGraphProps={extsGraphProps}
                            setExtsGraphProps={setExtsGraphProps}
                            visIndicators={extsVisIndicators}
                            setVisIndicators={setExtsVisIndicators}
                            indicatorsViewMode={indicatorsViewMode}
                            setIndicatorsViewMode={setIndicatorsViewMode} />
                    ) }
                </div>

                <div className='learning-section'>
                    {openTopic === 'elasticities' ? (
                        ElasticitiesExplained()
                    ) : (
                        ExternalitiesExplained({extsGraphProps})
                    )}
                </div>
            </main>
        </React.Fragment>
    )
}

export default App;
