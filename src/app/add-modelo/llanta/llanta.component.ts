import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../services/FormDataService.service';
import { UploadResponse } from '../../shared/interfaces/UploadResponse.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-llanta',
  templateUrl: './llanta.component.html',
})
export class LlantaComponent {
  extension1: string = '';
  extension2: string = '';
  imagePreview1: string | ArrayBuffer | null = null;
  imagePreview2: string | ArrayBuffer | null = null;
  tireName: string = '';
  tirePrice: string = '';
  tireInches: string = '';
  tireMat: string = '';
  tireColor: string = '';
  tireDescription: string = '';

  constructor(
    private formDataService: FormDataService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.tireName = this.formDataService.getField('inputValue32') || '';
    this.tirePrice = this.formDataService.getField('inputValue35') || '';
    this.tireInches = this.formDataService.getField('inputValue36') || '';
    this.tireMat = this.formDataService.getField('inputValue37') || '';
    this.tireColor = this.formDataService.getField('inputValue38') || '';
    this.tireDescription = this.formDataService.getField('inputValue39') || '';
    const url1 = this.formDataService.getField('inputValue33');
    if (url1) {
      this.imagePreview1 = url1;
    }
    const url2 = this.formDataService.getField('inputValue34');
    if (url2) {
      this.imagePreview2 = url2;
    }
  }

  onInputChange32(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue32', inputValue);
  }

  onInputChange33(event: any) {
    const file = event.target.files[0];
    this.formDataService.setField('inputValue33', file);
    this.extension2 = file.name.split('.')[1];
    if (!this.isValidExtension(this.extension2)) {
      event.target.value = '';
      return;
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview1 = reader.result;
        this.formDataService.setField('inputValue33', reader.result);

      };
      reader.readAsDataURL(file);
      this.uploadFile(file);
    }
  }

  onInputChange34(event: any) {
    const file = event.target.files[0];
    this.formDataService.setField('inputValue34', file);
    this.extension2 = file.name.split('.')[1];
    if (!this.isValidExtension(this.extension2)) {
      event.target.value = '';
      return;
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview2 = reader.result;
        this.formDataService.setField('inputValue34', reader.result);

      };
      reader.readAsDataURL(file);
      this.uploadFile(file);
    }
  }

  onInputChange35(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue35', inputValue);
  }

  onInputChange36(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue36', inputValue);
  }

  onInputChange37(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue37', inputValue);
  }

  onInputChange38(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue38', inputValue);
  }

  onInputChange39(event: any) {
    const inputValue = event.target.value;
    this.formDataService.setField('inputValue39', inputValue);
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
          this.formDataService.setField('inputValue34', `${url}/images/` + response.fileName);
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
}
