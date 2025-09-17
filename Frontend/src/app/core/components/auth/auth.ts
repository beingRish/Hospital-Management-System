import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared-module';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar';

@Component({
  selector: 'app-auth',
  imports: [SharedModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss']
})
export class AuthComponent {

  authForm!: FormGroup;
  isRegisterMode = false;
  userRole: string | null = null;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { isRegisterMode: boolean },
    private dialogRef: MatDialogRef<AuthComponent>,
    private authService: AuthService,
    private router: Router,
    private snackbar: SnackbarService,
  ) {}
  
  ngOnInit(): void {
    this.isRegisterMode = this.data.isRegisterMode;
    this.initForm();
  }
  
  initForm() {
    if (this.isRegisterMode) {
      this.authForm = this.fb.group({
        username: ['', Validators.required],
        role: ['', [Validators.required]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, { validators: this.passwordMatchValidator });
    } else {
      this.authForm = this.fb.group({
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
    if (!this.authForm.valid) return;

    if (this.isRegisterMode) {
      const { username, role, password } = this.authForm.value;
      this.authService.register(username, password, role).subscribe({
        next: (success: boolean) => {
          if (success) {
            this.snackbar.success('Registration successful 🎉');
            this.toggleMode();
            this.dialogRef.close(true);
          }
        },
        error: (err) => {
          const message = err?.error?.error || err?.error?.message || 'An error occurred. Please try again.';
          this.snackbar.error(message);
        }
      });
    } else {
      const { username, password } = this.authForm.value;
      this.authService.login(username, password).subscribe({
        next: (success: boolean) => {
          if (success) {
            this.userRole = this.authService.getUserRole();
            this.snackbar.success('Login successful 🎉');

            if (this.userRole === "ADMIN") this.router.navigate(['/admin']);
            else if (this.userRole === "DOCTOR") this.router.navigate(['/doctor']);

            this.dialogRef.close(true);
          }
        },
        error: (err) => {
          const message = err?.error || err?.error?.message || 'An error occurred. Please try again.';
          this.snackbar.error(message);
        }
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }

}
