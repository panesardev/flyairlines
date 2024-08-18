import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { TitleResolver } from './shared/resolvers/title.resolver';
import { AdminGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: TitleResolver,
  },
  {
    path: 'airplanes',
    loadChildren: () => import('./domains/airplanes/airplane.routes'),
    title: TitleResolver,
    canActivate: [AdminGuard],
  },
  {
    path: 'bundles',
    loadComponent: () => import('./pages/bundles/bundles.component'),
    title: TitleResolver,
  },
  {
    path: 'bookings',
    loadChildren: () => import('./domains/bookings/booking.routes'),
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
