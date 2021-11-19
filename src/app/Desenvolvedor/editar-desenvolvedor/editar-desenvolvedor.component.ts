import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Android } from 'src/app/model/android';
import { Ios } from 'src/app/model/ios';
import { Web } from 'src/app/model/web';
import { AndroidService } from 'src/app/service/android.service';
import { IosService } from 'src/app/service/ios.service';
import { WebService } from 'src/app/service/web.service';

@Component({
  selector: 'app-editar-desenvolvedor',
  templateUrl: './editar-desenvolvedor.component.html',
  styleUrls: ['./editar-desenvolvedor.component.css']
})
export class EditarDesenvolvedorComponent implements OnInit {

  dados!:any;
  formulario:any;


  constructor(private rota:ActivatedRoute,
              private androidService:AndroidService,
              private iosService:IosService,
              private webService:WebService) { }

  ngOnInit(): void {   
   
    const id = this.rota.snapshot.params.id;
    const dev = this.rota.snapshot.params.dev;
    if(dev ==="ios"){
      this.iosService.ObterPorId(id).subscribe(resultado =>{
        this.dados as Ios;
        this.dados = resultado;
        
        this.formulario = new FormGroup({
          nome : new FormControl(this.dados.nome),
          usuario : new FormControl(this.dados.usuario),
          email : new FormControl(this.dados.email)
        })        
      })
    }
    if(dev ==="web"){
      this.webService.ObterPorId(id).subscribe(resultado =>{
        this.dados as Web;
        this.dados = resultado;
        console.log(resultado);
          this.formulario = new FormGroup({
            nome : new FormControl(this.dados.nome),
            usuario : new FormControl(this.dados.usuario),
            email : new FormControl(this.dados.email)
        })    
      })
    }
    if(dev ==="android"){
      this.androidService.ObterPorId(id).subscribe(resultado =>{
       this.dados as Android;
       this.dados = resultado;
       this.formulario = new FormGroup({
        nome : new FormControl(this.dados.nome),
        usuario : new FormControl(this.dados.usuario),
        email : new FormControl(this.dados.email)
      })    
      })
    }       
  }

get propriedade(){
    return this.formulario.controls;
  }

}
