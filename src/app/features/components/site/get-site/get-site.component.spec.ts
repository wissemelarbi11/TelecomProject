import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSiteComponent } from './get-site.component';

describe('GetSiteComponent', () => {
  let component: GetSiteComponent;
  let fixture: ComponentFixture<GetSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetSiteComponent]
    });
    fixture = TestBed.createComponent(GetSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
