import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ambiente } from '../model/ambiente';
import { EndPoint } from '../model/endpoint';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AmbienteService {
  constructor(private httpClient : HttpClient,
              private endpoint: EndPoint) { }

  apiUrl:string =  `${this.endpoint.ambiente}/api/ambientes`

  ObterTodos():Observable<Ambiente[]>{
    return this.httpClient.get<Ambiente[]>(this.apiUrl);
  }

  ObterPorId(apiId : number): Observable<Ambiente>{
    const url = `${this.apiUrl}/${apiId}`;
    return this.httpClient.get<Ambiente>(url);
  }

  Atualizar(servidor:Ambiente,apiId :number):Observable<any>{
    const url = `${this.apiUrl}/Atualizar/${apiId}`;
    return this.httpClient.put<Ambiente>(url,servidor);
  }
}
