import { AlterarambientesComponent } from './alterarambientes/alterarambientes.component';
import { AmbientesComponent } from './ambientes/ambientes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"ambientes",component:AmbientesComponent
  }
  ,
  {
    path:"ambientes/alterar/:ambiente",component:AlterarambientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
