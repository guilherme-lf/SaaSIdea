import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-prod',
  standalone: true, 
  imports: [HttpClient],
  templateUrl: './list-prod.component.html',
  styleUrl: './list-prod.component.css'
})
export class ListProdComponent implements OnInit {
  produtos: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.http.get<any[]>('http://localhost:3000/api/produtos')
      .subscribe({
        next: (res) => this.produtos = res,
        error: (err) => console.error('Erro ao carregar produtos:', err)
      });
  }



}
