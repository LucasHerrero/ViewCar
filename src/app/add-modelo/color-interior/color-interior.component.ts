import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../services/FormDataService.service';
import { UploadResponse } from '../../shared/interfaces/UploadResponse.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-color-interior',
  templateUrl: './color-interior.component.html',
})
export class ColorInteriorComponent {
  extension1: string = '';
  extension2: string = '';
  imagePreview1: string | ArrayBuffer | null = null;
  imagePreview2: string | ArrayBuffer | null = null;
  intColorName: string = '';
  intColorPrice: string = '';

  constructor(
    private formDataService: FormDataService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.intColorName = this.formDataService.getField('inputValue28') || '';
    this.intColorPrice = this.formDataService.getField('inputValue29') || '';
    const url1 = this.formDataService.getField('inputValue30');
    if (url1) {
      this.imagePreview1 = url1;
    }
    const url2 = this.formDataService.getField('inputValue31');
    if (url2) {
      this.imagePreview2 = url2;
    }
  }

  onInputChange28(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue28', inputValue);
  }

  onInputChange29(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue29', inputValue);
  }

  onInputChange30(event: any) {
    const file = event.target.files[0];
    this.formDataService.setField('inputValue30', file);
    this.extension1 = file.name.split('.')[1];
    if (!this.isValidExtension(this.extension1)) {
      event.target.value = '';
      return;
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview1 = reader.result;
        this.formDataService.setField('inputValue30', reader.result);
      };
      reader.readAsDataURL(file);
      this.uploadFile(file);
    }
  }

  onInputChange31(event: any) {
    const file = event.target.files[0];
    this.formDataService.setField('inputValue31', file);
    this.extension2 = file.name.split('.')[1];
    if (!this.isValidExtension(this.extension2)) {
      event.target.value = '';
      return;
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview2 = reader.result;
        this.formDataService.setField('inputValue31', reader.result);
      };
      reader.readAsDataURL(file);
      this.uploadFile(file);
    }
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
          this.formDataService.setField(
            'inputValue31',
            `${url}/images/` + response.fileName
          );
        },
        (error) => {
          console.error(error);
        }
      );
  }

  isFileSelected1(): boolean {
    return this.extension1 !== '';
  }

  isFileSelected2(): boolean {
    return this.extension2 !== '';
  }
}
