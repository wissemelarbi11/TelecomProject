import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tb1Component } from './tb1.component';

describe('Tb1Component', () => {
  let component: Tb1Component;
  let fixture: ComponentFixture<Tb1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Tb1Component]
    });
    fixture = TestBed.createComponent(Tb1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
