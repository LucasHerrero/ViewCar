import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { CustomJwtPayload } from '../../interfaces/CustomJwtPayload.interface';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from './header.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent  {
  isScrolled = false;

  constructor(public dialog: MatDialog,
    private authService: AuthService,
     private router: Router,
     private translateService: TranslateService,
     private HeaderService: HeaderService) {
    window.addEventListener('scroll', () => {
      this.isScrolled = window.scrollY > 0;
    });
  }

  isAccountOrAdminRoute() {
    const route = this.router.url;
    return route === '/cuenta' || route === '/administracion';
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    location.reload();
  }

  getAccountLabel() {
    if (this.isAuthenticated()) {
      const decodedToken = this.authService.decodedToken as CustomJwtPayload;
      if (decodedToken.authorities.includes('ROLE_ADMIN')) {
        return 'Administración';
      } else if (decodedToken.authorities.includes('ROLE_USER')) {
        return 'Mi cuenta';
      }
    }
    return '';
  }

  get decodedToken() {
    return this.authService.decodedToken;
  }

  changeLanguage(language: string) {
    this.translateService.use(language);
  }

  openDialog() {
    this.HeaderService.openDialog();
  }

  closeDialog() {
this.HeaderService.closeDialog();
  }

   toggleDropdown() {
    const dropdown = document.getElementById('dropdown');
    if (dropdown) {
      dropdown.classList.toggle('hidden');
      dropdown.classList.toggle('block');
    }
  }


  openDialogLogin() {
    let dialogLogin;
    let dialogWidth = window.matchMedia('(max-width: 768px)').matches ? '90%' : '60%';

    dialogLogin = this.dialog.open(LoginComponent, {
        maxWidth: '100%',
        height: 'auto',
        width: dialogWidth,
        maxHeight: '90vh',
    });
  }
}
