import { ContentObserver } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Servidor } from 'src/app/model/servidor';
import { AmbienteService } from 'src/app/service/ambientes.service';
import { ServidorService } from 'src/app/service/servidor.service';

@Component({
  selector: 'app-editar-servidor',
  templateUrl: './editar-servidor.component.html',
  styleUrls: ['./editar-servidor.component.css']
})
export class EditarServidorComponent implements OnInit {

  erros:string []=[];
  rota!: number;
  formulario!:any;
  servidor!:Servidor;

  constructor(private servidorService:ServidorService,
              private router : Router,
              private activatedRoute : ActivatedRoute,
              private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.rota = this.activatedRoute.snapshot.params.id;
    this.servidorService.ObterPorId(this.rota).subscribe(resultado => {
      this.servidor = resultado;
      this.formulario = new FormGroup({
        id : new FormControl(this.servidor.id),
        nome : new FormControl(this.servidor.nome,[Validators.required,Validators.maxLength(50)]),
        dominio : new FormControl(this.servidor.dominio,[Validators.required,Validators.maxLength(50)])
      })
    })
  }
  get propriedade(){
    return this.formulario.controls;
  }

  AtualizarServidor()
  {
    this.erros = [];
    const parametros = this.formulario.value;
    this.servidorService.Atualizar(parametros,this.rota).subscribe(resultado => {
      this.snackBar.open(resultado.mensagem,"Atualizar",{
        duration: 1000,
        horizontalPosition:'center',
        verticalPosition:'bottom'
      })
      this.router.navigate(['servidor']);
    },erro =>{
      if(erro.status ==="400"){
        for(const campos in erro.error.errors){
        if(erro.error.errors.hasOwnProperty(campos)){
          this.erros.push(erro.error.errors[campos]);
        }
      }
    }else{
      this.erros.push("Não foi possível editar o servidor");
    }

  })

  }
}
