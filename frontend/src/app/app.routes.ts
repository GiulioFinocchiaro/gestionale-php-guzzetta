import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {Login} from './pages/login/login';
import {Reparti} from './pages/reparti/reparti';
import {DipendentePage} from './pages/dipendente/dipendente';
import {authGuard} from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'reparti',
    component: Reparti,
    canActivate: [authGuard]
  },
  {
    path: 'dipendente',
    component: DipendentePage,
    canActivate: [authGuard]
  }
];
