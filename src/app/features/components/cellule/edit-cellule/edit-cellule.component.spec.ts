import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCelluleComponent } from './edit-cellule.component';

describe('EditCelluleComponent', () => {
  let component: EditCelluleComponent;
  let fixture: ComponentFixture<EditCelluleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCelluleComponent]
    });
    fixture = TestBed.createComponent(EditCelluleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
