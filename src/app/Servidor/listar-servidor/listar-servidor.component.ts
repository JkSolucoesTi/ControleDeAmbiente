import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Servidor } from 'src/app/model/servidor';
import { ServidorService } from 'src/app/service/servidor.service';

@Component({
  selector: 'app-listar-servidor',
  templateUrl: './listar-servidor.component.html',
  styleUrls: ['./listar-servidor.component.css']
})
export class ListarServidorComponent implements OnInit {

  dataSource = new MatTableDataSource<Servidor>();
  displayedColumns:string[] = [];
  erros : string[]=[];

  constructor(private servidorService : ServidorService,
    private dialog : MatDialog,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.servidorService.ObterTodos().subscribe( data => {
      this.dataSource.data = data
      console.log(data);
      this.displayedColumns = this.ExibirColunas();
    }, erro =>
      {
        if(erro.status === '400'){
          for(const campos in erro.error.errors)
          {
            if(erro.error.errors.hasOwnProperty(campos))
            {
              this.erros.push(erro.error.errors[campos])
            }
          }
        }else{
          this.erros.push("Não foi possível listar os servidores");
        }
      }
    )
  }

  ExibirColunas():string[]
  {
    return ['nome','dominio','acoes']
  }

  AbrirDialog(servidorId:string,servidorNome:string){
    this.dialog.open(DialogExcluirServidorComponent,{
      data:{
        servidorId : servidorId,
        servidorNome : servidorNome
      }
    }).afterClosed().subscribe(resultado => {
      if(resultado === true){
        this.servidorService.Excluir(servidorId).subscribe(resultado =>{
          this.snackBar.open(resultado.mensagem,"Excluir",{
            duration: 1000,
            horizontalPosition:'center',
            verticalPosition:'bottom'
          });
          this.servidorService.ObterTodos().subscribe((resultado) => {      
            this.dataSource.data = resultado;    
        });
      },erro => {
        if(erro === 400){
          this.snackBar.open(erro.mensagem,"Exclusao",{
            duration:1000,
            horizontalPosition:'center',
            verticalPosition:'bottom'
          });
        }else{
          this.erros.push("Ocorreu algum problem ao excluir o servidor")
        }
      });
      this.displayedColumns = this.ExibirColunas();
    }      
    });
  }

}

@Component({
  selector:"",
  templateUrl:"DialogExcluirServidorComponent.html"
})

export class DialogExcluirServidorComponent{
  constructor(@Inject (MAT_DIALOG_DATA) public data:any){}

  ExcluirServidor(servidorId:string,servidorNome:string){
  }
}