import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { routes } from './navigation-routes.config';

import { NavbarDataModal } from './side-menu_helper';
import { Router } from '@angular/router';
export interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  // animations: [
  //   trigger('fadeInOut', [
  //     transition(':enter', [
  //       style({ opacity: 0 }),
  //       animate('350ms', style({ opacity: 1 })),
  //     ]), transition(':leave', [
  //       style({ opacity:1 }),
  //       animate('350ms', style({ opacity: 0 })),
  //     ]),
  //   ]),
  //   trigger('rotate', [
  //     transition(':enter', [
  //       animate(
  //         '1000ms',
  //         keyframes([
  //           style({ transform: 'rotate(0deg)', offset: '0' }),
  //           style({ transform: 'rotate(2turn)', offset: '1' }),
  //         ])
  //       ),
  //     ]),
  //   ]),
  // ],
})
export class SideMenuComponent implements OnInit {
  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }
  constructor(private router: Router) {}
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed: boolean = false;
  multiple: boolean = false;
  screenWidth = 0;
  navbarData = routes;

  strech() {
    this.collapsed = !this.collapsed; 

    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
  close() {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
  handleClick(item: NavbarDataModal) {
    if (!this.multiple) {
      for (let modelItem of this.navbarData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
  }
  logout() {
    this.router.navigate(['auth/login']);
  }
}
