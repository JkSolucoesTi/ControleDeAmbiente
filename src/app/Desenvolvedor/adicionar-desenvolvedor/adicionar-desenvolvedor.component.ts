import { WebService } from 'src/app/service/web.service';
import { IosService } from 'src/app/service/ios.service';
import { AndroidService } from 'src/app/service/android.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DesenvolvedorService } from 'src/app/service/desenvolvedor.service';
import { Tipo } from 'src/app/model/tipo';

@Component({
  selector: 'app-adicionar-desenvolvedor',
  templateUrl: './adicionar-desenvolvedor.component.html',
  styleUrls: ['./adicionar-desenvolvedor.component.css']
})
export class AdicionarDesenvolvedorComponent implements OnInit {

  tipo!:string;
  erros:string[] =[];
  rota!:string;
  formulario!:any;
  tipoDesenvolvedor:Tipo[]=[];

  constructor(private activatedRoute: ActivatedRoute,
              private desenvolvedorService: DesenvolvedorService,
              private androiService:AndroidService,
              private iosService:IosService,
              private werbService:WebService,
              private snackBar:MatSnackBar,
              private router :Router) { }

  ngOnInit(): void {
    this.rota = this.activatedRoute.snapshot.params.dev;
    this.tipo = this.rota.toUpperCase();
    this.desenvolvedorService.PegarTodosTipoDesenvolvedores().subscribe( data =>{
      this.tipoDesenvolvedor = data;
      console.log(data);
    })
    this.formulario = new FormGroup({
      nome : new FormControl('',[Validators.required,Validators.maxLength(50)]),
      usuario : new FormControl('',[Validators.required,Validators.maxLength(10)]),
      email : new FormControl('',[Validators.required,Validators.email, Validators.maxLength(50)]),
      tipo : new FormControl('',[Validators.required,Validators.minLength(1)])
    })
  }

  get propriedade(){
    return this.formulario.controls;
  }

  Adicionar(){
    this.erros = [];
    const parametros = this.formulario.value;

    if(this.rota == 'web'){
      this.werbService.Adicionar(parametros).subscribe(resultado =>{
        this.snackBar.open(resultado.mensagem,"Adicionar" , {
          duration:1000,
          verticalPosition:'bottom',
          horizontalPosition:'center'
        });
        this.router.navigate(['desenvolvedores']);

      },erro =>{
        if(erro === '400'){
          for(const campo in erro.error.erros){
            if(erro.error.errors.hasOwnProperty(campo)){
              this.erros.push(erro.error.errors[campo])
            }
          }
        }else{
          this.erros.push('Não foi possivel adicionar o desenvolvedor Web');
        }
      }
      )
    }
    if(this.rota == 'ios'){

      this.iosService.Adicionar(parametros).subscribe(resultado =>{
        this.snackBar.open(resultado.mensagem,"Adicionar" , {
          duration:1000,
          verticalPosition:'bottom',
          horizontalPosition:'center'
        });
        this.router.navigate(['desenvolvedores']);

      },erro =>{
        if(erro === '400'){
          for(const campo in erro.error.erros){
            if(erro.error.errors.hasOwnProperty(campo)){
              this.erros.push(erro.error.errors[campo])
            }
          }
        }else{
          this.erros.push('Não foi possivel adicionar o desenvolvedor  IOS');
        }
      }
      )

    }
    if(this.rota == 'android'){

      this.androiService.Adicionar(parametros).subscribe(resultado =>{
        this.snackBar.open(resultado.mensagem,"Adicionar" , {
          duration:1000,
          verticalPosition:'bottom',
          horizontalPosition:'center'
        });
        this.router.navigate(['desenvolvedores']);

      },erro =>{
        if(erro === '400'){
          for(const campo in erro.error.erros){
            if(erro.error.errors.hasOwnProperty(campo)){
              this.erros.push(erro.error.errors[campo])
            }
          }
        }else{
          this.erros.push('Não foi possivel adicionar o desenvolvedor Android');
        }
      }
      )
    }
  }
}
