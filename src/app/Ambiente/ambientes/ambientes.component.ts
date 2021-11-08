import { Ambiente } from '../../model/ambiente';
import { ConfiguracoesService } from '../../service/configuracoes.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ambientes',
  templateUrl: './ambientes.component.html',
  styleUrls: ['./ambientes.component.css']
})
export class AmbientesComponent implements OnInit {

  dataSource = new MatTableDataSource<Ambiente>();
  displayedColumns : string[] =[];
  erros!:string [];

  constructor(private ambiente: ConfiguracoesService,
              private dialog: MatDialog)
              { }

  ngOnInit(): void {
    this.erros = [];
    this.ambiente.GetAmbientesBackEnd().subscribe(resultado => {
      this.dataSource.data = resultado;
    },erro => {
      if(erro.status === '400'){
       for(const campos in erro.error.errors){
         if(erro.error.errors.hasOwnProperty(campos)){
           this.erros.push(erro.error.errors[campos])
         }
       }
      }
      else{
        this.erros.push('Estamos com problemas para acessar o dados dos ambientes')
      }
    }
  )
    this.displayedColumns = this.ExibirColunas();
  }

  ExibirColunas() :string[] {
    return  ['ambiente', 'chamado', 'descricao', 'api' , "ios" ,"android","acoes"];
  }

  AbrirDialog(ambienteId:any,ambiente:any){
    this.dialog.open(DialogLiberarAmbientComponent,{
      data:{
        ambienteId:ambienteId,
        ambiente:ambiente
      }
    }).afterClosed().subscribe(resultado => {
      if(resultado === true){
        this.ambiente.GetAmbientesBackEnd().subscribe((dados) => {
          this.dataSource.data = dados;
        });
      }
    });
    this.displayedColumns = this.ExibirColunas();
  }
}

@Component({
  selector: 'app-dialog-liberar-ambiente',
  templateUrl: 'dialog-liberar-ambiente.component.html',
})
export class DialogLiberarAmbientComponent {
  constructor( @Inject (MAT_DIALOG_DATA) public data: any ,
              private service : ConfiguracoesService,
              private snackBar : MatSnackBar) {}

    ambienteLiberado!:any;
    erros!:string [];

    LiberarAmbiente(ambienteId:any,ambiente:any):void{
    console.log(ambienteId,ambiente);
    this.ambienteLiberado = new Ambiente();
    this.ambienteLiberado.id = ambienteId.toString();
    this.ambienteLiberado.ambiente = ambiente.toString();
    this.ambienteLiberado.descricao = 'Ambiente Disponível';
    this.ambienteLiberado.api = "";
    this.ambienteLiberado.ios = "";
    this.ambienteLiberado.android = "";

    this.service.PutAmbienteBackEnd(this.ambienteLiberado,ambienteId).subscribe(resultado =>{
      this.snackBar.open("Ambiente liberado com sucesso","Ambiente",{
        duration:2000,
        horizontalPosition:'center',
        verticalPosition:'bottom'
      })
    },erro => {
      if(erro.status === '400'){
       for(const campos in erro.error.errors){
         if(erro.error.errors.hasOwnProperty(campos)){
           this.erros.push(erro.error.errors[campos])
         }
       }
      }
      else{
        this.erros.push(erro.error)
      }
    }
    )
  }
}





