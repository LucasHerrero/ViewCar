import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Model } from '../../models/interfaces/model.interface';
import { SelectedBrandService } from '../services/selected-brand.service';
import { SelectedModelService } from '../services/selected-model.service';
import { PackageService } from '../package-selection/service/package.service';
import { SelectedPackageService } from '../services/selected-package.service';
import { SelectedEngineService } from '../services/selected-engine.service';
import { EngineService } from '../engine-selection/service/engine.service';
@Injectable({
  providedIn: 'root'
})
export class ModelSelectionService {
  selectedModelId: number | null = null;

  constructor(
    private selectedBrandService: SelectedBrandService,
    private selectedModelService: SelectedModelService,
    private packageService: PackageService,
    private selectedPackageService: SelectedPackageService,
    private selectedEngineService: SelectedEngineService,
    private engineService: EngineService,
  ) {}

  onModelClick(model: Model) {
    this.selectedModelService.changeModel(model);
    this.selectedModelId = model.id;

    // Obtén los paquetes para el modelo seleccionado
    this.packageService.getPackagesByModelId(model.id).subscribe((packages) => {
      this.selectedPackageService.changePackages(packages);
      //obtener el engines para el modelo seleccionado
      this.engineService.getEnginesByModelId(model.id).subscribe((engines) => {
        this.selectedEngineService.changeEngine(engines);
      });
    });
  }
}
