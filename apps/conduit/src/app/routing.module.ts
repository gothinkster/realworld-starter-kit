import { NgModule } from '@angular/core';
import { PreloadAllModules, Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
  { path: 'home', loadChildren: () => import('@realworld-angular-nx-ngxs/home').then((m) => m.HomeModule) },
  { path: 'login', loadChildren: () => import('@realworld-angular-nx-ngxs/login').then((m) => m.LoginModule) },
  { path: 'sign-up', loadChildren: () => import('@realworld-angular-nx-ngxs/register').then((m) => m.RegisterModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class RoutingModule {}
