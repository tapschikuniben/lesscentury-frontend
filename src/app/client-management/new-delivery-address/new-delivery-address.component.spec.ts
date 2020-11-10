import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDeliveryAddressComponent } from './new-delivery-address.component';

describe('NewDeliveryAddressComponent', () => {
  let component: NewDeliveryAddressComponent;
  let fixture: ComponentFixture<NewDeliveryAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDeliveryAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDeliveryAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
