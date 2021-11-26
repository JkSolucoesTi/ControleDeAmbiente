import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NegocioService } from 'src/app/service/negocio.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adicionar-business',
  templateUrl: './adicionar-business.component.html',
  styleUrls: ['./adicionar-business.component.css']
})
export class AdicionarBusinessComponent implements OnInit {

  formulario!:any;
  erros:string[]=[];


  constructor(private router:Router,
              private negocioService:NegocioService,
              private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nome : new FormControl('',[Validators.required,Validators.maxLength(50)]),
      email : new FormControl('',[Validators.required,Validators.email,Validators.maxLength(50)])
    })
  }

  get propriedade(){
    return this.formulario.controls;
  }

  AdicionarBusiness(){
    const parametros = this.formulario.value;
    this.negocioService.Adicionar(parametros).subscribe(resultado =>{
      this.snackBar.open(resultado.mensagem,"Adicionar",{
        duration:1000,
        horizontalPosition:'center',
        verticalPosition:'bottom'
      });
      this.router.navigate(['/business'])
    }, erro =>{
      if(erro === '400'){
        for(const campo in erro.error.erros){
          if(erro.error.errors.hasOwnProperty(campo)){
            this.erros.push(erro.error.errors[campo])
          }
        }
      }else{
        this.erros.push("Não foi possível adicionar o Analista de Negócios");
      }
    }
    )
  }

}
