import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared-module';
import { CoreModule } from './core/core-module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CoreModule, 
    SharedModule, 
    RouterLink,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  public isExpanded = true;

  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }
  
  logout() {
  // Your logout logic here
  console.log("User logged out");
}
}
