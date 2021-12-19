import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { Negocio } from 'src/app/model/negocio';
import { NegocioService } from 'src/app/service/negocio.service';

@Component({
  selector: 'app-editar-business',
  templateUrl: './editar-business.component.html',
  styleUrls: ['./editar-business.component.css']
})
export class EditarBusinessComponent implements OnInit {

  erros:string[]=[];
  parametro!:any;
  negocio!:Negocio;
  formulario!:any;

  constructor(private rota : ActivatedRoute,
              private router : Router,
              private businessService: NegocioService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
   this.parametro = this.rota.snapshot.params.id;
    this.businessService.ObterPorId(this.parametro).subscribe(resultado =>{
      this.negocio = resultado;
      this.formulario = new FormGroup({
        id : new FormControl(this.negocio.id),
        nome : new FormControl(this.negocio.nome,[Validators.required,Validators.maxLength(50)]),
        email : new FormControl(this.negocio.email,[Validators.required,Validators.maxLength(50), Validators.maxLength(50)])
      })

    })

  }

  get propriedade(){
    return this.formulario.controls;
  }

  AtualizarBusiness(){
    this.erros = [];
    const negocio = this.formulario.value;
    this.businessService.Atualizar(negocio,this.parametro).subscribe(resultado =>{
      this.snackBar.open(resultado.mensagem,"Atualizar",{
        duration: 1000,
        horizontalPosition:'center',
        verticalPosition:'bottom'
      })
      this.router.navigate(['business']);
    },erro => {
      if(erro.status === '400'){
       for(const campos in erro.error.errors){
         if(erro.error.errors.hasOwnProperty(campos)){
           this.erros.push(erro.error.errors[campos])
         }
       }
      }
      else{
        this.erros.push("Não foi possível editar o Analista de Negócios")
      }
    })
  }
}
