import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Desenvolvedor } from '../model/desenvolvedor';
import { EndPoint } from '../model/endpoint';
import { TipoDesenvolvedor } from '../model/tipo';

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

  PegarTodosTipoDesenvolvedores():Observable<TipoDesenvolvedor[]>{
    return this.httpClient.get<TipoDesenvolvedor[]>(this.apiTipo);    
  }

  Inserir(desenvolvedor: Desenvolvedor):Observable<any>
  {
    return this.httpClient.post<Desenvolvedor>(this.api,desenvolvedor);
  }

  Excluir(desenvolvedorId:string):Observable<any>{
    const url = `${this.api}/${desenvolvedorId}`;
    return this.httpClient.delete<number>(url);
  }

  ObterPorId(id:number):Observable<Desenvolvedor>{
    const url = `${this.api}/${id}`
    return this.httpClient.get<Desenvolvedor>(url);
  }

  Atualizar(desenvolvedor : Desenvolvedor , desenvolvedorId : number):Observable<any>{
    const url = `${this.api}/Atualizar/${desenvolvedorId}`;
    return this.httpClient.put(url,desenvolvedor,httpOptions);
  }
}
