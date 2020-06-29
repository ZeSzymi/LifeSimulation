import { ChartXYBase } from "../chartXYBase";
import { ValueAxis, LineSeries } from "@amcharts/amcharts4/charts";
import { Subject } from "rxjs";
import { Bacteria } from "../../models/bacteria";

export class LiveChart extends ChartXYBase<ValueAxis, ValueAxis, LineSeries> {
    private subject: Subject<Bacteria[]>;
    constructor(subject: Subject<Bacteria[]>) {
        super();
        this.subject = subject;
        this.subject.subscribe(bacterias => console.log(bacterias))
    }
    
}