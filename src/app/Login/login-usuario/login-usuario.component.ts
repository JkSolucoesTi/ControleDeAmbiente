import { Component, OnInit } from '@angular/core';
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

  
  ngOnInit(): void {
  }

  LogarUsuario(){
    if(this.usuarioService.Logar("marco")){
      console.log('usuario logado');
      localStorage.setItem("NomeUSuario","Marco");
      this.route.navigate(["/chamados"]);
    }else{
      alert("Usuario ou Senha inválidos");
    }
  }

}
