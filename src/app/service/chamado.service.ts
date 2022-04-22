import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chamado } from '../model/chamado';
import { EndPoint } from '../model/endpoint';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':  'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  constructor(private chamadoService:HttpClient , private endpoint : EndPoint) { }

  api:string = `${this.endpoint.ambiente}/api/chamados`

  ObterTodos():Observable<Chamado[]>{
    return this.chamadoService.get<Chamado[]>(this.api);
  }

  ObterChamadoPorId(chamadoId:any):Observable<any>{
    const apiUrl = `${this.api}/Alterar/${chamadoId}`;
    return this.chamadoService.get<Chamado>(apiUrl);
  }

  AdicionarChamado(chamado:Chamado):Observable<any>{
    const apiUrl = `${this.api}/Adicionar`;
    return this.chamadoService.post<Chamado>(apiUrl,chamado);
  }

  LiberarAmbiente(numeroChamado:string):Observable<any>{
    const apiUrl = `${this.api}/Liberar/${numeroChamado}`;
    return this.chamadoService.delete<Chamado>(apiUrl);
  }

  
  Detahes(numeroChamado:string):Observable<Chamado>{
    const url = `${this.api}/Detalhes/${numeroChamado}`
    return this.chamadoService.get<Chamado>(url,httpOptions);
  }

  Atualizar(chamado:Chamado,chamadoId:any):Observable<any>{

    const url = `${this.api}/Alterar/${chamadoId}`;
    return this.chamadoService.put<Chamado>(url,chamado);

  }

}
