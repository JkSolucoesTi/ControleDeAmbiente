import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarambientesComponent } from './alterarambientes.component';

describe('AlterarambientesComponent', () => {
  let component: AlterarambientesComponent;
  let fixture: ComponentFixture<AlterarambientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterarambientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarambientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
