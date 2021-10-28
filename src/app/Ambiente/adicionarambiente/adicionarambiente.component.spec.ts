import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarambienteComponent } from './adicionarambiente.component';

describe('AdicionarambienteComponent', () => {
  let component: AdicionarambienteComponent;
  let fixture: ComponentFixture<AdicionarambienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarambienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarambienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
