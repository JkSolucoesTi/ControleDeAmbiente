import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Usuario } from '../model/usuario';
import { EndPoint } from '../model/endpoint';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient , private endpoint : EndPoint) { }

  apiUrl = `${this.endpoint.ambiente}/api/usuario/LoginUsuario`

  Logar(usuario:Usuario):Observable<any>{
   return this.httpClient.post<Usuario>(this.apiUrl,usuario)  
  }

}
