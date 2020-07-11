import { BacteriasSubjectModel } from "../../models/bacteria";

export class Table {
    private table: HTMLTableElement
    constructor(data: BacteriasSubjectModel) {
        this.table = <HTMLTableElement>document.getElementById("bacterias-table")
        this.table.innerHTML = '';
        this.addHead();
        this.addData(data);
    }

    addHead() {
        const row = this.addRow();
        this.addTh(row, 'Bacteria');
        this.addTh(row, 'Energy');
        this.addTh(row, 'Food eaten');
        this.addTh(row, 'Size');
        this.addTh(row, 'Alive')
    }

    addData(data: BacteriasSubjectModel) {
        data.alive.concat(data.dead).sort((a,b) => parseInt(a.id)-parseInt(b.id)).forEach(b => {
            const row = this.addRow();
            this.addCell(row, b.id);
            this.addCell(row, b.energy.toString());
            this.addCell(row, b.foodAte.toString());
            this.addCell(row, b.DNA.size.toString());
            this.addCell(row, !b.isDead ? 'alive' : 'dead');
        })
    }

    addRow() {
        const row = this.table.insertRow();
        row.classList.add('bacterias-tr')
        return row;
    }

    addCell(row: HTMLTableRowElement, text: string) {
        const cell = document.createElement('td');
        cell.innerHTML = text;
        row.appendChild(cell); 
        return cell;
    }

    addTh(row, text) {
        const cell = document.createElement('th');
        cell.innerHTML = text;
        row.appendChild(cell); 
        return cell;
    }
}