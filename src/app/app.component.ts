import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BrandService } from './configurador/brand-selection/service/brands.service';
import { AuthService } from './shared/services/auth-service.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'Concesionario';
  constructor(
    private brandService: BrandService,
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {
    this.setAppLanguage();
  }

  setAppLanguage() {
    this.translate.setDefaultLang('es');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang ? browserLang : 'es');
  }

  ngOnInit(): void {
    this.brandService.getBrands();
    this.authService.keepUserLoggedIn();
    if (this.authService.isAuthenticated()) {
      const decodedToken = this.authService.decodedToken;
      if (decodedToken) {
        
      }
    }
  }}
