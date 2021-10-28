import { Ambiente } from './../model/ambiente';
import { ConfiguracoesService } from './../service/configuracoes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup , FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-alterarambientes',
  templateUrl: './alterarambientes.component.html',
  styleUrls: ['./alterarambientes.component.css']
})
export class AlterarambientesComponent implements OnInit {

  ambienteDev: string = "";
  path : string = "./assets/ambientes.json";
  retorno!:any;
  formulario:any;

  ambienteSelecionado!:Ambiente;

  constructor(private route : ActivatedRoute ,
              private service : ConfiguracoesService) {
  }

  ngOnInit(): void {
    this.ambienteDev= this.route.snapshot.params.ambiente;
    this.service.GetAmbientes(this.path).subscribe( resultado =>{
      this.retorno = resultado.find(x => x.ambiente === this.ambienteDev);
      const variavel : Ambiente = this.retorno;

      this.formulario = new FormGroup({
        ambiente : new FormControl(variavel.ambiente,[Validators.required]),
        chamado : new FormControl(variavel.chamado,[Validators.required]),
        descricao : new FormControl(variavel.descricao,[Validators.required]),
        api : new FormControl(variavel.api,[Validators.required]),
        ios : new FormControl(variavel.ios,[Validators.required]),
        android : new FormControl(variavel.android,[Validators.required])
      });
    });



  }

  VerificarParametroDeRota(){
    console.log('botao pressionado');
    console.log(this.retorno);

  }

  get propriedade(){
    return this.formulario.controls;
  }

}
