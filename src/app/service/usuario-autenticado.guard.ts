import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAutenticadoGuard implements CanActivate {

  constructor(private router:Router) {
      
  }

  canActivate():boolean{
    const usuario = localStorage.getItem('NomeUSuario');

    if(usuario){     
      console.log('permitido');
      return true;
    }
    
    console.log('Não permitido');
    this.router.navigate(['login']);
    return false;
  }
  
}
