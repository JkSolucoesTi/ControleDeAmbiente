import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../model/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = "http://localhost:62405/api/desenvolvedores/api";

  constructor(private apiService:HttpClient) { }

  ObterTodos():Observable<Api[]>{
    return this.apiService.get<Api[]>(this.apiUrl);
  }
}
