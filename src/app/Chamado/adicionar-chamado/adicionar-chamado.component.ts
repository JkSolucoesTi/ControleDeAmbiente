import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Ambiente } from 'src/app/model/ambiente';
import { Android } from 'src/app/model/android';
import { Api } from 'src/app/model/api';
import { Ios } from 'src/app/model/ios';
import { Negocio } from 'src/app/model/negocio';
import { Web } from 'src/app/model/web';
import { AmbienteService } from 'src/app/service/ambientes.service';
import { AndroidService } from 'src/app/service/android.service';
import { ApiService } from 'src/app/service/api.service';
import { ChamadoService } from 'src/app/service/chamado.service';
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
  api!:Api[];
  web!:Web[];
  ios!:Ios[];
  android!:Android[];
  negocio!:Negocio[];
  erros:string[]=[];

  constructor(private chamadoService:ChamadoService,
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


    this.formulario = new FormGroup({
      numero : new FormControl('',[Validators.required,Validators.maxLength(15)]),
      ambienteId : new FormControl('',[Validators.required,Validators.minLength(1)]),
      apiId : new FormControl('',[Validators.required,Validators.minLength(1)]),
      webId : new FormControl('',[Validators.required,Validators.minLength(1)]),
      iosId : new FormControl('',[Validators.required,Validators.minLength(1)]),
      androidId : new FormControl('',[Validators.required,Validators.minLength(1)]),
      negocioId : new FormControl('',[Validators.required,Validators.minLength(1)])
    })
  }

  get propriedade(){
    return this.formulario.controls;
  }

  Adicionar(){
    this.erros= [];
    const parametros = this.formulario.value;
    console.log(parametros);
    this.chamadoService.AdicionarAmbiente(parametros).subscribe(resultado => {
      if(resultado.codigo == 2){
        this.erros.push(resultado.mensagem);
      }
      else{
        this.snackBar.open(resultado.mensagem,"Ambiente",{
          duration:1000,
          horizontalPosition:'center',
          verticalPosition:'bottom'
        });
        this.router.navigateByUrl('chamados');
      }
    })
  }

}
