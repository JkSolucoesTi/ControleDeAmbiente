import { ChamadoService } from './../../service/chamado.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { Chamado } from 'src/app/model/chamado';
import { Ambiente } from 'src/app/model/ambiente';
import { AmbienteService } from 'src/app/service/ambientes.service';

@Component({
  selector: 'app-listar-chamado',
  templateUrl: './listar-chamado.component.html',
  styleUrls: ['./listar-chamado.component.css']
})
export class ListarChamadoComponent implements OnInit {

  dataSource = new MatTableDataSource<Chamado>();
  displayedColumns!:string[];
  chamado!:Chamado[];
  erros!:string[];
  ambiente!:Ambiente[];

  constructor(private chamadoService:ChamadoService,
              private ambienteService:AmbienteService) { }

  ngOnInit(): void {
    this.erros = [];
    this.ambienteService.ObterTodos().subscribe(resultado =>{
      this.ambiente = resultado;
      console.log(this.ambiente);
    })
    this.chamadoService.ObterTodos().subscribe(resultado => {
      this.dataSource.data = resultado;
      console.log(resultado);
    },erro =>{
      if(erro ==='400'){
        for(const campo in erro.error.errors){
          if(erro.error.errors[campo]){
            this.erros.push(erro.error.errors(campo))
          }
        }
      }
    }
    );
    this.displayedColumns = this.ExibirColunas();
  }

  ExibirColunas():string[]{
    return ['ambiente','numero','api','web','ios','android','business']
  }

}
