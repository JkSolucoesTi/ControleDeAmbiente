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
        path:"desenvolvedores",component:ListarDesenvolvedorComponent
      }
      ,
      {
        path:"business",component:ListarBusinessComponent
      }
      ,
      {
        path:"desenvolvedores/alterar/:id/:dev",component:EditarDesenvolvedorComponent
      }
      ,
      {
        path:"business/alterar/:id",component:EditarBusinessComponent
      }
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
