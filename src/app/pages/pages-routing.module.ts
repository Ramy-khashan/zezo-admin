import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { FailedComponent } from '../shared/component/failed/failed.component';
import { routes } from '../shared/component/side-menu/navigation-routes.config';
import { AdsComponent } from './ads/ads.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { SettingComponent } from './setting/setting.component';
import { SpecialOrderComponent } from './special-order/special-order.component';
import { PagesComponent } from './pages.component';
import { ReportsComponent } from './reports/reports.component';
 
const pagesRoutes: Routes = [
  {
    path: 'admin/pages',
    component: PagesComponent,
    children: [
      {
        path: 'special-order',
        component: SpecialOrderComponent,
      },
      {
        path: 'setting',
        component: SettingComponent,
      },
      {
        path: 'order',
        component: OrdersComponent,
      },
      {
        path: 'product',
        component: ProductsComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'ads',
        component: AdsComponent,
      }, {
        path: 'reports',
        component: ReportsComponent,
      },
      {
        path: 'notFound',
        component: FailedComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
