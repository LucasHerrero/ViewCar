import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanciacionPageComponent } from './components/financiacion-page/financiacion-page.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FinanciacionPageComponent,

  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  exports: [
    FinanciacionPageComponent
  ]
})
export class FinanciacionModule { }
