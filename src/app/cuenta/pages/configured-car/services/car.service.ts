import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, map, Observable, of } from "rxjs";
import { Car } from "../interface/car.interface";
import { environment } from "../../../../../environments/environment";
import { ConfiguredCar } from "../interface/configuredCar.interface";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";
import { PopupService } from '../../../../popup/service/popup.service';


// Servicio para read e insert de coches configurados.
@Injectable({
  providedIn: 'root'
})
export class CarService {

  private carSource = new BehaviorSubject<Car[]>([]);
  currentCar = this.carSource.asObservable();

  private serviceUrl = `${environment.apiUrl}/car`;

  constructor(private http: HttpClient, private PopupService: PopupService) { }

  // Obtiene el coche por el ID del coche.
  getCarById(carId: number): Observable<Car> {
    const url = `${this.serviceUrl}/${carId}`;
    let respuesta = this.http.get<Car>(url);
    return respuesta;
  }

  getCarByUserId(userId: number): Observable<ConfiguredCar[]> {
    const url = `${this.serviceUrl}/user/${userId}`;

    return this.http.get(url).pipe(
      map(response => Array.isArray(response) ? response : [response])
    );
  }


  getCarByProperties(price: any, pack: any, brand: any, model: any, engine: any) {
    const existingCar = this.carSource.value.find(
      car => car.price === price && car.pack === pack && car.brand === brand && car.model === model && car.engine === engine);
    return of(existingCar);
  }

  // Inserta un coche.
  insertCar(car: Car): Observable<Car> {
    const url = `${this.serviceUrl}/new`;
    let respuesta = this.http.post<Car>(url, car).pipe(
      tap(() => this.PopupService.showPopup()),
      catchError((error: HttpErrorResponse) => {
        console.error("El model_status es 'inactive'");
        this.PopupService.showFailurePopup();
        return throwError(error);
      })
    );
    return respuesta;
  }

  insertCarWithoutPopup(car: Car): Observable<Car> {
    const url = `${this.serviceUrl}/new`;
    let respuesta = this.http.post<Car>(url, car).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error("El model_status es 'inactive'");
        return throwError(error);
      })
    );
    return respuesta;
  }

  getCarDetails(id: number): Observable<Car> {
    const car = this.carSource.value.find(car => car.id === id);
    if (car) {
      return of(car);
    } else {
      return this.getCarById(id);
    }
  }

}



