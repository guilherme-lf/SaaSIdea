import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movimentacao',
  standalone: true,
  imports: [CommonModule, FormBuilder, FormGroup, Validators, RouterModule],
  templateUrl: './movimentacao.component.html',
  styleUrl: './movimentacao.component.css'
})
export class MovimentacaoComponent {
  movForm: FormGroup;
  mensagem = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.movForm = this.fb.group({
      produto_id: ['', Validators.required],
      tipo: ['', Validators.required],
      quantidade: ['', [Validators.required, Validators.min(1)]],
      observacao: ['']
    });
  }

  registrar() {
    if (this.movForm.invalid) return;

    this.http.post('http://localhost:3000/api/movimentacoes', this.movForm.value).subscribe({
      next: () => {
        this.mensagem = 'Movimentação registrada com sucesso!';
        this.movForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.mensagem = 'Erro ao registrar movimentação.';
      }
    });
  }

}
