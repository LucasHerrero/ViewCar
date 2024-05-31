import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselModule } from '@coreui/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ConfiguradorComponent } from './configurador.component';
import { EngineSelectionComponent } from './engine-selection/engine-selection.component';
import { PackageSelectionComponent } from './package-selection/package-selection.component';
import { ExteriorColorSelectionComponent } from './exterior-color-selection/exterior-color-selection.component';
import { InteriorColorSelectionComponent } from './interior-color-selection/interior-color-selection.component';
import { TireSelectionComponent } from './tire-selection/components/tire-selection.component';
import { ResumeComponent } from './resume/resume.component';
import { FinanciacionModule } from '../financiacion/financiacion.module';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ConfiguradorComponent,
    EngineSelectionComponent,
    PackageSelectionComponent,
    ExteriorColorSelectionComponent,
    InteriorColorSelectionComponent,
    ResumeComponent,
    TireSelectionComponent
  ],
  imports: [
    TranslateModule,
    CommonModule,
    CarouselModule,
    TranslateModule,
    FinanciacionModule,
    RouterModule
  ],
  exports: [
    ConfiguradorComponent
  ],
})
export class ConfiguradorModule { }
