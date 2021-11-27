import { ChamadoService } from 'src/app/service/chamado.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ambiente } from 'src/app/model/ambiente';
import { Api } from 'src/app/model/api';
import { Web } from 'src/app/model/web';
import { Ios } from 'src/app/model/ios';
import { Android } from 'src/app/model/android';
import { Negocio } from 'src/app/model/negocio';
import { WebService } from 'src/app/service/web.service';
import { NegocioService } from 'src/app/service/negocio.service';
import { AndroidService } from 'src/app/service/android.service';
import { AmbienteService } from 'src/app/service/ambientes.service';
import { ApiService } from 'src/app/service/api.service';
import { IosService } from 'src/app/service/ios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-chamado',
  templateUrl: './editar-chamado.component.html',
  styleUrls: ['./editar-chamado.component.css']
})
export class EditarChamadoComponent implements OnInit {


  formulario!:any;
  ambiente!:Ambiente[];
  api!:Api[];
  web!:Web[];
  ios!:Ios[];
  android!:Android[];
  negocio!:Negocio[];
  erros:string[]=[];

  constructor(
    private activetad: ActivatedRoute,
    private chamadoService:ChamadoService,
    private ambienteService:AmbienteService,
    private apiService: ApiService,
    private webService: WebService,
    private iosService: IosService,
    private androidService: AndroidService,
    private negocioService: NegocioService,
    private router: Router,
    private snackBar:MatSnackBar
              ) { }

  ngOnInit(): void {
    this.ambienteService.ObterTodos().subscribe(dados =>{
      this.ambiente = dados;
    });
    this.apiService.ObterTodos().subscribe(dados =>{
      this.api = dados;
    });
    this.webService.ObterTodos().subscribe(dados =>{
      this.web = dados;
    });
    this.iosService.ObterTodos().subscribe(dados =>{
      this.ios = dados;
    });
    this.androidService.ObterTodos().subscribe(dados =>{
      this.android = dados;
    });
    this.negocioService.ObterTodos().subscribe(dados =>{
      this.negocio = dados;
    });

    const rota1 = this.activetad.snapshot.params.ambienteId;
    const rota2 = this.activetad.snapshot.params.apiId;

    this.chamadoService.ObterPorAmbienteAPI(rota1,rota2).subscribe(resultado =>{
      this.formulario = new FormGroup({
        id : new FormControl(resultado.id),
        numero : new FormControl(resultado.numero,[Validators.required,Validators.maxLength(15)]),
        ambienteId : new FormControl(resultado.ambienteId,[Validators.required,Validators.minLength(1)]),
        apiId : new FormControl(resultado.apiId,[Validators.required,Validators.minLength(1)]),
        webId : new FormControl(resultado.webId,[Validators.required,Validators.minLength(1)]),
        iosId : new FormControl(resultado.iosId,[Validators.required,Validators.minLength(1)]),
        androidId : new FormControl(resultado.androidId,[Validators.required,Validators.minLength(1)]),
        negocioId : new FormControl(resultado.negocioId,[Validators.required,Validators.minLength(1)])
      });
    })

  }

  get propriedade(){
    return this.formulario.controls;
  }

  Alterar(){
    this.erros= [];
    const parametros = this.formulario.value;
    this.chamadoService.Atualizar(parametros,parametros.id).subscribe(resultado => {
        this.snackBar.open(resultado.mensagem,"Editar Ambiente",{
          duration:1000,
          horizontalPosition:'center',
          verticalPosition:'bottom'
        })
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
        })
      }
}
