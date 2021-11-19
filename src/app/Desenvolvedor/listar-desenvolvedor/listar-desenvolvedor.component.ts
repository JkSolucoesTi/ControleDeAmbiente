import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Android } from 'src/app/model/android';
import { Ios } from 'src/app/model/ios';
import { Web } from 'src/app/model/web';
import { AndroidService } from 'src/app/service/android.service';
import { IosService } from 'src/app/service/ios.service';
import { WebService } from 'src/app/service/web.service';

@Component({
  selector: 'app-listar-desenvolvedor',
  templateUrl: './listar-desenvolvedor.component.html',
  styleUrls: ['./listar-desenvolvedor.component.css']
})
export class ListarDesenvolvedorComponent implements OnInit {

  dataSourceWeb = new MatTableDataSource<Web>();
  dataSourceIos = new MatTableDataSource<Ios>();
  dataSourceAndroid = new MatTableDataSource<Android>();

  web!:Web[];
  ios!:Ios[];
  android!:Android[];

  displayedColumns : string[] =[];
 
  constructor(private webService: WebService,
              private iosService: IosService,
              private androidService: AndroidService) { }

  ngOnInit(): void {

    this.webService.ObterTodos().subscribe(resultado =>{
     this.web = resultado;
      this.dataSourceWeb.data =  this.web.splice(1);
      
      console.log(resultado);
    });
    this.iosService.ObterTodos().subscribe(resultado =>{
      this.ios = resultado;
      this.dataSourceIos.data =  this.ios.splice(1);

    });
    this.androidService.ObterTodos().subscribe(resultado =>{
      this.android = resultado;
      this.dataSourceAndroid.data = this.android.splice(1);
    });

    this.displayedColumns = this.ExibirColunas();
  }

  ExibirColunas() :string[] {
    return  ['nome', 'login', 'email', 'acoes'];
  }
 
}
