import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDocFinancComponent } from './edit-doc-financ.component';

describe('EditDocFinancComponent', () => {
  let component: EditDocFinancComponent;
  let fixture: ComponentFixture<EditDocFinancComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDocFinancComponent]
    });
    fixture = TestBed.createComponent(EditDocFinancComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
