import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ambiente } from '../model/ambiente';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracoesService {

  constructor(private http : HttpClient) { }

  GetAmbientes(path:string):Observable<Ambiente[]> {
    return this.http.get<Ambiente[]>(path);
  }

}
