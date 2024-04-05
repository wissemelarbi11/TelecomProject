import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParamArchiveComponent } from './edit-param-archive.component';

describe('EditParamArchiveComponent', () => {
  let component: EditParamArchiveComponent;
  let fixture: ComponentFixture<EditParamArchiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditParamArchiveComponent]
    });
    fixture = TestBed.createComponent(EditParamArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
