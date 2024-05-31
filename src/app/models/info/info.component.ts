import { ModelService } from '../service/models.service';
import { Component, OnInit } from '@angular/core';
import { Model } from '../interfaces/model.interface';

@Component({
  selector: 'models-info',
  templateUrl: './info.component.html',
})

export class InfoComponent implements OnInit {
  selectedModel: Model | null = null;

  constructor(private modelService: ModelService) { }

  ngOnInit() {
    const pathParts = window.location.pathname.split('/');
    const modelId = +pathParts[pathParts.length - 1]; // Obtiene el ID del modelo de la última parte de la ruta
    this.modelService.getModelById(modelId).subscribe(model => {
      this.selectedModel = model;
    });
  }
}