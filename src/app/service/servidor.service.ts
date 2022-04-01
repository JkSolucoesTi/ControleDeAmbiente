import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { EndPoint } from '../model/endpoint';
import { Servidor } from '../model/servidor';

@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  constructor(private httpClient : HttpClient, private endPoint : EndPoint) { }

  apiUrl = `${this.endPoint.ambiente}/api/servidores`

  ObterTodos():Observable<Servidor[]>
  {
    return this.httpClient.get<Servidor[]>(this.apiUrl);
  }

  Inserir(servidor:Servidor):Observable<any>
  {
    return this.httpClient.post<Servidor>(this.apiUrl,servidor)
  }

  Excluir(servidorId:string):Observable<any>
  {
    const url = `${this.apiUrl}/${servidorId}`;
    return this.httpClient.delete<Servidor>(url);
  }

  ObterPorId(apiId : number): Observable<Servidor>{
    const url = `${this.apiUrl}/${apiId}`;
    return this.httpClient.get<Servidor>(url);
  }

  Atualizar(servidor:Servidor,apiId :number):Observable<any>{
    const url = `${this.apiUrl}/Atualizar/${apiId}`;
    return this.httpClient.put<Servidor>(url,servidor);
  }
}
