import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParamPhyComponent } from './add-param-phy.component';

describe('AddParamPhyComponent', () => {
  let component: AddParamPhyComponent;
  let fixture: ComponentFixture<AddParamPhyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddParamPhyComponent]
    });
    fixture = TestBed.createComponent(AddParamPhyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
