import { NavbarDataModal } from './side-menu_helper';

//Sidebar menu Routes and data
export const routes: NavbarDataModal[] = [
  { routerLink: 'home', icon: 'pi pi-home', lable: 'Dashboard' },
  { routerLink: 'product', icon: 'pi pi-database', lable: 'Products' },
  { routerLink: 'category', icon: 'pi pi-th-large', lable: 'Category' },
  { routerLink: 'ads', icon: 'pi pi-money-bill', lable: 'Ads' },
  {
    routerLink: 'special-order',
    icon: 'pi pi-ticket',
    lable: 'Special Order',
  },
  {
    routerLink: 'order',
    icon: 'pi pi-shopping-bag',
    lable: 'Orders',
  },
  {
    routerLink: 'reports',
    icon: 'pi pi-file-edit',
    lable: 'Reports',
  },
  {
    routerLink: 'setting',
    icon: 'pi pi-cog',
    lable: 'Settings',
  },
];
