import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ambiente } from '../model/ambiente';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracoesService {

  uri:string = "http://localhost:3000/Ambiente/";

  uriP:string = "http://localhost:3000/ambiente";

  constructor(private http : HttpClient) { }

  GetAmbientes(path:string):Observable<Ambiente[]> {
    return this.http.get<Ambiente[]>(path);
  }

  GetAmbientesBackEnd(): Observable<Ambiente[]>
  {
    return this.http.get<Ambiente[]>(this.uri);
  }

  PostAmbienteBackEnd(ambiente:Ambiente):Observable<any>{
    return this.http.post<Ambiente>(this.uri,ambiente);
  }

}
