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
  constructor(private http : HttpClient,
              private endpoint: EndPoint) { }

  api:string =  `${this.endpoint.ambiente}/api/ambientes`

  ObterTodos():Observable<Ambiente[]>{
    return this.http.get<Ambiente[]>(this.api);
  }
}
