import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormDataService {
    private formData: any = {};

    setField(key: string, value: any) {
        this.formData[key] = value;
    }

    getField(key: string) {
        return this.formData[key];
    }
}