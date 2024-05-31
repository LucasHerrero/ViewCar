import { CalendarEvent } from 'angular-calendar';

export interface ExtendedCalendarEvent extends CalendarEvent {
  nombre?: string;
  correo?: string;
  hora?: string;
  model?: string;
  brand?: string;
  price?: string;

}
