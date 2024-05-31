import { Component } from '@angular/core';
import { ModelSummaryService } from '../services/ModelSummaryService.service';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
})
export class EnvioComponent {
  summary: any;

  constructor(private modelSummaryService: ModelSummaryService) {}

  ngOnInit() {
    this.modelSummaryService.modelSummary$.subscribe(summary => {
      this.summary = summary;
    });
  }
}
