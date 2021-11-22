import { AdicionarBusinessComponent } from './Business/adicionar-business/adicionar-business.component';
import { AdicionarDesenvolvedorComponent } from './Desenvolvedor/adicionar-desenvolvedor/adicionar-desenvolvedor.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { AlterarambientesComponent } from './Ambiente/alterarambientes/alterarambientes.component';
import { AmbientesComponent } from './Ambiente/ambientes/ambientes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarambienteComponent } from './Ambiente/adicionarambiente/adicionarambiente.component';
import { AmbientesDetalheComponent } from './Ambiente/ambientes-detalhe/ambientes-detalhe.component';
import { ListarDesenvolvedorComponent } from './Desenvolvedor/listar-desenvolvedor/listar-desenvolvedor.component';
import { ListarBusinessComponent } from './Business/listar-business/listar-business.component';
import { EditarDesenvolvedorComponent } from './Desenvolvedor/editar-desenvolvedor/editar-desenvolvedor.component';
import { EditarBusinessComponent } from './Business/editar-business/editar-business.component';
import { AdicionarApiComponent } from './Api/adicionar-api/adicionar-api.component';
import { EditarApiComponent } from './Api/editar-api/editar-api.component';
import { ListarApiComponent } from './Api/listar-api/listar-api.component';

const routes: Routes = [
  {
    path:"",
    component:DashboardComponent,
    children:[
      {
        path:"ambientes",component:AmbientesComponent
      },
      {
        path:"ambientes-detalhes",component:AmbientesDetalheComponent
      }
      ,
      {
        path:"ambientes/adicionar",component:AdicionarambienteComponent
      }
      ,
      {
        path:"ambientes/alterar/:id",component:AlterarambientesComponent
      }
      ,
      {
        path:"business",component:ListarBusinessComponent
      }
      ,
      {
        path:"business/alterar/:id",component:EditarBusinessComponent
      }
      ,
      {
        path:"business/adicionar" , component:AdicionarBusinessComponent
      }
      ,
      {
        path:"desenvolvedores",component:ListarDesenvolvedorComponent
      }
      ,
      {
        path:"desenvolvedores/alterar/:id/:dev",component:EditarDesenvolvedorComponent
      }
      ,
      {
        path:"desenvolvedores/adicionar/:dev",component:AdicionarDesenvolvedorComponent
      }
      ,
      {
        path:"api",component:ListarApiComponent
      }
      ,
      {
        path:"api/alterar/:id",component:EditarApiComponent
      }
      ,
      {
        path:"api/adicionar",component:AdicionarApiComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
