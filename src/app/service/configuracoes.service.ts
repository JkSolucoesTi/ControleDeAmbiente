import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ambiente } from '../model/ambiente';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ConfiguracoesService {

  uri:string = "http://localhost:3000/Ambiente/";
  api:string = "http://localhost:62405/api/ambientes"
  constructor(private http : HttpClient) { }

  GetAmbientes(path:string):Observable<Ambiente[]> {
    return this.http.get<Ambiente[]>(path);
  }

  GetAmbientesBackEnd(): Observable<Ambiente[]>
  {
    return this.http.get<Ambiente[]>(this.api);
  }
/*GET/posts/1 */
  GetAmbientesBackEndById(idAmbiente:string):Observable<any>{
    const rota = `${this.api}/PegarPorId/${idAmbiente}`
    return this.http.get<Ambiente>(rota);
  }

  PostAmbienteBackEnd(ambiente:Ambiente):Observable<any>{
    return this.http.post<Ambiente>(this.api,ambiente,httpOptions);
  }

  PutAmbienteBackEnd(ambiente:Ambiente,idAmbiente:string):Observable<any>{
    const rota = `${this.api}/${idAmbiente}`;
    return this.http.put<Ambiente>(rota,ambiente,httpOptions);
  }

  PutLioberarAmbienteBackEnd(ambiente:Ambiente,idAmbiente:string):Observable<any>{
    const rota = `${this.api}/LiberarAmbiente/${idAmbiente}`;
    return this.http.put<Ambiente>(rota,ambiente,httpOptions);
  }

}
