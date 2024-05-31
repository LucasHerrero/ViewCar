import { PopupService } from '../../popup/service/popup.service';
import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../services/resume.service';
import { FormStateService } from '../services/formStateService.service';
import { ConfiguradorComponent } from '../configurador.component';
import { CarService } from '../../cuenta/pages/configured-car/services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth-service.service';
import { LoginComponent } from '../../shared/components/login/login.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfiguredCar } from '../../cuenta/pages/configured-car/interface/configuredCar.interface';
import { RouterModule } from '@angular/router';
import { FinanciacionPageComponent } from '../../financiacion/components/financiacion-page/financiacion-page.component';
import { FinancingService } from '../../financiacion/service/financiacion.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
})
export class ResumeComponent implements OnInit {
  carParts: any;
  totalPrice: number | null = 0;
  showInfo = false;
  currentImageIndex = 0;
  selectedImageList: string[] = [];
  configuredCar: any;
  user: number = 0;
  creationDate: Date | null = new Date();
  car: any;
  financingData: any;

  constructor(
    private resumeService: ResumeService,
    private formStateService: FormStateService,
    private configuradorComponent: ConfiguradorComponent,
    private CarService: CarService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private PopupService: PopupService,
    public dialog: MatDialog,
    private financingService: FinancingService
  ) {}

  ngOnInit() {
    this.carParts = this.resumeService.getCarParts();
    const total = this.getTotalPrice();
    this.totalPrice = isNaN(total) ? 0 : total;
    this.selectedImageList = this.carParts.selectedExtColor.imageList;
    this.user = this.authService.getUserId();

    this.configuredCar = {
      brand: { id: this.carParts.selectedBrand.id },
      model: { id: this.carParts.selectedModel.id },
      pack: { id: this.carParts.selectedPackage.id },
      engine: { id: this.carParts.selectedEngine.id },
      extColor: { id: this.carParts.selectedExtColor.id },
      intColor: { id: this.carParts.selectedIntColor.id },
      tire: { id: this.carParts.selectedTires.id },
      price: this.totalPrice,
      user: { id: this.user },
    };

    this.financingService.financingData$.subscribe((financingData) => {
      this.financingData = financingData;
    });
  } // Fin ngOnInit

  getTotalPrice() {
    let total = 0;

    if (this.carParts.selectedModel.price) {
      total += Number(this.carParts.selectedModel.price);
    }

    if (this.carParts.selectedPackage.price) {
      total += Number(this.carParts.selectedPackage.price);
    }

    if (this.carParts.selectedEngine.price) {
      total += Number(this.carParts.selectedEngine.price);
    }

    if (this.carParts.selectedExtColor) {
      total += Number(this.carParts.selectedExtColor.price);
    }

    if (this.carParts.selectedIntColor.price) {
      total += Number(this.carParts.selectedIntColor.price);
    }

    if (this.carParts.selectedTires.price) {
      total += Number(this.carParts.selectedTires.price);
    }

    return total;
  }

  setStep(step: number) {
    this.formStateService.currentClickfn(step);
    this.configuradorComponent.breadCrubBtn();
  }

  infoPackage(): void {
    this.showInfo = !this.showInfo;
  }

  // Separa la descripción del paquete en elementos individuales, para poder formatearlos.
  getDescriptionItems() {
    return this.carParts.selectedPackage.description.split(',');
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

  saveConfigCar() {
    let car = this.configuredCar;
    if (this.isLoggedIn()) {
      localStorage.setItem('car', JSON.stringify(car));
      if (car) {
        this.CarService.insertCar(this.configuredCar).subscribe(() => {
          this.PopupService.showPopup();
        });
      }
    } else {
      // Muestra el pop-up de inicio de sesión
      this.openDialogLogin();
    }
    localStorage.setItem('fromSaveConfigCar', 'true');
  }

  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token;
  }

  onButtonClick() {
    if (this.isLoggedIn()) {
      let car = this.configuredCar;

      localStorage.setItem('car', JSON.stringify(car));
      if (car) {
        this.CarService.insertCarWithoutPopup(this.configuredCar).subscribe(
          () => {
            // Navega a '/pedir-cita' y luego recarga la página
            this.router.navigate(['/pedir-cita']).then(() => {
              location.reload();
            });
          }
        );
      }
    } else {
      // Muestra el pop-up de inicio de sesión
      this.openDialogLogin();
    }
  }

  openDialogLogin() {
    let dialogLogin;
    let dialogWidth = window.matchMedia('(max-width: 768px)').matches
      ? '90%'
      : '60%';

    dialogLogin = this.dialog.open(LoginComponent, {
      maxWidth: '100%',
      height: 'auto',
      width: dialogWidth,
      maxHeight: '90vh',
    });
  }

  showFinancing() {
    const dialogConfig = new MatDialogConfig();

    // Se cierra el modal al hacer clic fuera de él
    dialogConfig.disableClose = false;

    // Establece datos para el modal
    dialogConfig.data = { totalPrice: this.totalPrice };

    const dialogRef = this.dialog.open(FinanciacionPageComponent, dialogConfig);

    dialogRef.afterOpened().subscribe(() => {
      document
        .querySelector('.cdk-overlay-backdrop')
        ?.classList.add('bg-black/30', 'backdrop-blur-sm');
    });

    dialogRef.afterClosed().subscribe(() => {
      document
        .querySelector('.cdk-overlay-backdrop')
        ?.classList.remove('bg-black/30', 'backdrop-blur-sm');
    });
  }

  isFinancingDataAvailable() {
    const financingData = localStorage.getItem('financingData');
    if (financingData) {
      this.financingData = JSON.parse(financingData);
      const tieneAtributosNulos = Object.values(this.financingData).some(
        (valor) => valor === null
      );
      if (tieneAtributosNulos) {
        console.log('El objeto financingData tiene al menos un atributo null');
        return false;
      }
      return true;
    }
    return false;
  }
}
