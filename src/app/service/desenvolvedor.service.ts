import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Desenvolvedor } from '../model/desenvolvedor';
import { EndPoint } from '../model/endpoint';
import { Tipo } from '../model/tipo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DesenvolvedorService {

  api = `${this.endpoint.ambiente}/api/desenvolvedores`
  apiTipo = `${this.endpoint.ambiente}/api/Desenvolvedores/TipoDesenvolvedores`

  constructor(private httpClient: HttpClient, private endpoint:EndPoint) { }

  PegarTodos():Observable<Desenvolvedor[]>{
    return this.httpClient.get<Desenvolvedor[]>(this.api);    
  }

  PegarTodosTipoDesenvolvedores():Observable<Tipo[]>{
    return this.httpClient.get<Tipo[]>(this.apiTipo);    
  }
}
