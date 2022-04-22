import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ServidorService } from 'src/app/service/servidor.service';

@Component({
  selector: 'app-adicionar-servidor',
  templateUrl: './adicionar-servidor.component.html',
  styleUrls: ['./adicionar-servidor.component.css']
})
export class AdicionarServidorComponent implements OnInit {

  erros:string[]=[];
  formulario!:any;

  constructor(private servidorService:ServidorService,
    private router:Router,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nome: new FormControl('',[Validators.required]),
      dominio: new FormControl('',[Validators.required]),  
    })
  }

  get propriedade(){
    return this.formulario.controls;
  }

  AdicionarServidor()
  {
    this.erros = [];
    const parametros = this.formulario.value;
    this.servidorService.Inserir(parametros).subscribe(resultado => {
      this.snackBar.open(resultado.mensagem,"Adicionar",{
        duration:1000,
        verticalPosition:'bottom',
        horizontalPosition: 'center'
      })
      this.router.navigate(['/servidor']);
    },erro =>{
      if(erro === '400'){
        for(const campo in erro.error.errors){
          if(erro.error.errors.hasOwnProperty(campo)){
            this.erros.push(erro.error.errors[campo]);
          }
        }
      }else{
        this.erros.push("Não foi possível adicionar o desenvolvedor");
      }
    }
  )
    
  }

}
