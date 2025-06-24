import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-prod',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  templateUrl: './list-prod.component.html',
  styleUrls: ['./list-prod.component.css']
})
export class ListProdComponent implements OnInit {
  produtos: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.http.get<any[]>('http://localhost:3000/api/produtos').subscribe({
      next: (res) => this.produtos = res,
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
}
