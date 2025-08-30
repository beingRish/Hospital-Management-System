import { Routes } from '@angular/router';
import { AppointmentComponent } from './components/appointment/appointment';
import { PatientComponent } from './components/patient/patient';
import { Home } from './components/home/home';

export const routes: Routes = [
    {   path: '', 
        redirectTo: 'home', 
        pathMatch: 'full' 
    },
    {
        path: 'home',
        component: Home,
    },
    {
        path: 'patients',
        component: PatientComponent
    },
    {
        path: 'appointments',
        component: AppointmentComponent
    }
];
