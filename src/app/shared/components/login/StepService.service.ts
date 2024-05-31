import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepService {
  private _step = new BehaviorSubject<number>(0);
  step$ = this._step.asObservable();

  setStep(step: number) {
    this._step.next(step);
  }

  getStep(): number {
    return this._step.getValue();
  }
}
