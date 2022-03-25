import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Ambiente } from 'src/app/model/ambiente';

@Component({
  selector: 'app-listar-ambiente',
  templateUrl: './listar-ambiente.component.html',
  styleUrls: ['./listar-ambiente.component.css']
})
export class ListarAmbienteComponent implements OnInit {

  panelOpenState = false;
  panelOpenState1 = false;
  panelOpenState2 = false;
  panelOpenState3 = false;
  panelOpenState4 = false;
  dataSource = new MatTableDataSource<Ambiente>();
  dataSourceDayconnect = new MatTableDataSource<Ambiente>();
  displayedColumns:string[]=[];

   ambientes: Ambiente[] = [    
     {ambienteId:"1", nome:"DEV 1", responsavel:"", link:"http://sdaysp06qa009/desenvolvimento/dayconnect/dev1/api/default/swagger/ui/index"},
     {ambienteId:"2",nome:"DEV 2",responsavel:"", link:"http://sdaysp06qa009/desenvolvimento/dayconnect/dev2/api/default/swagger/ui/index"},
     {ambienteId:"3",nome:"DEV 3",responsavel:"", link:"http://sdaysp06qa009/desenvolvimento/dayconnect/dev3/api/default/swagger/ui/index"},
     {ambienteId:"4",nome:"DEV 4",responsavel:"", link:"http://sdaysp06qa009/desenvolvimento/dayconnect/dev4/api/default/swagger/ui/index"},
     {ambienteId:"5",nome:"DEV 5",responsavel:"", link:"http://sdaysp06qa009/desenvolvimento/dayconnect/dev5/api/default/swagger/ui/index"},
     {ambienteId:"6",nome:"DEV 6", responsavel:"",link:"http://sdaysp06qa009/desenvolvimento/dayconnect/dev6/api/default/swagger/ui/index"},
     {ambienteId:"7",nome:"DEV 7",responsavel:"", link:"http://sdaysp06qa009/desenvolvimento/dayconnect/dev7/api/default/swagger/ui/index"},
     {ambienteId:"8",nome:"DEV 8",responsavel:"", link:"http://sdaysp06qa009/desenvolvimento/dayconnect/dev8/api/default/swagger/ui/index"},
     {ambienteId:"9",nome:"DEV 9",responsavel:"", link:"http://sdaysp06qa009/desenvolvimento/dayconnect/dev9/api/default/swagger/ui/index"},
     {ambienteId:"10",nome:"DEV 10",responsavel:"", link:"http://sdaysp06qa009/desenvolvimento/dayconnect/dev10/api/default/swagger/ui/index"},
  ];

  dayconnect: Ambiente[] =[
    {ambienteId:"1", nome:"DayconnectDesenv01",responsavel:"Aline", link:"http://sdaysp06d044:8001/"},
    {ambienteId:"2", nome:"DayconnectDesenv02", responsavel:"Carlos",link:"http://sdaysp06d044:8002/"},
    {ambienteId:"3", nome:"DayconnectDesenv03",responsavel:"Caroline", link:"http://sdaysp06d044:8003/"},
    {ambienteId:"4", nome:"DayconnectDesenv04",responsavel:"Ciro", link:"http://sdaysp06d044:8004/"},
    {ambienteId:"5", nome:"DayconnectDesenv05",responsavel:"Claudio", link:"http://sdaysp06d044:8005/"},
    {ambienteId:"6", nome:"DayconnectDesenv06",responsavel:"Douglas", link:"http://sdaysp06d044:8006/"},
    {ambienteId:"7", nome:"DayconnectDesenv07",responsavel:"Karine", link:"http://sdaysp06d044:8007/"},
    {ambienteId:"8", nome:"DayconnectDesenv08",responsavel:"Levi", link:"http://sdaysp06d044:8008/"},
    {ambienteId:"9", nome:"DayconnectDesenv09",responsavel:"Marco", link:"http://sdaysp06d044:8009/"},
    {ambienteId:"10", nome:"DayconnectDesenv10",responsavel:"Marcelo", link:"http://sdaysp06d044:8010/"},
    {ambienteId:"11", nome:"DayconnectDesenv11",responsavel:"Michele", link:"http://sdaysp06d044:8011/"},
    {ambienteId:"12", nome:"DayconnectDesenv12",responsavel:"Rafael", link:"http://sdaysp06d044:8012/"},
    {ambienteId:"13", nome:"DayconnectDesenv13",responsavel:"", link:"http://sdaysp06d044:8013/"},
    {ambienteId:"14", nome:"DayconnectDesenv14",responsavel:"", link:"http://sdaysp06d044:8014/"},
    {ambienteId:"15", nome:"DayconnectDesenv15",responsavel:"", link:"http://sdaysp06d044:8015/"}
  ]

  constructor() { }

  ngOnInit(): void {
    this.dataSource.data = this.ambientes;
    this.dataSourceDayconnect.data = this.dayconnect;
    this.displayedColumns = this.ExibirColunas();
  }

  ExibirColunas():string[]{
    return ['nome','responsavel','acoes'];
  }

  AbrirSwagger(url:string){
    window.open(url ,"Ambiente")
  }

}
