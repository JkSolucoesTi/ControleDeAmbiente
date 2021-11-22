import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Negocio } from '../model/negocio';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  constructor(private negocioService : HttpClient) { }


  apiUrl = "http://localhost:62405/api/Negocios"


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
}
