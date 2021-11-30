import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component,Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Api } from 'src/app/model/api';
import { ApiService } from 'src/app/service/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-api',
  templateUrl: './listar-api.component.html',
  styleUrls: ['./listar-api.component.css']
})
export class ListarApiComponent implements OnInit {

  dataSource = new MatTableDataSource<Api>();
  displayedColumns:string[] = [];
  api:Api[]=[];
  erros:string[]=[];

  constructor(private apiService : ApiService,
              private dialog : MatDialog) { }

  ngOnInit(): void {
    this.apiService.ObterTodos().subscribe(resultado =>{
     this.dataSource.data = resultado;
    },erro =>{
      if(erro.status ==="400"){
        for(const campos in erro.error.errors){
        if(erro.error.errors.hasOwnProperty(campos)){
          this.erros.push(erro.error.errors[campos]);
        }
      }
    }else{
      this.erros.push("Não foi possível listar as API's");
    }
  })
    this.displayedColumns = this.ExibirColunas();
  }

  ExibirColunas():string[]{
    return ['nome','descricao','acoes'];
  }

  AbrirDialog(apiId:string,nomeApi:string){
    this.dialog.open(DialogExcluirApiComponent,{
      data:{
        apiId : apiId,
        nomeApi : nomeApi
      }
    }).afterClosed().subscribe(resultado => {
      this.apiService.ObterTodos().subscribe((resultado) => {      
        this.dataSource.data = resultado;
      });
      this.displayedColumns = this.ExibirColunas();
    });
  }
}

@Component({
  selector:"",
  templateUrl:"DialogExcluirApiComponent.html"
})

export class DialogExcluirApiComponent{
  constructor(@Inject (MAT_DIALOG_DATA) public data:any,
              private snackBar:MatSnackBar,
              private apiService: ApiService){}

  ExcluirApi(apiId:string){
    this.apiService.Excluir(apiId).subscribe(resultado =>{
      this.snackBar.open(resultado.mensagem,"Exclluir",{
        duration: 2000,
        horizontalPosition:'center',
        verticalPosition:'bottom'
      })
    })
  }
}
