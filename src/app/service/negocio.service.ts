import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Negocio } from '../model/negocio';
import { EndPoint } from '../model/endpoint';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  constructor(private negocioService : HttpClient , private endpoint : EndPoint) { }

  apiUrl = `${this.endpoint.ambiente}/api/Negocios`

  ObterTodos():Observable<Negocio[]>{
    return this.negocioService.get<Negocio[]>(this.apiUrl);
  }

  ObterPorId(id:number):Observable<Negocio>{
    const url = `${this.apiUrl}/${id}`
    return this.negocioService.get<Negocio>(url);
  }

  Atualizar(negocio : Negocio , negocioId : string):Observable<any>{
    const url = `${this.apiUrl}/Atualizar/${negocioId}`;
    return this.negocioService.put(url,negocio,httpOptions);
  }

  Adicionar(negocio:Negocio):Observable<any>{
    const url = `${this.apiUrl}/Adicionar`;
    return this.negocioService.post<Negocio>(url,negocio);
  }

  Excluir(negocioId:string):Observable<any>{
    const url = `${this.apiUrl}/${negocioId}`
    return this.negocioService.delete<Negocio>(url);
  }
}
