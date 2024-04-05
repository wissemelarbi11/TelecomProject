import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocFinancComponent } from './add-doc-financ.component';

describe('AddDocFinancComponent', () => {
  let component: AddDocFinancComponent;
  let fixture: ComponentFixture<AddDocFinancComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDocFinancComponent]
    });
    fixture = TestBed.createComponent(AddDocFinancComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
