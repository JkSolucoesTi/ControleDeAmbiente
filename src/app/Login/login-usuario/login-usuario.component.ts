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
  loader!:boolean;

  
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
    this.loader = true;
    const userLogin = this.formulario.value;
    this.usuarioService.Logar(userLogin).subscribe(x => {
      localStorage.setItem("NomeUsuario",x.usuario);
      localStorage.setItem("EmailUsuario",x.email);
      localStorage.setItem("TokenUsuario",x.token);
      this.route.navigate(["/chamados"]);
      this.loader = false;
    }, erro =>{
      this.loader =false;
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
