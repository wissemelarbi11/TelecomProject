import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetParamPhyComponent } from './get-param-phy.component';

describe('GetParamPhyComponent', () => {
  let component: GetParamPhyComponent;
  let fixture: ComponentFixture<GetParamPhyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetParamPhyComponent]
    });
    fixture = TestBed.createComponent(GetParamPhyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
