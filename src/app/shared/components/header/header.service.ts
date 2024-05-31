import { Injectable } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    let dialogRef;

    dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: '100vW',
      height: '80%',
      width: '100%',
      position: { bottom: '0px' },
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

}
