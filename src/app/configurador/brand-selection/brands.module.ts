import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BrandSelectionComponent } from './brand-selection.component';
import { CardListComponent } from './components/card-list/card-list.component';

@NgModule({
  declarations: [
    BrandSelectionComponent,
    CardListComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports:[
    BrandSelectionComponent,
    CardListComponent
  ]
})
export class BrandsModule {}
