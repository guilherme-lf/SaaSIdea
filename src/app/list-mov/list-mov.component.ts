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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/api/movimentacoes')
      .subscribe({
        next: (dados) => this.movimentacoes = dados,
        error: (err) => console.error('Erro ao carregar movimentações', err)
      });
  }

}
