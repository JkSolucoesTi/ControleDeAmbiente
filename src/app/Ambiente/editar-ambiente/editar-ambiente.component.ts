import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Ambiente } from 'src/app/model/ambiente';
import { Desenvolvedor } from 'src/app/model/desenvolvedor';
import { Servidor } from 'src/app/model/servidor';
import { AmbienteService } from 'src/app/service/ambientes.service';
import { DesenvolvedorService } from 'src/app/service/desenvolvedor.service';
import { ServidorService } from 'src/app/service/servidor.service';

@Component({
  selector: 'app-editar-ambiente',
  templateUrl: './editar-ambiente.component.html',
  styleUrls: ['./editar-ambiente.component.css']
})
export class EditarAmbienteComponent implements OnInit {

  erros:string []=[];
  rota!: any;
  formulario!:any;
  ambiente!:Ambiente;
  servidores:Servidor[]=[];
  desenvolvedores:Desenvolvedor[]=[];

  constructor(private ambienteService:AmbienteService,
    private servidorService : ServidorService,
    private desenvolvedorService : DesenvolvedorService,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private snackBar : MatSnackBar) { }

    ngOnInit(): void {

      this.desenvolvedorService.PegarTodos().subscribe( data =>{
        this.desenvolvedores = data;
      })

      this.servidorService.ObterTodos().subscribe(data =>{
        this.servidores = data;
      });
      this.rota = this.activatedRoute.snapshot.params.id;
      this.ambienteService.ObterPorId(this.rota).subscribe(resultado => {
        this.ambiente = resultado;
        this.formulario = new FormGroup({
          ambienteId : new FormControl(this.ambiente.ambienteId),
          nome : new FormControl(this.ambiente.nome,[Validators.required,Validators.maxLength(50)]),
          servidorId : new FormControl(this.ambiente.servidor.id,[Validators.required,Validators.maxLength(50)]),
          desenvolvedorId : new FormControl(this.ambiente.desenvolvedor.id,[Validators.required,Validators.minLength(1)]),
          acesso : new FormControl(this.ambiente.acesso,[Validators.required,Validators.minLength(1)])
        })
      })
    }
  
    get propriedade(){
      return this.formulario.controls;
    }

    AtualizarAmbiente()
    {
      const parametros = this.formulario.value;
      this.ambienteService.Atualizar(parametros,this.rota).subscribe(resultado => {
        this.snackBar.open(resultado.mensagem,"Atualizar",{
          duration: 1000,
          horizontalPosition:'center',
          verticalPosition:'bottom'
        })
        this.router.navigate(['ambiente/listar']);
      },erro =>{
        if(erro.status ==="400"){
          for(const campos in erro.error.errors){
          if(erro.error.errors.hasOwnProperty(campos)){
            this.erros.push(erro.error.errors[campos]);
          }
        }
      }else{
        this.erros.push("Não foi possível editar o ambiente");
      }
  
    }
    )

    }
}
