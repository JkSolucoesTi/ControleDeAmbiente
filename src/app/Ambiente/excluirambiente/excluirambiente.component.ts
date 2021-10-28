import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracoesService } from 'src/app/service/configuracoes.service';

@Component({
  selector: 'app-excluirambiente',
  templateUrl: './excluirambiente.component.html',
  styleUrls: ['./excluirambiente.component.css']
})
export class ExcluirambienteComponent implements OnInit {

  constructor(private http : ConfiguracoesService,
              private router : Router) { }

  ngOnInit(): void {
  }

}
