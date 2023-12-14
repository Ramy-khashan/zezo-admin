import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

 
// import { Full_ROUTES } from './shared/routes/full-layout.routes';
// import { CONTENT_ROUTES } from './shared/routes/content-layout.routes';
 
 
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
 
 
  {
    path: '**',
    redirectTo: 'notFound',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,  ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
