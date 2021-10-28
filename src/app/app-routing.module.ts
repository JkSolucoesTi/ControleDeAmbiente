import { AlterarambientesComponent } from './Ambiente/alterarambientes/alterarambientes.component';
import { AmbientesComponent } from './Ambiente/ambientes/ambientes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarambienteComponent } from './Ambiente/adicionarambiente/adicionarambiente.component';
import { ExcluirambienteComponent } from './Ambiente/excluirambiente/excluirambiente.component';

const routes: Routes = [
  {
    path:"ambientes",component:AmbientesComponent
  }
  ,
  {
    path:"ambientes/alterar/:ambiente",component:AlterarambientesComponent
  }
  ,
  {
    path:"ambientes/excluir/:ambiente",component:ExcluirambienteComponent
  }
  ,
  {
    path:"ambientes/adicionar",component:AdicionarambienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
