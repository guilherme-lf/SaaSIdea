import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-prod',
  standalone: true, 
  imports: [HttpClient],
  templateUrl: './list-prod.component.html',
  styleUrl: './list-prod.component.css'
})
export class ListProdComponent implements OnInit {
  produtos: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }


  // Método para carregar a lista de produtos do servidor.
  carregarProdutos() {
    this.http.get<any[]>('http://localhost:3000/api/produtos')
      .subscribe({
        next: (res) => this.produtos = res,
        error: (err) => console.error('Erro ao carregar produtos:', err)
      });
  }
  
  // Método para navegar para a página de cadastro de produto.
  irParaCadastro() {
    this.router.navigate(['/cadastro-produto']);
  }

  // Método para excluir um produto.
  excluirProduto(id: number) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.http.delete(`http://localhost:3000/api/produtos/${id}`)
        .subscribe({
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
