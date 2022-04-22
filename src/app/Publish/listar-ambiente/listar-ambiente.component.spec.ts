import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAmbienteComponent } from './listar-ambiente.component';

describe('ListarAmbienteComponent', () => {
  let component: ListarAmbienteComponent;
  let fixture: ComponentFixture<ListarAmbienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAmbienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAmbienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
