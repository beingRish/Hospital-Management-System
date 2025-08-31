import { Routes } from '@angular/router';
import { Admin } from '../../../layouts/admin/admin';
import { RoleGuard } from '../../guards/role-guard';
import { Doctor } from '../../../layouts/doctor/doctor';



export const routes: Routes = [
    {
        path: 'admin-login',
        component: Admin,
        canActivate: [RoleGuard('ADMIN')]
    },
    {
        path: 'doctor-login',
        component: Doctor,
        canActivate: [RoleGuard('DOCTOR')]
    },

]