import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cad-prod',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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
    this.http.post<any>('http://localhost:3000/api/produtos', this.produto)
      .subscribe({
        next: (res) => {
          alert('Produto cadastrado com sucesso!');

          // Pegamos o ID do produto retornado
          const produtoId = res.id || res.insertId; // adapte conforme o retorno do backend

          // Criamos a movimentação de entrada
          const movimentacao = {
            produto_id: produtoId,
            tipo: 'entrada',
            quantidade: this.produto.quantidade,
            observacao: 'Cadastro inicial de produto'
          };

          // Enviamos a movimentação para o backend
          this.http.post('http://localhost:3000/api/movimentacoes', movimentacao)
            .subscribe({
              next: () => console.log('Movimentação registrada com sucesso.'),
              error: err => console.error('Erro ao registrar movimentação:', err)
            });

          // Limpa o formulário
          this.produto = {
            nome: '',
            categoria: '',
            marca: '',
            preco_venda: null,
            preco_custo: null,
            quantidade: 0,
            validade: '',
            codigo_barras: ''
          };
        },
        error: (err) => {
          alert('Erro ao cadastrar produto!');
          console.error(err);
        }
      });
  }
}
