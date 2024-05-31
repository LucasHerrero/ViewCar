import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguradorComponent } from './configurador/configurador.component';
import { BrandSectionComponent } from './home/brand-section/brand-section.component';

import { HeroComponent } from './home/hero/hero.component';
import { ModelsComponent } from './models/models.component';
import { RegistroComponent } from './registro/registro.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { RoleGuard } from './shared/services/role-guard.service';
import { InfoComponent } from './models/info/info.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { ConfiguredCarComponent } from './cuenta/pages/configured-car/configured-car.component';
import { PedirCitaComponent } from './cuenta/pedir-cita/pedir-cita.component';
import { CambioContrasenaComponent } from './cambio-contrasena/cambio-contrasena.component';
import { ContactoComponent } from './contacto/contacto.component';
import { FinanciacionPageComponent } from './financiacion/components/financiacion-page/financiacion-page.component';
import { NoticiasComponent } from './home/noticias/noticias.component';


const routes: Routes = [
  { path: '', component: HeroComponent },
  { path: '', component: BrandSectionComponent },
  { path: '', component: NoticiasComponent },
  { path: 'configurador', component: ConfiguradorComponent },
  { path: 'modelos', component: ModelsComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'cuenta', component: CuentaComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_USER' }},
  { path: 'administracion', component: AdministracionComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'modelos/:brandId', component: ModelsComponent },
  // { path: 'modelos/:brandId/info/:modelId', component: InfoComponent }
  { path: 'modelos/info/:modelId', component: InfoComponent },
  { path: 'cuenta/configured-car/:id', component: ConfiguredCarComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_USER' } },
  { path: 'pedir-cita', component: PedirCitaComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_USER' }},
  { path: 'recuperar', component: RecuperarComponent },
  { path: 'cambio-contraseña', component: CambioContrasenaComponent },
  { path: 'contacto',component: ContactoComponent },
  { path: 'financiacion', component: FinanciacionPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
