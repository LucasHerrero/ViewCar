import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from './service/popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: [],
})
export class PopupComponent {

  show = false;
  showFailure = false;

  constructor(private router: Router, private popupService: PopupService) {
    this.popupService.show$.subscribe(() => {
      this.show = true;
      this.showFailure = false;
    });

    this.popupService.showFailure$.subscribe(() => {
      this.showFailure = true;
      this.show = false;
    });
  }

  ngOnInit() {}

  goToConfiguredCars() {
    this.router.navigate(['cuenta']);
    this.show = false;
    this.showFailure = false;
  }

  backtoConfigurator() {
    this.router.navigate(['configurador']);
    this.showFailure = false;
    this.show = false;
  }
}
