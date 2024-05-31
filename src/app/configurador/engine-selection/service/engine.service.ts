import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Engine } from '../interface/engine-interface';


@Injectable({
  providedIn: 'root'
})
export class EngineService {


private engineSource = new BehaviorSubject<Engine[]>([]);
currentEngine = this.engineSource.asObservable();

private serviceUrl = `${environment.apiUrl}/engines`;

constructor(private http: HttpClient) { }

  getEnginesByModelId(modelId: number): Observable<Engine[]> {
    const url = `${this.serviceUrl}/model/${modelId}`;

    let respuesta = this.http.get<Engine[]>(url);
    return respuesta;



}

}
