import { Component, OnInit } from '@angular/core';
import { UsuarioAutenticadoGuard } from 'src/app/service/usuario-autenticado.guard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isAdministrador!: boolean;


  constructor(private authGuard: UsuarioAutenticadoGuard) { }

  ngOnInit(): void {
    this.isAdministrador = this.authGuard.VerificarAdministrador();
    console.log('admin')
  }

}
