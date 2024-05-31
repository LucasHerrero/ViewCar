import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormStateService {
  private _step = new BehaviorSubject<number>(0);
  step$ = this._step.asObservable();

  // private currentStep = -1;
  private currentStep = -1;
  private maxSteps = 7;

  constructor() {
    // Emitir el valor inicial
    this._step.next(0);
  }

  nextStep() {
    if (this.currentStep < this.maxSteps) {
      this.currentStep++;
      this._step.next(this.currentStep); // Aquí está la corrección
      window.scrollTo(0, 0); // Agregar esta línea
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this._step.next(this.currentStep); // Aquí está la corrección
      window.scrollTo(0, 0); // Agregar esta línea
    }
  }
  //devuelve valor del paso actual
  currentStepFn() {
    return this.currentStep;
  }

  //hace el paso mediante click
  currentClickfn(num: number) {
    this._step.next(num);
    this.currentStep = num; //Pone el step igualado al numero en el que esta.
  }
}
