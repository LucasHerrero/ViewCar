import { Component, Inject } from '@angular/core';
import { Package } from '../../configurador/package-selection/interface/package.interface';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadResponse } from '../../shared/interfaces/UploadResponse.interface';
import { PackageResponse } from '../../shared/interfaces/PackageResponse.interface';

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
})
export class EditPackageComponent {
  selectedPaquete: any;
  package: Package[] = [];
  url = environment.apiUrl;
  currentImageIndex = 0;
  imagePreviews: any[] = [];
  selectedImageList: string[] = [];
  extension: string = '';

  constructor(
    public dialogRef: MatDialogRef<EditPackageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Package[],
    public dialog: MatDialog,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    console.log('Package', this.data);
    this.package = this.data;
  }

  savePackage() {
    const resp: PackageResponse = {
      name: this.selectedPaquete.name,
      price: this.selectedPaquete.price,
      headlights: this.selectedPaquete.headlights,
      bodywork: this.selectedPaquete.bodywork,
      seats: this.selectedPaquete.seats,
      image: this.selectedPaquete.imageList,
    };

    if (this.imagePreviews.length > 0) {
      resp.image = this.imagePreviews.slice(4, 8);
      console.log('resp.imageList', resp.image);
    }

    // Realiza la petición PUT
    this.http
      .put(`${this.url}/packages/${this.selectedPaquete.id}`, resp)
      .subscribe(
        (data) => {
          console.log('Paquete actualizado con éxito', data);
          this.dialogRef.close();
          this.snackBar.open(
            'El paquete se ha actualizado correctamente.',
            'Cerrar',
            {
              duration: 3000, // Duración del mensaje en milisegundos
              horizontalPosition: 'right',
            }
          );
        },
        (error) => {
          console.error('Error al actualizar el paquete', error);
        }
      );
  }

  selectPaquete(index: number) {
    if (index) {
      this.selectedPaquete = this.package[index];
    } else {
      this.selectedPaquete = this.package[0];
    }

    // Asignar el valor de imageList a selectedImageList
    this.selectedImageList = this.selectedPaquete.imageList;
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

  
}
