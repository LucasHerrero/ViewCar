import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Model } from '../../../models/interfaces/model.interface';
import { Brand } from '../../../configurador/brand-selection/interfaces/brand.interface';
import { SelectedBrandService } from '../../../configurador/services/selected-brand.service';

import { ModelService } from '../../../models/service/models.service';
import { BrandService } from '../../../configurador/brand-selection/service/brands.service';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private serviceUrl = `${environment.apiUrl}/search`;
  selectedBrandId: number | null = null;
  public Brands: Brand[] = [];
  models: Model[] = [];

  constructor(private http: HttpClient,
    private selectedBrandService: SelectedBrandService,

    public modelService: ModelService,
    public brandService: BrandService,) { }


  getSuggestions(query: string): Observable<Model[]> {
    return this.http.get<Model[]>(`${this.serviceUrl}/${query}`);

  }
  onBrandSelected(idMarca: number | null) {
    if (idMarca === null) {
      console.error('idMarca is null');
      return;
    }

    const selectedBrand = this.Brands.find((brand) => brand.id === idMarca);
    if (selectedBrand !== undefined) {
      this.selectedBrandService.changeSelectedBrand(selectedBrand);
    } else {
      this.selectedBrandService.changeSelectedBrand(null);
    }

    this.selectedBrandId = idMarca;
    this.modelService.getModelsByBrand(idMarca).subscribe(models => {
      this.models = models;
      this.selectedBrandService.changeModels(models);
    });
  }
}


