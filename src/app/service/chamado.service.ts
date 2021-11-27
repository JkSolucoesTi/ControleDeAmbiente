import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chamado } from '../model/chamado';

const httpOptions = {
  headers : new HttpHeaders({
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

  ObterPorAmbienteAPI(ambienteId:string,apiId:string):Observable<any>{
    const apiUrl = `${this.api}/Alterar/${ambienteId}/${apiId}`;
    return this.chamadoService.get<Chamado>(apiUrl);
  }

  AdicionarAmbiente(chamado:Chamado):Observable<any>{
    const apiUrl = `${this.api}/Adicionar`;
    return this.chamadoService.post<Chamado>(apiUrl,chamado);
  }

  LiberarAmbiente(ambienteId:string,apiId:string):Observable<any>{
    const apiUrl = `${this.api}/Liberar/${ambienteId}/${apiId}`;
    return this.chamadoService.delete<Chamado>(apiUrl);
  }

  Atualizar(chamado : Chamado , chamadoId : number):Observable<any>{
    const url = `${this.api}/Alterar/${chamadoId}`;
    return this.chamadoService.put(url,chamado,httpOptions);
  }

}
