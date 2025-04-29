import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/User/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  showPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private user: UserService, private router: Router, private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')]],
        lastName: ['', [Validators.pattern('^[a-zA-Z ]*$')]],
        gender: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$')]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator } 
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword ? null : { notMatching: true };
  }

  showSuccessSnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success']
     });
    }

  // form submission
  onSubmit() {
    this.submitted = true;

    if(this.registerForm.valid){
      // console.log(this.registerForm.value);
    // const {password, confirmPassword, ...userInfo} = this.registerForm.value;
    //   localStorage.setItem('registeredUser', JSON.stringify(userInfo));
    // console.log("Registration Successfull", userInfo);

    const payload = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      DOB: this.registerForm.value.dateOfBirth,
      gender: this.registerForm.value.gender,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    this.user.registerUser(payload).subscribe({
      next: (result: any) => {
        console.log(result);
        this.showSuccessSnackBar("Registration Successful");
        this.router.navigateByUrl('dashboard/login');
      },
      error: (error: any) => {
        console.log("Registration Failed", error);
      },
    });
    }
  }
}