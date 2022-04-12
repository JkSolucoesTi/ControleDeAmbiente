import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Ambiente } from 'src/app/model/ambiente';
import { Api } from 'src/app/model/api';
import { Chamado } from 'src/app/model/chamado';
import { Desenvolvedor } from 'src/app/model/desenvolvedor';
import { Detalhe } from 'src/app/model/detalhe';
import { Ios } from 'src/app/model/ios';
import { Negocio } from 'src/app/model/negocio';
import { Web } from 'src/app/model/web';
import { AmbienteService } from 'src/app/service/ambientes.service';
import { AndroidService } from 'src/app/service/android.service';
import { ApiService } from 'src/app/service/api.service';
import { ChamadoService } from 'src/app/service/chamado.service';
import { DesenvolvedorService } from 'src/app/service/desenvolvedor.service';
import { IosService } from 'src/app/service/ios.service';
import { NegocioService } from 'src/app/service/negocio.service';
import { WebService } from 'src/app/service/web.service';

@Component({
  selector: 'app-adicionar-chamado',
  templateUrl: './adicionar-chamado.component.html',
  styleUrls: ['./adicionar-chamado.component.css']
})
export class AdicionarChamadoComponent implements OnInit {

  formulario!:any;
  ambiente!:Ambiente[];
  web!:Desenvolvedor[];
  ios!:Desenvolvedor[];
  android!:Desenvolvedor[];  
  detalhe:Detalhe[]=[];
  api!:Api[];
  negocio!:Negocio[];
  erros:string[]=[];
  ambienteId!:string;

  constructor(
    private chamadoService:ChamadoService,
    private desenvolvedorService:DesenvolvedorService,
    private ambienteService: AmbienteService,  
    private negocioService: NegocioService,
    private apiService : ApiService,
    private activetad: ActivatedRoute,
              ) { }

  ngOnInit(): void {

    this.ambienteId =this.activetad.snapshot.params.id;
    console.log('ambienteId',this.ambienteId);

    this.ambienteService.ObterTodos().subscribe(dados =>{
      this.ambiente = dados;
      console.log(this.ambiente);
    })
    this.desenvolvedorService.PegarTodos().subscribe(dados => {
      console.log(dados);
      this.web = dados.filter(x => x.tipoDesenvolvedor.tipo === "Web" || x.tipoDesenvolvedor.tipo === "Sem Alocação");
      console.log(this.web)
      this.ios = dados.filter(x => x.tipoDesenvolvedor.tipo === "IOS" || x.tipoDesenvolvedor.tipo === "Sem Alocação");
      this.android = dados.filter(x => x.tipoDesenvolvedor.tipo  === "Android" || x.tipoDesenvolvedor.tipo === "Sem Alocação");
    })
    this.apiService.ObterTodos().subscribe(dados =>{
      this.api = dados;
      console.log(dados);
    });
    this.negocioService.ObterTodos().subscribe(dados =>{
      this.negocio = dados;
    });


    this.formulario = new FormGroup({
      numero : new FormControl('',[Validators.required,Validators.maxLength(15)]),
      descricao : new FormControl('',[Validators.required,Validators.maxLength(100)]),
      ambienteId : new FormControl(this.ambienteId,[Validators.required,Validators.minLength(1)]),
      ativo : new FormControl(true)
     /* apiId : new FormControl('',[Validators.required,Validators.minLength(1)]),
      webId : new FormControl('',[Validators.required,Validators.minLength(1)]),
      iosId : new FormControl('',[Validators.required,Validators.minLength(1)]),
      androidId : new FormControl('',[Validators.required,Validators.minLength(1)]),
      negocioId : new FormControl('',[Validators.required,Validators.minLength(1)]),
      chamadoWeb : new FormControl('',[]),
      chamadoIos: new FormControl('',[]),
      chamadoAndroid : new FormControl('',[])*/
    })
  }

  get propriedade(){
    return this.formulario.controls;
  }

  Adicionar(){
    this.erros= [];
    const parametros = this.formulario.value;
        
  this.chamadoService.AdicionarChamado(parametros).subscribe(data =>{
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
      this.erros.push("Não foi possível adicionar o chamado")
    }
  });        
  }
}
