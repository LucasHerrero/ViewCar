import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancingService {
  private financingDataSubject = new Subject<any>();
  financingData$ = this.financingDataSubject.asObservable();

  getFinancingData() {
    const financingDataString = localStorage.getItem('financingData');
    if (financingDataString) {
      return JSON.parse(financingDataString);
    }
    return null;
  }

  updateFinancingData(financingData: any) {
    localStorage.setItem('financingData', JSON.stringify(financingData));
    this.financingDataSubject.next(financingData);
  }
}
