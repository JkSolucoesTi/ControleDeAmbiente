import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirambienteComponent } from './excluirambiente.component';

describe('ExcluirambienteComponent', () => {
  let component: ExcluirambienteComponent;
  let fixture: ComponentFixture<ExcluirambienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcluirambienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcluirambienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
