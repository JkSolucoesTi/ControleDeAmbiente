import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarApiComponent } from './editar-api.component';

describe('EditarApiComponent', () => {
  let component: EditarApiComponent;
  let fixture: ComponentFixture<EditarApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
