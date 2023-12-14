import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { LoadingComponent } from './component/loading/loading.component';
import { FailedComponent } from './component/failed/failed.component';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from './component/side-menu/side-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SublevelMenuComponent } from './component/side-menu/sublevel-menu.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LoadingComponent,
    FailedComponent,
    SideMenuComponent,
    SublevelMenuComponent,
  ],
  imports: [BrowserModule,ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
  exports: [
    HeaderComponent,
    FailedComponent,
    LoadingComponent,
    SideMenuComponent,
    SublevelMenuComponent,
    BrowserModule,
    FormsModule,
  ],
})
export class SharedModule {}
