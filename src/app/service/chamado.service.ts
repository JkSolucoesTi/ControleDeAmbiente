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

  Atualizar(chamado : Chamado , ambienteIdOld:string,apiIdOld:number,chamadoId : number):Observable<any>{
    const url = `${this.api}/Alterar/${ambienteIdOld}/${apiIdOld}/${chamadoId}`;
    return this.chamadoService.put(url,chamado,httpOptions);
  }

  Detahes(numeroChamado:string,nomeAmbiente:string):Observable<Chamado>{

    const url = `${this.api}/Detalhes/${numeroChamado}/${nomeAmbiente}`
    return this.chamadoService.get<Chamado>(url,httpOptions);

  }

}
