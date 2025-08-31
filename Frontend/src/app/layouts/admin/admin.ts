import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../../shared/shared-module';

@Component({
  selector: 'app-admin',
  imports: [SharedModule, RouterOutlet],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin {
    public isExpanded = true;

  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    // Your logout logic here
    console.log("User logged out");
  }

}
