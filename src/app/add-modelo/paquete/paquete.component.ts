import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadResponse } from '../../shared/interfaces/UploadResponse.interface';
import { FormDataService } from '../services/FormDataService.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-paquete',
  templateUrl: './paquete.component.html',
})

export class PaqueteComponent {
  extension: string = '';
  imagePreviews: any[] = [];
  currentImageIndex = 0;
  photoPaths: { [key: string]: string } = {};
  paqueteName: string = '';
  paquetePrice: number = 0;
  paqueteLight: string = '';
  paqueteBodywork: string = '';
  paqueteSeats: string = '';
  paqueteDescription: string = '';

  constructor(
    private http: HttpClient,
    private formDataService: FormDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.paqueteName = this.formDataService.getField('inputValue8') || '';
    this.paquetePrice = Number(this.formDataService.getField('inputValue10')) || 0;
    this.paqueteLight = this.formDataService.getField('inputValue11') || '';
    this.paqueteBodywork = this.formDataService.getField('inputValue12') || '';
    this.paqueteSeats = this.formDataService.getField('inputValue13') || '';
    this.paqueteDescription = this.formDataService.getField('inputValue14') || '';
    const url = this.formDataService.getField('inputValue9');
    if (url) {
      this.imagePreviews = url;
    }
  }

  onInputChange8(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue8', inputValue);
  }

  onInputChange9(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 4) {
      this.snackBar.open('Solo puedes subir un máximo de 4 archivos.', 'Cerrar', {
        duration: 3000, // Duración del mensaje en milisegundos
        horizontalPosition: 'right'

      });
      return;
    }
    this.imagePreviews = []; // Limpiar las vistas previas existentes
    this.formDataService.setField('inputValue9', ''); // Limpiar los archivos existentes

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.extension = file.name.split('.')[1];
      if (!this.isValidExtension(this.extension)) {
        continue; // Saltar este archivo si no tiene una extensión válida
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result); // Agregar la vista previa a imagePreviews
        };
        reader.readAsDataURL(file);
        this.uploadFile(file);
      }
    }
  }

  onInputChange10(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue10', inputValue);
  }

  onInputChange11(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue11', inputValue);
  }

  onInputChange12(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue12', inputValue);
  }

  onInputChange13(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue13', inputValue);
  }
  onInputChange14(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue14', inputValue);
  }

  isValidExtension(extension: string): boolean {
    const validExtensions = ['png', 'webp', 'jpg', 'jpeg'];
    return validExtensions.includes(extension);
  }

  uploadFile(file: File): void {
    const formData: FormData = new FormData();
    const url = environment.apiUrl;
    formData.append('file', file, file.name);
    this.http
      .post<UploadResponse>(
        `${url}/upload`,
        formData
      )
      .subscribe(
        (response: UploadResponse) => {
          const imageUrl =
            `${url}/images/` +
            response.fileName;
          // Agregar la nueva URL de la imagen a inputValue9
          const currentImages = this.formDataService.getField('inputValue9');
          this.formDataService.setField(
            'inputValue9',
            currentImages ? currentImages + ',' + imageUrl : imageUrl
          );
          console.log(this.formDataService.getField('inputValue9'));
        },
        (error) => {
          console.error(error);
        }
      );
  }

  isFileSelected(): boolean {
    return this.extension !== '';
  }

  // Controles para el carrusel de imágenes
  nextImage() {
    if (this.currentImageIndex < this.imagePreviews.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0; // Vuelve al inicio cuando llega al final
    }
  }

  previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.imagePreviews.length - 1; // Vuelve al final cuando llega al inicio
    }
  }
}
