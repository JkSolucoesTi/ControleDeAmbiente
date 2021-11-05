import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ios } from '../model/ios';

@Injectable({
  providedIn: 'root'
})
export class IosService {

  apiUrl = "http://localhost:3000/ios"

  constructor(private iosService : HttpClient) { }

  ObterTodos():Observable<Ios[]>{
    return this.iosService.get<Ios[]>(this.apiUrl);
  }
}
