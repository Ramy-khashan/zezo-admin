import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent,AuthComponent],
  imports: [
     AuthRoutingModule,
     ReactiveFormsModule,

    FormsModule,BrowserModule
  ]
})
export class AuthModule { }
