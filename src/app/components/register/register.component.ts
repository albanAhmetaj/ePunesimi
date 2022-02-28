import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validateForm!: FormGroup;
  errors: any;

  submitForm(): void {
    let registerUserData = this.validateForm.value;
    console.log(registerUserData);
    
    this.auth.registerUser(registerUserData).subscribe(
      (res) => {
        console.log(res);
        // localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      },
      (err) => {
        // console.log(err);
        this.errors = err.error;
      }
    );
  }

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
  }

}
