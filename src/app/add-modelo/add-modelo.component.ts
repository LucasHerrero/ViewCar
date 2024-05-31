import { Component } from '@angular/core';
import { MarcaComponent } from './marca/marca.component';
import { Type } from '@angular/core';
import { FormStateService } from './services/FormStateService.service';
import { ModeloComponent } from './modelo/modelo.component';
import { PaqueteComponent } from './paquete/paquete.component';
import { MotorComponent } from './motor/motor.component';
import { ColorInteriorComponent } from './color-interior/color-interior.component';
import { ColorExteriorComponent } from './color-exterior/color-exterior.component';
import { LlantaComponent } from './llanta/llanta.component';
import { HttpClient } from '@angular/common/http';
import { EnvioComponent } from './envio/envio.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import { FormDataService } from './services/FormDataService.service';
import { ModelSummaryService } from './services/ModelSummaryService.service';
import { AdministracionService } from '../administracion/administracion.service';
import { DialogComponent } from './dialog/dialog.component';

interface BrandResponse {
  id: string;
}
@Component({
  selector: 'app-add-modelo',
  templateUrl: './add-modelo.component.html',
})
export class AddModeloComponent {
  stepsData: any[] = [];
  showLoader: Boolean = false;

  createComponent(step: number): Type<unknown> {
    switch (step) {
      case 0:
        return MarcaComponent;
      case 1:
        return ModeloComponent;
      case 2:
        return PaqueteComponent;
      case 3:
        return MotorComponent;
      case 4:
        return ColorExteriorComponent;
      case 5:
        return ColorInteriorComponent;
      case 6:
        return LlantaComponent;
      case 7:
        return EnvioComponent;
      default:
        throw new Error(`Invalid step: ${step}`);
    }
  }

  constructor(
    private formState: FormStateService,
    private http: HttpClient,
    private formStateService: FormStateService,
    private formDataService: FormDataService,
    private modelSummaryService: ModelSummaryService,
    private administracionService: AdministracionService,
    public dialog: MatDialog
  ) {}

  next() {
    // Comprueba si los campos de la marca están vacíos
    if (this.formState.currentStepFn() === 0 && this.isBrandFieldsEmpty()) {
      return;
    }

    // Guarda la información del paso actual antes de avanzar al siguiente paso
    switch (this.formState.currentStepFn()) {
      case 0:
        this.sendDataBrand();
        break;
      case 1:
        this.sendDataModel();
        break;
      case 2:
        this.sendDataPackage();
        break;
      case 3:
        this.sendDataMotor();
        break;
      case 4:
        this.sendDataColorExterior();
        break;
      case 5:
        this.sendDataColorInterior();
        break;
      case 6:
        this.sendDataTire();
        break;
      case 7:
        this.submitForm();
        return;
      default:
        console.error('Paso desconocido.');
        return;
    }

    this.formState.nextStep();
  }

  previous() {
    this.formState.previousStep();
  }

  currentStep() {
    return this.formState.currentStepFn();
  }

  isBrandFieldsEmpty(): boolean {
    // Obtiene los datos de la marca del servicio FormDataService
    const brandName = this.formDataService.getField('inputValue1');
    const brandImage = this.formDataService.getField('inputValue2');

    // Si brandName no es 'Add', comprueba si los campos inputValue1 e inputValue2 están vacíos
    return !brandName || brandName.trim() === '' || !brandImage;
  }

  isModelFieldsEmpty(): boolean {
    // Obtiene los datos del modelo del servicio FormDataService
    const modelName = this.formDataService.getField('inputValue3');
    const modelPrice = this.formDataService.getField('inputValue5');
    const modelEmission = this.formDataService.getField('inputValue6');
    const modelFuel = this.formDataService.getField('inputValue7');
    const modelImage = this.formDataService.getField('inputValue4');

    // Comprueba si los datos del modelo están vacíos
    return (
      !modelName ||
      modelName.trim() === '' ||
      !modelPrice ||
      modelPrice.trim() === '' ||
      !modelEmission ||
      modelEmission.trim() === '' ||
      !modelFuel ||
      modelFuel.trim() === '' ||
      !modelImage
    );
  }

  isPackageFieldsEmpty(): boolean {
    // Obtiene los datos del paquete del servicio FormDataService
    const packageName = this.formDataService.getField('inputValue8');
    const packagePrice = this.formDataService.getField('inputValue10');
    const packageHeadlights = this.formDataService.getField('inputValue11');
    const packageBodywork = this.formDataService.getField('inputValue12');
    const packageSeats = this.formDataService.getField('inputValue13');
    const packageDescription = this.formDataService.getField('inputValue14');
    const packageImage = this.formDataService.getField('inputValue9');

    // Comprueba si los datos del paquete están vacíos
    return (
      !packageName ||
      packageName.trim() === '' ||
      !packagePrice ||
      packagePrice.trim() === '' ||
      !packageHeadlights ||
      packageHeadlights.trim() === '' ||
      !packageBodywork ||
      packageBodywork.trim() === '' ||
      !packageSeats ||
      packageSeats.trim() === '' ||
      !packageDescription ||
      packageDescription.trim() === '' ||
      !packageImage
    );
  }

  isMotorFieldsEmpty(): boolean {
    // Obtiene los datos del motor del servicio FormDataService
    const motorName = this.formDataService.getField('inputValue15');
    const motorPrice = this.formDataService.getField('inputValue17');
    const motorPower = this.formDataService.getField('inputValue18');
    const motorFuel = this.formDataService.getField('inputValue19');
    const motorEmission = this.formDataService.getField('inputValue20');
    const motorConsumption = this.formDataService.getField('inputValue21');
    const motorTransmission = this.formDataService.getField('inputValue22');
    const motorDescription = this.formDataService.getField('inputValue23');

    // Comprueba si los datos del motor están vacíos
    return (
      !motorName ||
      motorName.trim() === '' ||
      !motorPrice ||
      motorPrice.trim() === '' ||
      !motorPower ||
      motorPower.trim() === '' ||
      !motorFuel ||
      motorFuel.trim() === '' ||
      !motorEmission ||
      motorEmission.trim() === '' ||
      !motorConsumption ||
      motorConsumption.trim() === '' ||
      !motorTransmission ||
      motorTransmission.trim() === '' ||
      !motorDescription ||
      motorDescription.trim() === ''
    );
  }

  isExtColorFieldsEmpty(): boolean {
    // Obtiene los datos del color exterior del servicio FormDataService
    const extColorName = this.formDataService.getField('inputValue24');
    const extColorPrice = this.formDataService.getField('inputValue25');
    const extColorImage1 = this.formDataService.getField('inputValue26');
    const extColorImage2 = this.formDataService.getField('inputValue27');

    console.log(extColorName, extColorPrice, extColorImage1, extColorImage2);

    // Comprueba si los datos del color exterior están vacíos
    return (
      !extColorName ||
      extColorName.trim() === '' ||
      !extColorPrice ||
      extColorPrice.trim() === '' ||
      !extColorImage1 ||
      !extColorImage2
    );
  }

  isIntColorFieldsEmpty(): boolean {
    // Obtiene los datos del color interior del servicio FormDataService
    const intColorName = this.formDataService.getField('inputValue28');
    const intColorPrice = this.formDataService.getField('inputValue29');
    const intColorImage1 = this.formDataService.getField('inputValue30');
    const intColorImage2 = this.formDataService.getField('inputValue31');

    // Comprueba si los datos del color interior están vacíos
    return (
      !intColorName ||
      intColorName.trim() === '' ||
      !intColorPrice ||
      intColorPrice.trim() === '' ||
      !intColorImage1 ||
      !intColorImage2
    );
  }

  isTireFieldsEmpty(): boolean {
    // Obtiene los datos de la llanta del servicio FormDataService
    const tireName = this.formDataService.getField('inputValue32');
    const tirePrice = this.formDataService.getField('inputValue33');
    const tireInches = this.formDataService.getField('inputValue36');
    const tireMat = this.formDataService.getField('inputValue37');
    const tireColor = this.formDataService.getField('inputValue38');
    const tireDescription = this.formDataService.getField('inputValue39');
    const tireImage1 = this.formDataService.getField('inputValue34');
    const tireImage2 = this.formDataService.getField('inputValue35');

    // Comprueba si los datos de la llanta están vac��os
    return (
      !tireName ||
      tireName.trim() === '' ||
      !tirePrice ||
      tirePrice.trim() === '' ||
      !tireInches ||
      tireInches.trim() === '' ||
      !tireMat ||
      tireMat.trim() === '' ||
      !tireColor ||
      tireColor.trim() === '' ||
      !tireDescription ||
      tireDescription.trim() === '' ||
      !tireImage1 ||
      !tireImage2
    );
  }

  sendDataBrand() {
    if (this.formStateService.currentStepFn() === 0) {
      const data = {
        brandName: this.formDataService.getField('inputValue1'), // Usa FormDataService en lugar de localStorage
        brandImage: this.formDataService.getField('inputValue2'), // Usa FormDataService en lugar de localStorage
      };

     this.stepsData.push({
        data: data,
      });
    }
  }

  sendDataModel() {
    if (this.formStateService.currentStepFn() === 1) {
      const data = {
        modelName: this.formDataService.getField('inputValue3'),
        modelImage: this.formDataService.getField('inputValue4'),
        modelPrice: this.formDataService.getField('inputValue5'),
        modelEmission: this.formDataService.getField('inputValue6'),
        modelFuel: this.formDataService.getField('inputValue7'),
      };
      this.stepsData.push({
        data: data,
      });
    }
  }

  sendDataPackage() {
    if (this.formStateService.currentStepFn() === 2) {
      const data = {
        packageName: this.formDataService.getField('inputValue8'),
        packageImage: this.formDataService.getField('inputValue9'),
        packagePrice: this.formDataService.getField('inputValue10'),
        packageHeadlights: this.formDataService.getField('inputValue11'),
        packageBumper: this.formDataService.getField('inputValue8'),
        packageBodywork: this.formDataService.getField('inputValue12'),
        packageSeats: this.formDataService.getField('inputValue13'),
        packageDescription: this.formDataService.getField('inputValue14'),
      };

      this.stepsData.push({
        data: data,
      });

      console.log(this.stepsData);
    }
  }

  sendDataMotor() {
    if (this.formStateService.currentStepFn() === 3) {
      const data = {
        engineName: this.formDataService.getField('inputValue15'),
        enginePrice: this.formDataService.getField('inputValue17'),
        enginePower: this.formDataService.getField('inputValue18'),
        engineFuel: this.formDataService.getField('inputValue19'),
        engineEmission: this.formDataService.getField('inputValue20'),
        engineConsumption: this.formDataService.getField('inputValue21'),
        engineTransmission: this.formDataService.getField('inputValue22'),
        engineDescription: this.formDataService.getField('inputValue23'),
      };

      this.stepsData.push({
        data: data,
      });
      console.log(this.stepsData);
    }
  }

  sendDataColorExterior() {
    if (this.formStateService.currentStepFn() === 4) {
      const data = {
        exteriorColorName: this.formDataService.getField('inputValue24'),
        exteriorColorPrice: this.formDataService.getField('inputValue25'),
        exteriorColorCirculo: this.formDataService.getField('inputValue26'),
        exteriorColorImage: this.formDataService.getField('inputValue27'),
      };

      this.stepsData.push({
        data: data,
      });
    }
  }

  sendDataColorInterior() {
    if (this.formStateService.currentStepFn() === 5) {
      const data = {
        interiorColorName: this.formDataService.getField('inputValue28'),
        interiorColorPrice: this.formDataService.getField('inputValue29'),
        interiorColorCirculo: this.formDataService.getField('inputValue30'),
        interiorColorImage: this.formDataService.getField('inputValue31'),
      };

      this.stepsData.push({
        data: data,
      });
    }
  }

  sendDataTire() {
    if (this.formStateService.currentStepFn() === 6) {
      const data = {
        tireName: this.formDataService.getField('inputValue32'),
        tireCirculo: this.formDataService.getField('inputValue33'),
        tireImage: this.formDataService.getField('inputValue34'),
        tirePrice: this.formDataService.getField('inputValue35'),
        tireInches: this.formDataService.getField('inputValue36'),
        tireMaterial: this.formDataService.getField('inputValue37'),
        tireColor: this.formDataService.getField('inputValue38'),
        tireDescription: this.formDataService.getField('inputValue39'),
      };

      console.log(data);

      this.stepsData.push({
        data: data,
      });

      console.log(this.stepsData)
    }
  }

  submitForm() {
    this.sendDataTire();
    this.showLoader = true; // Muestra el loader

    // Crear un objeto vacío para almacenar todos los datos
    let allData = {};

    // Iterar sobre stepsData y agregar cada objeto de datos a allData
    this.stepsData.forEach(step => {
      allData = { ...allData, ...step.data };
    });

    this.modelSummaryService.updateModelSummary(allData);

    // Ahora puedes enviar allData a tu endpoint
    const url = environment.apiUrl + '/models/full';
    this.http.post(url, allData).subscribe(
      (response: any) => {
        console.log(response);
        if (response) {
          this.showLoader = false; // Oculta el loader
          this.dialog.open(DialogComponent, {
            data: { title: 'Guardado exitoso', message: 'El modelo se ha guardado correctamente.', svg: 'success' },
            disableClose: true,
          });
        }
      },
      (error) => {
        this.showLoader = false; // Oculta el loader
        console.error(error);
        this.dialog.open(DialogComponent, {
          data: { title: 'Problema al guardar', message: 'No se ha guardado el modelo.', svg: 'error' },
          disableClose: true,
        });
      }
    );
  }

  onDeleteModelClicked() {
    this.administracionService.changeState('deleteModelo');
  }
}
