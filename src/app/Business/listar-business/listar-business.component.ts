import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Negocio } from 'src/app/model/negocio';
import { NegocioService } from 'src/app/service/negocio.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-business',
  templateUrl: './listar-business.component.html',
  styleUrls: ['./listar-business.component.css']
})
export class ListarBusinessComponent implements OnInit {

  negocio!:Negocio[];
  dataSourceBusiness = new MatTableDataSource<Negocio>();
  displayedColumns!:string[];
  erros:string[]=[];

  constructor(private negocioService: NegocioService,
              private dialog : MatDialog,
              private route :Router) { }

  ngOnInit(): void {
    this.negocioService.ObterTodos().subscribe(resultado => {
      this.negocio = resultado;
      this.dataSourceBusiness.data = this.negocio.filter(x => x.nome != "Sem alocação");
    },erro =>{
      if(erro ==='400'){
        for(const campo in erro.error.errors){
          if(erro.error.errors[campo]){
            this.erros.push(erro.error.errors(campo))
          }
        }
      }else{
        this.erros.push("Não foi possível lista os Analista de Negocios");
      }
    })
    this.displayedColumns=this.ExibirColunas();
  }

  AbrirDialog(businessId:string ,businessNome:string){
    this.dialog.open(DialogExcluirBusinessComponent,{
      data:{
        businessId:businessId,
        businessNome : businessNome
      }
    }).afterClosed().subscribe(resultado => {      
        this.negocioService.ObterTodos().subscribe((resultado) => {   
        this.dataSourceBusiness.data = [];               
        this.dataSourceBusiness.data = resultado.filter(x => x.nome != "Sem alocação");;
      });      
    }); 
    this.displayedColumns = this.ExibirColunas();
  }
  ExibirColunas():string[]{
    return ['nome','email','acoes'];
  }
}

@Component({
  selector:"",
  templateUrl:"./DialogExcluirBusinessComponent.html"
})
export class DialogExcluirBusinessComponent{

  constructor(@Inject (MAT_DIALOG_DATA) public data:any ,
              private negocioService:NegocioService,
              private snackBar : MatSnackBar){
  }

  ExcluirNegocio(businessId:string){
    this.negocioService.Excluir(businessId).subscribe(resultado => {
      this.snackBar.open(resultado.mensagem,"Excluir",{
        duration:2000,
        horizontalPosition:'center',
        verticalPosition:'bottom'
      });
    });
  }
}