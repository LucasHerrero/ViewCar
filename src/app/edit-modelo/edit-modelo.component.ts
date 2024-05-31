import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../environments/environment.prod';
import { AdministracionService } from '../administracion/administracion.service';
import { Package } from '../configurador/package-selection/interface/package.interface';
import { EditPackageComponent } from '../edit-modelo/edit-package/edit-package.component';
import { Model } from '../models/interfaces/model.interface';
import { EditModelComponent } from './edit-model/edit-model.component';
import { EditIntcolorComponent } from './edit-intcolor/edit-intcolor.component';
import { InteriorColor } from '../configurador/interior-color-selection/interfaces/interior-color.interface';
import { EditExtcolorComponent } from './edit-extcolor/edit-extcolor.component';
import { ExteriorColor } from '../configurador/exterior-color-selection/interface/exterior-color.interface';
import { EditTiresComponent } from './edit-tires/edit-tires.component';
import { Tire } from '../configurador/tire-selection/interface/tire.interface';
import { EditEngineComponent } from './edit-engine/edit-engine.component';
import { Engine } from '../configurador/engine-selection/interface/engine-interface';

@Component({
  selector: 'app-edit-modelo',
  templateUrl: './edit-modelo.component.html',
})
export class EditModeloComponent {
  modelo: Model = {} as Model;
  ModeloCopia: Model = {} as Model;
  package: Package[] = {} as Package[];
  engine: Engine[] = {} as Engine[];

  intColor: InteriorColor[] = {} as InteriorColor[];
  extColor: ExteriorColor[] = {} as ExteriorColor[];
  tires: Tire[] = {} as Tire[];
  isLoading: boolean = false;
  url = environment.apiUrl;

  constructor(
    public dialog: MatDialog,
    public administracionService: AdministracionService,
    public http: HttpClient
  ) {}

  // Obtener la informacion de modelo de la api
  ngOnInit() {
    this.administracionService.currentModel$.subscribe((model) => {
      this.modelo = model;

      this.http
        .get<Package[]>(`${this.url}/packages/model/${this.modelo.id}`)
        .subscribe(
          (data) => {
            this.package = data;
            console.log('Paquete obtenido con éxito', data);
            this.isLoading = false;
          },
          (error) => {
            console.error('Error al obtener el paquete', error);
            this.isLoading = false;
          }
        );

      // Relizar peticion get para obtener el motor
      this.http
        .get<Engine[]>(`${this.url}/engines/model/${this.modelo.id}`)
        .subscribe(
          (data) => {
            this.engine = data;
            console.log('Motor obtenido con éxito', data);
            this.isLoading = false;
          },
          (error) => {
            console.error('Error al obtener el motor', error);
          }
        );

      // Realiza la petición GET de los colores exteriores
      this.http
        .get<ExteriorColor[]>(`${this.url}/extcolor/model/${this.modelo.id}`)
        .subscribe(
          (data) => {
            this.extColor = data;
            console.log('Color exterior obtenido con éxito', data);
            this.isLoading = false;
          },
          (error) => {
            console.error('Error al obtener el color exterior', error);
            this.isLoading = false;
          }
        );

      // Realiza la petición GET de las llantas
      this.http
        .get<Tire[]>(`${this.url}/tires/model/${this.modelo.id}`)
        .subscribe(
          (data) => {
            this.tires = data;
            console.log('Llantas obtenidas con éxito', data);
            this.isLoading = false;
          },
          (error) => {
            console.error('Error al obtener las llantas', error);
            this.isLoading = false;
          }
        );

      this.http
        .get<InteriorColor[]>(`${this.url}/intcolor/model/${this.modelo.id}`)
        .subscribe(
          (data) => {
            this.intColor = data;
            console.log('Color interior obtenido con éxito', data);
            this.isLoading = false;
          },
          (error) => {
            console.error('Error al obtener el color interior', error);
            this.isLoading = false;
          }
        );
    });
  }

  editEngineForm() {
    console.log(this.engine);
    this.dialog.open(EditEngineComponent, {
      data: this.engine,
    });
  }

  editModelForm() {
    console.log(this.modelo);
    this.dialog.open(EditModelComponent, {
      data: this.modelo,
    });
  }

  editPackageForm() {
    console.log(this.package);
    this.dialog.open(EditPackageComponent, {
      data: this.package,
    });
  }

  editIntcolorForm() {
    console.log(this.intColor);
    this.dialog.open(EditIntcolorComponent, {
      data: this.intColor,
    });
  }
  editExtColorForm() {
    console.log(this.extColor);
    this.dialog.open(EditExtcolorComponent, {
      data: this.extColor,
    });
  }

  volver() {
    this.administracionService.changeState('deleteModelo');
  }

  editTiresForm() {
    console.log(this.tires);
    this.dialog.open(EditTiresComponent, {
      data: this.tires,
    });
  }
}
