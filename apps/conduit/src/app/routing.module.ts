import { NgModule } from '@angular/core';
import { PreloadAllModules, Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
  { path: '', loadChildren: () => import('@realworld-angular-nx-ngxs/home').then((m) => m.HomeModule) }
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
