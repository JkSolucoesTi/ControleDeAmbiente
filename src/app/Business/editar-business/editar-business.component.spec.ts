import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBusinessComponent } from './editar-business.component';

describe('EditarBusinessComponent', () => {
  let component: EditarBusinessComponent;
  let fixture: ComponentFixture<EditarBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
