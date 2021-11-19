import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Negocio } from 'src/app/model/negocio';
import { NegocioService } from 'src/app/service/negocio.service';

@Component({
  selector: 'app-listar-business',
  templateUrl: './listar-business.component.html',
  styleUrls: ['./listar-business.component.css']
})
export class ListarBusinessComponent implements OnInit {

  negocio!:Negocio[];
  dataSourceBusiness = new MatTableDataSource<Negocio>();
  displayedColumns!:string[];

  constructor(private negocioService: NegocioService) { }

  ngOnInit(): void {
    this.negocioService.ObterTodos().subscribe(resultado => {
      this.negocio = resultado;
      this.dataSourceBusiness.data = this.negocio.splice(1);
    })

    this.displayedColumns=this.ExibirColunas();
  }

  ExibirColunas():string[]{
    return ['nome','email','acoes'];
  }

}
