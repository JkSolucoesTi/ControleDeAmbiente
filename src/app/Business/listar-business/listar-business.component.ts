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
  erros:string[]=[];

  constructor(private negocioService: NegocioService) { }

  ngOnInit(): void {
    this.negocioService.ObterTodos().subscribe(resultado => {
      this.negocio = resultado;
      this.dataSourceBusiness.data = this.negocio.splice(1);
    },erro =>{
      if(erro ==='400'){
        for(const campo in erro.error.errors){
          if(erro.error.errors[campo]){
            this.erros.push(erro.error.errors(campo))
          }
        }
      }else{
        this.erros.push("Não foi possível lista os Analista de Negocios");
      }
    }
    )

    this.displayedColumns=this.ExibirColunas();
  }

  ExibirColunas():string[]{
    return ['nome','email','acoes'];
  }

}
