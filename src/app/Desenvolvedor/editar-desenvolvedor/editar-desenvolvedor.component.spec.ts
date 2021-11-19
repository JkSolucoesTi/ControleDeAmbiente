import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDesenvolvedorComponent } from './editar-desenvolvedor.component';

describe('EditarDesenvolvedorComponent', () => {
  let component: EditarDesenvolvedorComponent;
  let fixture: ComponentFixture<EditarDesenvolvedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarDesenvolvedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDesenvolvedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
