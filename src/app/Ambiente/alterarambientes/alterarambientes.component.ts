import { Ambiente } from '../../model/ambiente';
import { ConfiguracoesService } from '../../service/configuracoes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup , FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-alterarambientes',
  templateUrl: './alterarambientes.component.html',
  styleUrls: ['./alterarambientes.component.css']
})
export class AlterarambientesComponent implements OnInit {

  rota :string ="";
  ambienteDev: string = "";
  path : string = "./assets/ambientes.json";
  retorno!:any;
  formulario:any;

  ambienteSelecionado!:Ambiente;
  ambienteAlterar!:Ambiente;

  constructor(private router : Router,
              private route : ActivatedRoute ,
              private service : ConfiguracoesService) {
  }

  ngOnInit(): void {
    this.rota = this.route.snapshot.params.id;
    console.log(this.rota);
    this.service.GetAmbientesBackEndById(this.rota).subscribe( resultado =>{
      const variavel : Ambiente = resultado;

      this.formulario = new FormGroup({
        id : new FormControl(variavel.id,[Validators.required]),
        ambiente : new FormControl(variavel.ambiente,[Validators.required]),
        chamado : new FormControl(variavel.chamado,[Validators.required]),
        descricao : new FormControl(variavel.descricao,[Validators.required]),
        api : new FormControl(variavel.api,[Validators.required]),
        ios : new FormControl(variavel.ios,[Validators.required]),
        android : new FormControl(variavel.android,[Validators.required])
      });
    });

  }

  AlterarAmbiente(){
    const parametros = this.formulario.value;
    console.log(parametros);
      this.service.PutAmbienteBackEnd(parametros,this.rota).subscribe(resultado =>{
      console.log('resultado');
      this.router.navigate(['ambientes']);
    })

  }

  get propriedade(){
    return this.formulario.controls;
  }

}
