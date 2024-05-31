import { Coche } from './../../administracion/interfaces/coche.interface';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../shared/services/auth-service.service';
import { environment } from './../../../environments/environment';
import { Appoinments } from './../../administracion/interfaces/appoinments.interface';
import { User } from './../../administracion/interfaces/user.interfaces';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedirCitaService {
appoinments : Appoinments[] = [];
public dates : Date[] = [];
public DayArray : number[] = [];
public AñoArray : number[] = [];
public MonthArray : number[] = [];
public DateArray : Date[] = [];
public coche : Coche[] = [];
private formData: any = {};

constructor(private AuthService : AuthService, private http: HttpClient, ) { }

private serviceUrl = `${environment.apiUrl}/appoinments`;

getAppoinments(): Observable<Appoinments[]> {
    const url = `${this.serviceUrl}`;
    let respuesta =this.http.get<Appoinments[]>(url);
    return respuesta;
  }


  //TODO: FUNCION PARA ITERAR LAS HORAS LIBRES
  getHours(num : string) : Observable<string[]>{
  const url = `${this.serviceUrl}/available`;
  return this.http.get<string[]>(`${url}?date=${num}`);
  }

  getFullDays() {
    const url = `${this.serviceUrl}/full-days`;
    return this.http.get<string[]>(`${url}`);
  }


getCarbyUser(id : number) : Observable<Coche[]>{
  const url = `${environment.apiUrl}/car`
  return this.http.get<Coche[]>(`${url}/user/${id}`);
}


public getnameUser() : User {
  const name = this.AuthService.decodedToken.name;
  return name.charAt(0).toUpperCase() + name.slice(1);
}


public getuserId() : number {
  const id = this.AuthService.decodedToken.id;
  return id;

}

public postAppoinment(data: any) {
  const url = `${this.serviceUrl}/new`;
  return this.http.post(url, data);


}
}

