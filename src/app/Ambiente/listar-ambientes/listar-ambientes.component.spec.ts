import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAmbientesComponent } from './listar-ambientes.component';

describe('ListarAmbientesComponent', () => {
  let component: ListarAmbientesComponent;
  let fixture: ComponentFixture<ListarAmbientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAmbientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAmbientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
