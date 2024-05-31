import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Engine } from '../engine-selection/interface/engine-interface';

@Injectable({
  providedIn: 'root'
})
export class SelectedEngineService {
  private enginesSource = new BehaviorSubject<Engine[]>([]);
  currentEngine = this.enginesSource.asObservable();

changeEngine(engines: Engine[]) {
    this.enginesSource.next(engines);
    if (engines) {
      localStorage.setItem('selectedEngine', JSON.stringify(engines));
    } else {
      localStorage.removeItem('selectedEngine');
    }
  }

  getSelectedEngine(): Engine[] {
    const storedEngine = localStorage.getItem('selectedEngine');
    return storedEngine ? JSON.parse(storedEngine) : null
  }
}
