import { Component, OnInit } from '@angular/core';
import { SelectedExteriorColorService } from '../services/selected-exterior-color.service';

import { ExteriorColor } from './interface/exterior-color.interface';
import { coerceStringArray } from '@angular/cdk/coercion';

@Component({
  selector: 'app-exterior-color-selection',
  templateUrl: './exterior-color-selection.component.html'
})
export class ExteriorColorSelectionComponent implements OnInit {

  extColors: ExteriorColor[] = [];
  selectedExtColor: ExteriorColor | null = null;
  selectedPackId: number | null = null;
  selectedImageList: string[] = [];
  currentImageIndex = 0;


  constructor(private selectedExteriorColorService: SelectedExteriorColorService) { }

  ngOnInit(): void {
    this.selectedExteriorColorService.currentExtColor.subscribe((extColors) => {
      this.extColors = extColors;
      if (extColors.length > 0) {

        const selectedExtColorItem = localStorage.getItem('selectedExtColor');
        const selectedExtColor = selectedExtColorItem ? JSON.parse(selectedExtColorItem) : null;
        const extColorToSelect = selectedExtColor && extColors.find(extColors => extColors.id === selectedExtColor.id) || extColors[0];
        this.selectedExtColor = extColorToSelect;
        localStorage.setItem('selectedExtColor', JSON.stringify(this.selectedExtColor));
        this.selectedImageList = this.selectedExtColor ? this.selectedExtColor.imageList : [];
      }
    });
  }

  onExtColorClick(extColor: ExteriorColor) {
    this.selectedExtColor = extColor;
    this.selectedImageList = extColor.imageList;
    this.currentImageIndex = 0; // Establece el índice de la imagen actual a 0 cuando se selecciona un nuevo color
    localStorage.setItem('selectedExtColor', JSON.stringify(extColor)); // Guarda el color seleccionado en localStorage
  }

  getLocalStorageImageList() {
    let selectedExtColor = JSON.parse(localStorage.getItem('selectedExtColor') || '{}');
    this.selectedImageList = selectedExtColor.imageList;
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

}
