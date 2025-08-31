import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared-module';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  
  loginForm: any;
  userRole: string | null = null;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { userType: 'ADMIN' | 'DOCTOR'},
    private dialogRef: MatDialogRef<Login>,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username!, password!).subscribe(success => {
        if (success) {
          this.dialogRef.close(true);
            if (this.userRole === "ADMIN") {
              this.router.navigate(['/adming-login']);
            }
        } else {
          alert('Invalid credentials');
        }
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }

}
