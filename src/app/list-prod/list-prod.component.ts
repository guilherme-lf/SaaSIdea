import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiltroProdutoPipe } from './filtro-produto.pipe';

@Component({
  selector: 'app-list-prod',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, FormsModule, FiltroProdutoPipe],
  templateUrl: './list-prod.component.html',
  styleUrls: ['./list-prod.component.css']
})

export class ListProdComponent implements OnInit {
  produtos: any[] = [];

  filtro = {
    nome: '',
    categoria: '',
    validade: ''
  };

  categoriasUnicas: string[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  extrairCategoriasUnicas() {
    const categorias = this.produtos.map(p => p.categoria);
    this.categoriasUnicas = [...new Set(categorias)].filter(c => c); // remove duplicados e vazios
  }

  carregarProdutos() {
    this.http.get<any[]>('http://localhost:3000/api/produtos').subscribe({
      next: (res) => {
        this.produtos = res;
        this.extrairCategoriasUnicas(); // <- aqui
      },
      error: (err) => console.error('Erro ao carregar produtos:', err)
    });
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro-produto']);
  }

  excluirProduto(id: number) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.http.delete(`http://localhost:3000/api/produtos/${id}`).subscribe({
        next: () => {
          alert('Produto excluído com sucesso!');
          this.carregarProdutos();
        },
        error: err => {
          console.error('Erro ao excluir produto:', err);
          alert('Erro ao excluir o produto.');
        }
      });
    }
  }
  
  limparFiltros() {
    this.filtro = { nome: '', categoria: '', validade: '' };
  }
}
