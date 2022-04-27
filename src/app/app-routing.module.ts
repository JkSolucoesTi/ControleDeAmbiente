import { EditarChamadoComponent } from './Chamado/editar-chamado/editar-chamado.component';
import { AdicionarChamadoComponent } from './Chamado/adicionar-chamado/adicionar-chamado.component';
import { ListarChamadoComponent } from './Chamado/listar-chamado/listar-chamado.component';
import { AdicionarBusinessComponent } from './Business/adicionar-business/adicionar-business.component';
import { AdicionarDesenvolvedorComponent } from './Desenvolvedor/adicionar-desenvolvedor/adicionar-desenvolvedor.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarDesenvolvedorComponent } from './Desenvolvedor/listar-desenvolvedor/listar-desenvolvedor.component';
import { ListarBusinessComponent } from './Business/listar-business/listar-business.component';
import { EditarDesenvolvedorComponent } from './Desenvolvedor/editar-desenvolvedor/editar-desenvolvedor.component';
import { EditarBusinessComponent } from './Business/editar-business/editar-business.component';
import { AdicionarApiComponent } from './Api/adicionar-api/adicionar-api.component';
import { EditarApiComponent } from './Api/editar-api/editar-api.component';
import { ListarApiComponent } from './Api/listar-api/listar-api.component';
import { ListarAmbienteComponent } from './Publish/listar-ambiente/listar-ambiente.component';
import { LoginUsuarioComponent } from './Login/login-usuario/login-usuario.component';
import { UsuarioAutenticadoGuard } from './service/usuario-autenticado.guard';
import { ListarServidorComponent } from './Servidor/listar-servidor/listar-servidor.component';
import { AdicionarAmbienteComponent } from './Ambiente/adicionar-ambiente/adicionar-ambiente.component';
import { ListarAmbientesComponent } from './Ambiente/listar-ambientes/listar-ambientes.component';
import { AdicionarServidorComponent } from './Servidor/adicionar-servidor/adicionar-servidor.component';
import { EditarServidorComponent } from './Servidor/editar-servidor/editar-servidor.component';
import { EditarAmbienteComponent } from './Ambiente/editar-ambiente/editar-ambiente.component';

const routes: Routes = [
      {
        path:"", component:LoginUsuarioComponent
      }
      ,
      {
        path:"login", component:LoginUsuarioComponent
      }
      ,  
      {
    path:"",    
    component:DashboardComponent,
    canActivate:[UsuarioAutenticadoGuard],
    children:[
      {
        path:"publish",component:ListarAmbienteComponent
      }
      ,
      {
        path:"chamados",component:ListarChamadoComponent
      }
      ,
      {
        path:"chamados/adicionar",component:AdicionarChamadoComponent
      }
      ,
      {
        path:"chamados/adicionar/:id",component:AdicionarChamadoComponent
      }
      ,
      {
        path:"chamados/editar/:chamadoId",component:EditarChamadoComponent
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
        path:"desenvolvedores/alterar/:id",component:EditarDesenvolvedorComponent
      }
      ,
      {
        path:"desenvolvedores/adicionar",component:AdicionarDesenvolvedorComponent
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
      ,
      {
        path:"servidor",component:ListarServidorComponent
      }
      ,
      {
        path:"servidor/adicionar",component:AdicionarServidorComponent
      }
      ,
      {
        path:"servidor/alterar/:id",component:EditarServidorComponent
      }
      ,
      {
        path:"ambiente/adicionar",component:AdicionarAmbienteComponent
      },
      {
        path:"ambiente/listar",component:ListarAmbientesComponent
      },
      {
        path:"ambiente/alterar/:id",component:EditarAmbienteComponent
      }
      ]
    }      
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
