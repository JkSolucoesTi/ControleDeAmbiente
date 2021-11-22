import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarBusinessComponent } from './adicionar-business.component';

describe('AdicionarBusinessComponent', () => {
  let component: AdicionarBusinessComponent;
  let fixture: ComponentFixture<AdicionarBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
