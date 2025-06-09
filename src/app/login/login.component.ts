import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ CommonModule, ReactiveFormsModule ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {  

    this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

}
