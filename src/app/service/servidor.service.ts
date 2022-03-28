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
}
