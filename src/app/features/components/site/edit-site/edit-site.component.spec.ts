import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSiteComponent } from './edit-site.component';

describe('EditSiteComponent', () => {
  let component: EditSiteComponent;
  let fixture: ComponentFixture<EditSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSiteComponent]
    });
    fixture = TestBed.createComponent(EditSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
