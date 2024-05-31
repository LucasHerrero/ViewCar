import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { InteriorColor } from '../interior-color-selection/interfaces/interior-color.interface';

@Injectable({
  providedIn: 'root'
})
export class SelectedInteriorColorService {

  private intColorSource = new BehaviorSubject<InteriorColor[]>([]);
  currentIntColor = this.intColorSource.asObservable();

  constructor() { }

  changeInteriorColor(color: InteriorColor) {
    this.intColorSource.next([color]);
    if (color) {
      localStorage.setItem('selectedIntColor', JSON.stringify([color]));
    } else {
      localStorage.removeItem('selectedIntColor');
    }
  }

  getSelectedIntColor() {
    const storedIntColor = localStorage.getItem('selectedIntColor');
    return storedIntColor ? JSON.parse(storedIntColor) : null;
  }
}
