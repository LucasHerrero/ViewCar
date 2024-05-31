import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model } from '../models/interfaces/model.interface';
import { environment } from '../../environments/environment';
import { Package } from '../configurador/package-selection/interface/package.interface';

@Injectable({
  providedIn: 'root',
})
export class DeleteModelService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  updateStatus(id: number, newStatus: string): Observable<Model> {
    return this.http.put<Model>(`${this.api}/models/${id}/status`, newStatus);
  }

  updateModel(resp: any, Modelo: Model) {
    console.log(resp);
    console.log(Modelo);
    return this.http.put<Model>(`${this.api}/models/${Modelo.id}`, resp);
  }

  getPackagesById(id: number): Observable<Package[]> {
    return this.http.get<Package[]>(`${this.api}/packages/model/${id}`);
  }
}
