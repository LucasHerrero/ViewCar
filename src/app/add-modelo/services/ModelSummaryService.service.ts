import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModelSummaryService {
    private modelSummarySource = new BehaviorSubject({});
    modelSummary$ = this.modelSummarySource.asObservable();

    updateModelSummary(summary: any) {
        this.modelSummarySource.next(summary);
    }
}