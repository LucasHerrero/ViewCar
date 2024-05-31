import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BrandSectionComponent } from './brand-section/brand-section.component';
import { HeroComponent } from './hero/hero.component';
import { TranslateModule } from '@ngx-translate/core';
import { NoticiasComponent } from './noticias/noticias.component';


// el módulo homeModule usa los componentes de la landing page.
@NgModule({
  declarations: [
    BrandSectionComponent,
    HeroComponent,
    NoticiasComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule

  ],
  exports: [
    BrandSectionComponent,
    HeroComponent,
    NoticiasComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}

