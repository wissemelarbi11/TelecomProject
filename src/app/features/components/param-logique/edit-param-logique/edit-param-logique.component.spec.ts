import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParamLogiqueComponent } from './edit-param-logique.component';

describe('EditParamLogiqueComponent', () => {
  let component: EditParamLogiqueComponent;
  let fixture: ComponentFixture<EditParamLogiqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditParamLogiqueComponent]
    });
    fixture = TestBed.createComponent(EditParamLogiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
