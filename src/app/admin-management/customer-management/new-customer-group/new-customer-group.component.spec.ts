import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomerGroupComponent } from './new-customer-group.component';

describe('NewCustomerGroupComponent', () => {
  let component: NewCustomerGroupComponent;
  let fixture: ComponentFixture<NewCustomerGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCustomerGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCustomerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
