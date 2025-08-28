import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AdminDashboard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}
