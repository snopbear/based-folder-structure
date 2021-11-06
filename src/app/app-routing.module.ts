import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PreloadSelectiveStrategy } from './@core/@services/preload-selective-strategy/preload-selective-strategy.service';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './router-options/user/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'auth',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'products',
    data: { preload: false },
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./router-options/router-options.module').then(
        (m) => m.RouterOptionsModule
      ),
  },
  {
    path: 'messages',
    // canActivate: [AuthGuard],
    outlet: 'popup',
    loadChildren: () =>
      import('./router-options/messages/message.module').then(
        (m) => m.MessageModule
      ),
  },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, { useHash: true,enableTracing:true,preloadingStrategy: PreloadAllModules })],
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadSelectiveStrategy,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
