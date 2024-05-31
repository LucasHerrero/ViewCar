import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private router: Router) { }

  isOnAdministracionPage(): boolean {
    const isMobile = window.innerWidth <= 640;
    return this.router.url === '/administracion' && !isMobile;
  }

}
