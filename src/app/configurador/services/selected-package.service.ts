import { ExteriorColorService } from './../exterior-color-selection/service/exterior-color.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Package } from '../package-selection/interface/package.interface';
import { SelectedExteriorColorService } from './selected-exterior-color.service';

@Injectable({
  providedIn: 'root'
})
export class SelectedPackageService {
  private packagesSource = new BehaviorSubject<Package[]>([]);
  currentPackages = this.packagesSource.asObservable();

  constructor(private exterriorColorService: ExteriorColorService, private selectedExteriorColorService: SelectedExteriorColorService) {

  }

  changePackages(packages: Package[]) {
    this.packagesSource.next(packages);
    if (packages) {
      let pack = localStorage.getItem('selectedPackage');
      if (pack) {
        let obj = JSON.parse(pack);
        let idPack = obj!.id;
        this.exterriorColorService.getExtColorByPackId(idPack).subscribe((exteriorColors) => {
          this.selectedExteriorColorService.changeExtColor(exteriorColors);
        });
      }
    } else {
      this.selectedExteriorColorService.changeExtColor([]); // Vacía la lista de colores si no hay ningún paquete seleccionado
    }
  }

  getSelectedPackages(): Package[] {
    const storedPackages = localStorage.getItem('selectedPackages');
    return storedPackages ? JSON.parse(storedPackages) : [];
  }
}
