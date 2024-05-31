import { ConstantPool } from '@angular/compiler';
import { Component, Inject } from '@angular/core';
import { Engine } from '../../configurador/engine-selection/interface/engine-interface';
import { environment } from '../../../environments/environment';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-edit-engine',
  templateUrl: './edit-engine.component.html',
})
export class EditEngineComponent {
  url = environment.apiUrl;
  motor: Engine[] = {} as Engine[];
  selectedMotor: any;
  engine: Engine = {} as Engine;
  fuelseleccionado: any;
  transSeleccionado: any;

  constructor(
    public dialogRef: MatDialogRef<EditEngineComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Engine[],
    public dialog: MatDialog,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.motor = this.data;
  }

  saveMotor() {
    const idSelected = this.selectedMotor.id;
    var Power : String = this.selectedMotor.power;
    const resp = {
      name: this.selectedMotor.name,
      price: this.selectedMotor.price,
      power: Power,
      transmission: this.transSeleccionado,
      consumption: this.selectedMotor.consumption,
      emission: this.selectedMotor.emission,
      description: this.selectedMotor.description,
      fuel: this.fuelseleccionado,
    };


    this.http.put(`${this.url}/engines/${idSelected}`, resp).subscribe(
      (data) => {
        console.log('Motor actualizado con éxito', data);
        this.dialogRef.close();
        this.snackBar.open(
          'El motor se ha actualizado correctamente.',
          'Cerrar',
          {
            duration: 3000, // Duración del mensaje en milisegundos
            horizontalPosition: 'right',
          }
        );
      },
      (error) => {
        console.error('Error al actualizar el motor', error);
      }
    );


  }

  selectMotor(index: number) {
    if (index) {
      this.selectedMotor = this.motor[index];
    } else {
      this.selectedMotor = this.motor[0];
    }
    this.fuelseleccionado = this.selectedMotor.fuel;
    this.transSeleccionado = this.selectedMotor.transmission;
    console.log(this.fuelseleccionado);
    console.log(this.transSeleccionado);
  }

  selectFuel(fuel: string) {
    this.fuelseleccionado = fuel;
    console.log(this.fuelseleccionado);
  }

  selectTrans(trans: string) {
    this.transSeleccionado = trans;
    console.log(this.transSeleccionado);
  }
  cancel() {
    this.dialogRef.close();
  }
}
