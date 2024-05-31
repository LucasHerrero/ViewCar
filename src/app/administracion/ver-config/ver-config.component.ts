import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../cuenta/pages/configured-car/services/car.service';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-ver-config',
  templateUrl: './ver-config.component.html'
})
export class VerConfigComponent implements OnInit {

  car: any;
  isLoading: Boolean = false;
  currentImageIndex = 0;

  constructor(private carService: CarService, private route: ActivatedRoute) { }

 ngOnInit(): void {
  this.isLoading = true;
  let id = localStorage.getItem('idCocheCita');
  if (id !== null) {
    var lol = JSON.parse(id);
  }
  if (lol) {
    this.carService.getCarDetails(Number(lol)).subscribe(car => {
      this.car = car;
      localStorage.setItem('car', JSON.stringify(this.car));
      console.log('el car de configured-car.component.ts es: ', this.car);
      this.isLoading = false;
    });
  }
 } // ngOnInit

    // Controles para el carrusel de imágenes
  nextImage() {
    if (this.currentImageIndex < this.car.pack.imageList.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0; // Vuelve al inicio cuando llega al final
    }
  }

  previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.car.pack.imageList.length - 1; // Vuelve al final cuando llega al inicio
    }
  }

}
