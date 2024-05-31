import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedirCitaComponent } from './pedir-cita.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogErrorComponent } from './dialog-error/dialog-error.component';


@NgModule({
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule

  ],
  providers: [provideNativeDateAdapter()],
  declarations: [PedirCitaComponent, DialogErrorComponent]
})
export class PedirCitaModule { }
