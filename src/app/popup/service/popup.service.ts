import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  private _show = new Subject<void>();
  show$ = this._show.asObservable();
  private showFailureSubject = new Subject<void>();

  showFailure$ = this.showFailureSubject.asObservable();

  constructor() { }

  // método para mostrar el popup existoso.
  showPopup() {
    this._show.next();
  }

  // método para mostrar el popup de fallo.
showFailurePopup() {
    this.showFailureSubject.next();
  }
}
