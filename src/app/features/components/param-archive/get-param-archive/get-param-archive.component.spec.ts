import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetParamArchiveComponent } from './get-param-archive.component';

describe('GetParamArchiveComponent', () => {
  let component: GetParamArchiveComponent;
  let fixture: ComponentFixture<GetParamArchiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetParamArchiveComponent]
    });
    fixture = TestBed.createComponent(GetParamArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
