import { Routes } from '@angular/router';
import { Login } from './core/auth/login/login';
import { Home } from './features/home/home';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  {
    path: '',
    component: Home
  },
];

