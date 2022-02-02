import { Component, Inject, OnInit } from '@angular/core';
import { ChamadoService } from 'src/app/service/chamado.service';

@Component({
  selector: 'app-listar-chamado',
  templateUrl: './listar-chamado.component.html',
  styleUrls: ['./listar-chamado.component.css']
})
export class ListarChamadoComponent implements OnInit{

  constructor(private chamadoService:ChamadoService) { }  

    ngOnInit(){
      this.chamadoService.ObterChamadosApi().subscribe(resultado => {
        console.log(resultado);
      })
  }
}


/*
  AbrirDialog(ambienteId:any,apiId:any){
    this.dialog.open(DialogLiberarChamadoComponent,{
      data:{
        ambienteId:ambienteId,
        apiId:apiId
      }
    }).afterClosed().subscribe(resultado => {
      if(resultado === true){
        this.chamadoService.LiberarAmbiente(ambienteId,apiId).subscribe(resultado =>{
          this.snackBar.open(resultado.mensagem,"Liberar Ambiente", {
            duration : 2000,
            horizontalPosition:'center',
            verticalPosition:'bottom'
          });
          this.chamadoService.ObterChamadosApi().subscribe((resultado) =>{
          });
         })
        }
    },erro => {
      if(erro === 400){
        this.snackBar.open(erro.mensagem,"Exclusao",{
          duration:1000,
          horizontalPosition:'center',
          verticalPosition:'bottom'
        });
      }else{
        this.erros.push("Houve algum problema ao liberar o ambiente selecionado");
      }
    });
    this.displayedColumns = this.ExibirColunas();
  }

  AbrirDetalhe(numeroChamado:string,nomeAmbiente:string){
    
    this.chamadoService.Detahes(numeroChamado,nomeAmbiente).subscribe(resultado =>{

      const valores = resultado;
      this.dialog.open(DialogDetalheChamadoComponent,{
        width:'600px',
        height:'330px',
        data :{
          numero : valores.numero,
          api : valores.api.nome,
          nomeWeb : valores.web.nome,
          reqWeb : valores.chamadoWeb,
          nomeIos : valores.ios.nome,
          reqIos : valores.chamadoIos,
          nomeAndroid : valores.android.nome,
          reqAndroid: valores.chamadoAndroid
        }
      }
      )
    })
  }     
}
@Component({
  selector: 'app-dialog-liberar-ambiente',
  templateUrl: 'dialog-liberar-chamado.component.html',
})
export class DialogLiberarChamadoComponent {
  constructor( @Inject (MAT_DIALOG_DATA) public data: any) {}

   LiberarAmbiente(ambienteId:string,apiId:string){     
    }

  ExibirColunas():string[]{
    return ['numero','api','web','ios','android','business','acoes']
  }
}

@Component({
  selector: 'app-dialog-detalhe-chamado',
  templateUrl: 'dialog-detalhe-chamado.component.html',
  styleUrls: ['./listar-chamado.component.css']
})
export class DialogDetalheChamadoComponent {
  constructor( @Inject (MAT_DIALOG_DATA) public info: any) {}

  ELEMENTOS_DATA : ModalDetalhes[] =
  [ {desenvolvedor : this.info.nomeWeb, chamado : this.info.reqWeb},
    {desenvolvedor : this.info.nomeIos, chamado : this.info.reqIos},
    {desenvolvedor : this.info.nomeAndroid, chamado : this.info.reqAndroid}
  ]
  
  dataSource = this.ELEMENTOS_DATA;

  displayedColumns: string[] =['chamado','desenvolvedor']
}

export interface ModalDetalhes{
  chamado:string;
  desenvolvedor:string;
}
*/