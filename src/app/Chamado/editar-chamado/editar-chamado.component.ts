import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-chamado',
  templateUrl: './editar-chamado.component.html',
  styleUrls: ['./editar-chamado.component.css']
})
export class EditarChamadoComponent implements OnInit {

  constructor(private activetad: ActivatedRoute) { }

  ngOnInit(): void {
    const rota1 = this.activetad.snapshot.params.ambienteId;
    const rota2 = this.activetad.snapshot.params.apiId;
    console.log(rota1,rota2);
  }

}
