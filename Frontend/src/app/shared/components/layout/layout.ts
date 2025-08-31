import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SharedModule } from '../../shared-module';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-layout',
  imports: [SharedModule, RouterOutlet, RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  userRole: 'ADMIN' | 'DOCTOR' | null = null;

  isExpanded = true;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
  }

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/'])
  }

  // Menu items vary by role
  get menuItems() {
    const admin = [
      { label: 'Patients', icon: 'people', link: 'patients' },
      { label: 'Appointments', icon: 'event', link: 'appointments' },
    ];
    const doctor = [
      { label: 'Patients', icon: 'people', link: 'patients' },
      { label: 'Appointments', icon: 'event', link: 'appointments' },
      { label: 'Medicines', icon: 'medical_services', link: 'medicines' }
    ];
    return this.userRole === 'ADMIN' ? admin : doctor;
  }

}
