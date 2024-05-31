import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { ExteriorColor } from '../../configurador/exterior-color-selection/interface/exterior-color.interface';
import { UploadResponse } from '../../shared/interfaces/UploadResponse.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-extcolor',
  templateUrl: './edit-extcolor.component.html',
})
export class EditExtcolorComponent {
  extColor: ExteriorColor[] = [];
  url = environment.apiUrl;
  selectedExtColor: any;
  currentImageIndex = 0;
  imagePreviews: any[] = [];
  circuloPreview: any[] = [];
  selectedImageList: string[] = [];
  extension: string = '';

  constructor(
    public dialogRef: MatDialogRef<EditExtcolorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExteriorColor[],
    public dialog: MatDialog,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    console.log('Exterior Color', this.data);
    this.extColor = this.data;
  }

  saveExtColor() {
    const resp: any = {
      price: this.selectedExtColor.price,
      name: this.selectedExtColor.name,
      color: this.selectedExtColor.color,
      image: this.selectedExtColor.imageList,
      circulo: this.selectedExtColor.circulo
    };

    if (this.circuloPreview.length > 0) {
      resp.circulo = this.circuloPreview[1];
      console.log('resp.circulo', resp.circulo);
    }

    if (this.imagePreviews.length > 0) {
      resp.image = this.imagePreviews.slice(4, 8);
      console.log('resp.imageList', resp.image);
    }

    // Realiza la petición PUT
    this.http
      .put(`${this.url}/extcolors/${this.selectedExtColor.id}`, resp)
      .subscribe(
        (data) => {
          console.log('Color exterior actualizado con éxito', data);
          this.dialogRef.close();
          this.snackBar.open(
            'El color exterior se ha actualizado correctamente.',
            'Cerrar',
            {
              duration: 3000, // Duración del mensaje en milisegundos
              horizontalPosition: 'right',
            }
          );
        },
        (error) => {
          console.error('Error al actualizar el color exterior', error);
        }
      );
  }

  selectExtColor(index: number) {
    if (index) {
      this.selectedExtColor = this.extColor[index];
    } else {
      this.selectedExtColor = this.extColor[0];
    }
    this.selectedImageList = this.selectedExtColor.imageList;
  }

  close() {
    this.dialogRef.close();
  }

  // Controles para el carrusel de imágenes
  nextImage() {
    if (this.currentImageIndex < this.selectedImageList.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0; // Vuelve al inicio cuando llega al final
    }
  }

  previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.selectedImageList.length - 1; // Vuelve al final cuando llega al inicio
    }
  }

  onFileChange(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 4) {
      this.snackBar.open(
        'Solo puedes subir un máximo de 4 archivos.',
        'Cerrar',
        {
          duration: 3000, // Duración del mensaje en milisegundos
          horizontalPosition: 'right',
        }
      );
      return;
    }
    this.imagePreviews = []; // Limpiar las vistas previas existentes
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.extension = file.name.split('.')[1];
      if (!this.isValidExtension(this.extension)) {
        continue; // Saltar este archivo si no tiene una extensión válida
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result); // Agregar la vista previa a imagePreviews
          console.log('imagePreviews', this.imagePreviews);
        };
        reader.readAsDataURL(file);
        this.uploadFile(file);
      }
    }
  }

  onFileChange1(event: any) {
  const files: FileList = event.target.files;
  if (files.length === 0) {
    return;
  }

  const file = files[0];
  this.extension = file.name.split('.')[1];
  if (!this.isValidExtension(this.extension)) {
    this.snackBar.open(
      'El archivo seleccionado no tiene una extensión válida.',
      'Cerrar',
      {
        duration: 3000, // Duración del mensaje en milisegundos
        horizontalPosition: 'right',
      }
    );
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    this.circuloPreview = [reader.result];
    console.log('circulo', this.circuloPreview);
  };
  reader.readAsDataURL(file);
  this.uploadFile1(file);
}

  isValidExtension(extension: string): boolean {
    const validExtensions = ['png', 'webp', 'jpg', 'jpeg'];
    return validExtensions.includes(extension);
  }

  uploadFile(file: File): void {
    const formData: FormData = new FormData();
    const url = environment.apiUrl;
    formData.append('file', file, file.name);
    this.http.post<UploadResponse>(`${url}/upload`, formData).subscribe(
      (response: UploadResponse) => {
        const imageUrl = `${url}/images/` + response.fileName;
        // Agregar la nueva URL de la imagen a imagePreviews
        // Limpiar imagePreviews antes de agregar la nueva URL
        this.imagePreviews.push(imageUrl);
        console.log('imagePreviews', this.imagePreviews);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  uploadFile1(file: File): void {
    const formData: FormData = new FormData();
    const url = environment.apiUrl;
    formData.append('file', file, file.name);
    this.http.post<UploadResponse>(`${url}/upload`, formData).subscribe(
      (response: UploadResponse) => {
        const imageUrl = `${url}/images/` + response.fileName;
        // Agregar la nueva URL de la imagen a circuloPreview
        // Limpiar circuloPreview antes de agregar la nueva URL
        this.circuloPreview.push(imageUrl);
        console.log('circuloPreview', this.circuloPreview);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
