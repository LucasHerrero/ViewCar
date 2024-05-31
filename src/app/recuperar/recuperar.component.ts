import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogRecuperarComponent } from './dialog/dialogRecuperar.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment.prod';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
})
export class RecuperarComponent {
  form: FormGroup;
  url = environment.apiUrl;
  isLoading: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public dialog: MatDialog
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    const email = this.form.get('email')?.value;

    this.isLoading = true;
    this.http
      .post(
        `${this.url}/password/reset-request`,
        { email },
        { responseType: 'text' }
      )
      .subscribe(
        (response: any) => {
          this.isLoading = false;
          if (response === 'Correo de restablecimiento de contraseña enviado') {
            this.dialog.open(DialogRecuperarComponent, {
              data: {
                title: 'Enviado correctamente',
                message:
                  'Se ha enviado un correo para recuperar tu contraseña.',
                status: 'success',
              },
            });
          }
        },
        (error) => {
          this.isLoading = false;
          if (error.status === 409) {
            this.dialog.open(DialogRecuperarComponent, {
              data: {
                title: 'Revisa tu correo',
                message: error.error,
                status: 'warning',
              },
            });
          } else if (error.status === 400) {
            this.dialog.open(DialogRecuperarComponent, {
              data: {
                title: 'No existe ningun usuario',
                message: 'No existe un usuario con ese correo electrónico.',
                status: 'error',
              },
            });
          }
        }
      );
  }
}
