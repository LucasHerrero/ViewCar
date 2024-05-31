import { Component, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'home-hero',
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  @ViewChild('video', { static: true, read: ElementRef })
  video!: ElementRef;
  constructor() {}

  // Llamada después de que se inicialicen todas las propiedades del componente
  ngOnInit() {
    this.video.nativeElement.muted = true;
    this.video.nativeElement.autoplay = true;
  }
}
