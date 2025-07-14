import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import Chart from 'chart.js/auto';
import { DashboardService } from './dashboard.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, RouterModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  resumo = [
    { titulo: 'Produtos', valor: 0 },
    { titulo: 'Vendas', valor: 0 },
    { titulo: 'Movimentações', valor: 0 },
    { titulo: 'Atendentes', valor: 0 }
  ];

  ultimasVendas: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.carregarResumo();
    this.carregarUltimasVendas();
    this.carregarGrafico();
  }

  carregarResumo() {
    this.dashboardService.getResumo().subscribe(data => {
      this.resumo[0].valor = data.produtos;
      this.resumo[1].valor = data.vendas;
      this.resumo[2].valor = data.movimentacoes;
      this.resumo[3].valor = data.atendentes;
    });
  }

  carregarUltimasVendas() {
    this.dashboardService.getUltimasVendas().subscribe(data => {
      this.ultimasVendas = data;
    });
  }

  carregarGrafico() {
    this.dashboardService.getVendasPorSemana().subscribe(data => {
      const ctx = document.getElementById('graficoVendas') as HTMLCanvasElement;

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Vendas',
            data: data.valores,
            borderColor: 'blue',
            fill: false
          }]
        }
      });
    });
  }

}
