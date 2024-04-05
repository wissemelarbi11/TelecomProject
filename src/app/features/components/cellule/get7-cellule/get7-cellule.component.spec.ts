import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Get7CelluleComponent } from './get7-cellule.component';

describe('Get7CelluleComponent', () => {
  let component: Get7CelluleComponent;
  let fixture: ComponentFixture<Get7CelluleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Get7CelluleComponent]
    });
    fixture = TestBed.createComponent(Get7CelluleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
