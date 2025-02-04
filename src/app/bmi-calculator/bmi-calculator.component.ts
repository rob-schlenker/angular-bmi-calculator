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

  ngOnInit() {
    this.loadFromCookies()
  }

  setUnit(unit: 'metric' | 'imperial') {
    this.selectedUnit = unit
    // this.resetInputs()
  }

  resetInputs() {
    this.metricHeight = null
    this.metricWeight = null
    this.imperialHeightFeet = null
    this.imperialHeightInches = null
    this.imperialWeight = null
    this.bmiResult = null
    this.saveToCookies()
  }

  // Save inputs to cookies
  saveToCookies() {
    if (this.selectedUnit === 'metric') {
      document.cookie = `selectedUnit=metric`
      document.cookie = `metricHeight=${this.metricHeight || ''}`
      document.cookie = `metricWeight=${this.metricWeight || ''}`
    } else {
      document.cookie = `selectedUnit=imperial`
      document.cookie = `imperialHeightFeet=${this.imperialHeightFeet || ''}`
      document.cookie = `imperialHeightInches=${
        this.imperialHeightInches || ''
      }`
      document.cookie = `imperialWeight=${this.imperialWeight || ''}`
    }
  }

  // Load inputs from cookies
  loadFromCookies() {
    const cookies = document.cookie.split('; ')
    const cookieMap = new Map(
      cookies.map((cookie) => {
        const [key, value] = cookie.split('=')
        return [key, value]
      }),
    )

    const savedUnit = cookieMap.get('selectedUnit')
    if (savedUnit) {
      this.selectedUnit = savedUnit as 'metric' | 'imperial'

      if (this.selectedUnit === 'metric') {
        this.metricHeight = Number(cookieMap.get('metricHeight')) || null
        this.metricWeight = Number(cookieMap.get('metricWeight')) || null
      } else {
        this.imperialHeightFeet =
          Number(cookieMap.get('imperialHeightFeet')) || null
        this.imperialHeightInches =
          Number(cookieMap.get('imperialHeightInches')) || null
        this.imperialWeight = Number(cookieMap.get('imperialWeight')) || null
      }
    }
  }

  // Call this method when calculating BMI or on input changes
  onInputChange() {
    this.saveToCookies()
  }

  calculateBMI(): void {
    if (
      (this.selectedUnit === 'metric' &&
        this.metricWeight !== null &&
        this.metricHeight !== null) ||
      (this.selectedUnit === 'imperial' &&
        this.imperialHeightFeet !== null &&
        this.imperialHeightInches !== null &&
        this.imperialWeight !== null)
    ) {
      this.calculateBMIrun()
    } else {
      alert('Please enter both weight and height for the selected unit!')
      return
    }
  }
  calculateBMIrun() {
    this.saveToCookies()
    if (this.selectedUnit === 'metric') {
      // Metric calculation: weight (kg) / (height (m))^2
      const heightInMeters = this.metricHeight! / 100
      this.bmiResult = Number(
        (this.metricWeight! / (heightInMeters * heightInMeters)).toFixed(2),
      )
    } else {
      // Imperial calculation: (weight (lbs) / (height (inches))^2) * 703
      const totalHeightInches =
        this.imperialHeightFeet! * 12 + this.imperialHeightInches!
      this.bmiResult = Number(
        (
          ((this.imperialWeight || 0) /
            (totalHeightInches * totalHeightInches)) *
          703
        ).toFixed(2),
      )
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
