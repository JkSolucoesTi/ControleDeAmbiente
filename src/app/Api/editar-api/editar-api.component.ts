import { ApiService } from './../../service/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Api } from 'src/app/model/api';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-api',
  templateUrl: './editar-api.component.html',
  styleUrls: ['./editar-api.component.css']
})
export class EditarApiComponent implements OnInit {

  erros!:string [];
  rota!: number;
  formulario!:any;
  api!:Api;

  constructor(private apiService:ApiService,
              private router : Router,
              private activatedRoute : ActivatedRoute,
              private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.rota = this.activatedRoute.snapshot.params.id;
    this.apiService.ObterPorId(this.rota).subscribe(resultado => {
      this.api = resultado;
      this.formulario = new FormGroup({
        id : new FormControl(this.api.id),
        nome : new FormControl(this.api.nome,[Validators.required,Validators.maxLength(50)]),
        descricao : new FormControl(this.api.descricao,[Validators.required,Validators.maxLength(50)])
      })
    })
  }

  get propriedade(){
    return this.formulario.controls;
  }

  AtualizarApi(){
    this.erros = [];
    const parametros = this.formulario.value;
    console.log(parametros);
    this.apiService.Atualizar(parametros,this.rota).subscribe(resultado => {
      this.snackBar.open(resultado.mensagem,"Atualizar",{
        duration: 1000,
        horizontalPosition:'center',
        verticalPosition:'bottom'
      })
      this.router.navigate(['api']);
    },erro =>{
      if(erro.status ==="400"){
        for(const campos in erro.error.errors){
        if(erro.error.errors.hasOwnProperty(campos)){
          this.erros.push(erro.error.errors[campos]);
        }
      }
    }else{
      this.erros.push(erro.error);
    }

  }
  )}
}
