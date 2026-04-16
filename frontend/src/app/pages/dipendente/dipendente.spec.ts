import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dipendente } from './dipendente';

describe('Dipendente', () => {
  let component: Dipendente;
  let fixture: ComponentFixture<Dipendente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dipendente],
    }).compileComponents();

    fixture = TestBed.createComponent(Dipendente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
