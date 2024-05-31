import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormGroup, FormControl } from '@angular/forms';
import { Question } from './interface/question.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../shared/services/auth-service.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
})
export class ContactoComponent implements OnInit {
  contactForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    message: new FormControl(''),
  });
  @Injectable({
    providedIn: 'root',
  })
  notificationMessage: string = '';
  private serviceUrl = `${environment.apiUrl}/frequentQuestions`;
  notificationType: 'success' | 'error' = 'success';
  frequentQuestions: Question[] = [];
  isLoggedIn: Boolean = false;
  conversacionSeleccionada: any = null;
  mensajesInterleaved: any[] = [];
  url = environment.apiUrl;
  respuesta: string = '';
  userInfo: any = null;
  conversationId: any = null;
  noConversation: boolean = false;
  i: any;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.userInfo = this.authService.getUserInfo();
      const conversationId = localStorage.getItem('conversationId');
      if (conversationId) {
        this.actualizarMensajes(this.userInfo.sub);
        // Actualizar los mensajes cada 5 segundos
        if (this.i) {
          clearInterval(this.i);
        }
        this.i = setInterval(() => {
          this.actualizarMensajes(this.userInfo.sub);
        }, 5000);
      } else {
        this.noConversation = true;
      }
    }

    this.getFrequentQuestions().subscribe(
      (questions) => {
        this.frequentQuestions = questions; // Almacena las preguntas frecuentes en la variable
        console.log(questions);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  seleccionarMensaje(email: string) {
    this.http.get(`${this.url}/conversations?email=${email}`).subscribe(
      (response: any) => {
        console.log('Mensaje seleccionado:', response);
        this.conversacionSeleccionada = response;

        // Normalizar los mensajes y las respuestas
        const mensajesNormalizados = this.conversacionSeleccionada.messages.map(
          (mensaje: { id: any; name: any; message: any; sendAt: any }) => ({
            id: mensaje.id,
            name: mensaje.name,
            text: mensaje.message,
            sendAt: mensaje.sendAt,
            isReply: false,
          })
        );
        const respuestasNormalizadas =
          this.conversacionSeleccionada.replies.map(
            (respuesta: { id: any; text: any; sentAt: any }) => ({
              id: respuesta.id,
              name: 'Soporte',
              text: respuesta.text,
              sendAt: respuesta.sentAt,
              isReply: true,
            })
          );

        // Interlevar los mensajes y las respuestas
        this.mensajesInterleaved = [
          ...mensajesNormalizados,
          ...respuestasNormalizadas,
        ];
        this.mensajesInterleaved.sort(
          (a, b) => new Date(a.sendAt).getTime() - new Date(b.sendAt).getTime()
        );
      },
      (error) => {}
    );
  }

  onSubmit() {
    const formValues = this.contactForm.value;

    this.http
      .post(`${environment.apiUrl}/messages`, formValues, {
        responseType: 'text',
      })
      .subscribe(
        (response) => {
          this.notificationMessage = 'Mensaje enviado correctamente';
          this.notificationType = 'success';
        },
        (error) => {
          this.notificationMessage = 'Hubo un error al enviar el mensaje';
          this.notificationType = 'error';
        }
      );
  }

  getFrequentQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.serviceUrl);
  }

  enviarMensaje() {
    this.http
      .post(`${this.url}/messages`, {
        name: this.userInfo.name,
        email: this.userInfo.sub,
        phoneNumber: '626160814',
        message: this.respuesta,
      })
      .subscribe(
        (response: any) => {
          this.conversationId = response.conversationId;
          localStorage.setItem('conversationId', this.conversationId);
          this.actualizarMensajes(this.userInfo.sub);
          this.respuesta = '';
          this.noConversation = false;
        },
        (error) => {
          console.error('Error al enviar el mensaje:', error);
        }
      );
  }

  actualizarMensajes(email: string) {
    this.http.get(`${this.url}/conversations?email=${email}`).subscribe(
      (response: any) => {
        this.seleccionarMensaje(email);
        this.conversacionSeleccionada = response;
        // Hacer scroll hacia abajo cuando se manda el nuevo mensaje
        setTimeout(() => {
          const element = document.getElementById('messages');
          if (element) {
            element.scrollTop = element.scrollHeight;
          }
        }, 100);
      },
      (error) => {
        console.error('Error al actualizar el mensaje:', error);
      }
    );
  }

  cerrarConversacion() {
    this.conversacionSeleccionada = null;
    this.mensajesInterleaved = [];
    localStorage.removeItem('conversationId');
    this.noConversation = true;
  }
}
