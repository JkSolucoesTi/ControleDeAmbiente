import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAutenticadoGuard implements CanActivate {

  constructor(private router:Router) {
      
  }

  canActivate():boolean{
    const usuario = localStorage.getItem('EmailUsuario');

    if(usuario){
      /*alteração do vitor */
      return true;
    }
        
    this.router.navigate(['usuario/login']);
    return false;
  }
  
}
