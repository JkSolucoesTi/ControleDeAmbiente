import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ios } from '../model/ios';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class IosService {

  apiUrl = "http://localhost:62405/api/desenvolvedores/ios"

  constructor(private iosService : HttpClient) { }

  ObterTodos():Observable<Ios[]>{
    return this.iosService.get<Ios[]>(this.apiUrl);
  }

  ObterPorId(id:number):Observable<Ios>{
    const url = `${this.apiUrl}/${id}`
    return this.iosService.get<Ios>(url);
  }

  Atualizar(android : Ios , androiId : number):Observable<any>{
    const url = `${this.apiUrl}/Atualizar/${androiId}`;
    return this.iosService.put(url,android,httpOptions);
  }

  Adicionar(ios:Ios):Observable<any>{
    const url = `${this.apiUrl}/Adicionar`;
    return this.iosService.post<Ios>(url,ios);
  }

  Excluir(iosId:string):Observable<any>{
    const url = `${this.apiUrl}/${iosId}`;
    return this.iosService.delete<number>(url);
  }
}
