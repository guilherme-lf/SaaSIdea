import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from 'express';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vendas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {

  vendas: any[] = [];
  vendaSelecionada: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/api/vendas').subscribe(data => {
      this.vendas = this.agruparVendas(data);
    });
  }

  verDetalhes(venda: any) {
    this.vendaSelecionada = venda;
  }

  private agruparVendas(rows: any[]): any[] {
    const vendasMap = new Map<number, any>();

    for (const row of rows) {
      if (!vendasMap.has(row.id)) {
        vendasMap.set(row.id, {
          id: row.id,
          data: row.data,
          total: row.total,
          atendente: row.atendente,
          produtos: []
        });
      }

      vendasMap.get(row.id).produtos.push({
        produto_id: row.produto_id,
        quantidade: row.quantidade,
        preco_unitario: row.preco_unitario
      });
    }

    return Array.from(vendasMap.values());
  }
}
