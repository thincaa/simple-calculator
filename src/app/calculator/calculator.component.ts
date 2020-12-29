import { Component, OnInit } from '@angular/core';

export interface result {
  index: number,
  firstValue: number,
  secondValue: number,
  operation: string,
  result: number
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  result: number;
  dataSource: Array<result>;
  displayedColumns: string[] = ['index', 'firstValue', 'secondValue', 'operation', 'result'];
  constructor() { 
    this.result = 0
    this.dataSource = [];
  }

}
