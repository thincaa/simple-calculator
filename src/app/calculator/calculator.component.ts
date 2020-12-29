import { ChangeDetectorRef, Component } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

export interface ResultModel {
  index: number;
  firstValue: number;
  secondValue: number;
  operation: string;
  result: number;
}

export enum enumOperation {
  addition = 1,
  subtraction = 2,
  multiplication = 3,
  division = 4,
}

let ELEMENT_DATA: ResultModel[] = [];

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  result: string;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  firstValue: number;
  secondValue: number;
  operation: string;
  index = 0;
  resetResult = false;
  displayedColumns: string[] = ['index', 'firstValue', 'secondValue', 'operation', 'result'];
  constructor(private changeDetectorRefs: ChangeDetectorRef) {
    this.result = '0';
    this.dataSource.connect();
  }

  insertChar(char: string): void {
    if (this.resetResult) {
      this.result = '0';
      this.resetResult = false;
    }
    if (this.result === '0') {
      this.result = char;
    } else {
      this.result += char;
    }
  }

  executeOperation(operation: number): void {
    if (this.result !== '0') {
      if (!this.firstValue) {
        this.firstValue = Number(this.result);
        this.result += ' ';
      }
    }
    if (operation === enumOperation.addition) {
      this.operation = 'Adição';
      this.result += '+ ';
    }
    if (operation === enumOperation.subtraction) {
      this.operation = 'Subtração';
      this.result += '- ';
    }
    if (operation === enumOperation.multiplication) {
      this.operation = 'Multiplicação';
      this.result += '* ';
    }
    if (operation === enumOperation.division) {
      this.operation = 'Divisão';
      this.result += '/ ';
    }
  }

  onResult(): void {
    if (this.firstValue) {
      if (this.operation === 'Adição') {
        const second = this.result.trim().split('+');
        this.secondValue = Number(second[1]);
        this.result = String(this.firstValue + this.secondValue);
        this.addItemArray();
      }
      if (this.operation === 'Subtração') {
        const second = this.result.trim().split('-');
        this.secondValue = Number(second[1]);
        this.result = String(this.firstValue - this.secondValue);
        this.addItemArray();
      }
      if (this.operation === 'Multiplicação') {
        const second = this.result.trim().split('*');
        this.secondValue = Number(second[1]);
        this.result = String(this.firstValue * this.secondValue);
        this.addItemArray();
      }
      if (this.operation === 'Divisão') {
        const second = this.result.trim().split('/');
        this.secondValue = Number(second[1]);
        this.result = String(this.firstValue / this.secondValue);
        this.addItemArray();
      }
    }
  }

  clear(): void {
    this.firstValue = 0;
    this.secondValue = 0;
    this.result = '0';
  }

  addItemArray(): void {
    this.index++;
    const resultArray: ResultModel = {
      index: this.index,
      firstValue: this.firstValue,
      secondValue: this.secondValue,
      operation: this.operation,
      result: Number(this.result)
    };
    ELEMENT_DATA.push(resultArray);
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.changeDetectorRefs.detectChanges();
    this.resetResult = true;
    this.firstValue = 0;
    this.secondValue = 0;
  }

  cleanHistory(): void {
    ELEMENT_DATA = [];
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.changeDetectorRefs.detectChanges();
  }
}
