import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { SpecialOrderComponent } from './special-order/special-order.component';
import { SettingComponent } from './setting/setting.component';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { AdsComponent } from './ads/ads.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { AddProductComponent } from './products/component/add-product/add-product.component';
import { ViewProductImagesComponent } from './products/component/view-product-images/view-product-images.component';
import { EditProductComponent } from './products/component/edit-product/edit-product.component';
import { EditCategoryComponent } from './category/component/edit-category/edit-category.component';
import { AddCategoryComponent } from './category/component/add-category/add-category.component';
import { AddAdsComponent } from './ads/component/add-ads/add-ads.component';
import { ViewUserDetailsComponent } from './special-order/component/view-user-details/view-user-details.component';
import { OrderProductsDetailsComponent } from './orders/component/order-products-details/order-products-details.component';
import { ReportsComponent } from './reports/reports.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    HomeComponent,
    OrdersComponent,
    SpecialOrderComponent,
    SettingComponent,
    ProductsComponent,
    CategoryComponent,
    AdsComponent,
    PagesComponent,
    AddProductComponent,
    ViewProductImagesComponent,
    EditProductComponent,
    EditCategoryComponent,
    AddCategoryComponent,
    AddAdsComponent,
    ViewUserDetailsComponent,
    OrderProductsDetailsComponent,
    ReportsComponent,
  ],
  imports: [CommonModule,NgxPaginationModule, ReactiveFormsModule,SharedModule, FormsModule, PagesRoutingModule],

  exports: [PagesComponent],
})
export class PagesModule {}
