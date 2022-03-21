import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAutenticadoGuard implements CanActivate {

  constructor(private router:Router) {
      
  }

  canActivate():boolean{
    const usuario = localStorage.getItem('NomeUsuario');
    const email = localStorage.getItem("EmailUsuario");
    const token =   localStorage.getItem("TokenUsuario");
    if(usuario !== null && email !== null){     
      return true;
    }    
    this.router.navigate(['login']);
    return false;
  }
  
}
