import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStatsComponent } from './product-stats.component';

describe('ProductStatsComponent', () => {
  let component: ProductStatsComponent;
  let fixture: ComponentFixture<ProductStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
