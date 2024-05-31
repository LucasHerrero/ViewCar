import { SelectedEngineService } from './../services/selected-engine.service';
import { Component, OnInit } from '@angular/core';
import { PackageService } from '../package-selection/service/package.service';

import { Engine } from './interface/engine-interface';

@Component({
  selector: 'app-engine-selection',
  templateUrl: './engine-selection.component.html',
})
export class EngineSelectionComponent implements OnInit {
  engines: Engine[] = [];
  selectedEngine: Engine | null = null;
  selectedModelid: number | null = null;
  selectedImageList: string[] = [];
  currentImageIndex = 0;
  showDescription = false;

  constructor(private selectedEngineService: SelectedEngineService) {}

  ngOnInit(): void {
    this.selectedEngineService.currentEngine.subscribe((engines) => {
      this.engines = engines;
      if (engines.length > 0) {
        const selectedEngineItem = localStorage.getItem('selectedEngine');
        const selectedEngine = selectedEngineItem ? JSON.parse(selectedEngineItem) : null;
        const engineToSelect = selectedEngine && engines.find(engine => engine.id === selectedEngine.id) || engines[0];
        this.selectedEngine = engineToSelect;
        localStorage.setItem('selectedEngine', JSON.stringify(this.selectedEngine));
        this.selectedImageList = selectedEngine.imageList;
      }
    });
  }

  onEngineClick(engine: Engine) {
    this.selectedEngine = engine;
    //  this.selectedImageList = engine.imageList;
    localStorage.setItem('selectedEngine', JSON.stringify(engine)); // Guarda el motor seleccionado en localStorage
  }

  getLocalstorageImageList() {
    let selectedEngine = JSON.parse(
      localStorage.getItem('selectedPackage') || '{}'
    );
    this.selectedImageList = selectedEngine.imageList;
    return this.selectedImageList[0];
  }

  // Muestra u oculta la descripción del paquete
  infoEngine(engine: Engine): void {
    this.showDescription = !this.showDescription;
  }
}
