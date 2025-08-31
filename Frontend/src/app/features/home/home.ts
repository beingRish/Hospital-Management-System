import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { MatDialog } from '@angular/material/dialog';
import { Login } from '../../core/auth/login/login';

@Component({
  selector: 'app-home',
  imports: [SharedModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(Login, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Logged In!');
      }
    });
  }

}
