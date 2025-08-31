import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SharedModule } from '../../shared/shared-module';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-admin',
  imports: [SharedModule, RouterOutlet],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin {
  public isExpanded = true;

  constructor(
    private route: Router,
    private authService: AuthService,
  ) { }


  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['/'])
  }

}
