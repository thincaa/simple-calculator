import { ChangeDetectorRef, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface resultModel {
  index: number,
  firstValue: number,
  secondValue: number,
  operation: string,
  result: number
}

export enum enumOperation {
  addition = 1,
  subtraction = 2,
  multiplication = 3,
  division = 4,
}
let ELEMENT_DATA: resultModel[] = []

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  result: string;
  dataSource = new MatTableDataSource(ELEMENT_DATA)
  firstValue: number;
  secondValue: number;
  operation: string;
  index: number = 0;
  resetResult: boolean = false;
  displayedColumns: string[] = ['index', 'firstValue', 'secondValue', 'operation', 'result'];
  constructor(private changeDetectorRefs: ChangeDetectorRef) {
    this.result = '0'
    this.dataSource.connect()
  }
  insertChar(char: string) {
    if(this.resetResult){
      this.result = '0'
      this.resetResult = false;
    }
    if (this.result == '0') {
      this.result = char;
    } else {
      this.result += char;
    }
  }

  executeOperation(operation: number) {
    if (this.result !== '0') {
      if (!this.firstValue) {
        this.firstValue = Number(this.result);
        this.result = '0';
      }
    }
    if (operation === enumOperation.addition) {
      this.operation = 'Adição';
    }
    if (operation === enumOperation.subtraction) {
      this.operation = 'Subtração';
    }
    if (operation === enumOperation.multiplication) {
      this.operation = 'Multiplicação';
    }
    if (operation === enumOperation.division) {
      this.operation = 'Divisão';
    }

  }

  onResult() {
    if (this.firstValue) {
      this.secondValue = Number(this.result);
      if (this.operation == 'Adição') {
        this.result = String(this.firstValue + this.secondValue);
        this.addItemArray();
      }
      if (this.operation == 'Subtração') {
        this.result = String(this.firstValue - this.secondValue);
        this.addItemArray();
      }
      if (this.operation == 'Multiplicação') {
        this.result = String(this.firstValue * this.secondValue);
        this.addItemArray();
      }
      if (this.operation == 'Divisão') {
        this.result = String(this.firstValue / this.secondValue);
        this.addItemArray();
      }
    }

  }

  clear() {
    this.firstValue = 0;
    this.secondValue = 0;
    this.result = '0';
  }

  addItemArray() {
    debugger
    this.index++;
    let resultArray: resultModel = {
      index: this.index,
      firstValue: this.firstValue,
      secondValue: this.secondValue,
      operation: this.operation,
      result: Number(this.result)
    }
    ELEMENT_DATA.push(resultArray);
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.changeDetectorRefs.detectChanges();
    this.resetResult = true;
    this.firstValue = 0;
    this.secondValue = 0;
  }
  cleanHistory(){
    ELEMENT_DATA = [];
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.changeDetectorRefs.detectChanges();
  }
}
