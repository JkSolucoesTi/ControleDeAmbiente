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

  AdicionarAmbiente(chamado:Chamado):Observable<any>{
    const apiUrl = `${this.api}/Adicionar`;
    return this.chamadoService.post<Chamado>(apiUrl,chamado);
  }

  LiberarAmbiente(ambienteId:string,apiId:string):Observable<any>{
    const apiUrl = `${this.api}/Liberar/${ambienteId}/${apiId}`;
    return this.chamadoService.delete<Chamado>(apiUrl);
  }

}
