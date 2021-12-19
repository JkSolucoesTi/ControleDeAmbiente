import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../model/api';
import { EndPoint } from '../model/endpoint';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apiService : HttpClient , private endpoint: EndPoint) { }

  apiUrl = `${this.endpoint.ambiente}/api/api`


  ObterTodos():Observable<Api[]>{
    return this.apiService.get<Api[]>(this.apiUrl);
  }

  ObterPorId(apiId : number): Observable<Api>{
    const url = `${this.apiUrl}/${apiId}`;
    return this.apiService.get<Api>(url);
  }

  Atualizar(api:Api,apiId :number):Observable<any>{
    const url = `${this.apiUrl}/Atualizar/${apiId}`;
    return this.apiService.put<Api>(url,api,httpOptions);
  }

  Adicionar(api:Api):Observable<any>{
    const url =`${this.apiUrl}/Adicionar`;
    return this.apiService.post<Api>(url,api);
  }

  Excluir(apiId:string):Observable<any>{
    const url = `${this.apiUrl}/${apiId}`;
    return this.apiService.delete<Api>(url);
  }
}
