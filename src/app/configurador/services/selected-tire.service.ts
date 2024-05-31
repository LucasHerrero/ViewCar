import { BehaviorSubject } from "rxjs";
import { Tire } from "../tire-selection/interface/tire.interface";
import { Injectable } from "@angular/core";



@Injectable({
  providedIn: 'root'  // Este servicio se proporciona en la raíz del inyector de dependencia
})
export class SelectedTireService {
  private tireSource = new BehaviorSubject<Tire[]>([]);  // Crea un BehaviorSubject que almacena un array de llantas.

  currentTire = this.tireSource.asObservable();  // Crea un observable del BehaviorSubject

  constructor() { }  // Constructor de la clase

  changeTire(tire: Tire[]) {  // Método para cambiar la llanta
    this.tireSource.next(tire);  // Emite el próximo valor al observable
  }

  getSelectedTire(): Tire[] {  // Método para obtener la llanta seleccionado
    const storedTire = localStorage.getItem('selectedTire');  // Obtiene la llanta seleccionado del almacenamiento local
    return storedTire ? JSON.parse(storedTire) : [];  // Si existe, lo parsea a JSON, si no, devuelve un array vacío
  }
}
