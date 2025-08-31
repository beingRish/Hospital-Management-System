import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { RoleGuard } from './core/guards/role-guard';
import { NotFound } from './features/not-found/not-found';
import { Unauthorized } from './features/unauthorized/unauthorized';
import { AuthGuard } from './core/guards/auth-guard';
import { NoAuthGuard } from './core/guards/no-auth-guard';
import { Layout } from './shared/components/layout/layout';
import { PatientComponent } from './features/patients/components/patient/patient';
import { AppointmentComponent } from './features/appointments/components/appointment/appointment';

const layoutChildren = [
  { path: '', redirectTo: 'patients', pathMatch: 'full' as 'full' },
  { path: 'patients', component: PatientComponent },
  { path: 'appointments', component: AppointmentComponent },
  // { path: 'medicines', component: MedicineComponent },
];



export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', canActivate: [NoAuthGuard], component: Home },

  {
    path: 'admin',
    component: Layout,
    canActivate: [AuthGuard, RoleGuard('ADMIN')],
    children: layoutChildren
  },
  {
    path: 'doctor',
    component: Layout,
    canActivate: [AuthGuard, RoleGuard('DOCTOR')],
    children: layoutChildren
  },

  { path: 'unauthorized', component: Unauthorized },
  { path: '**', component: NotFound }
];

