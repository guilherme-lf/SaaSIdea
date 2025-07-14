import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private API = 'http://localhost:3000/api/dashboard';

  constructor(private http: HttpClient) {}

  getResumo() {
    return this.http.get<any>(`${this.API}/resumo`);
  }

  getUltimasVendas() {
    return this.http.get<any[]>(`${this.API}/ultimas-vendas`);
  }

  getVendasPorSemana() {
    return this.http.get<any>(`${this.API}/vendas-semana`);
  }
}
