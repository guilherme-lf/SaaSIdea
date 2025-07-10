import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-atendentes',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule ,CommonModule, HttpClientModule, FormsModule],
  templateUrl: './atendentes.component.html',
  styleUrl: './atendentes.component.css'
})

export class AtendentesComponent implements OnInit {
  atendente = { nome: '', senha: '' };
  atendentes: any[] = [];

  constructor(private http: HttpClient) { }

  
  ngOnInit() {
    this.listarAtendentes();
  }

  cadastrar() {
    this.http.post('http://localhost:3000/api/atendentes', this.atendente).subscribe(() => {
      this.atendente = { nome: '', senha: '' };
      this.listarAtendentes();
    });
  }

  listarAtendentes() {
    this.http.get<any[]>('http://localhost:3000/api/atendentes').subscribe(res => {
      this.atendentes = res;
    });
  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir?')) {
      this.http.delete(`http://localhost:3000/api/atendentes/${id}`).subscribe(() => {
        this.listarAtendentes();
      });
    }
  }

  editar(at: any) {
    this.atendente = { ...at }; // carrega dados no formulário
  }
}
