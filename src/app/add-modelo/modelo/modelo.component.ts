import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormDataService } from '../services/FormDataService.service';
import { UploadResponse } from '../../shared/interfaces/UploadResponse.interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
})
export class ModeloComponent {
  extension: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  modelName: string = '';
  modelPrice: number = 0;
  modelEmission: string = '';
  modelFuel: string = '';

  constructor(private http: HttpClient, private formDataService: FormDataService) {}

  ngOnInit() {
    this.modelName = this.formDataService.getField('inputValue3') || '';
    this.modelPrice = Number(this.formDataService.getField('inputValue5')) || 0;
    this.modelEmission = this.formDataService.getField('inputValue6') || '';
    this.modelFuel = this.formDataService.getField('inputValue7') || '';
    const url = this.formDataService.getField('inputValue4');
    if (url) {
      this.imagePreview = url;
    }
  }

  onInputChange3(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue3', inputValue);
  }

  onInputChange4(event: any) {
    const file = event.target.files[0];
    this.formDataService.setField('inputValue4', file);
    this.extension = file.name.split('.')[1];
    if (!this.isValidExtension(this.extension)) {
      event.target.value = '';
      return;
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.formDataService.setField('inputValue4', reader.result);

      };
      reader.readAsDataURL(file);
      this.uploadFile(file);
    }
  }
  onInputChange5(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue5', inputValue);
  }

  onInputChange6(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue6', inputValue);
  }

  onInputChange7(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue7', inputValue);
  }

  isValidExtension(extension: string): boolean {
    const validExtensions = ['png', 'webp', 'jpg', 'jpeg'];
    return validExtensions.includes(extension);
  }

  uploadFile(file: File): void {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const url = environment.apiUrl;
    this.http
      .post<UploadResponse>(
        `${url}/upload`,
        formData
      )
      .subscribe(
        (response: UploadResponse) => {
          console.log(response);
          this.formDataService.setField('inputValue4',  `${url}/images/` + response.fileName);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  isFileSelected(): boolean {
    return this.extension !== '';
  }
}
