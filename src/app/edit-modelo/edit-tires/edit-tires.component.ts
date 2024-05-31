import { Component, Inject } from '@angular/core';
import { Tire } from '../../configurador/tire-selection/interface/tire.interface';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../environments/environment.prod';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadResponse } from '../../shared/interfaces/UploadResponse.interface';

@Component({
  selector: 'app-edit-tires',
  templateUrl: './edit-tires.component.html',
})
export class EditTiresComponent {
  selectedTires: any;
  tires: Tire[] = [];
  url = environment.apiUrl;
  currentImageIndex = 0;
  imagePreview: string | ArrayBuffer | null = null;
  selectedImageList: string[] = [];
  extension: string = '';
  newImageUrl: string | undefined;
  circleImagePreview: string | ArrayBuffer | null = null;
  newCircleImageUrl: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<EditTiresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tire[],
    public dialog: MatDialog,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    console.log('Tires', this.data);
    this.tires = this.data;
  }

  saveTires() {
    if (this.newCircleImageUrl) {
      this.selectedTires.circulo = this.newCircleImageUrl;
    }
    if (this.newImageUrl) {
      this.selectedTires.image = this.newImageUrl;
    }
    const resp = {
      name: this.selectedTires.name,
      price: this.selectedTires.price,
      inches: this.selectedTires.inches,
      material: this.selectedTires.material,
      color: this.selectedTires.color,
      image: this.selectedTires.image,
      description: this.selectedTires.description,
      circulo: this.selectedTires.circulo,
    };

    // Realiza la petición PUT
    this.http.put(`${this.url}/tires/${this.selectedTires.id}`, resp).subscribe(
      (data) => {
        console.log('Llantas actualizadas con éxito', data);
        this.dialogRef.close();
        this.snackBar.open(
          'Las llantas se han actualizado correctamente.',
          'Cerrar',
          {
            duration: 3000, // Duración del mensaje en milisegundos
            horizontalPosition: 'right',
          }
        );
      },
      (error) => {
        console.error('Error al actualizar las llantas', error);
      }
    );
  }

  selectTires(index: number) {
    if (index) {
      this.selectedTires = this.tires[index];
    } else {
      this.selectedTires = this.tires[0];
    }
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

  // isValidExtension(extension: string): boolean {
  //   const validExtensions = ['png', 'webp', 'jpg', 'jpeg'];
  //   return validExtensions.includes(extension);
  // }

  // uploadFile(file: File): void {
  //   const formData: FormData = new FormData();
  //   const url = environment.apiUrl;
  //   formData.append('file', file, file.name);
  //   this.http.post<UploadResponse>(`${url}/upload`, formData).subscribe(
  //     (response: UploadResponse) => {
  //       const imageUrl = `${url}/images/` + response.fileName;
  //       // Agregar la nueva URL de la imagen a imagePreviews
  //       // Limpiar imagePreviews antes de agregar la nueva URL
  //       this.imagePreviews.push(imageUrl);
  //       console.log('imagePreviews', this.imagePreviews);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }
  close() {
    this.dialogRef.close();
  }

}
