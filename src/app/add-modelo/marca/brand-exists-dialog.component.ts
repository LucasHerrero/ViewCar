import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormDataService } from '../services/FormDataService.service';
import { MarcaComponent } from './marca.component';

export interface DialogData {
    brandName: string;
    image: string;
    marcaComponent: MarcaComponent;
}

@Component({
    selector: 'app-brand-exists-dialog',
    template: `
    <div class="p-10 rounded-md">
        <h1 class="text-center text-xl font-semibold" mat-dialog-title>Marca existente</h1>
        <div mat-dialog-content>
            <p class="text-center">La marca "{{ data.brandName }}" ya existe.</p>
        </div>
        <div mat-dialog-actions>
            <button class="w-full mt-5 px-5 py-1.5 bg-black text-white rounded-md" mat-button (click)="selectBrand()">Seleccionar esta marca</button>
            <button class="w-full mt-2 px-5 py-1.5 bg-black text-white rounded-md" mat-button (click)="addNewBrand()">Añadir otra marca</button>
        </div>
    </div>
    `,
})

export class BrandExistsDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<BrandExistsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private formDataService: FormDataService) {}
    
        selectBrand(): void {
            // Establecer la marca seleccionada en el servicio FormDataService
            this.formDataService.setField('inputValue1', this.data.brandName);
            this.dialogRef.close();
        }
    
        addNewBrand(): void {
            // Limpiar los campos en el servicio FormDataService
            this.formDataService.setField('inputValue1', '');
            this.formDataService.setField('inputValue2', '');
            // Limpiar imageLogo y cambiar isBrandSelected a false en MarcaComponent
            this.data.marcaComponent.imageLogo = null;
            this.data.marcaComponent.isBrandSelected = false;
            this.data.marcaComponent.isNewBrand = true;
            this.dialogRef.close();
        }
}