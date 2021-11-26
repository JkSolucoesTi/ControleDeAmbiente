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
  erros:string[]=[];
 
  constructor(private webService: WebService,
              private iosService: IosService,
              private androidService: AndroidService) { }

  ngOnInit(): void {

    this.webService.ObterTodos().subscribe(resultado =>{
     this.web = resultado;
      this.dataSourceWeb.data =  this.web.splice(1);      
      
    } ,erro => {
      if(erro.status === '400'){
       for(const campos in erro.error.errors){
         if(erro.error.errors.hasOwnProperty(campos)){
           this.erros.push(erro.error.errors[campos])
         }
       }
      }
      else{
        this.erros.push('Não foi possível listar os desenvolvedores Web')
      }
    }
    )
  
    
    this.iosService.ObterTodos().subscribe(resultado =>{
      this.ios = resultado;
      this.dataSourceIos.data =  this.ios.splice(1);

    } ,erro => {
      if(erro.status === '400'){
       for(const campos in erro.error.errors){
         if(erro.error.errors.hasOwnProperty(campos)){
           this.erros.push(erro.error.errors[campos])
         }
       }
      }
      else{
        this.erros.push('Não foi possível listar os desenvolvedores IOS')
      }
    }
    )
    this.androidService.ObterTodos().subscribe(resultado =>{
      this.android = resultado;
      this.dataSourceAndroid.data = this.android.splice(1);
    } ,erro => {
      if(erro.status === '400'){
       for(const campos in erro.error.errors){
         if(erro.error.errors.hasOwnProperty(campos)){
           this.erros.push(erro.error.errors[campos])
         }
       }
      }
      else{
        this.erros.push('Não foi possível listar os desenvolvedores Android')
      }
    }
    )

    this.displayedColumns = this.ExibirColunas();
  }

  ExibirColunas() :string[] {
    return  ['nome', 'login', 'email', 'acoes'];
  }
 
}
