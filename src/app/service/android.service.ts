import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Android } from '../model/android';

@Injectable({
  providedIn: 'root'
})
export class AndroidService {

  apiUrl = "http://localhost:3000/android";

  constructor(private androidService : HttpClient) { }

  ObterTodos():Observable<Android[]>{
    return this.androidService.get<Android[]>(this.apiUrl);    
  }

}