import { FormDataService } from './../../add-modelo/services/FormDataService.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { PedirCitaService } from './pedir-cita.service';
import { Component, OnInit } from '@angular/core';
import { Coche } from '../../administracion/interfaces/coche.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appoinments } from '../../administracion/interfaces/appoinments.interface';
import { dialogcitacomponent } from './dialogcita.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DialogErrorComponent } from './dialog-error/dialog-error.component';

@Component({
  selector: 'app-pedir-cita',
  templateUrl: './pedir-cita.component.html',
  styleUrls: ['./pedir-cita.component.css'],
})
export class PedirCitaComponent implements OnInit {
  Hours: any[] = [];
  HoursValue: string = '';
  dateSelected: boolean = false;
  coche: Coche[] = [];
  usuario = this.pedirCitaService.getnameUser();
  formAnswer: any[] = [];
  selectedCarId: number | null = null;
  blockedDates: Date[] = [];
  date: Date = new Date();
  showNotification = false;
  selectedCars: number[] = [];
  selectedHour: string = '';
  texto: string = '';
  dateString: string = '';
  cocheCita: Coche | undefined;
  isLoading: Boolean = false;
  isLoadingDialog: Boolean = false;

  showDialog = false;

  public pedirCitaForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private pedirCitaService: PedirCitaService,
    private formDataService: FormDataService,
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.checkActiveAppointment();
    this.pedirCitaService.getnameUser();

    this.pedirCitaService.getFullDays().subscribe((data) => {
      this.blockedDates = data.map((dateString) => new Date(dateString));
      this.isLoading = false;
    });

    this.pedirCitaService
      .getCarbyUser(this.pedirCitaService.getuserId())
      .subscribe((models: Coche[]) => {
        this.coche = models;
        this.selectCar(this.coche[0]);
      });

    this.pedirCitaForm = this.fb.group({
      fecha: ['', Validators.required],
      hora: [''],
      texto: [''],
    });

    if (!localStorage.getItem('reload')) {
      localStorage.setItem('reload', 'true');
      location.reload();
    } else {
      localStorage.removeItem('reload');
    }
  }

  selectCar(model: any) {
    this.selectedCars = [];

    if (!this.selectedCars.includes(model.id)) {
      // Si no está, añádelo
      this.selectedCars.push(model.id);

      this.formAnswer.push(model);

      this.selectedCarId = model.id;
    }
    this.cocheCita = model;
  }

  myFilter = (date: Date | null): boolean => {
    const day = (date || new Date()).getDay();
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const isBlockedDate = this.blockedDates.some(
      (blockedDate) =>
        date?.getDate() === blockedDate.getDate() &&
        date?.getMonth() === blockedDate.getMonth() &&
        date?.getFullYear() === blockedDate.getFullYear()
    );

    const isPastDate = date ? date < currentDate : false;

    // Prevent Saturday and Sunday from being selected, blocked dates, past dates, and dates before today.
    return day !== 0 && day !== 6 && !isBlockedDate && !isPastDate;
  };

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.Hours = [];
    if (event.value) {
      this.date = event.value;
    }
    if (this.date) {
      const dateString = `${this.date.getFullYear()}-${(
        '0' +
        (this.date.getMonth() + 1)
      ).slice(-2)}-${('0' + this.date.getDate()).slice(-2)}`; // Convert the date to 'yyyy-mm-dd' format
      this.pedirCitaService.getHours(dateString).subscribe((data) => {
        data.forEach((element) => {
          this.Hours.push(element);
        });
        this.dateSelected = true; // Indica que se ha seleccionado una fecha

        return this.Hours;
      });
    }
  }

  checkActiveAppointment() {
    this.pedirCitaService
      .getAppoinments()
      .subscribe((appointments: Appoinments[]) => {
        const userId = this.pedirCitaService.getuserId();
        const currentDate = new Date();

        // Asegúrate de que estás accediendo correctamente al ID del usuario
        const activeAppointment = appointments.find((appointment) => {
          const appointmentDate = new Date(appointment.date);
          const appointmentUserId = appointment.car.user.id;

          // Comprueba si la fecha de la cita es mayor que la fecha actual
          const isAppointmentDayPassed = appointmentDate < currentDate;

          return appointmentUserId === userId && !isAppointmentDayPassed;
        });
        console.log(activeAppointment);
        if (activeAppointment) {
          const dialogRef = this.dialog.open(dialogcitacomponent, {
            disableClose: true,
            data: {
              svg: 'error',
              title: 'Cita Activa',
              message: 'Ya tienes una cita activa.',
              message2: 'Te estamos redirigiendo a tu cuenta...',
            },
          });

          setTimeout(() => {
            dialogRef.close();
            this.router.navigate(['/cuenta']);
          }, 5000);

          dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
          });
        }
      });
  }

  formsValues() {
    let hora = this.pedirCitaForm.get('hora')?.value;
    let texto = this.pedirCitaForm.get('texto')?.value;
    let fecha = this.date;

    if (hora) {
      hora = hora.substring(0, 5);
      hora = hora + ':00';
    }
    if (this.date) {
      this.dateString = `${this.date.getFullYear()}-${(
        '0' +
        (this.date.getMonth() + 1)
      ).slice(-2)}-${('0' + this.date.getDate()).slice(-2)}`; // Convert the date to 'yyyy-mm-dd' format
    }

    this.selectedHour = hora;
    this.texto = texto;
    const postData = {
      date: this.dateString,
      time: hora,
      car: {
        id: this.selectedCars[0],
      },
    };

    this.showDialog = true;
    return postData;
  }

  sumbitForm() {
    this.isLoadingDialog = true;
    const url = environment.apiUrl;
    this.http.post(`${url}/appoinments/new`, this.formsValues()).subscribe(
      (response) => {
        console.log(response);

        this.showDialog = false;
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
          this.router.navigate(['/cuenta']);
        }, 2000);
        this.isLoadingDialog = false;
      },
      (error) => {
        this.showDialog = false;
        this.dialog.open(DialogErrorComponent, {
          data: {
            title: 'Error al pedir cita',
            message: error.error,
          },
        });
        this.isLoadingDialog = false;
      }
    );
  }
}
