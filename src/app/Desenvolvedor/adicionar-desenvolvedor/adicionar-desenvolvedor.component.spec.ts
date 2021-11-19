import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarDesenvolvedorComponent } from './adicionar-desenvolvedor.component';

describe('AdicionarDesenvolvedorComponent', () => {
  let component: AdicionarDesenvolvedorComponent;
  let fixture: ComponentFixture<AdicionarDesenvolvedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarDesenvolvedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarDesenvolvedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
