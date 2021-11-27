import { WebService } from '../../service/web.service';
import { IosService } from './../../service/ios.service';
import { AndroidService } from './../../service/android.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Ambiente } from 'src/app/model/ambiente';
import { Android } from 'src/app/model/android';
import { AmbienteService } from 'src/app/service/ambientes.service';
import { Web } from 'src/app/model/web';
import { Ios } from 'src/app/model/ios';
import { Negocio } from 'src/app/model/negocio';
import { NegocioService } from 'src/app/service/negocio.service';

@Component({
  selector: 'app-adicionarambiente',
  templateUrl: './adicionarambiente.component.html',
  styleUrls: ['./adicionarambiente.component.css']
})
export class AdicionarambienteComponent implements OnInit {

  formulario!:any;
  erros!:string[];
  novoAmbiente!:Ambiente;
  android!:Android[];
  web!:Web[];
  ios!:Ios[];
  negocio!:Negocio[];

  constructor(private http : AmbienteService,
              private androidService : AndroidService,
              private iosService: IosService,
              private webService: WebService,
              private negocioService : NegocioService,
              private snackBar: MatSnackBar,
              private router : Router) { }

  ngOnInit(): void {
    this.androidService.ObterTodos().subscribe(dados =>{
      this.android = dados;
    });
    this.iosService.ObterTodos().subscribe(dados =>{
      this.ios = dados;
    });
    this.webService.ObterTodos().subscribe(dados =>{
      this.web = dados;
    });
    this.negocioService.ObterTodos().subscribe(dados =>{
      this.negocio = dados;
    });

    this.formulario = new FormGroup({
      nome : new FormControl('',[Validators.required,Validators.minLength(1)]),
      chamado : new FormControl('',[Validators.required,Validators.minLength(1)]),
      descricao : new FormControl('',[Validators.required,Validators.minLength(1)]),
      webId : new FormControl('',[Validators.required,Validators.minLength(1)]),
      iosId : new FormControl('',[Validators.required,Validators.minLength(1)]),
      androidId : new FormControl('',[Validators.required,Validators.minLength(1)]),
      negocioId : new FormControl('',[Validators.required, Validators.minLength(1)])
    })
  }

get propriedade(){
  return this.formulario.controls;
}

Adicionar(){
  this.erros=[];
  this.novoAmbiente = this.formulario.value;
  console.log(this.novoAmbiente);
  this.http.PostAmbienteBackEnd(this.novoAmbiente).subscribe(resultado =>{
    this.snackBar.open(resultado.mensagem ,"Novo Ambiente", {
      duration:2000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
    })

    this.router.navigate(['/ambientes']);
  },
  erro => {
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
  }
  )
}

}
