import { Component } from '@angular/core';
import { SharedModule } from './shared/shared-module';
import { CoreModule } from './core/core-module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CoreModule, 
    SharedModule, 
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
