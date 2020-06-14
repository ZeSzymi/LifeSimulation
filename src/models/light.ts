export class LightEnergy {
    public light: number;
    public ticks: number;
    public maxTicks: number;
    
    constructor(light: number, maxTicks:number, ticks: number) {
        this.light = light;
        this.maxTicks = maxTicks;
        this.ticks = ticks;
    }
}