import { Component, OnInit } from '@angular/core';
import { Model } from './interfaces/model.interface';
import { ModelService } from './service/models.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
})

export class ModelsComponent implements OnInit {

  // ...

    constructor(public modelService: ModelService, private router: Router, private route: ActivatedRoute) { }

    navigateToModelInfo(modelId: number) {
      this.router.navigate(['/modelos/info', modelId]);
    }

    models: Model[] = [];
    showSidebar = false;
    maxPrice = Infinity
    dropdownOpen = false;
    brandId?: number;

  ngOnInit(): void {
    this.brandId = +this.route.snapshot.paramMap.get('brandId')!;
    if (this.brandId) {
      // Si se proporciona brandId, filtra los modelos por marca
      this.modelService.getModelsByBrand(this.brandId).subscribe((models: Model[]) => {
        this.models = models;
      });
    } else {
      // Si no se proporciona brandId, obtén todos los modelos
      this.modelService.getModels().subscribe((models: Model[]) => {
        this.models = models;
      });
    }
  }


  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  };


  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
}
