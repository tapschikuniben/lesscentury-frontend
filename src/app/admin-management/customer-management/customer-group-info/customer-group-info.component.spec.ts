import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGroupInfoComponent } from './customer-group-info.component';

describe('CustomerGroupInfoComponent', () => {
  let component: CustomerGroupInfoComponent;
  let fixture: ComponentFixture<CustomerGroupInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerGroupInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerGroupInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
