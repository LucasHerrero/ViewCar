import { Component, OnInit } from '@angular/core';
import { Package } from './interface/package.interface';
import { SelectedPackageService } from '../services/selected-package.service';
import { ExteriorColorService } from '../exterior-color-selection/service/exterior-color.service';
import { SelectedExteriorColorService } from '../services/selected-exterior-color.service';
@Component({
  selector: 'app-package-selection',
  templateUrl: './package-selection.component.html',
})
export class PackageSelectionComponent implements OnInit {
  packages: Package[] = [];
  selectedPackage: Package | null = null;
  selectedImageList: string[] = [];
  currentImageIndex = 0;
  showDescription = false;

  constructor(
    private selectedPackageService: SelectedPackageService,
    private exteriorColorService: ExteriorColorService,
    private selectedExteriorColorService: SelectedExteriorColorService
  ) { }

  ngOnInit() {
    this.selectedPackageService.currentPackages.subscribe((packages) => {
      this.packages = packages;
      if (packages.length > 0) {
        const selectedPackageItem = localStorage.getItem('selectedPackage');
        const selectedPackage = selectedPackageItem ? JSON.parse(selectedPackageItem) : null;
        const packageToSelect = selectedPackage && packages.find(packages => packages.id === selectedPackage.id) || packages[0];
        this.selectedPackage = packageToSelect;
        localStorage.setItem('selectedPackage', JSON.stringify(this.selectedPackage)); // Guarda el paquete seleccionado en localStorage
        this.selectedImageList = this.selectedPackage?.imageList || []; // Add null check and default value
      }
    });
  }

  onPackageClick(packaje: Package) {
    this.selectedPackage = packaje;
    this.selectedImageList = packaje.imageList;
    this.currentImageIndex = 0; // Establece el índice de la imagen actual a 0 cuando se selecciona un nuevo paquete
    localStorage.setItem('selectedPackage', JSON.stringify(packaje)); // Guarda el paquete seleccionado en localStorage

    // Obtiene los colores exteriores para el paquete seleccionado
    this.exteriorColorService
      .getExtColorByPackId(packaje.id)
      .subscribe((exteriorColors) => {
        this.selectedExteriorColorService.changeExtColor(exteriorColors);
      });
  }

  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }

  // Controles para el carrusel de imágenes
  nextImage() {
    if (this.currentImageIndex < this.selectedImageList.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0; // Vuelve al inicio cuando llega al final
    }
  }

  previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.selectedImageList.length - 1; // Vuelve al final cuando llega al inicio
    }
  }

  // Muestra u oculta la descripción del paquete
  infoPackage(pkg: Package): void {
    this.showDescription = !this.showDescription;
  }

  // Separa la descripción del paquete en elementos individuales, para poder formatearlos.
  getDescriptionItems(pkg: any) {
    return pkg.description.split(',');
  }
}
