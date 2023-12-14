import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductImagesComponent } from './view-product-images.component';

describe('ViewProductImagesComponent', () => {
  let component: ViewProductImagesComponent;
  let fixture: ComponentFixture<ViewProductImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProductImagesComponent]
    });
    fixture = TestBed.createComponent(ViewProductImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
