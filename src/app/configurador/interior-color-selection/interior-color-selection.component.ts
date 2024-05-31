import { ColorInteriorService } from './service/color-interior.service';
import { Component, OnInit } from '@angular/core';
import { Package } from '../package-selection/interface/package.interface';
import { SelectedInteriorColorService } from '../services/selected-interior-color.service';
import { SelectedPackageService } from './../services/selected-package.service';
import { InteriorColor } from './interfaces/interior-color.interface';

@Component({
  selector: 'app-interior-color-selection',
  templateUrl: './interior-color-selection.component.html',
})
export class InteriorColorSelectionComponent implements OnInit {
  selectedPackage: Package | null = null;
  intColors: InteriorColor[] | null = null;
  currentIndex: number = 0; // Añade una variable de índice
  selectedColor: InteriorColor | null = null; // Añade una variable para el color seleccionado

  constructor(
    private selectedPackageService: SelectedPackageService,
    private colorInteriorService: ColorInteriorService,
    private selectedInteriorColorService: SelectedInteriorColorService
  ) { }

  ngOnInit() {
    const storedPackage = localStorage.getItem('selectedPackage');
    this.selectedPackage = storedPackage ? JSON.parse(storedPackage) : null;

    if (this.selectedPackage) {
      this.colorInteriorService
        .getIntColorByPackId(this.selectedPackage.id)
        .subscribe((colors) => {
          this.intColors = colors;
          if (colors && colors.length > 0) {
            const selectedIntColorItem = localStorage.getItem('selectedIntColor');
            const selectedIntColor = selectedIntColorItem ? JSON.parse(selectedIntColorItem) : null;
            const IntColorToSelect = selectedIntColor && colors.find(colors => colors.id === selectedIntColor.id) || colors[0];
            this.selectedColor = IntColorToSelect;
            localStorage.setItem('selectedIntColor', JSON.stringify(this.selectedColor));
          }
        });

    }
  }

  onColorClick(color: InteriorColor) {
    this.selectedColor = color; // Guarda el color seleccionado en la variable
    localStorage.setItem('selectedIntColor', JSON.stringify(color)); // Guarda el color seleccionado en localStorage
  }
}
