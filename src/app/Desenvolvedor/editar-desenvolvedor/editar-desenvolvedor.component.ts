import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Android } from 'src/app/model/android';
import { Ios } from 'src/app/model/ios';
import { Web } from 'src/app/model/web';
import { AndroidService } from 'src/app/service/android.service';
import { IosService } from 'src/app/service/ios.service';
import { WebService } from 'src/app/service/web.service';

@Component({
  selector: 'app-editar-desenvolvedor',
  templateUrl: './editar-desenvolvedor.component.html',
  styleUrls: ['./editar-desenvolvedor.component.css']
})
export class EditarDesenvolvedorComponent implements OnInit {

  dados!:any;
  formulario:any;
  tipoDev :string = "";
  parametro !: number;
  erros!:string[];

  constructor(private rota:ActivatedRoute,
              private router : Router,
              private androidService:AndroidService,
              private iosService:IosService,
              private webService:WebService,
              private snackBar : MatSnackBar) { }

  ngOnInit(): void {

    this.parametro = this.rota.snapshot.params.id;
    this.tipoDev = this.rota.snapshot.params.dev;
    if(this.tipoDev ==="ios"){
      this.iosService.ObterPorId(this.parametro).subscribe(resultado =>{
        this.dados as Ios;
        this.dados = resultado;

        this.formulario = new FormGroup({
          id : new FormControl(this.dados.id),
          nome : new FormControl(this.dados.nome,Validators.required),
          usuario : new FormControl(this.dados.usuario,Validators.required),
          email : new FormControl(this.dados.email,[Validators.required,Validators.email])
        })
      })
    }
    if(this.tipoDev ==="web"){
      this.webService.ObterPorId(this.parametro).subscribe(resultado =>{
        this.dados as Web;
        this.dados = resultado;
        console.log(resultado);
          this.formulario = new FormGroup({
            id : new FormControl(this.dados.id),
            nome : new FormControl(this.dados.nome,Validators.required),
            usuario : new FormControl(this.dados.usuario,Validators.required),
            email : new FormControl(this.dados.email,[Validators.required,Validators.email])
        })
      })
    }
    if(this.tipoDev ==="android"){
      this.androidService.ObterPorId(this.parametro).subscribe(resultado =>{
       this.dados as Android;
       this.dados = resultado;
       this.formulario = new FormGroup({
        id : new FormControl(this.dados.id),
        nome : new FormControl(this.dados.nome,Validators.required),
        usuario : new FormControl(this.dados.usuario,Validators.required),
        email : new FormControl(this.dados.email,[Validators.required,Validators.email])
      })
      })
    }
  }

get propriedade(){
    return this.formulario.controls;
  }

  AtualizarDesenvolvedor(){
    this.erros = [];
    const parametros = this.formulario.value;
    if(this.tipoDev == "web")
    {
      this.webService.Atualizar(parametros,this.parametro).subscribe(resultado =>{
          this.snackBar.open(resultado.mensagem,"Sucesso" , {
            duration : 1000,
            verticalPosition:'bottom',
            horizontalPosition:'center'
          })
          this.router.navigate(['desenvolvedores']);
      },erro => {
        if(erro.status === '400'){
         for(const campos in erro.error.errors){
           if(erro.error.errors.hasOwnProperty(campos)){
             this.erros.push(erro.error.errors[campos])
           }
         }
        }
        else{
          this.erros.push(erro.error)
        }
      })
    }
    if(this.tipoDev == "ios")
    {
      this.iosService.Atualizar(parametros,this.parametro).subscribe(resultado =>{
          this.snackBar.open(resultado.mensagem,"Sucesso" , {
            duration : 1000,
            verticalPosition:'bottom',
            horizontalPosition:'center'
          });
          this.router.navigate(['desenvolvedores']);
      },erro => {
        if(erro.status === '400'){
         for(const campos in erro.error.errors){
           if(erro.error.errors.hasOwnProperty(campos)){
             this.erros.push(erro.error.errors[campos])
           }
         }
        }
        else{
          this.erros.push(erro.error)
        }
      })
    }
    if(this.tipoDev == "android")
    {
      this.androidService.Atualizar(parametros,this.parametro).subscribe(resultado =>{
          this.snackBar.open(resultado.mensagem,"Sucesso" , {
            duration : 1000,
            verticalPosition:'bottom',
            horizontalPosition:'center'
          });
          this.router.navigate(['desenvolvedores']);
      },erro => {
        if(erro.status === '400'){
         for(const campos in erro.error.errors){
           if(erro.error.errors.hasOwnProperty(campos)){
             this.erros.push(erro.error.errors[campos])
           }
         }
        }
        else{
          this.erros.push(erro.error)
        }
      })
    }
  }

}
