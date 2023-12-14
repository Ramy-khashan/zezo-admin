import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProductsDetailsComponent } from './order-products-details.component';

describe('OrderProductsDetailsComponent', () => {
  let component: OrderProductsDetailsComponent;
  let fixture: ComponentFixture<OrderProductsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderProductsDetailsComponent]
    });
    fixture = TestBed.createComponent(OrderProductsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
