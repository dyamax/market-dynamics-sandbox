import Star from "./star";
import { STAR_CONFIG } from "./star-config";

const canvas = document.getElementById('APP_BACKGROUND') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const dpr = devicePixelRatio;

canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;

function spawnStars(nPerRow: number) {
    const stars = [];
    const mxs = STAR_CONFIG.mxs;
    const mns = STAR_CONFIG.mns;
    const star_size = (mxs + mns) / 2;
    const gap_x = (screen.width - (nPerRow * star_size)) / (nPerRow + 1);
    const nRows = Math.round((screen.height - gap_x) / (gap_x/1.1 + star_size));
    let starIndex = 0;

    for (let ny = 0; ny < nRows; ny++) {
        for (let nx = 0; nx < nPerRow; nx++) {
            const x = (gap_x * (nx + 1) + star_size * nx) + (star_size / 2);
            let y = (gap_x * (ny + 1) + star_size * ny) + (star_size / 2);
            
            const gap_end = screen.height - ((gap_x + star_size) * nRows);
            if (gap_x !== gap_end) {
                const avg = (gap_x + gap_end) /2;
                y -= (gap_x - avg);
            }

            const star = new Star(x, y, mxs, mns);
            star.boundingBoxSize = gap_x + star.size;
            star.index = starIndex;
            stars.push(star);
            starIndex++;
        }
    }
    return stars;
}

export const stars = spawnStars(STAR_CONFIG.nStarsPerRow);


function updateStarField() {
    for (let i = 0, len = stars.length; i < len; i++) {
        stars[i].update();
        stars[i].draw(ctx)
    }
}


function live() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateStarField();
    requestAnimationFrame(live);
}

live();
