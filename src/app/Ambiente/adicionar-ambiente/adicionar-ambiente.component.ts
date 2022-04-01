import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ambiente } from 'src/app/model/ambiente';
import { Servidor } from 'src/app/model/servidor';
import { AmbienteService } from 'src/app/service/ambientes.service';
import { ServidorService } from 'src/app/service/servidor.service';

@Component({
  selector: 'app-adicionar-ambiente',
  templateUrl: './adicionar-ambiente.component.html',
  styleUrls: ['./adicionar-ambiente.component.css']
})
export class AdicionarAmbienteComponent implements OnInit {

  erros:string[]=[];
  formulario!:any;
  ambientes:Ambiente[]=[];
  servidores:Servidor[]=[];

  constructor(private ambienteService : AmbienteService, private servidorService:ServidorService) { }

  ngOnInit(): void {
  
    this.servidorService.ObterTodos().subscribe( data =>{
      this.servidores = data;
    })
      this.formulario = new FormGroup({
        nome : new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(50)]),
        servidorId : new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(50)])
      })    
  }

  get propriedade(){
    return this.formulario.controls;
  }

  AdicionarAmbiente(){

  }

  AdicionarApi()
  {
    
  }

}
