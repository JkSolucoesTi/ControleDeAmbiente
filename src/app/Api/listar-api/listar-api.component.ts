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

  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
    this.apiService.ObterTodos().subscribe(resultado =>{
     this.dataSource.data = resultado;
    })

    this.displayedColumns = this.ExibirColunas();
  }

  ExibirColunas():string[]{
    return ['nome','descricao','acoes'];
  }

}
