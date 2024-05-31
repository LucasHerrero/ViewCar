import { Car } from './pages/configured-car/interface/car.interface';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../shared/services/auth-service.service';
import { CustomJwtPayload } from '../shared/interfaces/CustomJwtPayload.interface';
import { CarService } from './pages/configured-car/services/car.service';
import { ConfiguredCar } from './pages/configured-car/interface/configuredCar.interface';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
})

export class CuentaComponent {
  usuario!: CustomJwtPayload;
  configuredCars: ConfiguredCar[] = [];
  isLoading: Boolean = false;


  constructor(
    private authService: AuthService,
    private carService: CarService,
    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.usuario = this.authService.decodedToken as CustomJwtPayload;

    this.carService.getCarByUserId(this.usuario.id).pipe(finalize(() => this.isLoading = false)).subscribe(car => {

      console.table(car);
      this.configuredCars = Array.isArray(car) ? car : [car];
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  logout() {
    this.authService.logout();
  }

  getCarStatus(car: ConfiguredCar) {
    return car.model?.status === 'inactive' ? 'inactive' : '';
  }
}

