import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Ambiente } from 'src/app/model/ambiente';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() dataSource = new MatTableDataSource<Ambiente>();
  @Input() displayedColumns:string[]=[];

  constructor() { }

  ngOnInit(): void {
  }

  AbrirSwagger(url:string){
    window.open(url ,"Ambiente")
  }

}
