import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Model } from '../interfaces/model.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ModelService {
  private modelSource = new BehaviorSubject<Model[]>([]);
  currentModels = this.modelSource.asObservable();

  private serviceUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getModels(): Observable<Model[]> {
    const url = `${this.serviceUrl}/models`;
    return this.http.get<Model[]>(url);
  }

  getModelsByBrand(idMarca: number): Observable<Model[]> {
    const url = `${this.serviceUrl}/brands/${idMarca}/models`;
    let respuesta = this.http.get<Model[]>(url);
    return respuesta;
  }

  getModelById(id: number): Observable<Model> {
    const url = `${this.serviceUrl}/models/${id}`;
    return this.http.get<Model>(url);
  }
}
