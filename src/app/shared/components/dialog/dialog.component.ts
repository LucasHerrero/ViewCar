import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from './search.service';
import { Brand } from '../../../configurador/brand-selection/interfaces/brand.interface';
import { Model } from '../../../models/interfaces/model.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormStateService } from '../../../configurador/services/formStateService.service';
import { SelectedModelService } from '../../../configurador/services/selected-model.service';
import { SelectedBrandService } from '../../../configurador/services/selected-brand.service';
import { HeaderComponent } from '../header/header.component';
import { HeaderService } from '../header/header.service';
import { ConstantPool } from '@angular/compiler';
import { ModelSelectionService } from '../../../configurador/model-selection/model-selection.service';
import { ModelService } from '../../../models/service/models.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})

export class DialogComponent {


  searchValue = new FormControl('');
  models: Model[] = [];
  selectedModel?: Model;
  check: boolean = true;




  constructor(private searchService: SearchService, private router: Router,
    private formState: FormStateService,
    private SelectedModelService: SelectedModelService,
    private SelectedBrandService: SelectedBrandService,
    private HeaderService: HeaderService,
    private modelselection: ModelSelectionService,
    private SearchService: SearchService,
    private modelService: ModelService,
  ) { }

  search() {
    const value: string = this.searchValue.value || '';
    if (value.length >=  3 ) {
      this.searchService.getSuggestions(value)
      .subscribe(models => {
        if (typeof models === 'object' && !Array.isArray(models)) {
          // Si models es un objeto pero no un array, lo convierte en un array que contiene el objeto
          this.models = [models];
        } else {
          // Si models ya es un array, lo asigna directamente
          this.models = models;
        }
      });
    }


  }


  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const model: Model = event.option.value;
    if (!event.option.value) {

    } else {
      this.searchValue.setValue(model.model);

      this.selectedModel = model;
      this.models = [];
      this.models.push(this.selectedModel);

      this.navigateToConfigurator(this.selectedModel.id);


    }
  }

  //navega al configurador y cambia el modelo seleccionado.
  navigateToConfigurator(id: number) {
    const currentRoute = this.router.url;
    var brandLocal: Brand;
    if (currentRoute === '/configurador') {

      console.log(currentRoute);
      this.formState.currentClickfn(2);
    }
    else {
      this.router.navigate(['/configurador']);

      this.formState.currentClickfn(1);
    }

    console.log("navegando al configurador...");

    this.models.forEach((model) => {

      if (model.id == id) {
                this.searchService.onBrandSelected(model.brand.id);
        localStorage.setItem('selectedBrand', JSON.stringify(model.brand));
        localStorage.setItem('selectedModel', JSON.stringify(model));
        this.modelselection.onModelClick(model);
      }
    });
    this.HeaderService.closeDialog();

  }

}








