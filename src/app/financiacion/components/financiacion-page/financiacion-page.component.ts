import { DialogConfig } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'financiacion-page',
  templateUrl: './financiacion-page.component.html',

})
export class FinanciacionPageComponent {

  form: FormGroup;
  totalPrice: number = 0;
  hasCalculated = false;
  minEntrada: number;
  maxEntrada: number;
  showButton = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder,
  public dialogRef: MatDialogRef<FinanciacionPageComponent>) {

    this.totalPrice = data.totalPrice;
    this.minEntrada = this.totalPrice / 10;
    this.maxEntrada = this.totalPrice * 0.2;

    this.form = this.fb.group({
      entrada: new FormControl('', [
        Validators.required,
        Validators.min(this.minEntrada),
        Validators.max(this.maxEntrada),
      ]),
      meses: new FormControl('', [
        Validators.required,
        Validators.min(48),
      ]),
    })
  }

  calculate() {
    this.hasCalculated = true;

    const entrada = this.form?.get('entrada')?.value;
    const meses = this.form?.get('meses')?.value;
    const tasaAnual = 0.05; // Tasa de interés anual  5%

    // Calculamos el total del préstamo restando la entrada
    const totalPrestamo = this.totalPrice - entrada;

    // Calculamos el pago mensual incluyendo intereses
    const tasaMensual = tasaAnual / 12; // Tasa de interés mensual
    const factor = Math.pow(1 + tasaMensual, meses); // Factor de crecimiento mensual
    const pagoMensual = (totalPrestamo * tasaMensual * factor) / (factor - 1);

    if (pagoMensual > 0) {
      this.showButton = true;
    }
    return parseFloat(pagoMensual.toFixed(2));
  }

  // guardar en localstorage los datos del modal
  onInterestButtonclick() {
    const financingData = {
      entrada: this.form.get('entrada')?.value,
      meses: this.form.get('meses')?.value,
      cuota: this.calculate(),
      tasaAnual: 0.05,
    };

    const financingDataString = JSON.stringify(financingData);
    localStorage.setItem('financingData', financingDataString);

    // Cerramos el modal
    this.dialogRef.close();
  }


}
