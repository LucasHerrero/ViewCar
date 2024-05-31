import { InteriorColor } from './../../configurador/interior-color-selection/interfaces/interior-color.interface';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-intcolor',
  templateUrl: './edit-intcolor.component.html',
})
export class EditIntcolorComponent {
  intColor: InteriorColor[] = [];
  url = environment.apiUrl;
  selectedIntColor: any;
  circleImagePreview: string | ArrayBuffer | null = null;
newCircleImageUrl: string | undefined;
newImageUrl: string | undefined;
imagePreview: string | ArrayBuffer | null = null;
  constructor(
    public dialogRef: MatDialogRef<EditIntcolorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InteriorColor[],
    public dialog: MatDialog,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    console.log('Interior Color', this.data);
    this.intColor = this.data;
  }

  saveIntColor() {
    if (this.newCircleImageUrl) {
      this.selectedIntColor.circulo = this.newCircleImageUrl;
    }
    if (this.newImageUrl) {
      this.selectedIntColor.image = this.newImageUrl;
    }

    const resp = {
      price: this.selectedIntColor.price,
      name: this.selectedIntColor.name,
      color: this.selectedIntColor.color,
      circulo: this.selectedIntColor.circulo,
      image: this.selectedIntColor.image,

    };

    // Realiza la petición PUT
    this.http.put(`${this.url}/intcolors/${this.selectedIntColor.id}`, resp).subscribe(
      (data) => {
        console.log('Color interior actualizado con éxito', data);
        this.dialogRef.close();
        this.snackBar.open(
          'El interior se ha actualizado correctamente.',
          'Cerrar',
          {
            duration: 3000, // Duración del mensaje en milisegundos
            horizontalPosition: 'right',
          }
        );
      },
      (error) => {
        console.error('Error al actualizar el color interior', error);
      }
    );
  }

  selectIntColor(index: number) {
    if (index) {
      this.selectedIntColor = this.intColor[index];
    } else {
      this.selectedIntColor = this.intColor[0];
    }
  }

  close() {
    this.dialogRef.close();
  }

  onCircleImageChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.circleImagePreview = reader.result as string;

        // Crear un objeto FormData y agregar la imagen
        const formData = new FormData();
        formData.append('file', file);

        // Subir la imagen al servidor
        this.http.post(`${this.url}/upload`, formData).subscribe(
          (data: any) => {
            console.log('Imagen subida con éxito', data);

            // Guardar la URL de la imagen
            this.newCircleImageUrl = `${this.url}/images/${data.fileName}`;
          },
          (error) => {
            console.error('Error al subir la imagen', error);
          }
        );
      };
    }
  }

  onImageChange(event: any) {
    const reader = new FileReader();

  if (event.target.files && event.target.files.length) {
    const [file] = event.target.files;
    reader.readAsDataURL(file);

    reader.onload = () => {
      // Asignar la vista previa de la imagen
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

  }

