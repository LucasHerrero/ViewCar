import { Pipe, PipeTransform } from '@angular/core';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { es } from 'date-fns/locale';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(viewDate: Date, view: string): string {
    switch (view) {
      case 'day':
        return format(viewDate, 'EEEE, d \'de\' MMMM \'de\' yyyy', { locale: es });
      case 'week':
        const start = format(startOfWeek(viewDate, { weekStartsOn: 1 }), 'd MMMM', { locale: es });
        const end = format(endOfWeek(viewDate, { weekStartsOn: 1 }), 'd MMMM yyyy', { locale: es });
        return `${start} - ${end}`;
      case 'month':
        const startMonth = format(startOfMonth(viewDate), 'd MMMM', { locale: es });
        const endMonth = format(endOfMonth(viewDate), 'd MMMM yyyy', { locale: es });
        return `${startMonth} - ${endMonth}`;
      default:
        return '';
    }
  }
}
