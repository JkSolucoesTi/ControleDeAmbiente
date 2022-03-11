import { ChamadoService } from './../../service/chamado.service';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Chamado } from 'src/app/model/chamado';
import { Ambiente } from 'src/app/model/ambiente';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-chamado',
  templateUrl: './listar-chamado.component.html',
  styleUrls: ['./listar-chamado.component.css']
})
export class ListarChamadoComponent implements OnInit {

  dataSource1 = new MatTableDataSource<Chamado>();

  liberar = false;
  ocupados = false;

  displayedColumns!:string[];
  chamado!:Chamado[];
  erros!:string[];
  ambiente!:Ambiente[];

  constructor(private chamadoService:ChamadoService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
             ) { }

  ngOnInit(): void {
    this.erros = [];
    this.chamadoService.ObterTodos().subscribe(resultado => {      
      this.dataSource1.data = resultado//.filter(x => x.ativo == true);           
    },erro =>{
      if(erro ==='400'){
        for(const campo in erro.error.errors){
          if(erro.error.errors[campo]){
            this.erros.push(erro.error.errors(campo))
          }
        }
      }else{
        this.erros.push("Estamos com problemas para acessas os dados dos ambientes");
      }
    }
    );
    this.displayedColumns = this.ExibirColunas();
  }

  ExibirColunas():string[]{
    return ['detalhes','ambiente','requisicao','descricao','acoes']
  }

  Liberados(){
    if(this.liberar === false){
      this.liberar = true;     
      this.dataSource1.filter = "false";      
    }else{      
      this.dataSource1.filter = "";
      this.liberar = false; 
    }
  }

  Ocupados()
  {
    if(this.ocupados === false){
      this.ocupados = true;     
      this.dataSource1.filter = "true";      
    }else{      
      this.dataSource1.filter = "";
      this.ocupados = false; 
    }

  }  

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
          this.chamadoService.ObterTodos().subscribe((resultado) =>{
            this.dataSource1.data = resultado//.filter(x => x.ativo == true);                     
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
