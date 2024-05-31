import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { InteriorColor } from '../interfaces/interior-color.interface';


@Injectable({
  providedIn: 'root'
})
export class ColorInteriorService {

//REVISARLo
private intColorSource = new BehaviorSubject<InteriorColor[]>([]);
currentIntColor = this.intColorSource.asObservable();

private serviceUrl = `${environment.apiUrl}/intcolors`; //PONER EL ENDPOINT DE INTERIOR COLOR

constructor(private http: HttpClient) { }
  getIntColorByPackId(PackId: number): Observable<InteriorColor[]> {
    const url = `${this.serviceUrl}/pack/${PackId}`;

    let respuesta = this.http.get<InteriorColor[]>(url);
    return respuesta;
  }
}
