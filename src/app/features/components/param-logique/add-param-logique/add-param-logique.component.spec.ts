import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParamLogiqueComponent } from './add-param-logique.component';

describe('AddParamLogiqueComponent', () => {
  let component: AddParamLogiqueComponent;
  let fixture: ComponentFixture<AddParamLogiqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddParamLogiqueComponent]
    });
    fixture = TestBed.createComponent(AddParamLogiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
