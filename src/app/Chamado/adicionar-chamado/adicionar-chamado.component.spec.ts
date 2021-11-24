import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarChamadoComponent } from './adicionar-chamado.component';

describe('AdicionarChamadoComponent', () => {
  let component: AdicionarChamadoComponent;
  let fixture: ComponentFixture<AdicionarChamadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarChamadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
