import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lis-mov',
  standalone: true,
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './list-mov.component.html',
  styleUrl: './list-mov.component.css'
})
export class ListMovComponent implements OnInit {
  movimentacoes: any[] = [];

  filtro = {
    tipo: '',
    data: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.buscar(); // Carrega tudo inicialmente
  }

  buscar(): void {
    const params: any = {};

    if (this.filtro.tipo) {
      params.tipo = this.filtro.tipo;
    }

    if (this.filtro.data) {
      params.data = this.filtro.data;
    }

    this.http.get<any[]>('http://localhost:3000/api/movimentacoes', { params })
      .subscribe({
        next: dados => this.movimentacoes = dados,
        error: err => console.error('Erro ao buscar movimentações', err)
      });
  }
  
}
