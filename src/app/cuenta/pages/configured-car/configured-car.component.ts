import { Component, OnInit } from '@angular/core';
import { CarService } from './services/car.service';
import { ActivatedRoute } from '@angular/router';
import { ResumeComponent } from '../../../configurador/resume/resume.component';

@Component({
  selector: 'cuenta-configured-car',
  templateUrl: './configured-car.component.html',
})
export class ConfiguredCarComponent implements OnInit {

  car: any;
  isLoading: Boolean = false;
  currentImageIndex = 0;

  constructor(private carService: CarService, private route: ActivatedRoute) { }

 ngOnInit(): void {
  this.isLoading = true;
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.carService.getCarDetails(Number(id)).subscribe(car => {
      this.car = car;
      localStorage.setItem('car', JSON.stringify(this.car));
      console.log('el car de configured-car.component.ts es: ', this.car);
      this.isLoading = false;
    });
  }

    // Hacer que la página se recargue al volver a ella.
    if (!localStorage.getItem('reload')) {
      localStorage.setItem('reload', 'true');
      location.reload();
    } else {
      localStorage.removeItem('reload');
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


