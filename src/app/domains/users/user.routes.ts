import { Routes } from "@angular/router";
import { AuthGuard } from "../../auth/auth.guard";

const routes: Routes = [
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component'),
    canActivate: [AuthGuard],
  }
];

export default routes;