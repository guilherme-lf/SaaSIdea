import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-cad-prod',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ZXingScannerModule],
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

  formatsEnabled = [BarcodeFormat.EAN_13, BarcodeFormat.EAN_8];
  showScanner = false;

  constructor(private http: HttpClient) {}

  toggleScanner() {
    this.showScanner = !this.showScanner;
  }

  onCodeResult(result: string) {
    this.produto.codigo_barras = result;
    this.showScanner = false;
  }

  gerarCodigo() {
    const aleatorio = Math.floor(100000000000 + Math.random() * 900000000000);
    this.produto.codigo_barras = aleatorio.toString();
  }

  cadastrarProduto() {
    this.http.post('http://localhost:3000/api/produtos', this.produto)
    .subscribe({
      next: () => {
        alert('Produto cadastrado com sucesso!');
        // Limpar formulário
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
      error: () => {
        alert('Erro ao cadastrar o produto.');
      }
    });
  }
}
