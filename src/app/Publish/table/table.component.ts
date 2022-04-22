import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Ambiente } from 'src/app/model/ambiente';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() ambientes!: any;
  displayedColumns:string[]=[];
  dataSource = new MatTableDataSource<Ambiente>();

  constructor() { 
  }

  ngOnInit(): void {   
    this.dataSource.data = this.ambientes;
    this.displayedColumns = this.ExibirColunas();
  }

  ExibirColunas():string[]{
    return ['nome','responsavel','acoes'];
  }

  AbrirSwagger(url:string){
    window.open(url ,"Ambiente")
  }

}
