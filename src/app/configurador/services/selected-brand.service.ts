import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Model } from '../../models/interfaces/model.interface';
import { Brand } from '../brand-selection/interfaces/brand.interface';
import { ModelService } from '../../models/service/models.service';

/**
 * Service for managing the selected brand and its associated models.
 */
@Injectable({
  providedIn: 'root',
})
export class SelectedBrandService {
  private modelsSource = new BehaviorSubject<Model[]>([]);
  currentModels = this.modelsSource.asObservable();

  private brandIdSource = new BehaviorSubject<number | null>(null);
  currentBrandId = this.brandIdSource.asObservable();

  public selectedBrandSource = new BehaviorSubject<Brand | null>(null);
  currentSelectedBrand = this.selectedBrandSource.asObservable();

  constructor(private modelService: ModelService) {}

  /**
   * Updates the list of models for the selected brand.
   * @param models The new list of models.
   */

  changeModels(models: Model[]) {
    this.modelsSource.next(models);
  }

  changeBrandId(brandId: number | null) {
    this.brandIdSource.next(brandId);
  }

  changeSelectedBrand(brand: Brand | null) {
    this.selectedBrandSource.next(brand);
    if (brand) {
      localStorage.setItem('selectedBrand', JSON.stringify(brand));
      // Actualiza la lista de modelos para la marca seleccionada
      this.modelService.getModelsByBrand(brand.id).subscribe((models) => {
        this.changeModels(models);
      });
    } else {
      localStorage.removeItem('selectedBrand');
      this.changeModels([]); // Vacía la lista de modelos si no hay ninguna marca seleccionada
    }
  }

  getSelectedBrand(): Brand | null {
    const storedBrand = localStorage.getItem('selectedBrand');
    return storedBrand ? JSON.parse(storedBrand) : null;
  }
}
