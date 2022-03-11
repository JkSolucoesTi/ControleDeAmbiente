import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Ambiente } from 'src/app/model/ambiente';

@Component({
  selector: 'app-listar-ambiente',
  templateUrl: './listar-ambiente.component.html',
  styleUrls: ['./listar-ambiente.component.css']
})
export class ListarAmbienteComponent implements OnInit {

  
  dataSource = new MatTableDataSource<Ambiente>();
  displayedColumns:string[]=[];

   ambientes: Ambiente[] = [    
     {ambienteId:"1", nome:"DEV 1", link:"http://sdaysp06qa009/desenvolvimento/dayconnect/dev1/api/default/swagger/ui/index"},
     {ambienteId:"2",nome:"DEV 2", link:"http://sdaysp06qa009/desenvolvimento/dayconnect/dev2/api/default/swagger/ui/index"},
     {ambienteId:"3",nome:"DEV 3", link:"http://sdaysp06qa009/desenvolvimento/dayconnect/dev3/api/default/swagger/ui/index"},
     {ambienteId:"4",nome:"DEV 4", link:"http://sdaysp06qa009/desenvolvimento/dayconnect/dev4/api/default/swagger/ui/index"},
     {ambienteId:"5",nome:"DEV 5", link:"http://sdaysp06qa009/desenvolvimento/dayconnect/dev5/api/default/swagger/ui/index"},
     {ambienteId:"6",nome:"DEV 6", link:"http://sdaysp06qa009/desenvolvimento/dayconnect/dev6/api/default/swagger/ui/index"},
     {ambienteId:"7",nome:"DEV 7", link:"http://sdaysp06qa009/desenvolvimento/dayconnect/dev7/api/default/swagger/ui/index"},
     {ambienteId:"8",nome:"DEV 8", link:"http://sdaysp06qa009/desenvolvimento/dayconnect/dev8/api/default/swagger/ui/index"},
     {ambienteId:"9",nome:"DEV 9", link:"http://sdaysp06qa009/desenvolvimento/dayconnect/dev9/api/default/swagger/ui/index"},
     {ambienteId:"10",nome:"DEV 10", link:"http://sdaysp06qa009/desenvolvimento/dayconnect/dev10/api/default/swagger/ui/index"},
  ];


  constructor() { }

  ngOnInit(): void {

    this.dataSource.data = this.ambientes;
    this.displayedColumns = this.ExibirColunas();
  }

  ExibirColunas():string[]{
    return ['nome','link','acoes'];
  }

  AbrirSwagger(url:string){
    window.open(url ,"Ambiente")
  }

}
