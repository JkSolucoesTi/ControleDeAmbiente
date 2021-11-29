import { Ambiente } from '../../model/ambiente';
import { AmbienteService } from '../../service/ambientes.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ambientes',
  templateUrl: './ambientes.component.html',
  styleUrls: ['./ambientes.component.css']
})
export class AmbientesComponent implements OnInit {

  dataSource = new MatTableDataSource<Ambiente>();
  displayedColumns : string[] =[];
  erros!:string [];

  constructor(private ambiente: AmbienteService,
              private dialog: MatDialog,
              private router : Router)
              { }

  ngOnInit(): void {
    this.erros = [];
    this.ambiente.GetAmbientesBackEnd().subscribe(resultado => {
      this.dataSource.data = resultado;
      console.log(resultado);
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
    return  ['ambiente', 'chamado', 'descricao', 'api','web' , "ios" ,"android","business","acoes"];
  }

  AbrirDialog(ambienteId:any,ambiente:any){
    
  }
}





