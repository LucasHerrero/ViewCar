import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Tire } from "../interface/tire.interface";


/**
 * Servicio para obtener información de llantas.
 */
@Injectable({
 providedIn : 'root'
})
export class TireService {

  private tireSource = new BehaviorSubject<Tire[]>([]);
  currentTire = this.tireSource.asObservable();

  private serviceUrl = `${environment.apiUrl}/tires`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene las llantas por el ID del paquete.
   * @param packageId El ID del paquete
   * @returns Un Observable que emite un array de objetos Tire.
   */
  getTireByPackId(packId: number): Observable<Tire[]> {
    const url = `${this.serviceUrl}/pack/${packId}`;

  // aquì se hace la petición al servidor para obtener las llantas del paquete seleccionado y se devuelve la respuesta.
    let respuesta = this.http.get<Tire[]>(url);
    return respuesta;
  }
}
