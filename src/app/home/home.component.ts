import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import Chart from 'chart.js/auto';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isAdmin: boolean = false; // <-- adicionada
  resumo = [
    { titulo: 'Produtos', valor: 0 },
    { titulo: 'Vendas', valor: 0 },
    { titulo: 'Movimentações', valor: 0 },
    { titulo: 'Atendentes', valor: 0 }
  ];

  ultimasVendas: any[] = [];

  private chart: Chart | null = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.verificarPerfil();
    this.carregarResumo();
    this.carregarUltimasVendas();
    setTimeout(() => this.carregarGrafico(), 100); // garante que o canvas exista no DOM
  }

  verificarPerfil() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
    this.isAdmin = usuario?.perfil === 'admin';
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

      if (this.chart) {
        this.chart.destroy(); // evita criar múltiplos gráficos
      }

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Vendas na Semana',
            data: data.valores,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Vendas por Dia'
            }
          }
        }
      });
    });
  }
}
