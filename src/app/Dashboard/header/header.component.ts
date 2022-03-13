import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario!:any;
  constructor(private route:Router) { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('NomeUSuario');
  }

  Logout(){
    localStorage.clear();
    this.route.navigate(['login']);
  }

}
