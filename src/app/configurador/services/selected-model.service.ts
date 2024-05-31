import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Model } from '../../models/interfaces/model.interface';
import { PackageService } from '../package-selection/service/package.service';
import { SelectedPackageService } from './selected-package.service';
@Injectable({
  providedIn: 'root'
})
export class SelectedModelService {
  private selectedModel = new BehaviorSubject<Model | null>(null);
  currentModel = this.selectedModel.asObservable();

  constructor(private packageService: PackageService, private selectedPackageService: SelectedPackageService) {
    this.initModel();
  }

  initModel() {
    const storedModel = localStorage.getItem('selectedModel');
    if (storedModel) {
      const model = JSON.parse(storedModel);
      this.changeModel(model);
    }
  }

  changeModel(model: Model | null) {
    this.selectedModel.next(model);
    if (model) {
      localStorage.setItem('selectedModel', JSON.stringify(model));
      // Actualiza la lista de paquetes para el modelo seleccionado
      this.packageService.getPackagesByModelId(model.id).subscribe((packages) => {
        this.selectedPackageService.changePackages(packages);
      });
    } else {
      localStorage.removeItem('selectedModel');
      this.selectedPackageService.changePackages([]); // Vacía la lista de paquetes si no hay ningún modelo seleccionado
    }
  }

  getSelectedModel(): Model | null {
    const storedModel = localStorage.getItem('selectedModel');
    return storedModel ? JSON.parse(storedModel) : null;
  }
}
