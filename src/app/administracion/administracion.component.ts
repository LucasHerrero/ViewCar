import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AdministracionService } from './administracion.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
})
export class AdministracionComponent {
  currentState = '';

  constructor(private administracionService: AdministracionService) {
    this.administracionService.currentState$.subscribe(
      newState => this.currentState = newState
    );
  }

  onSidebarItemClicked(state: string) {
    this.currentState = state;
  }

  ngOnInit(): void {
    if (!localStorage.getItem('reload')) {
      localStorage.setItem('reload', 'true');
      window.location.reload();
    } else {
      localStorage.removeItem('reload');
    }
  }
}
