import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomJwtPayload } from '../../interfaces/CustomJwtPayload.interface';
import { ConfiguradorComponent } from '../../../configurador/configurador.component';
import { FormStateService } from '../../../configurador/services/formStateService.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  rememberMe = false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<LoginComponent>,
    private formState: FormStateService,
    private formStateService: FormStateService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false],
    });

    const rememberMeControl = this.loginForm.get('rememberMe');
    if (rememberMeControl) {
      rememberMeControl.valueChanges.subscribe((remember) => {
        this.rememberMe = remember;
      });
    }
  }
  currentStep() {
    return this.formState.currentStepFn();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      this.http.post<any>(`${environment.apiUrl}/login`, formData).subscribe(
        (response) => {
          if (response && response.token) {
            this.dialogRef.close();
            // Decodificar el token
            const decodedToken = jwtDecode<CustomJwtPayload>(response.token);

            // Verificar el rol del usuario
            if (decodedToken.authorities.includes('ROLE_ADMIN')) {
              // Si el usuario es un administrador, redirigir a /administracion
              this.router.navigate(['/administracion']);
            } else if (decodedToken.authorities.includes('ROLE_USER')) {
              // Si el usuario está en /configurador y en el paso 7, redirigir a /pedir-cita
              if (
                this.router.url === '/configurador' &&
                this.formStateService.currentStepFn() === 7
              ) {
                
                this.router.navigate(['/pedir-cita']);
              } else {
                // Si el usuario es un usuario normal, redirigir a /cuenta
                this.router
                  .navigateByUrl('/', { skipLocationChange: true })
                  .then(() => {
                    this.router.navigate(['/cuenta']);
                  });
              }
              if (localStorage.getItem('fromSaveConfigCar') === 'true') {
                this.router.navigate(['/cuenta']);
                localStorage.removeItem('fromSaveConfigCar'); // Limpiar el valor para futuros inicios de sesión
              }
            }

            if (this.rememberMe) {
              localStorage.setItem('token', response.token);
            } else {
              sessionStorage.setItem('token', response.token);
            }

            this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
            });
          }
        },
        (error) => {
          if (error.status === 401) {
            this.snackBar.open('Usuario o contraseña incorrectos', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
            });
          }
        }
      );
    }
  }
}
