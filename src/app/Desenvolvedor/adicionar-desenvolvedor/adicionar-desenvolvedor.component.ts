import { WebService } from 'src/app/service/web.service';
import { IosService } from 'src/app/service/ios.service';
import { AndroidService } from 'src/app/service/android.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adicionar-desenvolvedor',
  templateUrl: './adicionar-desenvolvedor.component.html',
  styleUrls: ['./adicionar-desenvolvedor.component.css']
})
export class AdicionarDesenvolvedorComponent implements OnInit {

  tipo!:string;
  erros!:string[];
  rota!:string;
  formulario!:any;

  constructor(private activatedRoute: ActivatedRoute,
              private androiService:AndroidService,
              private iosService:IosService,
              private werbService:WebService,
              private snackBar:MatSnackBar,
              private router :Router) { }

  ngOnInit(): void {
    this.rota = this.activatedRoute.snapshot.params.dev;
    this.tipo = this.rota.toUpperCase();
    console.log(this.rota);
    this.formulario = new FormGroup({
      nome : new FormControl('',[Validators.required,Validators.maxLength(50)]),
      usuario : new FormControl('',[Validators.required,Validators.maxLength(10)]),
      email : new FormControl('',[Validators.required,Validators.email, Validators.maxLength(50)])
    })
  }

  get propriedade(){
    return this.formulario.controls;
  }

  Adicionar(){
    this.erros = [];
    const parametros = this.formulario.value;

    if(this.rota == 'web'){
      this.werbService.Adicionar(parametros).subscribe(resultado =>{
        this.snackBar.open(resultado.mensagem,"Adicionar" , {
          duration:1000,
          verticalPosition:'bottom',
          horizontalPosition:'center'
        });
        this.router.navigate(['desenvolvedores']);

      },erro =>{
        if(erro === '400'){
          for(const campo in erro.error.erros){
            if(erro.error.errors.hasOwnProperty(campo)){
              this.erros.push(erro.error.errors[campo])
            }
          }
        }else{
          this.erros.push(erro.error.errors);
        }
      }
      )
    }
    if(this.rota == 'ios'){

      this.iosService.Adicionar(parametros).subscribe(resultado =>{
        this.snackBar.open(resultado.mensagem,"Adicionar" , {
          duration:1000,
          verticalPosition:'bottom',
          horizontalPosition:'center'
        });
        this.router.navigate(['desenvolvedores']);

      },erro =>{
        if(erro === '400'){
          for(const campo in erro.error.erros){
            if(erro.error.errors.hasOwnProperty(campo)){
              this.erros.push(erro.error.errors[campo])
            }
          }
        }else{
          this.erros.push(erro.error.errors);
        }
      }
      )

    }
    if(this.rota == 'android'){

      this.androiService.Adicionar(parametros).subscribe(resultado =>{
        this.snackBar.open(resultado.mensagem,"Adicionar" , {
          duration:1000,
          verticalPosition:'bottom',
          horizontalPosition:'center'
        });
        this.router.navigate(['desenvolvedores']);

      },erro =>{
        if(erro === '400'){
          for(const campo in erro.error.erros){
            if(erro.error.errors.hasOwnProperty(campo)){
              this.erros.push(erro.error.errors[campo])
            }
          }
        }else{
          this.erros.push(erro.error.errors);
        }
      }
      )
    }
  }
}
