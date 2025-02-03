// src/app/bmi-calculator/bmi-calculator.component.ts

import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-bmi-calculator',
  templateUrl: './bmi-calculator.component.html',
  styleUrls: ['./bmi-calculator.component.css'],
  imports: [FormsModule, CommonModule],
})
export class BmiCalculatorComponent {
  status: string = ''

  selectedUnit: 'metric' | 'imperial' = 'metric'

  // Metric inputs
  metricHeight: number | null = null
  metricWeight: number | null = null

  // Imperial inputs
  imperialHeightFeet: number | null = null
  imperialHeightInches: number | null = null
  imperialWeight: number | null = null

  bmiResult: number | null = null

  setUnit(unit: 'metric' | 'imperial') {
    this.selectedUnit = unit
    this.resetInputs()
  }

  resetInputs() {
    this.metricHeight = null
    this.metricWeight = null
    this.imperialHeightFeet = null
    this.imperialHeightInches = null
    this.imperialWeight = null
    this.bmiResult = null
  }

  calculateBMI(): void {
    if (
      (this.selectedUnit === 'metric' && this.metricWeight !== null && this.metricHeight !== null) ||
      (this.selectedUnit === 'imperial' && this.imperialHeightFeet !== null && this.imperialHeightInches !== null && this.imperialWeight !== null)
    ) {
      this.calculateBMIrun();
    } else {
      alert('Please enter both weight and height for the selected unit!');
      return;
    }
  }
    calculateBMIrun() {
    if (this.selectedUnit === 'metric') {
      // Metric calculation: weight (kg) / (height (m))^2
      const heightInMeters = this.metricHeight! / 100
      this.bmiResult = this.metricWeight! / (heightInMeters * heightInMeters)
    } else {
      // Imperial calculation: (weight (lbs) / (height (inches))^2) * 703
      const totalHeightInches =
        this.imperialHeightFeet! * 12 + this.imperialHeightInches!
      this.bmiResult =
        (this.imperialWeight! / (totalHeightInches * totalHeightInches)) * 703
    }

    if (this.bmiResult < 18.5) {
      this.status = 'Underweight'
    } else if (this.bmiResult < 24.9) {
      this.status = 'Normal weight'
    } else if (this.bmiResult < 29.9) {
      this.status = 'Overweight'
    } else {
      this.status = 'Obesity'
    }
  }
}

