import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { TitleResolver } from './shared/resolvers/title.resolver';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: TitleResolver,
  },
  {
    path: 'bundles',
    loadComponent: () => import('./pages/bundles/bundles.component'),
    title: TitleResolver,
  },
  {
    path: 'destinations',
    loadChildren: () => import('./domains/destinations/destination.routes'),
    title: TitleResolver,
  },
  {
    path: 'users',
    loadChildren: () => import('./domains/users/user.routes'),
    title: TitleResolver,
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component'),
    title: TitleResolver,
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component'),
    title: TitleResolver,
  }
];
