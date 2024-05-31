import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Model } from '../models/interfaces/model.interface';

@Injectable({
  providedIn: 'root',
})
export class AdministracionService {
  private stateSource = new BehaviorSubject<string>('');
  currentState$ = this.stateSource.asObservable();
  private modelSource = new BehaviorSubject<Model>({} as Model);
  currentModel$ = this.modelSource.asObservable();

  selectedModel(model: Model) {
    this.modelSource.next(model);
  }

  changeState(newState: string) {
    this.stateSource.next(newState);
  }
}
