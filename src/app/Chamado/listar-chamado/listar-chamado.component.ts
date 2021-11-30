import { ChamadoService } from './../../service/chamado.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Inject, OnInit } from '@angular/core';
import { Chamado } from 'src/app/model/chamado';
import { Ambiente } from 'src/app/model/ambiente';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-chamado',
  templateUrl: './listar-chamado.component.html',
  styleUrls: ['./listar-chamado.component.css']
})
export class ListarChamadoComponent implements OnInit {

  dataSource = new MatTableDataSource<Chamado>();
  dataSource1 = new MatTableDataSource<Chamado>();
  dataSource2 = new MatTableDataSource<Chamado>();
  dataSource3 = new MatTableDataSource<Chamado>();
  dataSource4 = new MatTableDataSource<Chamado>();
  dataSource5 = new MatTableDataSource<Chamado>();
  dataSource6 = new MatTableDataSource<Chamado>();
  dataSource7 = new MatTableDataSource<Chamado>();
  dataSource8 = new MatTableDataSource<Chamado>();
  dataSource9 = new MatTableDataSource<Chamado>();
  dataSource10 = new MatTableDataSource<Chamado>();
  dataSource11 = new MatTableDataSource<Chamado>();

  displayedColumns!:string[];
  chamado!:Chamado[];
  erros!:string[];
  ambiente!:Ambiente[];

  constructor(private chamadoService:ChamadoService,
              private dialog: MatDialog,
              private router : Router) { }

  ngOnInit(): void {
    this.erros = [];
    this.chamadoService.ObterTodos().subscribe(resultado => {
      this.dataSource.data = resultado;
      this.dataSource1.data = resultado.filter(x => x.ambiente.nome === 'DEV 01');
      this.dataSource2.data = resultado.filter(x => x.ambiente.nome === 'DEV 02');
      this.dataSource3.data = resultado.filter(x => x.ambiente.nome === 'DEV 03');
      this.dataSource4.data = resultado.filter(x => x.ambiente.nome === 'DEV 04');
      this.dataSource5.data = resultado.filter(x => x.ambiente.nome === 'DEV 05');
      this.dataSource6.data = resultado.filter(x => x.ambiente.nome === 'DEV 06');
      this.dataSource7.data = resultado.filter(x => x.ambiente.nome === 'DEV 07');
      this.dataSource8.data = resultado.filter(x => x.ambiente.nome === 'DEV 08');
      this.dataSource9.data = resultado.filter(x => x.ambiente.nome === 'DEV 09');
      this.dataSource10.data = resultado.filter(x => x.ambiente.nome === 'DEV 10');
      this.dataSource11.data = resultado.filter(x => x.ambiente.nome === 'DEV 11');
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
    return ['numero','api','web','ios','android','business','acoes']
  }

  AbrirDialog(ambienteId:any,apiId:any){
    this.dialog.open(DialogLiberarAmbientComponent,{
      data:{
        ambienteId:ambienteId,
        apiId:apiId
      }
    }).afterClosed().subscribe(resultado => {
          this.chamadoService.ObterTodos().subscribe((resultado) =>{
            this.dataSource.data = resultado;
            this.dataSource1.data = resultado.filter(x => x.ambiente.nome === 'DEV 01');
            this.dataSource2.data = resultado.filter(x => x.ambiente.nome === 'DEV 02');
            this.dataSource3.data = resultado.filter(x => x.ambiente.nome === 'DEV 03');
            this.dataSource4.data = resultado.filter(x => x.ambiente.nome === 'DEV 04');
            this.dataSource5.data = resultado.filter(x => x.ambiente.nome === 'DEV 05');
            this.dataSource6.data = resultado.filter(x => x.ambiente.nome === 'DEV 06');
            this.dataSource7.data = resultado.filter(x => x.ambiente.nome === 'DEV 07');
            this.dataSource8.data = resultado.filter(x => x.ambiente.nome === 'DEV 08');
            this.dataSource9.data = resultado.filter(x => x.ambiente.nome === 'DEV 09');
            this.dataSource10.data = resultado.filter(x => x.ambiente.nome === 'DEV 10');
            this.dataSource11.data = resultado.filter(x => x.ambiente.nome === 'DEV 11');
          });
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
              private chamadoService : ChamadoService,
              private router : Router,
              private snackBar : MatSnackBar) {}

   LiberarAmbiente(ambienteId:string,apiId:string){
     console.log(ambienteId,apiId)
     this.chamadoService.LiberarAmbiente(ambienteId,apiId).subscribe(resultado =>{
      this.snackBar.open(resultado.mensagem,"Liberar Ambiente", {
        duration : 2000,
        horizontalPosition:'center',
        verticalPosition:'bottom'
      });
     })
    }

  ExibirColunas():string[]{
    return ['numero','api','web','ios','android','business','acoes']
  }
}
