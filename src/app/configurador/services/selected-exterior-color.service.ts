import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExteriorColor } from '../exterior-color-selection/interface/exterior-color.interface';


@Injectable({
  providedIn: 'root'
})
export class SelectedExteriorColorService {

  private extColorSource = new BehaviorSubject<ExteriorColor[]>([]);
  currentExtColor = this.extColorSource.asObservable();

  changeExtColor(extColor: ExteriorColor[]) {
    this.extColorSource.next(extColor);
    if (extColor) {
      localStorage.setItem('selectedExtColor', JSON.stringify(extColor));
    } else {
      localStorage.removeItem('selectedExtColor');
    }
  }

  getSelectedExtColor(): ExteriorColor[] {
    const storedExtColor = localStorage.getItem('selectedExtColor');
    return storedExtColor ? JSON.parse(storedExtColor) : null
  }
}
