import { Component } from '@angular/core';
import { SideNavToggle } from '../shared/component/side-menu/side-menu.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
  screenWidth: number = 0;
  collapsed = false;
  getBodyClass(): string { 
    let styleClass: string = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed'; 
    } else if (
      this.collapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) { 
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
  onToggleSideNav(data: SideNavToggle) { 
    this.collapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }
}
