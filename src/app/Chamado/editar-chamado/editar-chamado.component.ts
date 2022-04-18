import { ChamadoService } from 'src/app/service/chamado.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ambiente } from 'src/app/model/ambiente';
import { Negocio } from 'src/app/model/negocio';
import { NegocioService } from 'src/app/service/negocio.service';
import { ApiService } from 'src/app/service/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chamado } from 'src/app/model/chamado';
import { AmbienteService } from 'src/app/service/ambientes.service';
import { Desenvolvedor } from 'src/app/model/desenvolvedor';
import { DesenvolvedorService } from 'src/app/service/desenvolvedor.service';
import { Detalhe } from 'src/app/model/detalhe';

@Component({
  selector: 'app-editar-chamado',
  templateUrl: './editar-chamado.component.html',
  styleUrls: ['./editar-chamado.component.css']
})
export class EditarChamadoComponent implements OnInit {


  formulario!:any;
  ambiente!:string;
  desenvolvedores!:Desenvolvedor[];
  web!:Desenvolvedor[];
  android!:Desenvolvedor[];
  ios!:Desenvolvedor[];
  negocio!:Negocio[];
  erros:string[]=[];
  chamadoOld!:Chamado;
  rota1!:any;


  constructor(
    private activetad: ActivatedRoute,
    private ambienteService: AmbienteService,
    private desenvolvedorService: DesenvolvedorService,
    private chamadoService:ChamadoService,
    private negocioService: NegocioService,
    private router: Router,
    private snackBar:MatSnackBar
              ) { }
              
  ngOnInit(): void {
    this.rota1 = this.activetad.snapshot.params.chamadoId;

    this.desenvolvedorService.PegarTodos().subscribe(dados => {
      this.web = dados.filter(x => x.tipoDesenvolvedor.tipo === "Web" || x.tipoDesenvolvedor.tipo === "Sem Alocação");      
      this.ios = dados.filter(x => x.tipoDesenvolvedor.tipo === "IOS" || x.tipoDesenvolvedor.tipo === "Sem Alocação");
      this.android = dados.filter(x => x.tipoDesenvolvedor.tipo  === "Android" || x.tipoDesenvolvedor.tipo === "Sem Alocação");
    })

    this.negocioService.ObterTodos().subscribe(dados =>{
      this.negocio = dados;
    });


    this.chamadoService.ObterChamadoPorId(this.rota1).subscribe(resultado =>{
      if(resultado.ativo == true){
        this.ambiente = resultado.ambiente.nome + "  Atualização"
      }else{
        this.ambiente = resultado.ambiente.nome + "  Cadastro"
      }
      console.log(resultado)
      
      this.formulario = new FormGroup({
        chamadoId : new FormControl(resultado.chamadoId),
        descricao : new FormControl(resultado.descricao,[Validators.required,Validators.maxLength(100)]),
        numero : new FormControl(resultado.numero,[Validators.required,Validators.maxLength(15)]),
        ambienteId : new FormControl(resultado.ambienteId,[Validators.required,Validators.minLength(1)]),  
        webId : new FormControl(resultado.detalhes[0].desenvolvedorId,[Validators.required,Validators.minLength(1)]),
        iosId : new FormControl(resultado.detalhes[1].desenvolvedorId,[Validators.required,Validators.minLength(1)]),
        androidId : new FormControl(resultado.detalhes[2].desenvolvedorId,[Validators.required,Validators.minLength(1)]),
        negocioId : new FormControl(resultado.negocioId,[Validators.required,Validators.minLength(1)]),
        chamadoWeb : new FormControl(resultado.detalhes[0].numero),
        chamadoIos: new FormControl(resultado.detalhes[1].numero),
        chamadoAndroid : new FormControl(resultado.detalhes[2].numero)        
      });
    })

  }

  get propriedade(){
    return this.formulario.controls;
  }

  Alterar(){

    this.erros= [];
    const parametros = this.formulario.value;
    var chamado = new Chamado();
    chamado.numero = parametros.numero;
    chamado.descricao = parametros.descricao;
    chamado.negocioId = parametros.negocioId;
    chamado.ambienteId = parametros.ambienteId;
    chamado.ativo = true;

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

    console.log(chamado);
    
    this.erros= [];
    this.chamadoService.Atualizar(chamado,this.rota1).subscribe(resultado => {
      if(resultado.codigo == 2){
        this.erros.push(resultado.mensagem);
      }
      else{
        this.snackBar.open(resultado.mensagem,"Editar Ambiente",{
          duration:1000,
          horizontalPosition:'center',
          verticalPosition:'bottom'
        });
        this.router.navigate(['chamados']);
       }
      },erro => {
          if(erro.status === '400'){
           for(const campos in erro.error.errors){
             if(erro.error.errors.hasOwnProperty(campos)){
               this.erros.push(erro.error.errors[campos])
             }
           }
          }
          else{
            this.erros.push("Não foi possível editar o Chamado")
          }
        });
      }
}
