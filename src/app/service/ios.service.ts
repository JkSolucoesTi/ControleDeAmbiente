import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ios } from '../model/ios';

@Injectable({
  providedIn: 'root'
})
export class IosService {

  apiUrl = "http://localhost:62405/api/desenvolvedores/ios"

  constructor(private iosService : HttpClient) { }

  ObterTodos():Observable<Ios[]>{
    return this.iosService.get<Ios[]>(this.apiUrl);
  }

  ObterPorId(id:number):Observable<Ios>{
    const url = `${this.apiUrl}/${id}`
    return this.iosService.get<Ios>(url);
  }

}
