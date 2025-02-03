// src/app/app.component.ts

import { Component } from '@angular/core';
import { BmiCalculatorComponent } from './bmi-calculator/bmi-calculator.component';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [ BmiCalculatorComponent,   FormsModule],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'bmi-calculator-app';
}



