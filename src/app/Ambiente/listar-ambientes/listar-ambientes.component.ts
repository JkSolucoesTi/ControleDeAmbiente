import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private ambienteService : AmbienteService, private servidorService:ServidorService) { }

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

  ExibirColunas():string[]{
    return ['nome','dominio','acoes'];
  }

}
