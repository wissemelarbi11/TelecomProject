import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDocFinancComponent } from './get-doc-financ.component';

describe('GetDocFinancComponent', () => {
  let component: GetDocFinancComponent;
  let fixture: ComponentFixture<GetDocFinancComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetDocFinancComponent]
    });
    fixture = TestBed.createComponent(GetDocFinancComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
