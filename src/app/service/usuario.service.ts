import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(httpClient: HttpClient) { }

  Logar(usuario:string):boolean{
    
    if(usuario == "marco"){
      return true;
    }else{
      return false;
    }
  }

}
