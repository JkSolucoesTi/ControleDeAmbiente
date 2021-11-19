import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, RouterState } from '@angular/router';
import { Negocio } from 'src/app/model/negocio';
import { NegocioService } from 'src/app/service/negocio.service';

@Component({
  selector: 'app-editar-business',
  templateUrl: './editar-business.component.html',
  styleUrls: ['./editar-business.component.css']
})
export class EditarBusinessComponent implements OnInit {

  negocio!:Negocio;
  formulario!:any;

  constructor(private rota : ActivatedRoute,
              private businessService: NegocioService) { }

  ngOnInit(): void {
    const parametro = this.rota.snapshot.params.id;
    this.businessService.ObterPorId(parametro).subscribe(resultado =>{
      this.negocio = resultado;
      this.formulario = new FormGroup({
        nome : new FormControl(this.negocio.nome),
        email : new FormControl(this.negocio.email)
      })
      
    })

  }

  get propriedade(){
    return this.formulario.controls;
  }

}
