import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component'),
  }
];

export default routes;