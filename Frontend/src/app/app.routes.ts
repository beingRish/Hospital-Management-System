import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard';
import { AppointmentComponent } from './components/appointment/appointment';

export const routes: Routes = [
    {   path: '', 
        redirectTo: 'admin', 
        pathMatch: 'full' 
    },
    {
        path: 'admin',
        component: AdminDashboardComponent
    },
    {
        path: 'appointments',
        component: AppointmentComponent
    }
];
