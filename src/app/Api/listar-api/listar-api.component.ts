import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Api } from 'src/app/model/api';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-listar-api',
  templateUrl: './listar-api.component.html',
  styleUrls: ['./listar-api.component.css']
})
export class ListarApiComponent implements OnInit {

  dataSource = new MatTableDataSource<Api>();
  displayedColumns:string[] = [];
  api!:Api[];
  erros:string[]=[];

  constructor(private apiService : ApiService) { }

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

}
