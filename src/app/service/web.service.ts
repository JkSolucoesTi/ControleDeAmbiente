import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Web } from '../model/web';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  apiUrl = "http://localhost:62405/api/desenvolvedores/web";

  constructor(private webService:HttpClient) { }

  ObterTodos():Observable<Web[]>{
    return this.webService.get<Web[]>(this.apiUrl);
  }

  ObterPorId(id:number):Observable<Web>{
    const url = `${this.apiUrl}/${id}`
    return this.webService.get<Web>(url);
  }
}
