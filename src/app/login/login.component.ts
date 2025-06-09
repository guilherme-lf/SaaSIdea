import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;
  
      this.http.post('http://localhost:3000/login', { email, senha }).subscribe({
        next: (res) => {
          alert('Login realizado com sucesso!');
          this.router.navigate(['/menu']); // Redireciona para /menu
        },
        error: (err) => {
          if (err.status === 401) {
            alert('Email ou senha inválidos.');
          } else {
            alert('Erro ao tentar fazer login.');
          }
        }
      });
    }
  }  

}
