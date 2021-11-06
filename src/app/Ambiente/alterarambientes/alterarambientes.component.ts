import { ApiService } from './../../service/api.service';
import { IosService } from './../../service/ios.service';
import { AndroidService } from './../../service/android.service';
import { Ambiente } from '../../model/ambiente';
import { ConfiguracoesService } from '../../service/configuracoes.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Api } from 'src/app/model/api';
import { Ios } from 'src/app/model/ios';
import { Android } from 'src/app/model/android';

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
  ios!:Ios[];
  android!:Android[];

  constructor(private router : Router,
              private route : ActivatedRoute ,
              private service : ConfiguracoesService,
              private androidService : AndroidService,
              private iosService:IosService,
              private apiService:ApiService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    
    this.erros =[];
    
    this.apiService.ObterTodos().subscribe(resultado =>{
      this.api = resultado;
    })
    this.iosService.ObterTodos().subscribe(resultado =>{
      this.ios = resultado;
    })
    this.androidService.ObterTodos().subscribe(resultado =>{
      this.android = resultado;
    })

    this.rota = this.route.snapshot.params.id;
    this.service.GetAmbientesBackEndById(this.rota).subscribe( resultado =>{
      const variavel : Ambiente = resultado;

      this.formulario = new FormGroup({
        id : new FormControl(variavel.id,[Validators.required]),
        ambiente : new FormControl(variavel.ambiente,[Validators.required]),
        chamado : new FormControl(variavel.chamado,[Validators.required]),
        descricao : new FormControl(variavel.descricao,[Validators.required]),
        api : new FormControl(variavel.api,[Validators.required]),
        ios : new FormControl(variavel.ios,[Validators.required]),
        android : new FormControl(variavel.android,[Validators.required])
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
