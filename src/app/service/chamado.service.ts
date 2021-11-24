import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chamado } from '../model/chamado';

const httpOptions = {
  header : new HttpHeaders({
    'Content-Type':  'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  api:string = "http://localhost:62405/api/chamados"

  constructor(private chamadoService:HttpClient) { }

  ObterTodos():Observable<Chamado[]>{
    return this.chamadoService.get<Chamado[]>(this.api);
  }

}
