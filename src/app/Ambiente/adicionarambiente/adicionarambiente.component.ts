import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Ambiente } from 'src/app/model/ambiente';
import { ConfiguracoesService } from 'src/app/service/configuracoes.service';

@Component({
  selector: 'app-adicionarambiente',
  templateUrl: './adicionarambiente.component.html',
  styleUrls: ['./adicionarambiente.component.css']
})
export class AdicionarambienteComponent implements OnInit {

  formulario!:any;
  erros!:string[];
  novoAmbiente!:Ambiente;

  constructor(private http : ConfiguracoesService,
              private snackBar: MatSnackBar,
              private router : Router) { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      ambiente : new FormControl('',[Validators.required,Validators.minLength(1)]),
      chamado : new FormControl('',[Validators.required,Validators.minLength(1)]),
      descricao : new FormControl('',[Validators.required,Validators.minLength(1)]),
      api : new FormControl('',[Validators.required,Validators.minLength(1)]),
      ios : new FormControl('',[Validators.required,Validators.minLength(1)]),
      android : new FormControl('',[Validators.required,Validators.minLength(1)]),
    })
  }

get propriedade(){
  return this.formulario.controls;
}

Adicionar(){
  this.novoAmbiente = this.formulario.value;
  const json = JSON.stringify(this.novoAmbiente);
  console.log(json);
  console.log(this.novoAmbiente);
  this.http.PostAmbienteBackEnd(this.novoAmbiente).subscribe(resultado =>{
    this.snackBar.open("Ambiente inserido com sucess" ,"Atualização", {
      duration:2000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
    })

    this.router.navigate(['/ambientes']);
  },
  erro => {
    if(erro.status === '500'){
      console.log('erro 500');
    }
  }
  )
}

}
