import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reparti } from './reparti';

describe('Reparti', () => {
  let component: Reparti;
  let fixture: ComponentFixture<Reparti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reparti],
    }).compileComponents();

    fixture = TestBed.createComponent(Reparti);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
