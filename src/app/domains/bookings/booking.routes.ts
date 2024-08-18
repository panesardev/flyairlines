import { Routes } from "@angular/router";
import { TitleResolver } from "../../shared/resolvers/title.resolver";

const routes: Routes = [
  {
    path: 'new-booking',
    loadComponent: () => import('./pages/new-booking/new-booking.component'),
    title: TitleResolver,
  }
];

export default routes;