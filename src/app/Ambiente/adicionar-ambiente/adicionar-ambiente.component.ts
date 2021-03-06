import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Ambiente } from 'src/app/model/ambiente';
import { Desenvolvedor } from 'src/app/model/desenvolvedor';
import { Servidor } from 'src/app/model/servidor';
import { TipoDesenvolvedor } from 'src/app/model/tipo';
import { AmbienteService } from 'src/app/service/ambientes.service';
import { DesenvolvedorService } from 'src/app/service/desenvolvedor.service';
import { ServidorService } from 'src/app/service/servidor.service';

@Component({
  selector: 'app-adicionar-ambiente',
  templateUrl: './adicionar-ambiente.component.html',
  styleUrls: ['./adicionar-ambiente.component.css']
})
export class AdicionarAmbienteComponent implements OnInit {

  erros:string[]=[];
  formulario!:any;
  ambientes:Ambiente[]=[];
  servidores:Servidor[]=[];
  desenvolvedores:Desenvolvedor[]=[];

  constructor(private ambienteService : AmbienteService, 
              private servidorService:ServidorService,
              private desenvolvedorService: DesenvolvedorService,
              private router:Router,
              private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  
    this.desenvolvedorService.PegarTodos().subscribe( data =>{
      this.desenvolvedores = data;
    })

    this.servidorService.ObterTodos().subscribe( data =>{
      this.servidores = data;
    })
      this.formulario = new FormGroup({
        nome : new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(50)]),
        servidorId : new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(50)]),
        desenvolvedorId : new FormControl('',[Validators.required,Validators.minLength(1)]),
        acesso : new FormControl('',[Validators.required,Validators.minLength(1)])
      })    
  }

  get propriedade(){
    return this.formulario.controls;
  }

  AdicionarAmbiente(){
    this.erros = [];
    const parametros = this.formulario.value;
    this.ambienteService.Inserir(parametros).subscribe(resultado => {
      this.snackBar.open(resultado.mensagem,"Adicionar",{
        duration:1000,
        verticalPosition:'bottom',
        horizontalPosition: 'center'
      })
      this.router.navigate(['/ambiente/listar']);
    },erro =>{
      if(erro === '400'){
        for(const campo in erro.error.errors){
          if(erro.error.errors.hasOwnProperty(campo)){
            this.erros.push(erro.error.errors[campo]);
          }
        }
      }else{
        this.erros.push("N??o foi poss??vel adicionar o ambiente");
      }
  })
 }
}

