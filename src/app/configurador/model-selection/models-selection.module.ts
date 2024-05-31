import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModelSelectionComponent } from './model-selection.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ModelSelectionComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    ModelSelectionComponent,
  ],
})
export class ModelsSelectionModule {}
