import { Routes } from '@angular/router';
import { Login } from './core/auth/login/login';
import { Home } from './features/home/home';
import { Admin } from './layouts/admin/admin';
import { Doctor } from './layouts/doctor/doctor';
import { RoleGuard } from './core/guards/role-guard';
import { NotFound } from './features/not-found/not-found';
import { Unauthorized } from './features/unauthorized/unauthorized';
import { AuthGuard } from './core/guards/auth-guard';
import { NoAuthGuard } from './core/guards/no-auth-guard';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  {
    path: 'home',
    canActivate: [NoAuthGuard],
    component: Home
  },  
  {
    path: 'admin',
    component: Admin,
    canActivate: [RoleGuard('ADMIN'), AuthGuard],
    children: [
      { 
        path: '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full' 
      }
    ]
  },

  {
    path: 'doctor',
    component: Doctor,
    canActivate: [RoleGuard('DOCTOR'), AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // 🚨 Error routes
  { path: 'unauthorized', component: Unauthorized }, // 403
  { path: '**', component: NotFound }, //404
];

