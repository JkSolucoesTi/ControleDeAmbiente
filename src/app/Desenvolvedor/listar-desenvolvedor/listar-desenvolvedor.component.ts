import { Ios } from './../../model/ios';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Android } from 'src/app/model/android';
import { Web } from 'src/app/model/web';
import { AndroidService } from 'src/app/service/android.service';
import { IosService } from 'src/app/service/ios.service';
import { WebService } from 'src/app/service/web.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
              private androidService: AndroidService,
              private snackBar : MatSnackBar,
              private dialog : MatDialog) { }

  ngOnInit(): void {

    this.webService.ObterTodos().subscribe(resultado =>{
     this.web = resultado;
      this.dataSourceWeb.data =  this.web.filter(x => x.nome != "Sem alocação");

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
      this.dataSourceIos.data =  this.ios.filter(x => x.nome != "Sem alocação");

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
      this.dataSourceAndroid.data = this.android.filter(x => x.nome != "Sem alocação");
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
    })
    this.displayedColumns = this.ExibirColunas();
  }

  AbrirDialog(desenvolvedorId:string, desenvolvedorNome:string, tipoDesenvolvedor:string){
    console.log("modal aberta")
    if(tipoDesenvolvedor === "web"){
      this.dialog.open(DialogExcluirDesenvolvedorComponent,{
        data:{
          desenvolvedorId: desenvolvedorId,
          desenvolvedorNome : desenvolvedorNome,
          desenvolvedorTipo : tipoDesenvolvedor
        }
      }).afterClosed().subscribe(resultado => {
        if(resultado === true){
          this.webService.Excluir(desenvolvedorId).subscribe(resultado =>{                 
            this.snackBar.open(resultado.mensagem,"Exclusão",{
              duration: 1000,
              horizontalPosition:'center',
              verticalPosition:'bottom'
              });               
              this.webService.ObterTodos().subscribe((resultado) => {                         
                this.dataSourceWeb.data =  resultado.filter(x => x.nome != "Sem alocação");                        
          },erro => {
            if(erro === 400){
              this.snackBar.open(erro.mensagem,"Exclusao",{
                duration:1000,
                horizontalPosition:'center',
                verticalPosition:'bottom'
              });
            }
            else{
              this.erros.push("Ocorreu algum problem ao excluir o desenvolvedor")
            }
          });     
        });        
        this.displayedColumns = this.ExibirColunas();
      }
      });    
    }
    if(tipoDesenvolvedor === "ios"){
      this.dialog.open(DialogExcluirDesenvolvedorComponent,{
        data:{
          desenvolvedorId: desenvolvedorId,
          desenvolvedorNome : desenvolvedorNome,
          desenvolvedorTipo : tipoDesenvolvedor
        }
      }).afterClosed().subscribe(resultado => {
        if(resultado === true){
          this.iosService.Excluir(desenvolvedorId).subscribe(resultado =>{
            this.snackBar.open(resultado.mensagem,"Exclusão",{
              duration: 1000,
              horizontalPosition:'center',
              verticalPosition:'bottom'
            });
            this.iosService.ObterTodos().subscribe((resultado) => {
            this.dataSourceIos.data =  resultado.filter(x => x.nome != "Sem alocação");        
          });
        },erro => {
          if(erro === 400){
            this.snackBar.open(erro.mensagem,"Exclusao",{
              duration:1000,
              horizontalPosition:'center',
              verticalPosition:'bottom'
            })
          }
          else{
            this.erros.push("Ocorreu algum problem ao excluir o desenvolvedor")
          }
        });
        this.displayedColumns = this.ExibirColunas();
      }
      });
    }
    if(tipoDesenvolvedor === "android"){
      this.dialog.open(DialogExcluirDesenvolvedorComponent,{
        data:{
          desenvolvedorId: desenvolvedorId,
          desenvolvedorNome : desenvolvedorNome,
          desenvolvedorTipo : tipoDesenvolvedor
        }
      }).afterClosed().subscribe(resultado => {
        if(resultado === true){
          this.androidService.Excluir(desenvolvedorId).subscribe(resultado =>{
            this.snackBar.open(resultado.mensagem,"Exclusão",{
              duration: 1000,
              horizontalPosition:'center',
              verticalPosition:'bottom'
            });
            this.androidService.ObterTodos().subscribe((resultado) => {
            this.dataSourceAndroid.data =  resultado.filter(x => x.nome != "Sem alocação");    
          });
        },erro => {
          if(erro === 400){
            this.snackBar.open(erro.mensagem,"Exclusao",{
              duration:1000,
              horizontalPosition:'center',
              verticalPosition:'bottom'
            })
          }
          else{
            this.erros.push("Ocorreu algum problem ao excluir o desenvolvedor")
          }
        });
        this.displayedColumns = this.ExibirColunas();
      }
      });
    }
  }

  ExibirColunas() :string[] {
    return  ['nome', 'login', 'email', 'acoes'];
  }
}

@Component({
  selector:"",
  templateUrl:"./DialogExcluirDesenvolvedorComponent.html",
})
export class DialogExcluirDesenvolvedorComponent{
  constructor(@Inject (MAT_DIALOG_DATA) public data:any ,
              private snackBar: MatSnackBar,
              private webServce:WebService,
              private iosService:IosService,
              private androidService:AndroidService){
  }

  LiberarAmbiente(desenvolvedorId:string,desenvolvedorTipo:string){
    console.log("modal aberta");
    if(desenvolvedorTipo === 'web')
    {
      console.log("Cheguei na exclusão web")
    }
    if(desenvolvedorTipo === 'ios')
    {

    }
    if(desenvolvedorTipo === 'android')
    {

    }
  }
}



