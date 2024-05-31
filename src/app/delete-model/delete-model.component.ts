import { id } from 'date-fns/locale';
import { Model } from './../models/interfaces/model.interface';
import { Component } from '@angular/core';
import { ModelService } from '../models/service/models.service';
import { DeleteModelService } from './delete-model.service';
import { Package } from '../configurador/package-selection/interface/package.interface';
import { EditModalsService } from './edit-modals.service';
import { MatDialog } from '@angular/material/dialog';
import { AdministracionService } from '../administracion/administracion.service';

@Component({
  selector: 'app-delete-model',
  templateUrl: './delete-model.component.html',
})
export class DeleteModelComponent {
  models: Model[] = [];
  isLoading: Boolean = false;
  modalTrue: boolean = false;
  //ARRIBA DAR DE ALTA
  //ABAJO GESTION MODELOS
  Modelo: Model = {} as Model;
  ModeloCopia: Model = {} as Model;
  ShowModal: boolean = false;
  ShowTable: boolean = false;
  EditModelo: boolean = false;
  //Paquete
  EditPaquete: boolean = false;
  public Paquete: Package[] = {} as Package[];
  public lenghtPaquete = 0;
  selectedPaquete: any;

  //HASTA AQUI GESTION MODELOS

  constructor(
    public modelService: ModelService,
    public deleteModelService: DeleteModelService,
    public editModalsService: EditModalsService,
    public dialog: MatDialog,
    public administracionService: AdministracionService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.modelService.getModels().subscribe((models: Model[]) => {
      this.models = models;
      this.isLoading = false;
    });
  }

  updateStatus(id: number, newStatus: string) {
    const model = this.models.find((m) => m.id === id);

    if (model) {
      model.isUpdating = true;
      this.deleteModelService
        .updateStatus(id, newStatus)
        .subscribe((updatedModel: Model) => {
          // Update the model in the component state
          const index = this.models.findIndex((m) => m.id === updatedModel.id);
          this.models[index] = updatedModel;
          model.isUpdating = false;
        });
    }
  }
  //ARRIBA DAR DE ALTA Y BAJA
  
  //ABAJO GESTION DE MODELOS
  editModelPick(model: Model) {
    this.administracionService.changeState('editModelo');
    this.administracionService.selectedModel(model);
  }

  //ABAJO GESTION PAQUETE
  editPakcageForm() {
    this.EditPaquete = true;
  }

  savePackage() {}


  selectPaquete(index: number) {
    if (index) {
      this.selectedPaquete = this.Paquete[index];
    } else {
      this.selectedPaquete = this.Paquete[0];
    }
  }
}
