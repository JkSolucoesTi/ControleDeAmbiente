import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adicionar-servidor',
  templateUrl: './adicionar-servidor.component.html',
  styleUrls: ['./adicionar-servidor.component.css']
})
export class AdicionarServidorComponent implements OnInit {

  erros:string[]=[];
  formulario!:any;

  constructor() { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nome: new FormControl('',[Validators.required]),
      servidor: new FormControl('',[Validators.required]),  
    })
  }

  get propriedade(){
    return this.formulario.controls;
  }

  AdicionarServidor()
  {
    
  }

}
