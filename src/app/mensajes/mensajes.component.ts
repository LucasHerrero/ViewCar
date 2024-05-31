import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Conversations } from '../administracion/interfaces/conversations.interface';
import { environment } from '../../environments/environment';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
})
export class MensajesComponent implements OnInit {
  conversaciones: Conversations[] = [];
  conversacionSeleccionada: any = null;
  mensajesInterleaved: any[] = [];
  url = environment.apiUrl;
  respuesta: string = '';
  isLoading = false;
  isLoadingConversation = false;
  i: any;
  isLoading2 = false;

  constructor(private http: HttpClient) {}

  @ViewChild('contenedorMensajes', { static: false })
  contenedorMensajes!: ElementRef;

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    const contenedorMensajes = this.contenedorMensajes.nativeElement;
    contenedorMensajes.scrollTop = contenedorMensajes.scrollHeight;
  }

  ngOnInit() {
    this.isLoading = true;
    this.http.get<Conversations[]>(`${this.url}/conversations`).subscribe(
      (response: Conversations[]) => {
        this.isLoading = false;
        this.conversaciones = response;

        this.conversaciones = this.conversaciones
          .map((conversacion) => {
            const lastMessageDate = Math.max(
              ...conversacion.messages.map((mensaje) =>
                new Date(mensaje.sendAt).getTime()
              ),
              ...conversacion.replies.map((respuesta) =>
                new Date(respuesta.sentAt).getTime()
              )
            );
            return { ...conversacion, lastMessageDate };
          })
          .sort((a, b) => b.lastMessageDate - a.lastMessageDate);

        // Seleccionar la conversacio más reciente
        if (this.conversaciones.length > 0) {
          this.seleccionarMensaje(this.conversaciones[0].id, false);
        }
      },
      (error) => {}
    );
  }

  seleccionarMensaje(id: number, enviado: Boolean) {
    if (!enviado) {
      this.isLoadingConversation = true;
    }
    this.http.get(`${this.url}/conversations?id=${id}`).subscribe(
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

        this.isLoadingConversation = false;
        this.scrollToBottom();
      },
      (error) => {}
    );
  }

  actualizarMensajes(id: number, enviado: boolean) {
    this.http.get(`${this.url}/conversations?id=${id}`).subscribe(
      (response: any) => {
        this.seleccionarMensaje(id, enviado);
        this.conversacionSeleccionada = response;
      },
      (error) => {
        console.error('Error al actualizar el mensaje:', error);
      }
    );
  }

  botonActualizar() {
    this.ngOnInit();
  }

  enviarMensaje(idMensaje: number) {
    this.isLoading2 = true;
    this.http
      .post(
        `${this.url}/conversations/${this.conversacionSeleccionada.id}/reply`,
        this.respuesta,

        {
          responseType: 'text',
        }
      )
      .subscribe(
        (response: any) => {
          this.respuesta = '';
          this.isLoading2 = false;
          this.actualizarMensajes(idMensaje, true);

          // Actualizar la fecha del último mensaje de la conversación seleccionada
          const now = new Date().getTime();
          this.conversacionSeleccionada.lastMessageDate = now;

          // Actualizar la lista de conversaciones
          this.conversaciones = this.conversaciones
            .map((conversacion) => {
              if (conversacion.id === this.conversacionSeleccionada.id) {
                return this.conversacionSeleccionada;
              } else {
                return conversacion;
              }
            })
            .sort((a, b) => b.lastMessageDate - a.lastMessageDate);
          this.scrollToBottom();
        },
        (error) => {
          console.error('Error al enviar el mensaje:', error);
        }
      );
  }
}
