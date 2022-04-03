import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule} from '@auth0/angular-jwt';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EndPoint } from './model/endpoint';
import {MatListModule} from '@angular/material/list';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { HeaderComponent } from './Dashboard/header/header.component';
import { ListarDesenvolvedorComponent , DialogExcluirDesenvolvedorComponent } from './Desenvolvedor/listar-desenvolvedor/listar-desenvolvedor.component';
import { AdicionarDesenvolvedorComponent } from './Desenvolvedor/adicionar-desenvolvedor/adicionar-desenvolvedor.component';
import { EditarDesenvolvedorComponent } from './Desenvolvedor/editar-desenvolvedor/editar-desenvolvedor.component';
import { ListarBusinessComponent , DialogExcluirBusinessComponent } from './Business/listar-business/listar-business.component';
import { EditarBusinessComponent } from './Business/editar-business/editar-business.component';
import { ListarApiComponent , DialogExcluirApiComponent} from './Api/listar-api/listar-api.component';
import { EditarApiComponent } from './Api/editar-api/editar-api.component';
import { AdicionarBusinessComponent } from './Business/adicionar-business/adicionar-business.component';
import { AdicionarApiComponent } from './Api/adicionar-api/adicionar-api.component';
import { ListarChamadoComponent , DialogLiberarChamadoComponent,DialogDetalheChamadoComponent} from './Chamado/listar-chamado/listar-chamado.component';
import { EditarChamadoComponent } from './Chamado/editar-chamado/editar-chamado.component';
import { AdicionarChamadoComponent } from './Chamado/adicionar-chamado/adicionar-chamado.component';
import { ChamadoService } from './service/chamado.service';
import { AndroidService } from './service/android.service';
import { WebService } from './service/web.service';
import { IosService } from './service/ios.service';
import { NegocioService } from './service/negocio.service';
import { NgxMaskModule , IConfig } from 'ngx-mask';
import { ListarAmbienteComponent } from './Publish/listar-ambiente/listar-ambiente.component';
import { LoginUsuarioComponent } from './Login/login-usuario/login-usuario.component';
import { UsuarioAutenticadoGuard } from './service/usuario-autenticado.guard';
import { TableComponent } from './Publish/table/table.component';
import { AdicionarServidorComponent } from './Servidor/adicionar-servidor/adicionar-servidor.component';
import { EditarServidorComponent } from './Servidor/editar-servidor/editar-servidor.component';
import { ListarServidorComponent , DialogExcluirServidorComponent } from './Servidor/listar-servidor/listar-servidor.component';
import { AdicionarAmbienteComponent } from './Ambiente/adicionar-ambiente/adicionar-ambiente.component';
import { ListarAmbientesComponent , DialogExcluirAmbienteComponent } from './Ambiente/listar-ambientes/listar-ambientes.component';
import { EditarAmbienteComponent } from './Ambiente/editar-ambiente/editar-ambiente.component';

const maskConfig: Partial<IConfig> ={
  validation:false,
}

export function tokenGetter() {
  return localStorage.getItem("access_token");
}


@NgModule({
  declarations: [
    AppComponent,
    DialogExcluirDesenvolvedorComponent,
    DialogExcluirBusinessComponent,
    DialogExcluirApiComponent,
    DialogLiberarChamadoComponent,
    DialogDetalheChamadoComponent,
    HeaderComponent,
    DashboardComponent,
    ListarDesenvolvedorComponent,
    AdicionarDesenvolvedorComponent,
    EditarDesenvolvedorComponent,
    ListarBusinessComponent,
    EditarBusinessComponent,
    ListarApiComponent,
    EditarApiComponent,
    AdicionarBusinessComponent,
    AdicionarApiComponent,
    ListarChamadoComponent,
    EditarChamadoComponent,
    AdicionarChamadoComponent,
    ListarAmbienteComponent,
    LoginUsuarioComponent,
    TableComponent,
    AdicionarServidorComponent,
    EditarServidorComponent,
    ListarServidorComponent,
    AdicionarAmbienteComponent,
    ListarAmbientesComponent,
    DialogExcluirServidorComponent,
    EditarAmbienteComponent,
    DialogExcluirAmbienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatTableModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDialogModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatTabsModule,
    MatCheckboxModule,
    MatExpansionModule,
    NgxMaskModule.forRoot(maskConfig),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [""],
        disallowedRoutes: [""],
      }
    })
  ],
  providers: [
    ChamadoService,
    AndroidService,
    WebService,
    IosService,
    NegocioService,
    EndPoint,
    UsuarioAutenticadoGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
