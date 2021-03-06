import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Android } from '../model/android';
import { EndPoint } from '../model/endpoint';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class AndroidService {

  constructor(private androidService : HttpClient, private endpoint : EndPoint) { }

  apiUrl = `${this.endpoint.ambiente}/api/desenvolvedores/android`
    
  ObterTodos():Observable<Android[]>{
    return this.androidService.get<Android[]>(this.apiUrl);
  }

  ObterPorId(id:number):Observable<Android>{
    const url = `${this.apiUrl}/${id}`
    return this.androidService.get<Android>(url);
  }

  Atualizar(android : Android , androiId : number):Observable<any>{
    const url = `${this.apiUrl}/Atualizar/${androiId}`;
    return this.androidService.put(url,android,httpOptions);
  }

  Adicionar(android:Android):Observable<any>{
    const url = `${this.apiUrl}/Adicionar`;
    return this.androidService.post<Android>(url,android);
  }

  Excluir(androidId:string):Observable<any>{
    const url = `${this.apiUrl}/${androidId}`;
    return this.androidService.delete<number>(url);
  }



}
