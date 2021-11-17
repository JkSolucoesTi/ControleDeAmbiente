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
import { FlexLayoutModule } from '@angular/flex-layout';


import { AmbientesComponent, DialogLiberarAmbientComponent } from './Ambiente/ambientes/ambientes.component';
import { AlterarambientesComponent } from './Ambiente/alterarambientes/alterarambientes.component';
import { AdicionarambienteComponent } from './Ambiente/adicionarambiente/adicionarambiente.component';

@NgModule({
  declarations: [
    AppComponent,
    AmbientesComponent,
    AlterarambientesComponent,
    AdicionarambienteComponent,
    DialogLiberarAmbientComponent
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
    MatToolbarModule
  ],
  providers: [
    AmbienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
