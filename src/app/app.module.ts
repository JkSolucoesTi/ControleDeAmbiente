import { ConfiguracoesService } from './service/configuracoes.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AmbientesComponent } from './Ambiente/ambientes/ambientes.component';
import { AlterarambientesComponent } from './Ambiente/alterarambientes/alterarambientes.component';
import { AdicionarambienteComponent } from './Ambiente/adicionarambiente/adicionarambiente.component';
import { ExcluirambienteComponent } from './Ambiente/excluirambiente/excluirambiente.component';

@NgModule({
  declarations: [
    AppComponent,
    AmbientesComponent,
    AlterarambientesComponent,
    AdicionarambienteComponent,
    ExcluirambienteComponent
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
    MatSnackBarModule
  ],
  providers: [
    ConfiguracoesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
