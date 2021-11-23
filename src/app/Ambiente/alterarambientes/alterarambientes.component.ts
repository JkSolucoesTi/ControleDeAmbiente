import { ApiService } from './../../service/api.service';
import { WebService } from '../../service/web.service';
import { IosService } from './../../service/ios.service';
import { AndroidService } from './../../service/android.service';
import { Ambiente } from '../../model/ambiente';
import { AmbienteService } from '../../service/ambientes.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Web } from 'src/app/model/web';
import { Ios } from 'src/app/model/ios';
import { Android } from 'src/app/model/android';
import { NegocioService } from 'src/app/service/negocio.service';
import { Negocio } from 'src/app/model/negocio';
import { Api } from 'src/app/model/api';

@Component({
  selector: 'app-alterarambientes',
  templateUrl: './alterarambientes.component.html',
  styleUrls: ['./alterarambientes.component.css']
})
export class AlterarambientesComponent implements OnInit {

  rota :string ="";
  formulario:any;
  erros!:string[];
  api!:Api[];
  web!:Web[];
  ios!:Ios[];
  android!:Android[];
  negocio!:Negocio[];

  constructor(private router : Router,
              private route : ActivatedRoute ,
              private service : AmbienteService,
              private androidService : AndroidService,
              private iosService:IosService,
              private webService:WebService,
              private negocioService:NegocioService,
              private apiService:ApiService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    this.erros =[];

    this.webService.ObterTodos().subscribe(resultado =>{
      this.web = resultado;
    });
    this.iosService.ObterTodos().subscribe(resultado =>{
      this.ios = resultado;
    });
    this.androidService.ObterTodos().subscribe(resultado =>{
      this.android = resultado;
    });
    this.negocioService.ObterTodos().subscribe(resultado =>{
      this.negocio = resultado;
    });
    this.apiService.ObterTodos().subscribe(resultado =>{
      this.api = resultado;
    })



    this.rota = this.route.snapshot.params.id;
    this.service.GetAmbientesBackEndById(this.rota).subscribe( resultado =>{
      const variavel : Ambiente = resultado;
      console.log(variavel.android.nome);
      this.formulario = new FormGroup({
        id : new FormControl(variavel.id,[Validators.required]),
        nome : new FormControl(variavel.nome,[Validators.required]),
        chamado : new FormControl(variavel.chamado,[Validators.required]),
        descricao : new FormControl(variavel.descricao,[Validators.required]),
        webId : new FormControl(variavel.web.id,[Validators.required]),
        iosId : new FormControl(variavel.ios.id,[Validators.required]),
        androidId : new FormControl(variavel.android.id,[Validators.required]),
        negocioId : new FormControl(variavel.negocio.id,[Validators.required]),
        apiId : new FormControl(variavel.api.id,[Validators.required]),
      });
    });

  }

  AlterarAmbiente(){
    this.erros =[];
    const parametros = this.formulario.value;
      this.service.PutAmbienteBackEnd(parametros,this.rota).subscribe(resultado =>{
      this.snackBar.open("Ambiente atualizado com sucesso" ,"Atualização", {
        duration:2000,
        horizontalPosition:'center',
        verticalPosition:'bottom'
      })
      this.router.navigate(['ambientes']);
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
    }
  )
}

  get propriedade(){
    return this.formulario.controls;
  }

}
