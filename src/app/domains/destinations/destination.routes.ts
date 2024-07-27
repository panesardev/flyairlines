import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/destinations/destinations.component'),
  }
];

export default routes;