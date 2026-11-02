import { Chart, type ChartConfiguration, type ChartDataset } from "chart.js/auto";
import { useEffect, useRef, useState } from "react";

type LocalGraphProps = {
  title: string
  className: string
  extGP: ElastGraphProps
  setExtGP: React.Dispatch<React.SetStateAction<ElastGraphProps>>
  setVisIndicators: React.Dispatch<React.SetStateAction<ElastVisIndicatorsProps>>
}

type Coord = {x: number, y: number};

function getLine(p1: Coord, p2: Coord) {
  const m = (p2.y - p1.y) / (p2.x - p1.x);
  const b = p1.y - m * p1.x;
  return { m, b };
}

function equilibriumFinder(
  PED: Record<'initial' | 'final', Coord>,
  PES: Record<'initial' | 'final', Coord>
): Coord {
  const D = getLine(PED.initial, PED.final);
  const S = getLine(PES.initial, PES.final);

  const x = (S.b - D.b) / (D.m - S.m);
  const y = D.m * x + D.b;

  return { x, y };
};

function updatePriceLevelToCursor(
  e: React.MouseEvent,
  chartRef: React.RefObject<Chart | null>,
  coordsRef: React.RefObject<HTMLDivElement | null>,
  setExtGP: React.Dispatch<React.SetStateAction<ElastGraphProps>>,
) {
  const canvasBox = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
  const ex = e.clientX;
  const ey = e.clientY;
  
  const offset = 13;
  const mcx = ex - canvasBox.left + offset;
  const mcy = ey - canvasBox.top + offset;
  const ax = chartRef.current?.scales.x.getValueForPixel(ex - canvasBox.left) ?? 0;
  const ay = chartRef.current?.scales.y.getValueForPixel(ey - canvasBox.top) ?? 0;
  
  const coordsEl = coordsRef.current as HTMLDivElement;
  console.log(mcx, mcy, e.clientX, e.clientY)
  coordsEl.style.top = `${mcy}px`;
  coordsEl.style.left = `${mcx}px`;
  coordsEl.style.opacity = '1';
  coordsEl.textContent = (ax).toFixed() + ', ' + (ay).toFixed();

  setExtGP((prev: any) => ({
    ...prev,
    priceLevel: Number(Math.max(0, Math.min(prev.maxPrice, ay)).toFixed(2))
  }));
}

function ElastGraph({
  title,
  className,
  extGP = {
    maxPrice: 200,
    maxQuantity: 200,
    demandElasticity: -1,
    supplyElasticity: 1,
    priceLevel: 100,
  },
  setExtGP,
  setVisIndicators
}: LocalGraphProps) {
  const coordsRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const [onLoadOnly, setNotOnLoad] = useState(true);

  const [drag, setDrag] = useState(false);

  function getEndPoints(curve: string, max_y: number, max_x: number, fac: number) {
    const slope = 1 / Math.abs(fac);
    const direction = curve === 'demand' ? -1 : 1;

    const m = direction * slope;
    const b = curve === 'demand' ? max_y : 0;

    return {
      initial: { x: 0, y: b },
      final: { x: max_x, y: m * max_x + b }
    };
  }

  const PED = getEndPoints(
    'demand',
    extGP.maxPrice,
    extGP.maxQuantity,
    extGP.demandElasticity
  );
  const PES = getEndPoints(
    'supply',
    extGP.maxPrice,
    extGP.maxQuantity,
    extGP.supplyElasticity
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cy = extGP.priceLevel

    const equilibrium = equilibriumFinder(PED, PES);
    const demandLine = getLine(PED.initial, PED.final);
    const supplyLine = getLine(PES.initial, PES.final);

    const currentColorScheme = document.documentElement.style.colorScheme;
    const priceLevelDx = (cy - demandLine.b) / demandLine.m;
    const priceLevelSx = (cy - supplyLine.b) / supplyLine.m;
    const priceLevelColor = currentColorScheme === 'light' ? '#111' : '#f1f1f1';
    const priceLevelFillersColor = 'rgba(128, 128, 128, 0.2)';

    let hiddenCoords = [
//    x1       y1             x2            y2
      0, cy, priceLevelDx, cy, undefined,
      priceLevelDx, 0, priceLevelDx, cy, '#ff2c2c3e',
      priceLevelSx, cy, extGP.maxQuantity, cy, undefined,
      priceLevelSx, 0, priceLevelSx, cy, '#646cff3d',
      0, equilibrium.y, equilibrium.x, equilibrium.y, undefined,
      equilibrium.x, 0, equilibrium.x, equilibrium.y, undefined,
    ];
    let hiddenLines: ChartDataset<'line', { x: number; y: number }[]>[] = [];

    for (let i=0; i<hiddenCoords.length; i+=5) {
       hiddenLines.push({
        label: 'hidden',
        data: [
          { x: (hiddenCoords[i]! as number), y: (hiddenCoords[i+1] as number)! },
          { x: (hiddenCoords[i+2] as number)!, y: (hiddenCoords[i+3] as number)! },
        ],
        borderColor: (hiddenCoords[i+4] as string) ?? priceLevelFillersColor,
        borderDash: [14, 9],
        pointRadius: 0,
        pointHitRadius: 0,
        pointHoverRadius: 0,
        parsing: false
      });
    }

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Price level',
            data: [
              {
                x: priceLevelDx,
                y: cy
              },
              {
                x: priceLevelSx,
                y: cy
              }
            ],
            borderColor: priceLevelColor,
            parsing: false
          },
          
          {
            label: 'Demand',
            data: [
              { x: PED.initial.x, y: PED.initial.y },
              { x: equilibrium.x, y: equilibrium.y },
              { x: PED.final.x, y: PED.final.y }
            ],
            borderColor: '#ff2c2c',
            parsing: false
          },
          {
            label: 'Supply',
            data: [
              { x: 0, y: 0 },
              { x: PES.final.x, y: PES.final.y }
            ],
            borderColor: '#646CFF',
            parsing: false
          },
          ...hiddenLines
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
            max: extGP.maxQuantity
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
            max: extGP.maxPrice
          }
        },
      }
    }
    
    chartRef.current?.destroy();
    chartRef.current = new Chart(canvas, config);

    setNotOnLoad(false);

    setVisIndicators({
      priceDeviation: Number((extGP.priceLevel - equilibrium.y).toFixed(2)),
      equilibriumPrice: Number(equilibrium.y.toFixed(2)),
      equilibriumQuantity: Number(equilibrium.x.toFixed(2)),
      quantityDemanded: Number((priceLevelDx).toFixed(2)),
      quantityDemandedDeviation: (priceLevelDx - equilibrium.x) / equilibrium.x,
      quantitySupplied: Number((priceLevelSx).toFixed(2)),
      quantitySuppliedDeviation: (priceLevelSx - equilibrium.x) / equilibrium.x,
      marketImbalance: Math.ceil(priceLevelSx - priceLevelDx),
    });

    return () => chartRef.current?.destroy();
  }, [extGP]);

  return (
    <div className={`graph-wrapper`}>
      <div ref={coordsRef} className="visual-coords"></div>
      <canvas 
        ref={canvasRef} 
        className={`graph ${className}`} 

        onMouseDown={() => setDrag(true)}
        onMouseUp={() => {setDrag(false); (coordsRef.current as HTMLDivElement).style.opacity = '0'}}
        onMouseMove={(e) => {
          if (!drag) return;

          updatePriceLevelToCursor(e, chartRef, coordsRef, setExtGP);
        }}
        onMouseOut={() => (coordsRef.current as HTMLDivElement).style.opacity = '0'}
      />
    </div>
  );
}

export default ElastGraph;
