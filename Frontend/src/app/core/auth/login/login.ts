import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared-module';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar';

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  loginForm!: FormGroup;
  isRegisterMode = false;
  userRole: string | null = null;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) 
    public data: { isRegisterMode: boolean },
    private dialogRef: MatDialogRef<Login>,
    private authService: AuthService,
    private router: Router,
    private snackbar: SnackbarService,
  ) {
    this.initForm();
  }
  
  ngOnInit(): void {
    this.isRegisterMode = this.data.isRegisterMode;
  }

  initForm() {
    if (this.isRegisterMode) {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        role: ['', [Validators.required, Validators.required]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, { validators: this.passwordMatchValidator });
    } else {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
  }

  passwordMatchValidator(group: FormGroup) {
    return group.get('password')!.value === group.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.initForm();
  }

  onSubmit() {
    if (!this.loginForm.valid) return;

    if (this.isRegisterMode) {
      const { username, role, password } = this.loginForm.value;
      this.authService.register(username, password, role).subscribe({
        next: (success: boolean) => {
          if(success) {
            this.snackbar.success('Registration successful 🎉');
            this.toggleMode();
            this.dialogRef.close(true);
          }  else {
            this.snackbar.error('Registration failed ❌');
          }
        },
        error: (err) => {
          console.error(err);
          this.snackbar.error('An error occurred. Please try again.');
        }
      });
    } else {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (success: boolean) => {
          if (success) {
            this.userRole = this.authService.getUserRole();
            this.snackbar.success('Login successful 🎉');

            if (this.userRole === "ADMIN") this.router.navigate(['/admin']);
            else if (this.userRole === "DOCTOR") this.router.navigate(['/doctor']);

            this.dialogRef.close(true);
          } else {
            this.snackbar.error('Invalid credentials ❌');
          }
        },
        error: (err) => {
          console.error(err);
          this.snackbar.error('An error occurred. Please try again.');
        }
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }

}
