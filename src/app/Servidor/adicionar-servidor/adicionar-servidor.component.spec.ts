import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarServidorComponent } from './adicionar-servidor.component';

describe('AdicionarServidorComponent', () => {
  let component: AdicionarServidorComponent;
  let fixture: ComponentFixture<AdicionarServidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarServidorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarServidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
