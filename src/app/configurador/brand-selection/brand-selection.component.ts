import { Component } from '@angular/core';
import { SelectedBrandService } from '../services/selected-brand.service';
import { BrandService } from './service/brands.service';
import { ModelService } from '../../models/service/models.service';
import { Model } from '../../models/interfaces/model.interface';
@Component({
    selector: 'app-brand-selection',
    templateUrl: './brand-selection.component.html',
})
export class BrandSelectionComponent {
    isBrandSelected = false;
    models: Model[] = [];

    constructor(
        public brandsService: BrandService,
        private selectedBrandService: SelectedBrandService,
        private modelService: ModelService
    ) {
        this.selectedBrandService.currentSelectedBrand.subscribe(
        (selectedBrand) => {
            if (selectedBrand) {
            this.onBrandSelected(selectedBrand.id);
            }
        }
        );
    }

    ngOnInit() {
        const storedBrand = this.selectedBrandService.getSelectedBrand();
        if (storedBrand) {
        this.onBrandSelected(storedBrand.id);
        // Solicita los modelos para la marca seleccionada
        this.modelService.getModelsByBrand(storedBrand.id).subscribe((models) => {
            this.models = models;
        });
        }
    }

    onBrandSelected(idMarca: number) {
        if (idMarca === null) {
        console.error('idMarca es nulo');
        return;
        }

        this.isBrandSelected = true;
    }
}
