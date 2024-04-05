import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParamPhyComponent } from './edit-param-phy.component';

describe('EditParamPhyComponent', () => {
  let component: EditParamPhyComponent;
  let fixture: ComponentFixture<EditParamPhyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditParamPhyComponent]
    });
    fixture = TestBed.createComponent(EditParamPhyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
