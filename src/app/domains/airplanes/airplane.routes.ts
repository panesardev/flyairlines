import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/airplanes/airplanes.component'),
  },
];

export default routes;