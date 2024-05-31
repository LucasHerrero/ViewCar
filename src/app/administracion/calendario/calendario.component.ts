

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { startOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { WeekDay } from '@angular/common';
import { subMonths, addMonths } from 'date-fns';
import { Pipe, PipeTransform } from '@angular/core';
import { addWeeks } from 'date-fns';
import { HttpClient } from '@angular/common/http';
import { Appoinments } from '../interfaces/appoinments.interface';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { ChangeDetectorRef, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventDialogComponent } from '../EventDialogComponent.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExtendedCalendarEvent } from './ExtendedCalendarEvent.interface';
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',

})
export class CalendarioComponent {
  isLoading: Boolean = false;
  CalendarView = CalendarView;
  showNewSection = false;

  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  weekStartsOn: WeekDay = WeekDay.Monday;
  refresh: Subject<void> = new Subject<void>();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        // Implement your edit logic here
        console.log('Edit event', event);
      }
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.refresh.next(); // Trigger refresh
      }
    }
  ];

  constructor(private http: HttpClient, @Inject(ChangeDetectorRef) private cdr: ChangeDetectorRef, public dialog: MatDialog, @Inject(NgbModal) private modal: NgbModal) {

  }
  ngOnInit() {
    this.isLoading = true;
    this.http.get<Appoinments[]>(`${environment.apiUrl}/appoinments`).subscribe(appointments => {
      this.events = appointments.map(appointment => {
        let [hours, minutes] = appointment.time.split(":").map(Number);
        hours = minutes >= 30 ? hours + 1 : hours; // Redondear a la hora más cercana
        let date = new Date(appointment.date);
        date.setHours(hours);

        let endDate = new Date(date); // Crear una nueva fecha para la hora de finalización
        endDate.setHours(hours + 1); // Añadir una hora a la hora de inicio


        return {
          start: date,
          end: endDate, // Añadir la hora de finalización al evento
          title: `Cita con ${appointment.car.user.firstName} con correo ${appointment.car.user.email}.`,
          nombre: `Nombre: ${appointment.car.user.firstName}`, // Acceder a firstName a través de Car
          correo: `Correo: ${appointment.car.user.email}`,
          hora: `Hora: ${appointment.time}`,
          brand: `Marca: ${appointment.car.model.brand.brandName}`,
          model: `Modelo: ${appointment.car.model.model}`,
          price: `Precio: ${appointment.car.price}`,
          id: `${appointment.car.id}`
           // Acceder a firstName a través de Car
        };
      });
      // Detectar cambios para actualizar la vista
      this.cdr.detectChanges();
      this.isLoading = false;
    });
  }



  toggleNewSection() {
    this.showNewSection = !this.showNewSection;
  }

  today() {
    this.viewDate = startOfDay(new Date());
  }

  next(): void {
    switch (this.view) {
      case CalendarView.Day:
        this.viewDate = addDays(this.viewDate, 1);
        break;
      case CalendarView.Week:
        this.viewDate = addWeeks(this.viewDate, 1);
        break;
      case CalendarView.Month:
        this.viewDate = addMonths(this.viewDate, 1);
        break;

    }
    this.activeDayIsOpen = false;
  }

  previous(): void {
    switch (this.view) {
      case CalendarView.Day:
        this.viewDate = addDays(this.viewDate, -1);
        break;
      case CalendarView.Week:
        this.viewDate = addWeeks(this.viewDate, -1);
        break;
      case CalendarView.Month:
        this.viewDate = addMonths(this.viewDate, -1);
        break;
      /*...*/
    }
    this.activeDayIsOpen = false;
  }

  setView(view: CalendarView) {
    this.view = view;

  }



  addEvent(): void {
    // Implement your logic to add new events
    console.log('Add new event');
  }


  events: ExtendedCalendarEvent[] = [];
  openDialog(event: ExtendedCalendarEvent): void {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '450px',
      data: {event: event}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Aquí puedes manejar lo que sucede después de que se cierra el diálogo
    });
  }


  eventClicked(event: CalendarEvent): void {
    this.openDialog(event);
  }



  activeDayIsOpen: boolean = false;


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
}
