import { AppComponent } from './../app.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';
import { CalculatorComponent } from './calculator.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CalculatorComponent,
      ],
      imports: [
        AppModule,
        MatFormFieldModule,
        FormsModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('must add values', () => {
    component.insertChar('1');
    component.insertChar('2');
    component.executeOperation(1);
    component.insertChar('1');
    component.insertChar('2');
    component.onResult();
    expect(component.result).toEqual('24');
  });

  it('must subtract value', () => {
    component.insertChar('1');
    component.insertChar('2');
    component.executeOperation(2);
    component.insertChar('1');
    component.insertChar('2');
    component.onResult();
    expect(component.result).toEqual('0');
  });

  it('must multiply value', () => {
    component.insertChar('1');
    component.executeOperation(3);
    component.insertChar('1');
    component.insertChar('2');
    component.onResult();
    expect(component.result).toEqual('12');
  });
  it('must divide value', () => {
    component.insertChar('8');
    component.executeOperation(4);
    component.insertChar('2');
    component.onResult();
    expect(component.result).toEqual('4');
  });

  it('must clean result', () => {
    component.insertChar('8');
    component.executeOperation(4);
    component.insertChar('2');
    component.onResult();
    component.clear();
    expect(component.result).toEqual('0');
  });
  it('must insert item in the table', () => {
    component.index = 10;
    component.firstValue = 20;
    component.secondValue = 10;
    component.operation = 'Adição';
    component.result = '30';
    component.addItemArray();
    expect(component.dataSource.data).toBeTruthy(component.dataSource.data.length > 0);
  });

  it('must clear table', () => {
    component.cleanHistory();
    expect(component.dataSource.data).toBeTruthy(component.dataSource.data.length === 0);
  });
});
