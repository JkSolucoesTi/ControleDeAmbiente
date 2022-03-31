import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Desenvolvedor } from 'src/app/model/desenvolvedor';
import { TipoDesenvolvedor } from 'src/app/model/tipo';
import { DesenvolvedorService } from 'src/app/service/desenvolvedor.service';

@Component({
  selector: 'app-editar-desenvolvedor',
  templateUrl: './editar-desenvolvedor.component.html',
  styleUrls: ['./editar-desenvolvedor.component.css']
})
export class EditarDesenvolvedorComponent implements OnInit {

  dados!:any;
  formulario:any;
  parametro !: number;
  tipoDesenvolvedor:TipoDesenvolvedor[]=[];
  erros:string[]=[];

  constructor(private rota:ActivatedRoute,
              private router : Router,
              private desenvolvedorService: DesenvolvedorService,
              private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.parametro = this.rota.snapshot.params.id;

      this.desenvolvedorService.PegarTodosTipoDesenvolvedores().subscribe(data =>{
        this.tipoDesenvolvedor = data;
      })
      this.desenvolvedorService.ObterPorId(this.parametro).subscribe(resultado =>{
        this.dados as Desenvolvedor;
        this.dados = resultado;

        this.formulario = new FormGroup({
          id : new FormControl(this.dados.id),
          nome : new FormControl(this.dados.nome,Validators.required),
          usuario : new FormControl(this.dados.usuario,Validators.required),
          email : new FormControl(this.dados.email,[Validators.required,Validators.email]),
          tipoDesenvolvedorId : new FormControl(this.dados.tipoDesenvolvedorId,[Validators.required,Validators.minLength(1)])
        })
      })
  }

get propriedade(){
    return this.formulario.controls;
  }

  AtualizarDesenvolvedor(){
    this.erros = [];
    const parametros = this.formulario.value;
      this.desenvolvedorService.Atualizar(parametros,this.parametro).subscribe(resultado =>{
          this.snackBar.open(resultado.mensagem,"Sucesso" , {
            duration : 1000,
            verticalPosition:'bottom',
            horizontalPosition:'center'
          })
          this.router.navigate(['desenvolvedores']);
      },erro => {
        if(erro.status === '400'){
         for(const campos in erro.error.errors){
           if(erro.error.errors.hasOwnProperty(campos)){
             this.erros.push(erro.error.errors[campos])
           }
         }
        }
        else{
          this.erros.push('Não foi possível adicionar o desenvolvedor')
        }
      })
  }
}
