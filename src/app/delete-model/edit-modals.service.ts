import { Engine } from './../configurador/engine-selection/interface/engine-interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EditModalsService {
  constructor(private http : HttpClient) { }


getEngineById(id : number): Observable<Engine> {


  const url = environment.apiUrl;
return this.http.get<Engine>(`${url}/engines/model/${id}`);
}



}
