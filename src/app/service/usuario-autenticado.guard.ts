import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAutenticadoGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router:Router) {
      
  }

  canActivate():boolean{
    const token = localStorage.getItem('TokenUsuario');
    this.VerificarAdministrador();

    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }

  VerificarAdministrador():boolean
  {
    const token:any = localStorage.getItem('TokenUsuario');
    const tokenPerfil:any = this.jwtHelper.decodeToken(token);

    if(tokenPerfil.role == "ADMIN")
    {
      return true;
    }else{
      return false;
    }
  }
  
}
