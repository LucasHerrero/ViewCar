import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { LoginComponent } from '../shared/components/login/login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls:  ['./registro.component.css']
})

export class RegistroComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar,public dialog: MatDialog) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      secondLastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      phone: ['', [Validators.required, Validators.pattern('^((6|7)\\s*)(\\d\\s*){8}\\b')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]],
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    let passControl = group.get('password');
    let confirmPassControl = group.get('password2');

    if (passControl && confirmPassControl) {
        let pass = passControl.value;
        let confirmPass = confirmPassControl.value;

        return pass === confirmPass ? null : { notSame: true };
    } else {
        return null;
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      let formData = { ...this.registerForm.value };
      delete formData.password2;

      this.http.post(`${environment.apiUrl}/register`, formData, { observe: 'response', responseType: 'text' }).subscribe(
        response => {
          // Si el estado de la respuesta es 201, significa que el usuario se creó correctamente
          if (response.status === 201) {
            this.snackBar.open('Usuario creado correctamente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
            });
          }
        },
        error => {
          // Si el estado de la respuesta es 400, significa que ya hay un usuario registrado
          if (error.status === 400) {
            this.snackBar.open('Ya hay un usuario registrado con este correo electrónico', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right'
            });
          } else {
            // Imprime el error en la consola
            console.error(error);
          }
        }
      );
    }
  }

  openDialogLogin() {
    let dialogLogin;

    dialogLogin = this.dialog.open(LoginComponent, {
      maxWidth: '100%',
      height: 'auto',
      width: '70%',
      maxHeight: '90vh',
    });
  }
}
