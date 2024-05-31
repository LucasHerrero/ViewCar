import { Component, OnInit } from '@angular/core';

import { SelectedTireService } from '../../services/selected-tire.service';
import { TireService } from '../service/tire.service';

import { Tire } from '../interface/tire.interface';
import { Package } from '../../package-selection/interface/package.interface';

@Component({
  selector: 'app-tire-selection',
  templateUrl: './tire-selection.component.html',
})
export class TireSelectionComponent implements OnInit {
  tires: Tire[] = [];
  selectedTire: Tire | null = null;
  selectedPackage: Package | null = null;
  selectedImageList: string[] = [];
  showDescription = false;
  currentImageIndex: number = 0;

  constructor(
    private selectedTireService: SelectedTireService,
    private tireService: TireService
  ) { }

  ngOnInit(): void {
    // Se ejecuta al cargar el componente
    // Obtiene el paquete seleccionado del localStorage.
    const storedPackage = localStorage.getItem('selectedPackage');
    // si existe el paquete, lo convierte de cadena json a objeto y lo asigna a selectedPackage.
    this.selectedPackage = storedPackage ? JSON.parse(storedPackage) : null;

    if (this.selectedPackage) {
      // se llama al servicio para obtener las llantas del paquete seleccionado.
      this.tireService
        .getTireByPackId(this.selectedPackage.id)
        .subscribe((tires) => {
          this.tires = tires;
          if (tires && tires.length > 0) {
            const selectedTireItem = localStorage.getItem('selectedTire');
            const selectedTire = selectedTireItem ? JSON.parse(selectedTireItem) : null;
            const tireToSelect = selectedTire && tires.find(tire => tire.id === selectedTire.id) || tires[0];

            this.selectedTire = tireToSelect;
            localStorage.setItem('selectedTire', JSON.stringify(this.selectedTire));
            this.currentImageIndex = 0;
          }
        });
    }
  }

  onTireClick(tire: Tire) {
    this.selectedTire = tire;
    this.currentImageIndex = 0; // Establece el índice de la imagen actual a 0 cuando se selecciona una nueva llanta
    localStorage.setItem('selectedTire', JSON.stringify(tire)); // Guarda la llanta seleccionada en localStorage
  }

  getLocalStorageImageList() {
    let selectedTire = JSON.parse(localStorage.getItem('selectedTire') || '{}');
    this.selectedImageList = selectedTire.image;
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

  // Muestra u oculta la descripción de la llanta
  infoTire(tire: Tire): void {
    this.showDescription = !this.showDescription;
  }


  getDescriptionItems(tire: any) {
    return tire.description.split(',');
  }
}
