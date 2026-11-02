import { STAR_CONFIG } from "./star-config";

export default class Star {
    x: number
    y: number
    size: number
    color: string
    pulseDir: number
    speed: number
    max_size_bound: number
    min_size_bound: number
    boundingBoxSize: number = 0
    index: number = 0

    constructor(x: number, y: number, mxs: number, mns: number, color?: string, aniSpeed?: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * (mxs - mns) + mns;
        this.color = !!color ? color : STAR_CONFIG.color;

        this.pulseDir = 1;
        this.speed = !!aniSpeed ? aniSpeed : Math.random() * 0.2 + .2;

        this.max_size_bound = mxs;
        this.min_size_bound = mns;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const p = Math.PI;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        
        const x_left = this.x - this.size;
        const x_right = this.x + this.size;
        const y_top = this.y - this.size;
        const y_bottom = this.y + this.size;
        const star_size = this.size - 1;
        
        ctx.beginPath();
        ctx.arc(x_left, y_top, star_size, 0, p/2);
        ctx.arc(x_left, y_bottom, star_size, p*3/2, p*2);
        ctx.arc(x_right, y_bottom, star_size, p, p*3/2);
        ctx.arc(x_right, y_top, star_size, p/2, p);
        
        ctx.stroke();
        ctx.fill();

        ctx.restore();
    }

    update() {
        if (this.size >= this.max_size_bound || this.size <= this.min_size_bound) {
            this.pulseDir *= -1;
        }
        this.size += this.speed * this.pulseDir;
    }
}
