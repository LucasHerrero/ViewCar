import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor() { }

  getCarParts() {
    const selectedExtColorItem = localStorage.getItem('selectedExtColor');
    const selectedExtColor = selectedExtColorItem ? JSON.parse(selectedExtColorItem) : null;

    const selectedModelItem = localStorage.getItem('selectedModel');
    const selectedModel = selectedModelItem ? JSON.parse(selectedModelItem) : null;

    const selectedIntColorItem = localStorage.getItem('selectedIntColor');
    const selectedIntColor = selectedIntColorItem ? JSON.parse(selectedIntColorItem) : null;

    const selectedPackageItem = localStorage.getItem('selectedPackage');
    const selectedPackage = selectedPackageItem ? JSON.parse(selectedPackageItem) : null;

    const selectedBrandItem = localStorage.getItem('selectedBrand');
    const selectedBrand = selectedBrandItem ? JSON.parse(selectedBrandItem) : null;

    const selectedEngineItem = localStorage.getItem('selectedEngine');
    const selectedEngine = selectedEngineItem ? JSON.parse(selectedEngineItem) : null;

    const selectedTiresItem = localStorage.getItem('selectedTire');
    const selectedTires = selectedTiresItem ? JSON.parse(selectedTiresItem) : null;

    return {
      selectedExtColor,
      selectedModel,
      selectedIntColor,
      selectedPackage,
      selectedBrand,
      selectedEngine,
      selectedTires
    };
  }
}
