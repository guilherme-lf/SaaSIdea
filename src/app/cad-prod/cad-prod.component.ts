import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cad-prod',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './cad-prod.component.html',
  styleUrl: './cad-prod.component.css'
})
export class CadProdComponent {
  produto = {
    nome: '',
    categoria: '',
    marca: '',
    preco_venda: null,
    preco_custo: null,
    quantidade: 0,
    validade: '',
    codigo_barras: ''
  };

  constructor(private http: HttpClient) {}

  gerarCodigo() {
    const aleatorio = Math.floor(100000000000 + Math.random() * 900000000000);
    this.produto.codigo_barras = aleatorio.toString();
  }

  cadastrarProduto() {
    this.http.post('http://localhost:3000/api/produtos', this.produto)
      .subscribe({
        next: res => alert('Produto cadastrado com sucesso!'),
        error: err => alert('Erro ao cadastrar produto!')
      });
  }
}
