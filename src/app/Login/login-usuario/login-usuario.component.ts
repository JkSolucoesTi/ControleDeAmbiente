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

  formulario!:any;
  mensagemLogin!:string;

  
  ngOnInit(): void {
    this.formulario = new FormGroup({
      nome : new FormControl('',[Validators.minLength(2)]),
      senha : new FormControl('',[Validators.minLength(5)])
    });
  }

  get propriedade(){
    return this.formulario.controls;
  }

  LogarUsuario(){

    const userLogin = this.formulario.value;
    if(this.usuarioService.Logar(userLogin)){
      console.log('usuario logado');
      localStorage.setItem("NomeUSuario",userLogin.nome);
      this.route.navigate(["/chamados"]);
    }else{
      alert("Usuario ou Senha inválidos");
      this.mensagemLogin = "Usuario ou Senha inválidos";
    }
    
  }

}
