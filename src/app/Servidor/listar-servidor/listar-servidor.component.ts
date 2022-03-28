import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Servidor } from 'src/app/model/servidor';
import { ServidorService } from 'src/app/service/servidor.service';

@Component({
  selector: 'app-listar-servidor',
  templateUrl: './listar-servidor.component.html',
  styleUrls: ['./listar-servidor.component.css']
})
export class ListarServidorComponent implements OnInit {

  dataSource = new MatTableDataSource<Servidor>();
  displayedColumns:string[] = [];
  erros : string[]=[];

  constructor(private servidorService : ServidorService) { }

  ngOnInit(): void {
    this.servidorService.ObterTodos().subscribe( data => {
      this.dataSource.data = data
      this.displayedColumns = this.ExibirColunas();
    }, erro =>
      {
        if(erro.status === '400'){
          for(const campos in erro.error.errors)
          {
            if(erro.error.errors.hasOwnProperty(campos))
            {
              this.erros.push(erro.error.errors[campos])
            }
          }
        }else{
          this.erros.push("Não foi possível listar os servidores");
        }
      }
    )
  }

  ExibirColunas():string[]
  {
    return ['nome','dominio','acoes']
  }

  AbrirDialog(apiId:string,nomeApi:string){
  }

}
