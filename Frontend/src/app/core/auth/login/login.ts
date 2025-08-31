import { Component, effect, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared-module';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar';

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
    @Inject(MAT_DIALOG_DATA) public data: { userType: 'admin' | 'doctor'},
    private dialogRef: MatDialogRef<Login>,
    private authService: AuthService,
    private router: Router,
    private snackbar: SnackbarService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(success => {
        this.userRole = this.authService.getUserRole();
        if (success) {
           this.snackbar.success('Login successful 🎉');
          if (this.userRole === "ADMIN") {
            this.router.navigate(['/admin']);
            this.dialogRef.close(true);
          } else if (this.userRole === "DOCTOR") {
            this.router.navigate(['/doctor']);
            this.dialogRef.close(true);
          }
        } else {
          this.snackbar.error('Invalid credentials ❌');
        }
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }

}
