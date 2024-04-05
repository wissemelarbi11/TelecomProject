import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCelluleComponent } from './add-cellule.component';

describe('AddCelluleComponent', () => {
  let component: AddCelluleComponent;
  let fixture: ComponentFixture<AddCelluleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCelluleComponent]
    });
    fixture = TestBed.createComponent(AddCelluleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
