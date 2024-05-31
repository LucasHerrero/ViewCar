import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { Model } from '../../models/interfaces/model.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-model',
  templateUrl: './edit-model.component.html',
})
export class EditModelComponent {
  modelo: Model = {} as Model;
  url = environment.apiUrl;
  imagePreview: string | ArrayBuffer | null = null;
  newImageUrl: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<EditModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Model,
    public dialog: MatDialog,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  saveModel() {
    // Si se ha subido una nueva imagen, usar su URL
    if (this.newImageUrl) {
      this.data.image = this.newImageUrl;
    }

    const resp = {
      modelName: this.data.model,
      image: this.data.image,
      price: this.data.price,
      description: this.data.description,
    };

    // Realiza la petición PUT
    this.http.put(`${this.url}/models/${this.data.id}`, resp).subscribe(
      (data) => {
        console.log('Modelo actualizado con éxito', data);
        this.dialogRef.close();
        this.snackBar.open(
          'El modelo se ha actualizado correctamente.',
          'Cerrar',
          {
            duration: 3000, // Duración del mensaje en milisegundos
            horizontalPosition: 'right',
          }
        );
      },
      (error) => {
        console.error('Error al actualizar el modelo', error);
      }
    );
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imagePreview = reader.result as string;

        // Crear un objeto FormData y agregar la imagen
        const formData = new FormData();
        formData.append('file', file);

        // Subir la imagen al servidor
        this.http.post(`${this.url}/upload`, formData).subscribe(
          (data: any) => {
            console.log('Imagen subida con éxito', data);

            // Guardar la URL de la imagen
            this.newImageUrl = `${this.url}/images/${data.fileName}`;
          },
          (error) => {
            console.error('Error al subir la imagen', error);
          }
        );
      };
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
