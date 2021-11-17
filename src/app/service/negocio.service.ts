import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Negocio } from '../model/negocio';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  constructor(private negocioService : HttpClient) { }


  apiUrl = "http://localhost:62405/api/Negocios"
 

  ObterTodos():Observable<Negocio[]>{
    return this.negocioService.get<Negocio[]>(this.apiUrl);
  }
}
