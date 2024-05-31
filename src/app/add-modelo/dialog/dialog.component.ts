import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormStateService } from '../services/FormStateService.service';

@Component({
  selector: 'app-dialog',
  template: `
    <div class="p-5 px-7 rounded-md text-center">
      <svg
        *ngIf="data.svg === 'success'"
        class="mx-auto mb-2 mt-2"
        width="32"
        height="32"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z"
          fill="green"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
      <svg
        class="mx-auto mb-2 mt-2"
        *ngIf="data.svg === 'error'"
        width="32"
        height="32"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z"
          fill="red"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
      <h1 class="font-semibold text-xl">{{ data.title }}</h1>
      <p>{{ data.message }}</p>
      <button *ngIf="data.svg === 'success'"
        class="mt-4 bg-black w-full text-white py-2 rounded-md"
        (click)="nextStep()"
      >
        Ver resumen
      </button>
      <button *ngIf="data.svg === 'error'"
        class="mt-4 bg-black w-full text-white py-2 rounded-md"
        (click)="error()"
      >
        Volver
      </button>
    </div>
  `,
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private formStateService: FormStateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  nextStep() {
    this.formStateService.nextStep();
    this.dialogRef.close();
    window.scrollTo(0, 0);
  }

  error() {
    this.dialogRef.close();
    this.formStateService.currentClickfn(0);
  }
}
