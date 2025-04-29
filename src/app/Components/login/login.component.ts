import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/User/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private user: UserService, private router: Router, private snackBar: MatSnackBar){}

  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  showSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 15000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success']
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) { 
      
      const payload = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      
      this.user.loginUser(payload).subscribe(
        (response: any) => {
        console.log('Login Success', response);
          this.showSuccessSnackBar('Login successful!');
          localStorage.setItem('authtoken', response.data);
          this.router.navigateByUrl('/dashboard');
      },
      (error: any) => {
        console.log('Login failed', error);
        this.showSuccessSnackBar('Login failed! Please try again later.');
      }
    );

    //   console.log('Login successful', this.loginForm.value);
    // } else {
    //   console.log('Login failed', this.loginForm.errors);
    // }
  }

}
}
