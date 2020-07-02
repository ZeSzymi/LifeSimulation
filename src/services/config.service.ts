import { Subject } from "rxjs";
import { Config } from "../helpers/config.helper";

export class ConfigService {

    public modal: HTMLElement;
    public bacteriasSlider: HTMLInputElement;
    public startFoodSlider: HTMLInputElement;
    public startLightSlider: HTMLInputElement;

    public foodSlider: HTMLInputElement;
    public lightSlider: HTMLInputElement;

    public closeConfigBtn: HTMLButtonElement;

    private subject: Subject<Config>;
    public config: Config = new Config();

    constructor() {
        this.subject = new Subject<Config>();
        this.modal = document.getElementById('config');
        this.bacteriasSlider = <HTMLInputElement>document.getElementById('bacteriasRange');
        this.startFoodSlider = <HTMLInputElement>document.getElementById('startFoodRange');
        this.startLightSlider = <HTMLInputElement>document.getElementById('startLightRange');
        this.closeConfigBtn = <HTMLButtonElement>document.getElementById('closeConfigBtn');

        this.foodSlider = <HTMLInputElement>document.getElementById('foodRange');
        this.lightSlider = <HTMLInputElement>document.getElementById('lightRange');
    }

    public onStart(): Config {
        this.config.bacterieAmount = parseInt(this.bacteriasSlider.value, 10);
        this.config.foodAmount = parseInt(this.startFoodSlider.value, 10);
        this.config.light = parseInt(this.startLightSlider.value, 10);

        return this.config;
    }

    public onSlidersChange() {
        this.foodSlider.addEventListener('change', () => {
            this.config.foodOnRun =  parseInt(this.foodSlider.value, 10);
            this.config.light =  parseInt(this.lightSlider.value, 10);
            this.subject.next(this.config);
        })

        this.lightSlider.addEventListener('change', () => {
            this.config.foodOnRun =  parseInt(this.foodSlider.value, 10);
            this.config.light =  parseInt(this.lightSlider.value, 10);
            this.subject.next(this.config);
        })

        return this.subject;
    }
}