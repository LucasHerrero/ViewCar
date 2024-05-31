import { Component, inject } from '@angular/core';
import { NoticiaResponse, NoticiasService } from './noticias.service';
import { set } from 'date-fns';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html'
})
export class NoticiasComponent {

  noticiasService = inject(NoticiasService);
  noticiasAudi?: NoticiaResponse;
  noticiasSeat?: NoticiaResponse;
  noticiasVolkswagen?: NoticiaResponse;
  noticiasCupra?: NoticiaResponse;
  terminoBusqueda:string = '';
  isLoadingAudi: Boolean = false;
  isLoadingSeat: Boolean = false;
  isLoadingVW: Boolean = false;
  isLoadingCupra: Boolean = false;

  // ngOnInit(): void {
  //   this.getNoticiasAudi();
  //   this.getNoticiasSeat();

  //   setTimeout(() => {
  //     this.getNoticiasVolkswagen();
  //     this.getNoticiasCupra();
  //   }, 2000);
  // }

  getNoticiasAudi() {
    this.isLoadingAudi = true;
    this.noticiasService.getNoticias("audi").subscribe({
      next: (n) => {
        this.noticiasAudi = n;
        if(this.noticiasAudi.data.length > 0){
          this.isLoadingAudi = false;
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getNoticiasSeat() {
    this.isLoadingSeat = true;
    this.noticiasService.getNoticias("SEAT").subscribe({
      next: (n) => {
        this.noticiasSeat = n;
        if(this.noticiasSeat.data.length > 0){
          this.isLoadingSeat = false;
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  getNoticiasVolkswagen() {
    this.isLoadingVW = true;
    this.noticiasService.getNoticias("volkswagen").subscribe({
      next: (n) => {
        this.noticiasVolkswagen = n;
        if(this.noticiasVolkswagen.data.length > 0){
          this.isLoadingVW = false;
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  getNoticiasCupra() {
    this.isLoadingCupra = true;
    this.noticiasService.getNoticias("cupra").subscribe({
      next: (n) => {
        this.noticiasCupra = n;
        if(this.noticiasCupra.data.length > 0){
          this.isLoadingCupra = false;
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
