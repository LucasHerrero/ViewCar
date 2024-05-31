import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogCambioComponent } from './dialog/dialogCambio.component';

@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.component.html',
})
export class CambioContrasenaComponent implements OnInit {
  token: string | undefined;
  form: FormGroup;
  url = environment.apiUrl;
  isLoading: Boolean = false;
  isLoadingChange: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, this.passwordComplexity]],
      confirmPassword: [''],
    });
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParams['t'];
    if (!this.token) {
      this.router.navigate(['/recuperar']);
    } else {
      this.isLoading = true;
      this.http
        .get(`${this.url}/password/reset/${this.token}`, {
          responseType: 'text',
        })
        .subscribe(
          (response: any) => {
            console.log(response);
            if (response === 'Token válido') {
              this.isLoading = false;
            }
          },
          (error) => {
            this.isLoading = false;
            // El token no es válido, mostrar un modal y redirigir a /recuperar
            let dialogWidth = window.matchMedia('(max-width: 768px)').matches
              ? '80%'
              : '25%';
            this.dialog.open(DialogCambioComponent, {
              data: {
                title: 'Solicitud caducada',
                message:
                  'Por favor, solicita un nuevo cambio de contraseña. Sera redirigido a la página de recuperación de contraseña.',
                status: 'error',
              },
              maxWidth: '100%',
              height: 'auto',
              width: dialogWidth,
              maxHeight: '90vh',
              disableClose: true,
            });

            setTimeout(() => {
              this.router.navigate(['/recuperar']);
              this.dialog.closeAll();
            }, 5000);
          }
        );
    }
  }

  passwordComplexity(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

    const passwordValid =
      hasUpperCase &&
      hasLowerCase &&
      hasNumeric &&
      hasSpecialChar &&
      value.length >= 8;

    return !passwordValid ? { passwordComplexity: true } : null;
  }

  passwordsMatch(): boolean {
    const newPassword = this.form.get('password')?.value;
    const confirmPassword = this.form.get('confirmPassword')?.value;
    return newPassword === confirmPassword;
  }

  onSubmit() {
    const newPassword = this.form.get('password')?.value;

    this.isLoadingChange = true;
    this.http
      .post(
        `${this.url}/password/reset`,
        { token: this.token, newPassword },
        { responseType: 'text' }
      )
      .subscribe(
        (response: any) => {
          this.isLoadingChange = false;
          if (response === 'Contraseña cambiada con éxito') {
            this.dialog.open(DialogCambioComponent, {
              data: {
                title: 'Contraseña cambiada',
                message: 'Tu contraseña ha sido cambiada correctamente.',
                status: 'success',
              },
              disableClose: true,
            });
          }
        },
        (error) => {
          this.isLoadingChange = false;
          this.dialog.open(DialogCambioComponent, {
            data: {
              title: 'Solictud caducada',
              message: 'Por favor, solicita un nuevo cambio de contraseña',
              status: 'error',
            },
          });
        }
      );
  }
}
