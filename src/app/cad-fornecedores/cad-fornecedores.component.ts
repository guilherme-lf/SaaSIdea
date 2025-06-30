import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-cad-fornecedores',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterModule ],
  templateUrl: './cad-fornecedores.component.html',
  styleUrl: './cad-fornecedores.component.css'
})
export class CadFornecedoresComponent {

  fornecedor = {
    nome: '',
    cnpj: '',
    email: '',
    telefone: '',
    endereco: ''
  };

  fornecedores: any[] = [];

  constructor(private http: HttpClient) {
    this.buscarFornecedores();
  }

  cadastrar() {
    this.http.post('http://localhost:3000/api/fornecedores', this.fornecedor)
      .subscribe({
        next: () => {
          alert('Fornecedor cadastrado com sucesso!');
          this.fornecedor = { nome: '', cnpj: '', email: '', telefone: '', endereco: '' };
          this.buscarFornecedores();
        },
        error: () => alert('Erro ao cadastrar fornecedor.')
      });
  }

  buscarFornecedores() {
    this.http.get<any[]>('http://localhost:3000/api/fornecedores')
      .subscribe(res => this.fornecedores = res);
  }


}
