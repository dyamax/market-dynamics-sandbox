import { Chart, type ChartConfiguration } from "chart.js/auto";
import { useEffect, useRef, useState } from "react";

type LocalGraphProps = {
  title: string
  className: string
  extGP: ExtsGraphProps
  setExtGP: React.Dispatch<React.SetStateAction<ExtsGraphProps>>
  setVisIndicators: React.Dispatch<React.SetStateAction<ExtsVisIndicatorsProps>>
}

const consts = {
  maxQ: 100,
  maxP: 100,
  demandCurve: {
    initial: { x: 0, y: 100 },
    e: { x: 50, y: 50 },
    final: { x: 100, y: 0 }
  },
  supplyCurve: {
    initial: { x: 0, y: 0 },
    final: { x: 100, y: 100 }
  },
}

function ExtsGraph({
  title,
  className,
  extGP = {
    type: 'positive',
    eside: 'consumption',
    extval: 10
  },
  setExtGP,
  setVisIndicators
}: LocalGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const [onLoadOnly, setNotOnLoad] = useState(true);

  function accountToEV(initVal: number) {
    return extGP.type === 'positive' ? initVal + extGP.extval : initVal - extGP.extval;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let MSCurve = {
      initial: { x: 0, y: 0 },
      final: { x: 0, y: 0 }
    }
    let e = { x: 0, y: 0 }
    
    extGP.eside === 'consumption' ? (
      MSCurve = {
        initial: { x: 0, y: accountToEV(100) },
        final: { x: 100, y: accountToEV(0) }
      }
    ) : (
      MSCurve = {
        initial: { x: 0, y: accountToEV(0) },
        final: { x: 100, y: accountToEV(100) }
      }
    )
    
    extGP.eside === 'production' ? (
      extGP.type === 'positive' ? 
        (e = {x: 50 - extGP.extval / 2, y: 50 + extGP.extval / 2}) : 
        (e = {x: 50 + extGP.extval / 2, y: 50 - extGP.extval / 2})
      ) : (
      extGP.type === 'positive' ? 
        (e = {x: 50 + extGP.extval / 2, y: 50 + extGP.extval / 2}) : 
        (e = {x: 50 - extGP.extval / 2, y: 50 - extGP.extval / 2})
    )
    
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        datasets: [
          {
            label: extGP.eside === 'production' ? 'MSB=MPB' : 'MPB',
            data: [
              consts.demandCurve.initial,
              consts.demandCurve.e,
              consts.demandCurve.final,
            ],
            borderColor: '#ff2c2c',
            parsing: false
          },
          {
            label: extGP.eside === 'consumption' ? 'MSC=MPC' : 'MPC',
            data: [
              consts.supplyCurve.initial,
              consts.supplyCurve.final
            ],
            borderColor: '#646CFF',
            parsing: false
          },

          {
            label: extGP.eside === 'production' ? 'MSC' : 'MSB',
            data: [
              { x: MSCurve.initial.x, y: MSCurve.initial.y},
              { x: e.x, y: e.y },
              { x: MSCurve.final.x, y: MSCurve.final.y},
            ],
            borderColor: '#76ff64',
            parsing: false
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        animation: onLoadOnly ? undefined : false,
        plugins: {
          title: {
            display: title ? true : false,
            text: title
          },
          legend: {
            labels: {
              filter: (item) => item.text !== 'hidden'
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Quantity'
            },
            type: 'linear',
            position: 'bottom',
            grid: {
              display: false
            },
            min: 0,
            max: consts.maxQ
          },
          y: {
            title: {
              display: true,
              text: 'Price'
            },
            type: 'linear',
            position: 'left',
            grid: {
              display: false
            },
            min: 0,
            max: consts.maxP
          }
        },
      }
    }
    
    chartRef.current?.destroy();
    chartRef.current = new Chart(canvas, config);

    setNotOnLoad(false);

    setVisIndicators({
      dwl: Math.abs(e.y - 50) * Math.abs(e.x - 50),
      equilibriumQuantity: e.x,
      equilibriumPrice: e.y,
      extValue: extGP.extval
    });

    return () => chartRef.current?.destroy();
  }, [extGP]);

  return (
    <div className={`graph-wrapper`}>
      <canvas ref={canvasRef} className={`graph ${className}`} />
    </div>
  );
}

export default ExtsGraph;
