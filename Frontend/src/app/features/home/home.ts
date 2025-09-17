import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../../core/components/auth/auth';

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

  openLoginDialog(isRegisterMode: boolean) {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '600px',
      data: { 
        isRegisterMode: isRegisterMode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Logged In!');
      }
    });
  }

}
