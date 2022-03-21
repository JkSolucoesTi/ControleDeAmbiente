import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  constructor(private usuarioService : UsuarioService, private route:Router) { }

  usuarioLogado!:Usuario;
  formulario!:any;
  mensagemLogin!:string;

  
  ngOnInit(): void {
    this.formulario = new FormGroup({
      login : new FormControl('',[Validators.required, Validators.minLength(2)]),
      senha : new FormControl('',[Validators.required, Validators.minLength(5)])
    });
  }

  get propriedade(){
    return this.formulario.controls;
  }

  LogarUsuario(){

    const userLogin = this.formulario.value;
    this.usuarioService.Logar(userLogin).subscribe(x => {
      this.usuarioLogado = x.usuario.result;
      localStorage.setItem("NomeUsuario",this.usuarioLogado.nome);
      localStorage.setItem("EmailUsuario",this.usuarioLogado.email);
      this.route.navigate(["/chamados"]);
    }, erro =>{
      if(erro){
        this.mensagemLogin = "Sem comunicaçaõ com o servidor"
      }
      if(erro.error !=='')
      {
        this.mensagemLogin = erro.error.mensagem
      }        
      else{
       this.mensagemLogin = "Não foi possível obter a resposta do servidor"
      }      
  });
}
}
