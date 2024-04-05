import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetParamLogiqueComponent } from './get-param-logique.component';

describe('GetParamLogiqueComponent', () => {
  let component: GetParamLogiqueComponent;
  let fixture: ComponentFixture<GetParamLogiqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetParamLogiqueComponent]
    });
    fixture = TestBed.createComponent(GetParamLogiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
