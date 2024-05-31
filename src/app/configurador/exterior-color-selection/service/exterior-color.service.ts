import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ExteriorColor } from '../interface/exterior-color.interface';

@Injectable({
  providedIn: 'root'
})
export class ExteriorColorService{

  private extColorSource = new BehaviorSubject<ExteriorColor[]>([]);
  currentExtColor = this.extColorSource.asObservable();

  private serviceUrl = `${environment.apiUrl}/extcolors`;

  constructor(private http: HttpClient) { }

  getExtColorByPackId(packId: number): Observable<ExteriorColor[]> {

      const url = `${this.serviceUrl}/pack/${packId}`;
      let respuesta = this.http.get<ExteriorColor[]>(url);
      return respuesta;
    }
}
