import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adicionar-api',
  templateUrl: './adicionar-api.component.html',
  styleUrls: ['./adicionar-api.component.css']
})
export class AdicionarApiComponent implements OnInit {

  erros:string[]=[];
  formulario!:any;


  constructor(private apiService:ApiService,
              private router:Router,
              private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nome: new FormControl('',[Validators.required,Validators.maxLength(50)]),
      descricao: new FormControl('',[Validators.required,Validators.maxLength(50)])
    })
  }

  get propriedade(){
    return this.formulario.controls;
  }

  AdicionarApi(){
    this.erros = [];
    const parametros = this.formulario.value;
    this.apiService.Adicionar(parametros).subscribe(resultado => {
      this.snackBar.open(resultado.mensagem,"Adicionar",{
        duration:1000,
        verticalPosition:'bottom',
        horizontalPosition: 'center'
      })
      this.router.navigate(['/api']);
    },erro =>{
      if(erro === '400'){
        for(const campo in erro.error.errors){
          if(erro.error.errors.hasOwnProperty(campo)){
            this.erros.push(erro.error.errors[campo]);
          }
        }
      }else{
        this.erros.push("Não foi possível adicionar a API");
      }
    }
    )
  }
}


