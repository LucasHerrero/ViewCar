import {
  AfterViewInit,
  Component,
  ElementRef,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import { BrandSelectionComponent } from './brand-selection/brand-selection.component';
import { EngineSelectionComponent } from './engine-selection/engine-selection.component';
import { ModelSelectionComponent } from './model-selection/model-selection.component';
import { PackageSelectionComponent } from './package-selection/package-selection.component';
import { ExteriorColorSelectionComponent } from './exterior-color-selection/exterior-color-selection.component';
import { InteriorColorSelectionComponent } from './interior-color-selection/interior-color-selection.component';
import { TireSelectionComponent } from './tire-selection/components/tire-selection.component';
import { ResumeComponent } from './resume/resume.component';

import { FormStateService } from './services/formStateService.service';
import { SelectedBrandService } from './services/selected-brand.service';
import { SelectedEngineService } from './services/selected-engine.service';
import { SelectedModelService } from './services/selected-model.service';
import { SelectedPackageService } from './services/selected-package.service';
import { SelectedExteriorColorService } from './services/selected-exterior-color.service';
import { SelectedInteriorColorService } from './services/selected-interior-color.service';
import { SelectedTireService } from './services/selected-tire.service';

@Component({
  selector: 'app-configurador',
  templateUrl: './configurador.component.html',
})
export class ConfiguradorComponent implements AfterViewInit {
  @ViewChild('botonSiguiente', { static: true }) botonSiguiente!: ElementRef;
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  private createComponent(step: number): Type<unknown> {
    switch (step) {
      case 0:
        return BrandSelectionComponent;
      case 1:
        return ModelSelectionComponent;
      case 2:
        return PackageSelectionComponent;
      case 3:
        return EngineSelectionComponent;
      case 4:
        return ExteriorColorSelectionComponent;
      case 5:
        return InteriorColorSelectionComponent;
      case 6:
        return TireSelectionComponent;
      case 7:
        return ResumeComponent;
      default:
        throw new Error(`Invalid step: ${step}`);
    }
  }

  constructor(
    private formState: FormStateService,
    private cdRef: ChangeDetectorRef,
    private selectedBrandService: SelectedBrandService,
    private selectedModelService: SelectedModelService,
    private selectedPackageService: SelectedPackageService,
    private selectedEngineService: SelectedEngineService,
    private selectedExteriorColorService: SelectedExteriorColorService,
    private selectedInteriorService: SelectedEngineService,
    private selectedTireService: SelectedTireService
  ) {
    this.formState.step$.subscribe((step) => {
      // Verifica si this.container está definido antes de intentar llamar a clear
      if (this.container && this.container.clear) {
        this.container.clear();
        const factory = this.createComponent(step);
        this.container.createComponent(factory);
      }
    });
  }

  ngAfterViewInit(): void {
    this.formState.step$.subscribe((step) => {
      if (this.container) {
        this.container.clear();
        const factory = this.createComponent(step);
        this.container.createComponent(factory);
      }
      this.cdRef.detectChanges();
    });

    // Simular un clic en el botón "Siguiente" al cargar la página
    setTimeout(() => {
      this.botonSiguiente.nativeElement.click();
    });
  }

  next() {
    const step = this.formState.currentStepFn();

    // Si el paso actual es -1, permitir avanzar sin verificar si hay algo seleccionado
    if (step === -1) {
      this.formState.nextStep();
      this.breadCrubBtn();
      return;
    }

    switch (step) {
      case 0:
        // Verificar la selección de la marca
        const selectedBrand = this.selectedBrandService.getSelectedBrand();
        if (selectedBrand == null) {
          console.error('No puedes avanzar sin seleccionar una marca.');
          return;
        }
        break;
      case 1:
        // Verificar la selección del modelo
        const selectedModel = this.selectedModelService.getSelectedModel();
        if (selectedModel == null) {
          console.error('No puedes avanzar sin seleccionar un modelo.');
          return;
        }
        break;
      case 2:
        // Verificar la selección del paquete
        const selectedPackages =
          this.selectedPackageService.getSelectedPackages();
        if (selectedPackages == null) {
          console.error('No puedes avanzar sin seleccionar un paquete.');
          return;
        }
        break;
      case 3:
        // Verificar la selección del motor
        const selectedEngine = this.selectedEngineService.getSelectedEngine();
        if (selectedEngine == null) {
          console.error('No puedes avanzar sin seleccionar un motor.');
          return;
        }
        break;
      case 4:
        // Verificar la selección del color exterior
        const selectedColor =
          this.selectedExteriorColorService.getSelectedExtColor();
        if (selectedColor == null) {
          console.error('No puedes avanzar sin seleccionar un color.');
          return;
        }
        break;
      case 5:
        // Verificar la selección del color interior
        const selectedInteriorColor =
          this.selectedInteriorService.getSelectedEngine();
        if (selectedInteriorColor == null) {
          console.error('No puedes avanzar sin seleccionar un color.');
          return;
        }
        break;
      case 6:
        // Verificar la selección de las llantas
        const selectedTire = this.selectedTireService.getSelectedTire();
        if (selectedTire == null) {
          console.error('No puedes avanzar sin seleccionar unas llantas.');
          return;
        }
        break;
      default:
        console.error('Paso desconocido.');
        return;
    }

    // Si todo está seleccionado, avanzar al siguiente paso
    this.formState.nextStep();
    this.breadCrubBtn();
  }

  previous() {
    this.formState.previousStep();
    this.breadCrubBtn();
  }

  currentStep() {
    return this.formState.currentStepFn();
  }

  isCurrentStepSelected(): boolean {
    const step = this.formState.currentStepFn();

    switch (step) {
      case 0:
        // Verificar la selección de la marca
        const selectedBrand = this.selectedBrandService.getSelectedBrand();
        return selectedBrand != null;
      case 1:
        // Verificar la selección del modelo
        const selectedModel = this.selectedModelService.getSelectedModel();
        return selectedModel != null;
      case 2:
        // Verificar la selección del paquete
        const selectedPackages =
          this.selectedPackageService.getSelectedPackages();
        return selectedPackages != null;
      case 3:
        // Verificar la selección del motor
        const selectedEngine = this.selectedEngineService.getSelectedEngine();
        return selectedEngine != null;
      case 4:
        // Verificar la selección del color
        const selectedColor =
          this.selectedExteriorColorService.getSelectedExtColor();
        return selectedColor != null;
      case 5:
        // Verificar la selección del color
        const selectedInteriorColor =
          this.selectedInteriorService.getSelectedEngine();
        return selectedInteriorColor != null;
      case 6:
        // Verificar la selección de las llantas
        const selectedTire = this.selectedTireService.getSelectedTire();
        return selectedTire != null;
      default:
        return false;
    }
  }


  
  //LOGICA PARA BREAD CRUMB HACIA ATRAS
  breadCrubBtn() {
    var vDom = 'a' + this.formState.currentStepFn();
    let numero = this.formState.currentStepFn();

    const editDom = document.getElementById(vDom);

    if (editDom) {
      editDom.style.color = '#98928f';
    }

    for (let index = 0; index <= numero; index++) {
      var vDom = 'a' + index;
      const editDom = document.getElementById(vDom);
      if (editDom) {
        editDom.style.color = '#ece9e1';
        editDom.classList.value = 'cursor-pointer';
      }
    }
    for (let index = numero + 1; index < 8; index++) {
      var vDom2 = 'a' + index;
      const editDom = document.getElementById(vDom2);
      if (editDom) {
        editDom.style.color = '#98928f';
        editDom.classList.value = 'cursor-not-allowed';
      }
    }
  }

  breadCrubClick(event: any) {
    //recoge el evento
    let id: string = event.target.id;
    //Extrae el numero del id
    const match = id.match(/\d+/);
    if (match) {
      // Convertir el resultado a un número entero
      const numero = parseInt(match[0], 10);
      //compara para hacer modificaciones y q no permita pasos para adelante
      if (numero < this.formState.currentStepFn()) {
        //Pintar clicks

        for (let index = 0; index <= numero; index++) {
          var vDom = 'a' + index;
          const editDom = document.getElementById(vDom);
          editDom!.style.color = '#ece9e1';
          editDom!.classList.value = 'cursor-pointer';
        }
        for (let index = numero + 1; index < 8; index++) {
          var vDom2 = 'a' + index;
          const editDom = document.getElementById(vDom2);
          editDom!.style.color = '#98928f';
          editDom!.classList.value = 'cursor-not-allowed';
        }
        //Pintar clicks (Esto luego se va quitar cuando funcione steps)
        //LLeva a el step
        this.formState.currentClickfn(numero);
      } else {
        console.error('No puedes navegar hacia adelante');
      }
    }
  }

  // Obtine el ancho de la pantalla.
  getWidth(): number {
    return window.innerWidth;
  }

  restart(): void {
    localStorage.clear();
    this.formState.currentClickfn(0);
  }
}
