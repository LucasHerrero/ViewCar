import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { ExtendedCalendarEvent } from './calendario/ExtendedCalendarEvent.interface';
import { AdministracionService } from './administracion.service';
@Component({
  templateUrl: './EventDialogComponent.component.html',
})

export class EventDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {event: ExtendedCalendarEvent},
    private administracionService: AdministracionService
  ) {}

  ngOnInit() {
    this.saveToLocalStorage();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  saveToLocalStorage() {
    // Convierte el objeto data a una cadena JSON
    const dataString = JSON.stringify(this.data.event.id);

    // Guarda la cadena JSON en el localStorage
    localStorage.setItem('idCocheCita', dataString);
  }

  prueba() {
    this.dialogRef.close();
    this.administracionService.changeState('verConfig');
  }
}
