import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  errors: any;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    let logUserData = this.validateForm.value;
    console.log(logUserData);
    
    this.auth.loginUser(logUserData).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('admin_id', res.admin_id);
        this.router.navigate(['/']);
      },
      (err) => {
        // console.log(err);
        this.errors = err.error;
      }
    );
  }
}
