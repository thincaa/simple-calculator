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

const OPERATIONS = [
  { operationCode: enumOperation.addition, operation: 'Adição', operationChar: '+' },
  { operationCode: enumOperation.subtraction, operation: 'Subtração', operationChar: '-' },
  { operationCode: enumOperation.multiplication, operation: 'Multíplicação', operationChar: '*' },
  { operationCode: enumOperation.division, operation: 'Divisão', operationChar: '/' },
];

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
        this.resetResult = false;
      }
      if (!this.operation) {
        OPERATIONS.forEach(element => {
          if (operation === element.operationCode) {
            this.operation = element.operation;
            this.result += element.operationChar + ' ';
            this.resetResult = false;
          }
        });
      }
    }
  }

  onResult(): void {
    if (this.firstValue) {
      OPERATIONS.forEach(element => {
        if (this.operation === element.operation) {
          const second = this.result.trim().split(element.operationChar);
          this.secondValue = Number(second[1]);
          this.result = String(eval(this.firstValue + element.operationChar + this.secondValue));
          this.addItemArray();
        }
      });
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
    this.operation = undefined;
  }

  cleanHistory(): void {
    ELEMENT_DATA = [];
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.changeDetectorRefs.detectChanges();
  }
}
