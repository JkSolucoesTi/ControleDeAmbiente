import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Ambiente } from 'src/app/model/ambiente';
import { Servidor } from 'src/app/model/servidor';
import { AmbienteService } from 'src/app/service/ambientes.service';
import { ServidorService } from 'src/app/service/servidor.service';

@Component({
  selector: 'app-listar-ambientes',
  templateUrl: './listar-ambientes.component.html',
  styleUrls: ['./listar-ambientes.component.css']
})
export class ListarAmbientesComponent implements OnInit {

  dataSource = new MatTableDataSource<Ambiente>();
  displayedColumns: string[]=[];
  servidores:Servidor[]=[];
  erros:string[]=[];

  constructor(private ambienteService : AmbienteService, 
              private servidorService:ServidorService,
              private dialog : MatDialog,
              private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  
    this.servidorService.ObterTodos().subscribe( data =>{
      this.servidores = data;
      console.log(data);
    })
    this.ambienteService.ObterTodos().subscribe(data =>{
      this.dataSource.data = data;
      console.log(data);
      this.displayedColumns= this.ExibirColunas();
    },erro =>{
      if(erro === '400'){
        for(const campos in erro.error.errors){
          if(erro.error.errors.hasOwnProperty[campos]){
            this.erros.push(erro.error.errors(campos))
          }
        }
      }
      else{
        this.erros.push('Não foi possível carregar as informações');
      }
    })
  }
  AbrirDialog(ambienteId:string,ambienteNome:string){
    this.dialog.open(DialogExcluirAmbienteComponent,{
      data:{
        ambienteId : ambienteId,
        ambienteNome : ambienteNome
      }
    }).afterClosed().subscribe(resultado => {
      if(resultado === true){
        this.ambienteService.Excluir(ambienteId).subscribe(resultado =>{
          this.snackBar.open(resultado.mensagem,"Excluir",{
            duration: 1000,
            horizontalPosition:'center',
            verticalPosition:'bottom'
          });
          this.ambienteService.ObterTodos().subscribe((resultado) => {      
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

  ExibirColunas():string[]{
    return ['nome','dominio','acoes'];
  }

}

@Component({
  selector:"",
  templateUrl:"DialogExcluirAmbienteComponent.html"
})

export class DialogExcluirAmbienteComponent{
  constructor(@Inject (MAT_DIALOG_DATA) public data:any){}

  ExcluirAmbiente(ambienteId:string,ambienteNome:string){
  }
}
