import { Component, OnInit } from '@angular/core';
import { Model } from '../../models/interfaces/model.interface';
import { SelectedBrandService } from '../services/selected-brand.service';
import { SelectedModelService } from '../services/selected-model.service';
import { PackageService } from '../package-selection/service/package.service';
import { SelectedPackageService } from '../services/selected-package.service';
import { SelectedEngineService } from '../services/selected-engine.service';
import { EngineService } from '../engine-selection/service/engine.service';
import { ModelSelectionService } from './model-selection.service';

@Component({
  selector: 'app-models-page',
  templateUrl: './model-selection.component.html',
})
export class ModelSelectionComponent implements OnInit {
  models: Model[] = [];
  selectBrand: string = '';
  loading = false;
  selectedModelId: number | null = null;

  constructor(
    private selectedBrandService: SelectedBrandService,
    private selectedModelService: SelectedModelService,
    private packageService: PackageService,
    private selectedPackageService: SelectedPackageService,
    private selectedEngineService: SelectedEngineService,
    private engineService: EngineService,
    private ModelSelectionService: ModelSelectionService,
  ) { }

  getSelectedModelId(): number {
    const selectedModel = this.selectedModelService.getSelectedModel();
    return selectedModel ? selectedModel.id : 0;
  }

  onModelClickComponent(model: Model) {
    this.ModelSelectionService.onModelClick(model);
  }

  ngOnInit() {
    this.selectedBrandService.currentModels.subscribe((models) => {
      this.models = models;

      if (models.length > 0) {
        const selectedModelItem = localStorage.getItem('selectedModel');
        const selectedModel = selectedModelItem ? JSON.parse(selectedModelItem) : null;
        const modelToSelect = selectedModel && models.find(model => model.id === selectedModel.id) || models[0];
        this.selectedModelService.changeModel(modelToSelect);
        this.selectedModelId = modelToSelect.id;
        localStorage.setItem('selectedModel', JSON.stringify(modelToSelect));
      }
    });
  }

  get activeModelsCount(): number {
    return this.models.filter(model => model.status === 'Active').length;
  }

}
