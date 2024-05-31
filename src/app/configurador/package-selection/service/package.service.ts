import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Package } from '../interface/package.interface';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private packagesSource = new BehaviorSubject<Package[]>([]);
  currentPackages = this.packagesSource.asObservable();

  private serviceUrl = `${environment.apiUrl}/packages`;

  constructor(private http: HttpClient) { }

  getPackagesByModelId(modelId: number): Observable<Package[]> {
    const url = `${this.serviceUrl}/model/${modelId}`;
    let respuesta = this.http.get<Package[]>(url);
    return respuesta;

  }
}
