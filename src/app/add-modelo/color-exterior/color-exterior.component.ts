import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../services/FormDataService.service';
import { UploadResponse } from '../../shared/interfaces/UploadResponse.interface';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-color-exterior',
  templateUrl: './color-exterior.component.html',
})
export class ColorExteriorComponent implements OnInit {
  extension1: string = '';
  extension2: string = '';
  imagePreview1: string | ArrayBuffer | null = null;
  imagePreviews: any[] = [];
  currentImageIndex = 0;
  extColorName: string = '';
  extColorPrice: string = '';

  constructor(private formDataService: FormDataService, private http: HttpClient, private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.extColorName = this.formDataService.getField('inputValue24') || '';
    this.extColorPrice = this.formDataService.getField('inputValue25') || '';
    const url1 = this.formDataService.getField('inputValue26');
    if (url1) {
      this.imagePreview1 = url1;
    }
    const url2 = this.formDataService.getField('inputValue27');
    if (url2) {
      this.imagePreviews = url2;
    }
  }

  onInputChange24(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue24', inputValue);
  }

  onInputChange25(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue25', inputValue);
  }

  onInputChange26(event: any) {
    const file = event.target.files[0];
    this.formDataService.setField('inputValue26', file);
    this.extension1 = file.name.split('.')[1];
    if (!this.isValidExtension(this.extension1)) {
      event.target.value = '';
      return;
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview1 = reader.result;
        this.formDataService.setField('inputValue26', reader.result);

      };
      reader.readAsDataURL(file);
      this.uploadFile(file);
    }
  }

  onInputChange27(event: any) {
    const files = event.target.files;
    if (files.length > 4) {
      this.snackBar.open('Solo puedes subir un máximo de 4 archivos.', 'Cerrar', {
        duration: 3000, // Duración del mensaje en milisegundos
        horizontalPosition: 'right'
      });
      return;
    }
    this.imagePreviews = []; // Limpiar las vistas previas existentes
    this.formDataService.setField('inputValue27', ''); // Limpiar los archivos existentes

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.extension2 = file.name.split('.')[1];
      if (!this.isValidExtension(this.extension2)) {
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

  uploadFile(file: File): void {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const url = environment.apiUrl;
    this.http
      .post<UploadResponse>(
        url + '/upload',
        formData
      )
      .subscribe(
        (response: UploadResponse) => {
          const imageUrl = `${url}/images/` + response.fileName;
          // Agregar la nueva URL de la imagen a inputValue9
          const currentImages = this.formDataService.getField('inputValue27');
          this.formDataService.setField('inputValue27', currentImages ? currentImages + ',' + imageUrl : imageUrl);
          console.log( this.formDataService.getField('inputValue27'));
        },
        (error) => {
          console.error(error);
        }
      );
  }

  isValidExtension(extension: string): boolean {
    const validExtensions = ['png', 'webp', 'jpg', 'jpeg'];
    return validExtensions.includes(extension);
  }

  isFileSelected1(): boolean {
    return this.extension1 !== '';
  }

  isFileSelected2(): boolean {
    return this.extension2 !== '';
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
