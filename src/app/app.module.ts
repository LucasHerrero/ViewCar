import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AddModeloComponent } from './add-modelo/add-modelo.component';
import { ColorExteriorComponent } from './add-modelo/color-exterior/color-exterior.component';
import { ColorInteriorComponent } from './add-modelo/color-interior/color-interior.component';
import { DialogComponent } from './add-modelo/dialog/dialog.component';
import { EnvioComponent } from './add-modelo/envio/envio.component';
import { LlantaComponent } from './add-modelo/llanta/llanta.component';
import { MarcaComponent } from './add-modelo/marca/marca.component';
import { ModeloComponent } from './add-modelo/modelo/modelo.component';
import { MotorComponent } from './add-modelo/motor/motor.component';
import { PaqueteComponent } from './add-modelo/paquete/paquete.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { CalendarioComponent } from './administracion/calendario/calendario.component';
import { VerConfigComponent } from './administracion/ver-config/ver-config.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CambioContrasenaComponent } from './cambio-contrasena/cambio-contrasena.component';
import { DialogCambioComponent } from './cambio-contrasena/dialog/dialogCambio.component';
import { BrandsModule } from './configurador/brand-selection/brands.module';
import { BrandService } from './configurador/brand-selection/service/brands.service';
import { ConfiguradorModule } from './configurador/configurador.module';
import { ModelsSelectionModule } from './configurador/model-selection/models-selection.module';
import { SelectedBrandService } from './configurador/services/selected-brand.service';
import { ContactoComponent } from './contacto/contacto.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { ConfiguredCarComponent } from './cuenta/pages/configured-car/configured-car.component';
import { PedirCitaModule } from './cuenta/pedir-cita/pedir-cita.module';
import { CustomDatePipe } from './custom-date.pipe';
import { DeleteModelComponent } from './delete-model/delete-model.component';
import { EditModelComponent } from './edit-modelo/edit-model/edit-model.component';
import { EditModeloComponent } from './edit-modelo/edit-modelo.component';
import { EditPackageComponent } from './edit-modelo/edit-package/edit-package.component';
import { FinanciacionModule } from './financiacion/financiacion.module';
import { HomeModule } from './home/home.module';
import { MensajesComponent } from './mensajes/mensajes.component';
import { ModelsModule } from './models/models.module';
import { ModelService } from './models/service/models.service';
import { PopupComponent } from './popup/popup.component';
import { DialogRecuperarComponent } from './recuperar/dialog/dialogRecuperar.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { RegistroComponent } from './registro/registro.component';
import { SharedModule } from './shared/shared.module';
import { NoticiasComponent } from './home/noticias/noticias.component';
import { EditIntcolorComponent } from './edit-modelo/edit-intcolor/edit-intcolor.component';
import { EditExtcolorComponent } from './edit-modelo/edit-extcolor/edit-extcolor.component';
import { EditTiresComponent } from './edit-modelo/edit-tires/edit-tires.component';
import { EditEngineComponent } from './edit-modelo/edit-engine/edit-engine.component';


registerLocaleData(localeEs);
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    CuentaComponent,
    AdministracionComponent,
    MarcaComponent,
    AddModeloComponent,
    ModeloComponent,
    PaqueteComponent,
    MotorComponent,
    ColorInteriorComponent,
    ColorExteriorComponent,
    LlantaComponent,
    EnvioComponent,
    ConfiguredCarComponent,
    PopupComponent,
    DialogComponent,
    DialogRecuperarComponent,
    DialogCambioComponent,
    CustomDatePipe,
      CalendarioComponent,
      RecuperarComponent,
      CambioContrasenaComponent,
      ContactoComponent,
      MensajesComponent,
      VerConfigComponent,
    DeleteModelComponent,
    EditModelComponent,
    EditModeloComponent,
    EditPackageComponent,
    EditIntcolorComponent,
    EditTiresComponent,
    EditExtcolorComponent,
    EditTiresComponent,
    EditEngineComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
    BrandsModule,
    ModelsModule,
    ModelsSelectionModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ConfiguradorModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HomeModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    PedirCitaModule,
    FinanciacionModule,
  ],
  exports: [
    SharedModule,
    BrandsModule,
    ModelsModule,
    ConfiguradorModule,
    ModelsSelectionModule,
  ],
  providers: [BrandService, ModelService, SelectedBrandService ,{ provide: LOCALE_ID, useValue: 'es-ES' }],
  bootstrap: [AppComponent],
})
export class AppModule { }
