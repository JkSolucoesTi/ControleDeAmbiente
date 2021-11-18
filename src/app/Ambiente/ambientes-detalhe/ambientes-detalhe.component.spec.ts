import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbientesDetalheComponent } from './ambientes-detalhe.component';

describe('AmbientesDetalheComponent', () => {
  let component: AmbientesDetalheComponent;
  let fixture: ComponentFixture<AmbientesDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbientesDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbientesDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
