import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Ambiente } from 'src/app/model/ambiente';
import { Servidor } from 'src/app/model/servidor';
import { ServidorService } from 'src/app/service/servidor.service';

@Component({
  selector: 'app-listar-ambiente',
  templateUrl: './listar-ambiente.component.html',
  styleUrls: ['./listar-ambiente.component.css']
})
export class ListarAmbienteComponent implements OnInit {

  displayedColumns:string[]=[];
  servidores : Servidor[]=[];

   

  constructor(private servidorService: ServidorService) { }

  ngOnInit(): void {

    this.servidorService.ObterTodos().subscribe( data =>{
      this.servidores = data;
      console.log(this.servidores);
    })
  }

  ExibirColunas():string[]{
    return ['nome','responsavel','acoes'];
  }

  AbrirSwagger(url:string){
    window.open(url ,"Ambiente")
  }

}
