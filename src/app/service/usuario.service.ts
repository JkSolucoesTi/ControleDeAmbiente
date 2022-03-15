import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(httpClient: HttpClient) { }

  Logar(usuario:Usuario):boolean{
    console.log(usuario);
    if(usuario.nome === "jm0002" && usuario.senha === "12345678"){
      return true;
    }else{
      return false;
    }
  }

}
