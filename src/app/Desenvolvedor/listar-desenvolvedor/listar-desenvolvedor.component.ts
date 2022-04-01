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
import { Desenvolvedor } from 'src/app/model/desenvolvedor';
import { DesenvolvedorService } from 'src/app/service/desenvolvedor.service';

@Component({
  selector: 'app-listar-desenvolvedor',
  templateUrl: './listar-desenvolvedor.component.html',
  styleUrls: ['./listar-desenvolvedor.component.css']
})
export class ListarDesenvolvedorComponent implements OnInit {
  dataSourceDesenvolvedor = new MatTableDataSource<Desenvolvedor>();
  desenvolvedor!:Desenvolvedor[];
  displayedColumns : string[] =[];
  erros:string[]=[];

  constructor(private desenvolvedorService: DesenvolvedorService,              
              private snackBar : MatSnackBar,
              private dialog : MatDialog) { }

  ngOnInit(): void {

    this.desenvolvedorService.PegarTodos().subscribe( data =>{
      this.dataSourceDesenvolvedor.data = data.filter(x => x.nome != "Sem alocação");;
      console.log(data);      
    },erro => {
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
    })
    this.displayedColumns = this.ExibirColunas();
  }

  AbrirDialog(desenvolvedorId:string, desenvolvedorNome:string){
      this.dialog.open(DialogExcluirDesenvolvedorComponent,{
        data:{
          desenvolvedorId: desenvolvedorId,
          desenvolvedorNome : desenvolvedorNome,          
        }
      }).afterClosed().subscribe(resultado => {
        if(resultado === true){
          this.desenvolvedorService.Excluir(desenvolvedorId).subscribe(resultado =>{                 
            this.snackBar.open(resultado.mensagem,"Exclusão",{
              duration: 1000,
              horizontalPosition:'center',
              verticalPosition:'bottom'
              });               
              this.desenvolvedorService.PegarTodos().subscribe((resultado) => {                         
                this.dataSourceDesenvolvedor.data =  resultado.filter(x => x.nome != "Sem alocação");                        
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

  ExibirColunas() :string[] {
    return  ['nome', 'login', 'email','tipoDesenvolvedor', 'acoes'];
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

  LiberarAmbiente(desenvolvedorId:string){
  }
}



