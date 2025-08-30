import { Routes } from '@angular/router';
import { AppointmentComponent } from './components/appointment/appointment';
import { PatientComponent } from './components/patient/patient';

export const routes: Routes = [
    {   path: '', 
        redirectTo: 'patients', 
        pathMatch: 'full' 
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
