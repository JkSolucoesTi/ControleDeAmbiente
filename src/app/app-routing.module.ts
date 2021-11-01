import { AlterarambientesComponent } from './Ambiente/alterarambientes/alterarambientes.component';
import { AmbientesComponent } from './Ambiente/ambientes/ambientes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarambienteComponent } from './Ambiente/adicionarambiente/adicionarambiente.component';

const routes: Routes = [
  {
    path:"ambientes",component:AmbientesComponent
  }
  ,
  {
    path:"ambientes/adicionar",component:AdicionarambienteComponent
  }
  ,
  {
    path:"ambientes/alterar/:id",component:AlterarambientesComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
