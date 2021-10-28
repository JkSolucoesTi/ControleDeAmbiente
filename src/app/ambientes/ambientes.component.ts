import { Ambiente } from './../model/ambiente';
import { ConfiguracoesService } from './../service/configuracoes.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ambientes',
  templateUrl: './ambientes.component.html',
  styleUrls: ['./ambientes.component.css']
})
export class AmbientesComponent implements OnInit {

  nome : string = "Marco";
  path : string = "./assets/ambientes.json";
  dataSource = new MatTableDataSource<Ambiente>();
  displayedColumns : string[] =[];
  front!: Ambiente;

  constructor(private ambiente: ConfiguracoesService) { }

  ngOnInit(): void {

    this.ambiente.GetAmbientes(this.path).subscribe(resultado =>{
      this.dataSource.data = resultado;
      console.log(this.dataSource.data);
      this.displayedColumns = this.ExibirColunas();
    });
    this.displayedColumns = this.ExibirColunas();
  }

  ExibirColunas() :string[] {
    return  ['ambiente', 'chamado', 'descricao', 'api' , "ios" ,"android","acoes"];
  }

}



