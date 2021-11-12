import { ApiService } from './../../service/api.service';
import { IosService } from './../../service/ios.service';
import { AndroidService } from './../../service/android.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Ambiente } from 'src/app/model/ambiente';
import { Android } from 'src/app/model/android';
import { ConfiguracoesService } from 'src/app/service/configuracoes.service';
import { Api } from 'src/app/model/api';
import { Ios } from 'src/app/model/ios';

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
  api!:Api[];
  ios!:Ios[];

  constructor(private http : ConfiguracoesService,
              private androidService : AndroidService,
              private iosService: IosService,
              private apiService: ApiService,
              private snackBar: MatSnackBar,
              private router : Router) { }

  ngOnInit(): void {
    this.androidService.ObterTodos().subscribe(dados =>{
      this.android = dados;
    });
    this.iosService.ObterTodos().subscribe(dados =>{
      this.ios = dados;
    });
    this.apiService.ObterTodos().subscribe(dados =>{
      this.api = dados;
    });

    this.formulario = new FormGroup({
      nome : new FormControl('',[Validators.required,Validators.minLength(1)]),
      chamado : new FormControl('',[Validators.required,Validators.minLength(1)]),
      descricao : new FormControl('',[Validators.required,Validators.minLength(1)]),
      apiId : new FormControl('',[Validators.required,Validators.minLength(1)]),
      iosId : new FormControl('',[Validators.required,Validators.minLength(1)]),
      androidId : new FormControl('',[Validators.required,Validators.minLength(1)]),
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
