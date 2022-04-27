import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Ambiente } from 'src/app/model/ambiente';
import { Api } from 'src/app/model/api';
import { Chamado } from 'src/app/model/chamado';
import { Desenvolvedor } from 'src/app/model/desenvolvedor';
import { Detalhe } from 'src/app/model/detalhe';
import { Negocio } from 'src/app/model/negocio';
import { AmbienteService } from 'src/app/service/ambientes.service';
import { ChamadoService } from 'src/app/service/chamado.service';
import { DesenvolvedorService } from 'src/app/service/desenvolvedor.service';
import { NegocioService } from 'src/app/service/negocio.service';

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
    private activetad: ActivatedRoute,
    private snackBar:MatSnackBar,
    private router :Router    
              ) { }

  ngOnInit(): void {

    this.ambienteId =this.activetad.snapshot.params.id;
    this.ambienteService.ObterAmbientesDisponiveis().subscribe(resultado =>{
      this.ambiente = resultado;     
    });
    this.desenvolvedorService.PegarTodos().subscribe(dados => {
      this.web = dados.filter(x => x.tipoDesenvolvedor.tipo === "Web" || x.tipoDesenvolvedor.tipo === "Sem Alocação");      
      this.ios = dados.filter(x => x.tipoDesenvolvedor.tipo === "IOS" || x.tipoDesenvolvedor.tipo === "Sem Alocação");
      this.android = dados.filter(x => x.tipoDesenvolvedor.tipo  === "Android" || x.tipoDesenvolvedor.tipo === "Sem Alocação");
    })
    this.negocioService.ObterTodos().subscribe(dados =>{
      this.negocio = dados;
    });


    this.formulario = new FormGroup({
      numero : new FormControl('',[Validators.required,Validators.maxLength(20)]),
      descricao : new FormControl('',[Validators.required,Validators.maxLength(100)]),
      ambienteId : new FormControl('',[Validators.required]),
      webId : new FormControl(1,[Validators.required]),
      iosId : new FormControl(1,[Validators.required]),
      androidId : new FormControl(1,[Validators.required]),
      negocioId : new FormControl(1,[Validators.required]),
      chamadoWeb : new FormControl(''),
      chamadoIos: new FormControl(''),
      chamadoAndroid : new FormControl('')
    })
  }

  get propriedade(){
    return this.formulario.controls;
  }

  Adicionar(){
    this.erros= [];
    const parametros = this.formulario.value;
    var chamado = new Chamado();
    chamado.numero = parametros.numero;
    chamado.descricao = parametros.descricao;
    chamado.negocioId = parametros.negocioId;
    chamado.ambienteId = parametros.ambienteId;
    chamado.ativo = true;//parametros.ativo;

    var detalhe1 = new Detalhe();
    detalhe1.desenvolvedorId = parametros.webId;
    detalhe1.numero = parametros.chamadoWeb;
    var detalhe2 = new Detalhe();
    detalhe2.desenvolvedorId = parametros.iosId;
    detalhe2.numero = parametros.chamadoIos;
    var detalhe3 = new Detalhe();
    detalhe3.desenvolvedorId = parametros.androidId;
    detalhe3.numero = parametros.chamadoAndroid;

    var detalhes =[detalhe1,detalhe2,detalhe3];

    chamado.detalhes =detalhes

  this.chamadoService.AdicionarChamado(chamado).subscribe(data =>{
    this.snackBar.open(data.mensagem,"Adicionar" , {
      duration:5000,
      verticalPosition:'bottom',
      horizontalPosition:'center'
    });
    this.router.navigate(['chamados']);
  },erro => {
    if(erro.status === '400'){     
     for(const campos in erro.error.errors){
       if(erro.error.errors.hasOwnProperty(campos)){
         this.erros.push(erro.error.errors[campos])
       }
     }
    }
    else{

      if(erro.error.codigo === 2){
        this.erros.push(erro.error.mensagem)
      } 
    }
  });       
  }
}
