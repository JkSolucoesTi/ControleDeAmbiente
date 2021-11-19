import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarBusinessComponent } from './listar-business.component';

describe('ListarBusinessComponent', () => {
  let component: ListarBusinessComponent;
  let fixture: ComponentFixture<ListarBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
