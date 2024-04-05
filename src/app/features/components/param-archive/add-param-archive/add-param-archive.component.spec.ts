import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParamArchiveComponent } from './add-param-archive.component';

describe('AddParamArchiveComponent', () => {
  let component: AddParamArchiveComponent;
  let fixture: ComponentFixture<AddParamArchiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddParamArchiveComponent]
    });
    fixture = TestBed.createComponent(AddParamArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
