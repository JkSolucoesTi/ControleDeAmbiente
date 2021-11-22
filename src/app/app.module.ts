import { AmbienteService } from './service/ambientes.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
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


import { AmbientesComponent, DialogLiberarAmbientComponent } from './Ambiente/ambientes/ambientes.component';
import { AlterarambientesComponent } from './Ambiente/alterarambientes/alterarambientes.component';
import { AdicionarambienteComponent } from './Ambiente/adicionarambiente/adicionarambiente.component';
import { AmbientesDetalheComponent } from './Ambiente/ambientes-detalhe/ambientes-detalhe.component';
import {MatListModule} from '@angular/material/list';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { HeaderComponent } from './Dashboard/header/header.component';
import { ListarDesenvolvedorComponent } from './Desenvolvedor/listar-desenvolvedor/listar-desenvolvedor.component';
import { AdicionarDesenvolvedorComponent } from './Desenvolvedor/adicionar-desenvolvedor/adicionar-desenvolvedor.component';
import { EditarDesenvolvedorComponent } from './Desenvolvedor/editar-desenvolvedor/editar-desenvolvedor.component';
import { ListarBusinessComponent } from './Business/listar-business/listar-business.component';
import { EditarBusinessComponent } from './Business/editar-business/editar-business.component';
import { ListarApiComponent } from './Api/listar-api/listar-api.component';
import { EditarApiComponent } from './Api/editar-api/editar-api.component';
import { AdicionarBusinessComponent } from './Business/adicionar-business/adicionar-business.component';
import { AdicionarApiComponent } from './Api/adicionar-api/adicionar-api.component';


@NgModule({
  declarations: [
    AppComponent,
    AmbientesComponent,
    AlterarambientesComponent,
    AdicionarambienteComponent,
    DialogLiberarAmbientComponent,
    AmbientesDetalheComponent,
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
    AdicionarApiComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    MatDialogModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule
  ],
  providers: [
    AmbienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
