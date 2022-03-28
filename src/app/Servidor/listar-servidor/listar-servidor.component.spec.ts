import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarServidorComponent } from './listar-servidor.component';

describe('ListarServidorComponent', () => {
  let component: ListarServidorComponent;
  let fixture: ComponentFixture<ListarServidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarServidorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarServidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
