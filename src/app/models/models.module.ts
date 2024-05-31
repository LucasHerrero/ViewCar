import { ModelsComponent } from './models.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info/info.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    ModelsComponent,
    InfoComponent,

  ],
  imports: [
    CommonModule,
    TranslateModule,
    
    ],
  exports: [
    ModelsComponent,
    InfoComponent,
  ],
})
export class ModelsModule {}
