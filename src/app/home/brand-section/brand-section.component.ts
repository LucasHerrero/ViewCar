import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../configurador/brand-selection/service/brands.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'home-brand-section',
  templateUrl: './brand-section.component.html',
  styleUrls: []
})

export class BrandSectionComponent implements OnInit {
    isBrandSelected = false;
    brandId?: number;


  constructor(
    public brandsService: BrandService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const brandIdParam = this.route.snapshot.paramMap.get('brandId');
    this.brandId = brandIdParam ? +brandIdParam : 0;
  }

  onBrandSelected(idMarca: number) {
    if (idMarca === null) {
      console.error('idMarca es nulo');
      return;
    }

    this.isBrandSelected = true;
    this.router.navigate(['/modelos/', idMarca]);

  }

}
