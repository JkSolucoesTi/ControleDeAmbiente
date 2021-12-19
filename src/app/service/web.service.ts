import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Web } from '../model/web';
import { EndPoint } from '../model/endpoint'; 

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private webService:HttpClient , private endpoint: EndPoint) { }

  apiUrl = `${this.endpoint.ambiente}/api/desenvolvedores/web`;

  ObterTodos():Observable<Web[]>{
    return this.webService.get<Web[]>(this.apiUrl);
  }

  ObterPorId(id:number):Observable<Web>{
    const url = `${this.apiUrl}/${id}`
    return this.webService.get<Web>(url);
  }

  Atualizar(android : Web , androiId : number):Observable<any>{
    const url = `${this.apiUrl}/Atualizar/${androiId}`;
    return this.webService.put(url,android,httpOptions);
  }

  Adicionar(web:Web):Observable<any>{
    const url = `${this.apiUrl}/Adicionar`;
    return this.webService.post<Web>(url,web);
  }

  Excluir(webId:string):Observable<any>{
    const url = `${this.apiUrl}/${webId}`;
    return this.webService.delete<number>(url);
  }

}
