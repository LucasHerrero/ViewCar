import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrandExistsDialogComponent } from './brand-exists-dialog.component';
import { BrandService } from '../../configurador/brand-selection/service/brands.service';
import { Brand } from '../../configurador/brand-selection/interfaces/brand.interface';
import { HttpClient } from '@angular/common/http';
import { FormDataService } from '../services/FormDataService.service';
import { environment } from '../../../environments/environment';

interface UploadResponse {
  fileName: string;
  date: string;
}

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
})
export class MarcaComponent {
  imagePreview: string | ArrayBuffer | null = null;
  imageLogo: string | ArrayBuffer | null = null;
  brands: Brand[] = [];
  isBrandSelected: boolean = false;
  isNewBrand: boolean = true;
  extension: string = '';
  brandName: string = '';
  url = environment.apiUrl;
  constructor(
    public brandService: BrandService,
    private http: HttpClient,
    private formDataService: FormDataService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.brandName = this.formDataService.getField('inputValue1') || '';
    const url = this.formDataService.getField('inputValue2');
    if (url) {
      this.imagePreview = url;
    }
  }

  onBrandChange(event: any) {
    // Limpiar los campos de la marca
    this.imagePreview = null;
    this.formDataService.setField('inputValue2', '');
    const selectedBrand = (event.target as HTMLSelectElement).value;
    this.formDataService.setField('inputValue1', event.target.value);
    const id = event.target.value;
    if (selectedBrand === 'Add') {
      this.isNewBrand = true;
      this.formDataService.setField('inputValue1', '');
      this.formDataService.setField('inputValue2', '');
      this.imageLogo = null;
      // Llamar a onInputChange1 y onInputChange2 con un evento vacío
      this.onInputChange1({ target: { value: '' } });
      this.onInputChange2({ target: { files: [null] } });
    } else {
      this.isNewBrand = false;
      // Hacer una peticion para obtener la informacion de la marca por ID
      this.brandService.getBrandById(id).subscribe((response) => {
        this.formDataService.setField('inputValue1', response.brandName);
        this.formDataService.setField('inputValue2', response.image);
        this.imageLogo = response.image;
      });
    }
  }

  onInputChange1(event: any) {
    this.formDataService.setField('inputValue1', '');
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue1', inputValue);
    // Comprobar si la marca ya existe
    this.http.get(`${this.url}/brands/name/${inputValue}`).subscribe(
      (response) => {
        if (response) {
          console.log(response);
          this.isBrandSelected = true;
          this.isNewBrand = false;
          this.imageLogo = (response as Brand).image;
          this.formDataService.setField(
            'inputValue2',
            (response as Brand).image
          );

          // Mostrar el modal
          this.dialog.open(BrandExistsDialogComponent, {
            width: '350px',
            data: {
              brandName: inputValue,
              marcaComponent: this,
            },
          });
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onInputChange2(event: any) {
    const file = event.target.files[0];
    this.formDataService.setField('inputValue2', file);
    this.extension = file.name.split('.')[1];
    if (!this.isValidExtension(this.extension)) {
      event.target.value = '';
      return;
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.formDataService.setField('inputValue2', reader.result);
      };
      reader.readAsDataURL(file);
      this.uploadFile(file);
    }
  }

  isValidExtension(extension: string): boolean {
    const validExtensions = ['png', 'webp', 'jpg', 'jpeg'];
    return validExtensions.includes(extension);
  }

  isFileSelected(): boolean {
    return this.extension !== '';
  }

  uploadFile(file: File): void {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    this.http.post<UploadResponse>(`${this.url}/upload`, formData).subscribe(
      (response: UploadResponse) => {
        console.log(response);
        this.formDataService.setField(
          'inputValue2',
          `${this.url}/images/${response.fileName}`
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
